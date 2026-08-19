-- ENUMS
CREATE TYPE public.app_role AS ENUM ('admin','staff','user');
CREATE TYPE public.vehicle_status AS ENUM ('available','reserved','rented','maintenance','unavailable');
CREATE TYPE public.application_status AS ENUM ('pending','under_review','approved','rejected','completed');
CREATE TYPE public.booking_status AS ENUM ('pending','confirmed','completed','cancelled');

-- UTIL
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.generate_reference(prefix TEXT)
RETURNS TEXT LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT prefix || '-' || to_char(now(),'YYMM') || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
$$;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin','staff'));
$$;
CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- VEHICLES
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  make TEXT NOT NULL DEFAULT '',
  model TEXT NOT NULL DEFAULT '',
  year INTEGER,
  category TEXT NOT NULL DEFAULT 'Luxury',
  tagline TEXT NOT NULL DEFAULT '',
  price_daily NUMERIC NOT NULL DEFAULT 0,
  price_weekly NUMERIC,
  price_monthly NUMERIC,
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  fuel TEXT NOT NULL DEFAULT 'Petrol',
  engine_capacity TEXT NOT NULL DEFAULT '',
  seats INTEGER NOT NULL DEFAULT 4,
  luggage INTEGER NOT NULL DEFAULT 2,
  mileage TEXT NOT NULL DEFAULT 'Unlimited',
  location TEXT NOT NULL DEFAULT 'Nairobi, Kenya',
  features TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  rental_terms TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  status public.vehicle_status NOT NULL DEFAULT 'available',
  featured BOOLEAN NOT NULL DEFAULT false,
  archived BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.vehicles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vehicles TO authenticated;
GRANT ALL ON public.vehicles TO service_role;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads live vehicles" ON public.vehicles FOR SELECT TO anon USING (archived = false);
CREATE POLICY "authenticated reads live vehicles" ON public.vehicles FOR SELECT TO authenticated USING (archived = false OR public.is_admin());
CREATE POLICY "admins insert vehicles" ON public.vehicles FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "admins update vehicles" ON public.vehicles FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admins delete vehicles" ON public.vehicles FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- BOOKINGS
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE DEFAULT public.generate_reference('BK'),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  vehicle_name TEXT NOT NULL DEFAULT '',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL DEFAULT '',
  pickup_location TEXT NOT NULL DEFAULT '',
  dropoff_location TEXT NOT NULL DEFAULT '',
  pickup_date DATE,
  pickup_time TEXT NOT NULL DEFAULT '',
  return_date DATE,
  return_time TEXT NOT NULL DEFAULT '',
  with_driver BOOLEAN NOT NULL DEFAULT false,
  notes TEXT NOT NULL DEFAULT '',
  status public.booking_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can request a booking" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read bookings" ON public.bookings FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins update bookings" ON public.bookings FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admins delete bookings" ON public.bookings FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- LEASE APPLICATIONS
CREATE TABLE public.lease_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE DEFAULT public.generate_reference('LSE'),
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  owner_phone TEXT NOT NULL DEFAULT '',
  owner_city TEXT NOT NULL DEFAULT '',
  owner_country TEXT NOT NULL DEFAULT 'Kenya',
  vehicle_make TEXT NOT NULL DEFAULT '',
  vehicle_model TEXT NOT NULL DEFAULT '',
  vehicle_year INTEGER,
  registration TEXT NOT NULL DEFAULT '',
  mileage_km INTEGER,
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  fuel TEXT NOT NULL DEFAULT 'Petrol',
  seats INTEGER,
  condition_notes TEXT NOT NULL DEFAULT '',
  insurance_status TEXT NOT NULL DEFAULT '',
  availability TEXT NOT NULL DEFAULT '',
  expected_monthly NUMERIC,
  logbook_path TEXT,
  insurance_path TEXT,
  inspection_path TEXT,
  photo_paths TEXT[] NOT NULL DEFAULT '{}',
  message TEXT NOT NULL DEFAULT '',
  status public.application_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.lease_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lease_applications TO authenticated;
GRANT ALL ON public.lease_applications TO service_role;
ALTER TABLE public.lease_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can apply to lease" ON public.lease_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read lease apps" ON public.lease_applications FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins update lease apps" ON public.lease_applications FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admins delete lease apps" ON public.lease_applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER lease_applications_updated_at BEFORE UPDATE ON public.lease_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- DRIVER APPLICATIONS
CREATE TABLE public.driver_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE DEFAULT public.generate_reference('DRV'),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  date_of_birth DATE,
  city TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT 'Kenya',
  licence_number TEXT NOT NULL DEFAULT '',
  licence_class TEXT NOT NULL DEFAULT '',
  licence_expiry DATE,
  years_experience INTEGER,
  languages TEXT NOT NULL DEFAULT '',
  vehicle_types TEXT[] NOT NULL DEFAULT '{}',
  availability TEXT NOT NULL DEFAULT '',
  preferred_hours TEXT NOT NULL DEFAULT '',
  has_own_vehicle BOOLEAN NOT NULL DEFAULT false,
  experience_notes TEXT NOT NULL DEFAULT '',
  licence_path TEXT,
  id_path TEXT,
  good_conduct_path TEXT,
  cv_path TEXT,
  photo_path TEXT,
  status public.application_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.driver_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.driver_applications TO authenticated;
GRANT ALL ON public.driver_applications TO service_role;
ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can apply as driver" ON public.driver_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read driver apps" ON public.driver_applications FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admins update driver apps" ON public.driver_applications FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admins delete driver apps" ON public.driver_applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER driver_applications_updated_at BEFORE UPDATE ON public.driver_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PUBLIC APPLICATION TRACKING (reference + email)
CREATE OR REPLACE FUNCTION public.track_application(_reference TEXT, _email TEXT)
RETURNS TABLE (reference TEXT, kind TEXT, status public.application_status, submitted_at TIMESTAMPTZ, last_update TIMESTAMPTZ)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT l.reference, 'lease'::TEXT, l.status, l.created_at, l.updated_at
  FROM public.lease_applications l
  WHERE upper(l.reference) = upper(trim(_reference)) AND lower(l.owner_email) = lower(trim(_email))
  UNION ALL
  SELECT d.reference, 'driver'::TEXT, d.status, d.created_at, d.updated_at
  FROM public.driver_applications d
  WHERE upper(d.reference) = upper(trim(_reference)) AND lower(d.email) = lower(trim(_email));
$$;
GRANT EXECUTE ON FUNCTION public.track_application(TEXT, TEXT) TO anon, authenticated;

-- STORAGE POLICIES
CREATE POLICY "public can read vehicle photos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'vehicle-photos');
CREATE POLICY "admins upload vehicle photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'vehicle-photos' AND public.is_admin());
CREATE POLICY "admins update vehicle photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'vehicle-photos' AND public.is_admin());
CREATE POLICY "admins delete vehicle photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'vehicle-photos' AND public.is_admin());
CREATE POLICY "anyone uploads application docs" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'application-documents');
CREATE POLICY "admins read application docs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'application-documents' AND public.is_admin());
CREATE POLICY "admins delete application docs" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'application-documents' AND public.is_admin());

-- SEED FLEET
INSERT INTO public.vehicles (slug,name,make,model,year,category,tagline,price_daily,price_weekly,price_monthly,transmission,fuel,engine_capacity,seats,luggage,mileage,location,features,description,rental_terms,images,status,featured,sort_order) VALUES
('obsidian-executive-sedan','Obsidian Executive Sedan','Mercedes-Benz','E-Class',2024,'Luxury','Chauffeur-grade comfort for city work',180,1080,3800,'Automatic','Petrol Hybrid','2.0L Turbo',4,3,'Unlimited','Westlands, Nairobi',ARRAY['Massage rear seats','Acoustic glass','Wireless CarPlay','Chauffeur optional'],'Our flagship saloon pairs a whisper-quiet cabin with rear-seat climate control — the default choice for airport transfers, board meetings and evening events.','Minimum age 25. Valid licence held 3+ years. Refundable security deposit. Fuel returned at same level. Insurance and 24/7 roadside assistance included.',ARRAY['/__l5e/assets-v1/701f9752-9ee8-42c1-a674-31cdef005915/car-sedan.jpg'],'available',true,1),
('alpine-white-suv','Alpine White SUV','Toyota','Land Cruiser Prado',2024,'SUV','Command the road, family in tow',210,1260,4400,'Automatic','Diesel','2.8L',7,5,'Unlimited','Jomo Kenyatta International Airport',ARRAY['Panoramic roof','Third row seating','360° cameras','Roof rails'],'Seven full-size seats, a cavernous boot and all-wheel drive confidence. Equally at home on a school run or a long-haul coastal drive.','Minimum age 25. Refundable security deposit. Cross-border travel by prior arrangement. Insurance and unlimited mileage included.',ARRAY['/__l5e/assets-v1/25941f04-2717-4180-98f7-13ed7946c347/car-suv.jpg'],'available',true,2),
('silver-grand-tourer','Silver Grand Tourer','BMW','i4 Gran Coupé',2025,'Sports','Long distance, short timeline',265,1590,5600,'Automatic','Electric','Dual motor EV',4,2,'Unlimited','Frankfurt am Main',ARRAY['0–100 in 3.9s','Adaptive dampers','450km range','Sport exhaust note'],'A fully electric grand tourer with instant torque and a cabin engineered for silence. Charging is included on rentals of three days or more.','Minimum age 28. Refundable security deposit. Charging included on hires of 3+ days. Track use prohibited.',ARRAY['/__l5e/assets-v1/8e1b9a8f-6c24-4aff-9b5d-f2de60cb3025/car-coupe.jpg'],'reserved',true,3),
('graphite-group-van','Graphite Group Van','Mercedes-Benz','V-Class',2024,'Group','Move the whole party in comfort',240,1440,5000,'Automatic','Diesel','2.0L',8,8,'Unlimited','Westlands, Nairobi',ARRAY['Captain chairs','Onboard Wi-Fi','USB-C at every seat','Sliding doors'],'Built for delegations, film crews and wedding parties. Eight seats, generous luggage space and an optional professional driver.','Driver strongly recommended for groups. Refundable deposit. Airport meet-and-greet included at no extra charge.',ARRAY['/__l5e/assets-v1/5ba74b45-e28f-417d-8eb1-6b0f9ce47022/car-van.jpg'],'rented',false,4),
('expedition-4x4','Expedition 4x4','Toyota','Land Cruiser 79',2023,'Adventure','Where the tarmac ends',195,1170,4100,'Manual','Diesel','4.5L V8',5,4,'Unlimited','Diani, Mombasa',ARRAY['Roof tent ready','Snorkel intake','Recovery kit','Dual battery'],'Safari-prepared and fully kitted for remote travel, with recovery gear, extra fuel capacity and satellite tracking as standard.','Park fees not included. Off-road driving permitted on approved routes. Recovery kit and satellite tracker supplied.',ARRAY['/__l5e/assets-v1/f7438220-88a5-48b5-aeba-53251ee2e109/car-4x4.jpg'],'available',true,5),
('city-compact','City Compact','Volkswagen','Polo',2024,'Economy','Effortless, economical, everywhere',65,390,1500,'Automatic','Petrol','1.0L TSI',4,2,'Unlimited','Munich',ARRAY['4.1L/100km','Parking sensors','Apple CarPlay','Free city parking permit'],'Small footprint, big value. The easiest way to get around town without thinking about fuel, parking or congestion.','Minimum age 21. Refundable deposit. City parking permit included in Germany.',ARRAY['/__l5e/assets-v1/f6a3f513-bed6-49d9-a52e-f4c44825ed0e/car-compact.jpg'],'maintenance',false,6);
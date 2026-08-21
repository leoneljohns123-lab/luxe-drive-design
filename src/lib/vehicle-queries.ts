import { queryOptions } from "@tanstack/react-query";
import { getVehicleBySlug, listVehicles } from "@/lib/vehicles.functions";

export const vehiclesQuery = queryOptions({
  queryKey: ["vehicles"],
  queryFn: () => listVehicles(),
  staleTime: 30_000,
});

export const vehicleQuery = (slug: string) =>
  queryOptions({
    queryKey: ["vehicle", slug],
    queryFn: () => getVehicleBySlug({ data: { slug } }),
    staleTime: 30_000,
  });

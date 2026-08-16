import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/fleet";

export function WhatsAppFab({ message }: { message?: string }) {
  return (
    <a
      href={whatsappLink(message ?? "Hello Aurum Drive, I'd like to enquire about a vehicle hire.")}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Book via WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-200 hover:-translate-y-0.5 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}

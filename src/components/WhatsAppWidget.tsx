import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919989835113";
const DEFAULT_MESSAGE = "Hi Dreambuilderss, I'm interested in your services";

export const WhatsAppWidget = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-white" />
      <span className="hidden sm:inline font-medium">Chat with us</span>
      
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
};

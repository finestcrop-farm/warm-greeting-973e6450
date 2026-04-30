import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactTeaserSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-gradient-primary">Get Started</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you need marketing services or want to learn digital marketing, 
            we're here to help. Reach out today for a free consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href="https://wa.me/919989835113?text=Hi%20Dreambuilderss,%20I'm%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Now
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+919989835113">
                <Phone className="h-5 w-5" />
                Call: +91 9989835113
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">
                <Mail className="h-5 w-5" />
                Contact Form
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

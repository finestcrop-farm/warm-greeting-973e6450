import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Services", path: "/services" },
  { name: "Courses", path: "/courses" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "SEO & Content",
  "Google Ads",
  "Meta Ads",
  "Social Media",
  "Web Development",
  "AI Marketing",
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61559244429532", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/dreambuilderss_officials", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/nagesh-g-959545314", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@dreambuilderss63", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Dreambuilderss" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Digital Marketing Agency & AI-Driven Training Institute. Helping businesses grow and professionals thrive.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  Secunderabad, Hyderabad, Telangana, India
                </span>
              </li>
              <li>
                <a
                  href="tel:+919989835113"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  +91 9989835113
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@dreambuilderss.com"
                  className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  info@dreambuilderss.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Dreambuilderss. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-background/50 hover:text-background text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/50 hover:text-background text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

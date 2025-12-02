import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Location */}
          <div>
            <h6 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </h6>
            <p className="text-muted-foreground">
              Leipziger Platz 15<br />
              10117 Berlin, Germany
            </p>
          </div>

          {/* Contact */}
          <div>
            <h6 className="font-semibold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact
            </h6>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <a href="tel:+493022392323" className="hover:text-primary transition-colors">
                  030-22392323
                </a>
              </p>
              <p>
                <a href="mailto:info@realestateinberlin.com" className="hover:text-primary transition-colors">
                  info@realestateinberlin.com
                </a>
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h6 className="font-semibold mb-4">Legal</h6>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/impressum" className="hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-muted-foreground space-y-2">
          <p>&copy; {new Date().getFullYear()} Real Estate In Berlin. All rights reserved.</p>
          <p className="text-sm">
            Website by{" "}
            <a
              href="https://nestoririondo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Nestor Iriondo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

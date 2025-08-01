import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

// Lucide-style Discord icon
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
  </svg>
);

const ContactLinks = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/gmmsc.ict.club/",
      color: "hover:text-pink-500",
      description: "Follow us for updates",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/club.ict.gmmsc",
      color: "hover:text-blue-500",
      description: "Join our community",
    },
    {
      name: "Discord",
      icon: DiscordIcon,
      href: "mailto:ictgmmscclub@gmail.com",
      color: "hover:text-primary",
      description: "Join our community",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      description: "Computer Science Department, University Campus",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "+1 (555) 123-4567",
    },
    {
      icon: Mail,
      title: "Email Address",
      description: "ictgmmscclub@gmail.com",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Social Links */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Connect With Us
          </CardTitle>
          <CardDescription>
            Follow us on social media or send us a direct message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-4 rounded-lg border border-border/50 bg-muted/30 transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 group ${link.color}`}
              >
                <link.icon className="w-6 h-6 transition-colors duration-300" />
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {link.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Contact Information
          </CardTitle>
          <CardDescription>
            Here's how you can reach us directly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg border border-border/50 bg-muted/30"
              >
                <info.icon className="w-6 h-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {info.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {info.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Office Map Placeholder */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Find Us
          </CardTitle>
          <CardDescription>Visit us at our office location.</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full rounded-lg border border-border/50 overflow-hidden"
          >
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4445627804553!2d90.36531957444015!3d23.767178588133667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0a8e021199f%3A0x603243603e34140a!2sGovt.%20Mohammadpur%20Model%20School%20%26%20College!5e0!3m2!1sen!2sbd!4v1753946465070!5m2!1sen!2sbd"
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-md w-full"
            ></iframe>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactLinks;

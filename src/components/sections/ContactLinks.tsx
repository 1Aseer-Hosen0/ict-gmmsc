import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';

const ContactLinks = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/ictclub',
      color: 'hover:text-pink-500',
      description: 'Follow us for updates',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/ictclub',
      color: 'hover:text-blue-500',
      description: 'Join our community',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:contact@ictclub.com',
      color: 'hover:text-primary',
      description: 'Send us an email',
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      description: 'Computer Science Department, University Campus',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: '+1 (555) 123-4567',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      description: 'Mon - Fri: 9:00 AM - 5:00 PM',
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
          <CardDescription>
            Visit us at our office location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full h-48 bg-muted/50 rounded-lg border border-border/50 flex items-center justify-center"
          >
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Interactive Map Coming Soon</p>
              <p className="text-xs">Computer Science Building, Room 201</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactLinks;
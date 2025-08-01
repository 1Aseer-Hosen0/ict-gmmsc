import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/sections/ContactForm';
import ContactLinks from '@/components/sections/ContactLinks';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/Intro';
import { Contact2, Calendar, Users } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection
      backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
      icon={<Contact2 className="w-14 h-14 text-white" />}
      title="Contact Us"
      description="Get in touch with us. We're here to help and answer any questions you might have."
      primaryButton={{
        text: 'Explore Events',
        icon: <Calendar className="mr-2 h-5 w-5" />,
        href: "/events",
      }}
      secondaryButton={{
        text: 'Join Community',
        icon: <Users className="mr-2 h-5 w-5" />,
        href: "/login",
      }}
      stats={[
        { number: '24/7', label: 'Support' },
        { number: '500+', label: 'Active Members' },
        { number: '4', label: 'Platforms' },
      ]}
      />

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
            
            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactLinks />
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
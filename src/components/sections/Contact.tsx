import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@ictclub.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 5pm',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Tech Building, Room 205',
      description: 'University Campus',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Let's{' '}
            <span className="bg-gradient-to-r from-club-blue to-club-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our club? Want to collaborate on a project? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to Join Our Community?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you're a beginner looking to learn or an expert wanting to share knowledge, 
                we welcome everyone who shares our passion for technology and innovation.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-secondary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-club-blue/20 to-club-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-club-blue" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    <p className="text-club-blue font-medium mb-1">
                      {info.content}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-club-blue/10 to-club-accent/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input 
                        placeholder="Your first name"
                        className="bg-background/50 border-border focus:border-club-blue transition-colors"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input 
                        placeholder="Your last name"
                        className="bg-background/50 border-border focus:border-club-blue transition-colors"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-background/50 border-border focus:border-club-blue transition-colors"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input 
                      placeholder="What's this about?"
                      className="bg-background/50 border-border focus:border-club-blue transition-colors"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..."
                      className="bg-background/50 border-border focus:border-club-blue transition-colors h-32 resize-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-club-blue to-club-accent hover:from-club-accent hover:to-club-blue text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
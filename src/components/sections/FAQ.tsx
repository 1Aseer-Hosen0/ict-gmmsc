import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "How can I join the ICT Club?",
      answer: "To join the ICT Club, you need to fill out our membership form, attend an orientation session, and pay the membership fee of 50 Tk. You can register through our website or visit us during our weekly meetings."
    },
    {
      question: "What activities does the club organize?",
      answer: "We organize programming workshops, tech talks, hackathons, project showcases, coding competitions, and networking events. We also have regular study groups and mentorship programs for members."
    },
    {
      question: "Do I need programming experience to join?",
      answer: "Not at all! We welcome members of all skill levels, from complete beginners to advanced programmers. We have resources and mentors to help you learn and grow at your own pace."
    },
    {
      question: "What are the membership benefits?",
      answer: "Members get access to exclusive workshops, free participation in events, mentorship opportunities, networking with industry professionals, access to our resource library, and priority registration for competitions."
    },
    {
      question: "How often does the club meet?",
      answer: "We have regular weekly meetings every Friday at 4 PM in the Tech Building, Room 205. We also organize special events and workshops throughout the semester based on member interest and availability."
    },
    {
      question: "Can I contribute to club projects?",
      answer: "Absolutely! We encourage all members to participate in our collaborative projects. Whether you're interested in web development, mobile apps, AI, or any other tech field, there's a place for you in our projects."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently{' '}
            <span className="bg-gradient-to-r from-club-blue to-club-accent bg-clip-text text-transparent">
              Asked Questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions about our club? Find answers to the most common questions below!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 bg-club-blue/10 rounded-full">
                <HelpCircle className="h-8 w-8 text-club-blue" />
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem 
                    value={`item-${index}`}
                    className="border border-border/30 rounded-xl px-6 bg-background/30 hover:bg-background/50 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="text-lg font-semibold text-foreground">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 text-center p-6 bg-gradient-to-r from-club-blue/10 to-club-accent/10 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                Feel free to reach out to us directly for any additional information.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-club-blue font-medium">hello@ictclub.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-club-blue font-medium">Tech Building, Room 205</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
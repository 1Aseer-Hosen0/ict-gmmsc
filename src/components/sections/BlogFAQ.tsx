import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Edit3, Users } from "lucide-react";
import { Link } from "react-router-dom";

const BlogFAQ = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Main FAQ */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center justify-center">
                  <Edit3 className="h-5 w-5 mr-2 text-primary" />
                  How to join the club blog authors?
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  To become a blog author for our ICT Club, you need to be an
                  active member of the club. Submit your writing samples and
                  topic proposals to the blog committee. We welcome articles
                  about programming, technology trends, project tutorials, and
                  career advice. Contact our editorial team through the club's
                  official channels to get started.
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-border/50">
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-2 bg-club-blue/10 rounded-full">
                      <Users className="h-6 w-6 text-club-blue" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Join Our Community
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with fellow tech enthusiasts and share your
                    knowledge with the community.
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Edit3 className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground">
                    Share Your Expertise
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Write about your projects, learning experiences, and help
                    others in their tech journey.
                  </p>
                </div>
              </div>

              {/* Contact Button */}
              <div className="text-center pt-6">
                <Link to="/contact">
                  <motion.button
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Editorial Team
                  </motion.button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogFAQ;

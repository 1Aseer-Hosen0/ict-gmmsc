import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ArrowRight } from 'lucide-react';

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: 'Annual Tech Hackathon 2024',
      date: 'March 15-17, 2024',
      participants: '150+ Students',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop',
      description: 'A 48-hour intensive coding competition where students collaborated to build innovative solutions for real-world problems.',
      tags: ['Hackathon', 'Programming', 'Innovation'],
      color: 'from-blue-500 to-purple-600',
    },
    {
      id: 2,
      title: 'AI & Machine Learning Workshop',
      date: 'February 8-10, 2024',
      participants: '80+ Attendees',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop',
      description: 'An intensive workshop covering the fundamentals of AI and ML, featuring hands-on projects and industry expert speakers.',
      tags: ['AI/ML', 'Workshop', 'Education'],
      color: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium mb-4">
            Our Activities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Recent{' '}
            <span className="bg-gradient-to-r from-club-blue to-club-accent bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the exciting events and activities that bring our community together and foster learning.
          </p>
        </motion.div>

        <div className="space-y-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-club-blue/50 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <motion.div 
                      className="relative overflow-hidden h-80 lg:h-auto"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr ${activity.color} opacity-20`} />
                      
                      {/* Floating stats */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex gap-4">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">{activity.date}</span>
                          </div>
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-medium">{activity.participants}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {activity.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                        {activity.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                        {activity.description}
                      </p>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="outline"
                          className="border-club-blue text-club-blue hover:bg-club-blue hover:text-white transition-all duration-300 group"
                        >
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-club-blue to-club-accent hover:from-club-accent hover:to-club-blue text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            View All Events
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;
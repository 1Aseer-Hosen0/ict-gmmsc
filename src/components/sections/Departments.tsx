import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Video, Server, Gamepad2 } from 'lucide-react';

const Departments = () => {
  const departments = [
    {
      icon: Code,
      title: 'Programming',
      description: 'Learn various programming languages and develop cutting-edge applications.',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-500/10 to-purple-600/10',
    },
    {
      icon: Video,
      title: 'Content Creation',
      description: 'Create engaging digital content, videos, and multimedia presentations.',
      gradient: 'from-pink-500 to-red-600',
      bgGradient: 'from-pink-500/10 to-red-600/10',
    },
    {
      icon: Server,
      title: 'IT Infrastructure',
      description: 'Manage networks, servers, and enterprise technology solutions.',
      gradient: 'from-green-500 to-teal-600',
      bgGradient: 'from-green-500/10 to-teal-600/10',
    },
    {
      icon: Gamepad2,
      title: 'Gaming',
      description: 'Explore game development, esports, and interactive entertainment.',
      gradient: 'from-orange-500 to-yellow-600',
      bgGradient: 'from-orange-500/10 to-yellow-600/10',
    },
  ];

  return (
    <section id="departments" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium mb-4">
            Our Departments
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Explore Your{' '}
            <span className="bg-gradient-to-r from-club-blue to-club-accent bg-clip-text text-transparent">
              Passion
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the diverse areas of technology we focus on and find your niche in our vibrant community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-club-blue/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${dept.bgGradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <dept.icon className={`w-10 h-10 text-transparent bg-gradient-to-r ${dept.gradient} bg-clip-text`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-club-blue transition-colors">
                    {dept.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Hover effect overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-club-blue/5 to-club-accent/5 rounded-lg pointer-events-none"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Can't find your area of interest? We're always expanding!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-club-blue text-club-blue hover:bg-club-blue hover:text-white rounded-xl transition-all duration-300 font-medium"
          >
            Suggest a Department
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Departments;
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Github, Mail } from 'lucide-react';

const Committee = () => {
  const members = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'President',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Leading the club with vision and passion for technology.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'alex@ictclub.com'
      }
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Vice President',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Passionate about AI and machine learning applications.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'sarah@ictclub.com'
      }
    },
    {
      id: 3,
      name: 'Michael Davis',
      role: 'Technical Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Full-stack developer with expertise in modern web technologies.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'michael@ictclub.com'
      }
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Events Coordinator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Organizing amazing events that bring our community together.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'emily@ictclub.com'
      }
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Marketing Head',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      bio: 'Creative mind behind our digital presence and content strategy.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'david@ictclub.com'
      }
    },
    {
      id: 6,
      name: 'Lisa Wang',
      role: 'Treasurer',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
      bio: 'Managing club finances and ensuring sustainable growth.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'lisa@ictclub.com'
      }
    },
  ];

  return (
    <section id="committee" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium mb-4">
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Current{' '}
            <span className="bg-gradient-to-r from-club-blue to-club-accent bg-clip-text text-transparent">
              Committee
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated individuals who lead our club and drive innovation in our community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-club-blue/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="relative w-32 h-32 mx-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-club-blue/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Role badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-club-blue to-club-accent text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    >
                      {member.role}
                    </motion.div>
                  </motion.div>

                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-club-blue transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {[
                      { icon: Linkedin, link: member.social.linkedin, color: 'hover:text-blue-600' },
                      { icon: Github, link: member.social.github, color: 'hover:text-gray-800 dark:hover:text-white' },
                      { icon: Mail, link: `mailto:${member.social.email}`, color: 'hover:text-red-600' },
                    ].map((social, socialIndex) => (
                      <motion.a
                        key={socialIndex}
                        href={social.link}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:bg-secondary`}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Committee CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-club-blue/10 to-club-accent/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Interested in Joining Our Committee?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for passionate individuals to help lead our community. Applications open every semester.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-club-blue to-club-accent text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
            >
              Apply Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Committee;
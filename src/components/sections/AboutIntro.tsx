import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

const AboutIntro = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="ICT Club Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-club-primary/80 via-club-primary/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
          >
            About Our{' '}
            <span className="bg-gradient-to-r from-club-accent to-club-blue bg-clip-text text-transparent">
              ICT Club
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 mb-12"
          >
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Empowering the next generation of technology leaders through innovation, collaboration, and continuous learning.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Our mission is to create a vibrant community where students can explore cutting-edge technologies, 
              develop practical skills, and transform ideas into reality. We believe in fostering creativity, 
              building lasting connections, and preparing our members for the future of technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-club-blue to-club-accent hover:from-club-accent hover:to-club-blue text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group min-w-[200px]"
            >
              <Users className="mr-2 h-5 w-5" />
              View Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group min-w-[200px]"
            >
              Join Our Club
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-8 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-gray-300">Active Members</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-gray-300">Events Hosted</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">100+</div>
            <div className="text-sm text-gray-300">Projects Completed</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntro;
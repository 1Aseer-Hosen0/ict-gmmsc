import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

const AboutIntro = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Professional Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="ICT Club Team"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-club-primary/95 via-background/85 to-club-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-6 py-3 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
            >
              <div className="w-2 h-2 bg-club-accent rounded-full mr-3 animate-pulse"></div>
              <span className="text-white/90 font-medium">About ICT Club</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight"
            >
              Shaping Tomorrow's{' '}
              <span className="bg-gradient-to-r from-club-accent via-club-blue to-club-accent bg-clip-text text-transparent">
                Tech Leaders
              </span>
            </motion.h1>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                Empowering the next generation through innovation, collaboration, and continuous learning in technology.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-club-accent to-club-blue mx-auto rounded-full"></div>
              <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
                We create a vibrant ecosystem where passionate students explore cutting-edge technologies, 
                develop industry-ready skills, and transform innovative ideas into impactful reality.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-club-blue to-club-accent hover:from-club-accent hover:to-club-blue text-white px-10 py-6 rounded-2xl shadow-2xl hover:shadow-club-blue/25 transition-all duration-300 group min-w-[220px] font-semibold"
            >
              <Users className="mr-3 h-5 w-5" />
              Explore Events
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/5 border-2 border-white/30 text-white hover:bg-white/15 hover:border-white/50 backdrop-blur-md px-10 py-6 rounded-2xl shadow-2xl transition-all duration-300 group min-w-[220px] font-semibold"
            >
              Join Community
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 p-8"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/70 font-medium">Active Members</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/70 font-medium">Events Hosted</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-white/70 font-medium">Projects Completed</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutIntro;
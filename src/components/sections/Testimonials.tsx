import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Adams',
      role: 'Software Engineer at Google',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      content: 'The ICT Club transformed my career. The hands-on projects and mentorship I received here were invaluable in landing my dream job.',
      rating: 5,
      company: 'Google'
    },
    {
      id: 2,
      name: 'Marcus Thompson',
      role: 'Data Scientist at Microsoft',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'The collaborative environment and cutting-edge workshops prepared me for real-world challenges. Highly recommend joining!',
      rating: 5,
      company: 'Microsoft'
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'UX Designer at Apple',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'Amazing community of like-minded individuals. The club helped me develop both technical skills and leadership qualities.',
      rating: 5,
      company: 'Apple'
    },
    {
      id: 4,
      name: 'Carlos Rodriguez',
      role: 'DevOps Engineer at Amazon',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The networking opportunities and industry connections I made through the club were game-changing for my career.',
      rating: 5,
      company: 'Amazon'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-club-blue/10 text-club-blue rounded-full text-sm font-medium mb-4">
            What Our Alumni Say
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Success{' '}
            <span className="bg-gradient-to-r from-club-blue to-club-accent bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our alumni who have gone on to make remarkable contributions in the tech industry.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center">
                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                      className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-club-blue/20 to-club-accent/20 rounded-full flex items-center justify-center"
                    >
                      <Quote className="w-8 h-8 text-club-blue" />
                    </motion.div>

                    {/* Rating */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-center space-x-1 mb-6"
                    >
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </motion.div>

                    {/* Content */}
                    <motion.blockquote
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl md:text-2xl font-medium text-foreground mb-8 leading-relaxed italic"
                    >
                      "{testimonials[currentIndex].content}"
                    </motion.blockquote>

                    {/* Author */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-center space-x-4"
                    >
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-club-blue/20"
                      />
                      <div className="text-left">
                        <div className="font-bold text-foreground text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-muted-foreground">
                          {testimonials[currentIndex].role}
                        </div>
                        <div className="text-club-blue text-sm font-medium">
                          {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-secondary/50 hover:bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-club-blue' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-secondary/50 hover:bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 text-center"
        >
          {[
            { number: '95%', label: 'Employment Rate' },
            { number: '$85K', label: 'Average Salary' },
            { number: '200+', label: 'Alumni Network' },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-club-blue mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
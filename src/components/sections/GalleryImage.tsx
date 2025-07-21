import { motion } from 'framer-motion';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface GalleryImageProps {
  src: string;
  title: string;
  description: string;
  category: string;
}

const GalleryImage = ({ src, title, description, category }: GalleryImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Events':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'Workshops':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'Others':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted/50 animate-pulse" />
        )}
        
        <motion.img
          src={src}
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            variant="secondary" 
            className={`${getCategoryColor(category)} backdrop-blur-sm border`}
          >
            {category}
          </Badge>
        </div>

        {/* Content Overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 20, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-lg font-semibold mb-2 text-white">
            {title}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/50 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: isHovered ? '0 0 30px rgba(59, 130, 246, 0.3)' : 'none'
          }}
        />
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default GalleryImage;
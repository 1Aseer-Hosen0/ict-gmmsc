import { motion, AnimatePresence } from 'framer-motion';
import GalleryImage from './GalleryImage';
import { useState, useEffect } from 'react';

interface GalleryGridProps {
  activeFilter: string;
}

const GalleryGrid = ({ activeFilter }: GalleryGridProps) => {
  const [filteredImages, setFilteredImages] = useState<any[]>([]);

  // Sample gallery data with categories
  const galleryData = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=800&fit=crop',
      category: 'Events',
      title: 'Tech Conference 2024',
      description: 'Annual technology conference bringing together industry leaders'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop',
      category: 'Workshops',
      title: 'Coding Workshop',
      description: 'Hands-on programming workshop for beginners'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=900&fit=crop',
      category: 'Events',
      title: 'ICT Club Meetup',
      description: 'Monthly meetup with club members and guests'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=600&fit=crop',
      category: 'Workshops',
      title: 'Web Development Bootcamp',
      description: 'Intensive web development training program'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=600&h=700&fit=crop',
      category: 'Others',
      title: 'Club Office Setup',
      description: 'Setting up the new ICT club office space'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=500&fit=crop',
      category: 'Events',
      title: 'Hackathon 2024',
      description: '48-hour coding competition with amazing prizes'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=600&h=800&fit=crop',
      category: 'Workshops',
      title: 'AI & Machine Learning',
      description: 'Introduction to artificial intelligence and ML concepts'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      category: 'Events',
      title: 'Team Building Event',
      description: 'Annual team building and networking event'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=900&fit=crop',
      category: 'Others',
      title: 'Awards Ceremony',
      description: 'Recognizing outstanding contributions to the club'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=600&fit=crop',
      category: 'Workshops',
      title: 'Cybersecurity Training',
      description: 'Essential cybersecurity skills for modern developers'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=700&fit=crop',
      category: 'Events',
      title: 'Innovation Showcase',
      description: 'Presenting innovative projects and ideas'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=500&fit=crop',
      category: 'Others',
      title: 'Study Session',
      description: 'Collaborative learning and exam preparation'
    }
  ];

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(galleryData.filter(image => image.category === activeFilter));
    }
  }, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                className="break-inside-avoid"
              >
                <GalleryImage
                  src={image.src}
                  title={image.title}
                  description={image.description}
                  category={image.category}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4 opacity-50">📷</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No images found
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different filter to view more images.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;
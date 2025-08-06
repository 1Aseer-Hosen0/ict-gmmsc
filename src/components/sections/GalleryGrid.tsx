import { motion, AnimatePresence } from 'framer-motion';
import GalleryImage from './GalleryImage';
import { useState, useEffect } from 'react';
import { useGallery } from '@/hooks/useGallery';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryGridProps {
  activeFilter: string;
}

const GalleryGrid = ({ activeFilter }: GalleryGridProps) => {
  const { galleryItems, loading, error, filterByCategory } = useGallery();
  const [filteredImages, setFilteredImages] = useState<any[]>([]);

  useEffect(() => {
    const filtered = filterByCategory(activeFilter);
    setFilteredImages(filtered);
  }, [activeFilter, galleryItems, filterByCategory]);

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

  // Loading skeleton component
  const GallerySkeleton = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="break-inside-avoid mb-6">
          <Skeleton className={`w-full rounded-2xl ${
            index % 3 === 0 ? 'h-80' : index % 3 === 1 ? 'h-64' : 'h-96'
          }`} />
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4 opacity-50">⚠️</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Error loading gallery
            </h3>
            <p className="text-muted-foreground">
              {error}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {loading ? (
          <GallerySkeleton />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                  className="break-inside-avoid"
                >
                  <GalleryImage
                    src={image.image_url}
                    title={image.caption || 'Untitled'}
                    description={image.caption || 'No description available'}
                    category={image.category}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

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
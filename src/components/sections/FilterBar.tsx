import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const filters = [
    { id: 'All', label: 'All', count: 150 },
    { id: 'Events', label: 'Events', count: 85 },
    { id: 'Workshops', label: 'Workshops', count: 45 },
    { id: 'Others', label: 'Others', count: 20 },
  ];

  return (
    <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Our Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Filter through our diverse collection of images from various events and activities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="flex flex-wrap gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
            {filters.map((filter, index) => (
              <motion.div
                key={filter.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Button
                  variant={activeFilter === filter.id ? "default" : "ghost"}
                  onClick={() => onFilterChange(filter.id)}
                  className={`
                    relative px-6 py-3 rounded-xl transition-all duration-300
                    ${activeFilter === filter.id 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                      : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <span className="relative z-10 font-medium">
                    {filter.label}
                  </span>
                  <span className="ml-2 text-xs opacity-70">
                    {filter.count}
                  </span>
                  
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FilterBar;
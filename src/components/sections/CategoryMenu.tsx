import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CategoryMenuProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { 
    id: "National", 
    label: "National", 
    tooltip: "Our National Events" 
  },
  { 
    id: "Intra", 
    label: "Intra", 
    tooltip: "Our Intra Events" 
  },
  { 
    id: "Workshops", 
    label: "Workshops", 
    tooltip: "Our Workshops" 
  },
  { 
    id: "Others", 
    label: "Others", 
    tooltip: "See Others" 
  }
];

const CategoryMenu = ({ activeCategory, onCategoryChange }: CategoryMenuProps) => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <TooltipProvider>
          <div className="flex justify-center">
            <div className="inline-flex bg-card/50 backdrop-blur-sm rounded-xl p-1 border border-border/50">
              {categories.map((category) => (
                <Tooltip key={category.id}>
                  <TooltipTrigger asChild>
                    <motion.button
                      className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        activeCategory === category.id
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => onCategoryChange(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeCategory === category.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-accent rounded-lg shadow-lg shadow-primary/25"
                          layoutId="activeCategory"
                          initial={false}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 30 
                          }}
                        />
                      )}
                      <span className="relative z-10">{category.label}</span>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{category.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default CategoryMenu;
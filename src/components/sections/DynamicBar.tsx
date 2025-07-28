import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DynamicBarItem {
  id: string;
  label: string;
  count?: number;
  tooltip?: string;
}

interface DynamicBarProps {
  title?: string;
  description?: string;
  items: DynamicBarItem[];
  activeItem: string;
  onItemChange: (id: string) => void;
}

const DynamicBar = ({
  title = "Browse Our Collection",
  description = "Filter through our diverse collection of images from various events and activities",
  items,
  activeItem,
  onItemChange,
}: DynamicBarProps) => {
  return (
    <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-border/50">
      <div className="container mx-auto px-4">
        {/* Title and Description */}
        {(title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Dynamic Bar with Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <TooltipProvider>
            <div className="flex flex-wrap gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeItem === item.id ? "default" : "ghost"}
                        onClick={() => onItemChange(item.id)}
                        className={`
                          relative px-6 py-3 rounded-xl transition-all duration-300
                          ${
                            activeItem === item.id
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                              : "hover:bg-primary/10 text-muted-foreground hover:text-foreground"
                          }
                        `}
                      >
                        <span className="relative z-10 font-medium">
                          {item.label}
                        </span>
                        {item.count !== undefined && (
                          <span className="ml-2 text-xs">
                            {item.count}
                          </span>
                        )}

                        {activeItem === item.id && (
                          <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
                            transition={{ type: "spring", duration: 0.6 }}
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                    {item.tooltip && (
                      <TooltipContent>
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </motion.div>
              ))}
            </div>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicBar;

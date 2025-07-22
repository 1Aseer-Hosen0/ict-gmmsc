import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const tags = [
  "All Posts",
  "React",
  "JavaScript",
  "Python",
  "AI & ML",
  "Web Development",
  "Mobile Apps",
  "Backend",
  "DevOps",
  "Security",
  "Database",
  "Cloud Computing",
  "UI/UX",
  "Programming",
  "Tutorials"
];

const TagsBar = () => {
  const [activeTag, setActiveTag] = useState("All Posts");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-8 px-4 border-b border-border/50">
      <div className="container mx-auto">
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tags.map((tag) => (
            <motion.div key={tag} variants={item}>
              <Badge
                variant={activeTag === tag ? "default" : "secondary"}
                className={`
                  px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-300
                  ${activeTag === tag 
                    ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                    : "bg-card/50 text-muted-foreground hover:bg-primary/20 hover:text-primary hover:scale-105"
                  }
                `}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TagsBar;
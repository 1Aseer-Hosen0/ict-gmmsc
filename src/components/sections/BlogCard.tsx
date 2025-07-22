import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useState } from "react";

interface Blog {
  id: number;
  title: string;
  snippet: string;
  author: string;
  date: string;
  coverImage: string;
  tags: string[];
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-club-blue/20 to-primary/10 animate-pulse" />
              )}
              <img
                src={blog.coverImage}
                alt={blog.title}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-club-blue/20 to-primary/10 flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Image unavailable</div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Tags overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {blog.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-black/70 text-white text-xs backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <CardContent className="p-6 flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {blog.snippet}
          </p>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(blog.date)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
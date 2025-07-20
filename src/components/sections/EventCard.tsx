import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  category: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="relative overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full">
            {event.category}
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="group-hover:text-primary transition-colors duration-300">
          {event.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full group/btn"
          variant="outline"
        >
          <motion.span
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Read More
          </motion.span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
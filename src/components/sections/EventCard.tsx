import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Event {
  id: string
  title: string
  description: string | null
  category: string
  event_date: string
  event_time: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="relative overflow-hidden">
        <motion.img
          src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"}
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
          {event.description?.split('.')[0] + '.' || 'No description available.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.event_date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          {event.event_time && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(`2000-01-01T${event.event_time}`).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          asChild
          className="w-full group/btn"
          variant="outline"
        >
          <Link to={`/events/${event.id}`}>
            <motion.span
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Read More
            </motion.span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
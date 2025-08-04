import { motion, AnimatePresence } from "framer-motion";
import { useEvents } from "@/hooks/useEvents";
import EventCard from "./EventCard";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsGridProps {
  activeCategory: string;
}

const EventsGrid = ({ activeCategory }: EventsGridProps) => {
  const { events, loading, error } = useEvents();
  
  const filteredEvents = events.filter(
    (event) => event.category === activeCategory
  );

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-destructive mb-4">
            <h3 className="text-xl font-semibold mb-2">Error loading events</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-muted-foreground mb-4">
              No events found
            </h3>
            <p className="text-muted-foreground">
              Check back later for upcoming events in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EventsGrid;

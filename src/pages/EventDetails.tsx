import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Users, MapPin } from "lucide-react";
import { useEvent, useOtherEvents } from "@/hooks/useEvents";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EventCard from "@/components/sections/EventCard";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useEvent(id!);
  const { events: otherEvents, loading: loadingOthers } = useOtherEvents(id!, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-64 w-full rounded-lg mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20"
            >
              <h1 className="text-3xl font-bold text-destructive mb-4">
                Event Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The event you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link to="/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <Button variant="ghost" asChild>
            <Link to="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>

        {/* Event Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 mb-12"
        >
          {/* Event Image */}
          <div className="relative rounded-2xl overflow-hidden mb-8 group">
            <img
              src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"}
              alt={event.title}
              className="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-6 right-6">
              <span className="px-4 py-2 bg-primary/90 backdrop-blur-sm text-primary-foreground font-medium rounded-full">
                {event.category}
              </span>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              {event.title}
            </motion.h1>

            {/* Event Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              {event.event_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    {new Date(`2000-01-01T${event.event_time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg max-w-none dark:prose-invert"
            >
              <div className="text-lg leading-relaxed text-foreground/90">
                {event.description?.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Other Events Section */}
        {otherEvents.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-6xl mx-auto px-4"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Other Events</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover more exciting events and opportunities to expand your knowledge and skills.
              </p>
            </div>

            {loadingOthers ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherEvents.map((otherEvent, index) => (
                  <motion.div
                    key={otherEvent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <EventCard event={otherEvent} />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/events">
                  View All Events
                </Link>
              </Button>
            </div>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;

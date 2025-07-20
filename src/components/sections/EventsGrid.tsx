import { motion, AnimatePresence } from "framer-motion";
import EventCard from "./EventCard";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  category: string;
}

interface EventsGridProps {
  activeCategory: string;
}

const eventsData: Event[] = [
  // National Events
  {
    id: "1",
    title: "National Programming Championship",
    description:
      "A nationwide competitive programming contest featuring algorithmic challenges and problem-solving competitions.",
    date: "March 15, 2024",
    time: "10:00 AM",
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    category: "National",
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    description:
      "Join industry leaders and innovators in a day-long summit exploring the future of technology and digital transformation.",
    date: "April 8, 2024",
    time: "9:00 AM",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    category: "National",
  },
  {
    id: "3",
    title: "National Hackathon 2024",
    description:
      "48-hour coding marathon where teams build innovative solutions to real-world problems with mentorship from industry experts.",
    date: "May 20, 2024",
    time: "6:00 PM",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    category: "National",
  },

  // Intra Events
  {
    id: "4",
    title: "Code Debug Challenge",
    description:
      "Test your debugging skills in this fast-paced competition where participants fix buggy code under time pressure.",
    date: "March 25, 2024",
    time: "2:00 PM",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    category: "Intra",
  },
  {
    id: "5",
    title: "ICT Quiz Competition",
    description:
      "Challenge your knowledge of information and communication technology in this exciting quiz competition.",
    date: "April 12, 2024",
    time: "3:00 PM",
    image:
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=400&fit=crop",
    category: "Intra",
  },
  {
    id: "6",
    title: "Project Showcase",
    description:
      "Present your innovative projects to peers and faculty members in this annual showcase event.",
    date: "May 5, 2024",
    time: "11:00 AM",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    category: "Intra",
  },

  // Workshops
  {
    id: "7",
    title: "React Development Workshop",
    description:
      "Learn modern React development with hooks, context, and best practices in this hands-on workshop.",
    date: "March 30, 2024",
    time: "1:00 PM",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    category: "Workshops",
  },
  {
    id: "8",
    title: "Machine Learning Fundamentals",
    description:
      "Introduction to machine learning concepts, algorithms, and practical applications using Python and popular ML libraries.",
    date: "April 18, 2024",
    time: "10:00 AM",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    category: "Workshops",
  },
  {
    id: "9",
    title: "Cybersecurity Essentials",
    description:
      "Learn essential cybersecurity practices, threat detection, and protective measures for digital systems.",
    date: "May 10, 2024",
    time: "2:30 PM",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    category: "Workshops",
  },

  // Others
  {
    id: "10",
    title: "Tech Career Fair",
    description:
      "Connect with leading tech companies and explore career opportunities in the technology industry.",
    date: "April 2, 2024",
    time: "12:00 PM",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    category: "Others",
  },
  {
    id: "11",
    title: "Gaming Tournament",
    description:
      "Compete in various gaming competitions including esports, coding games, and strategy challenges.",
    date: "April 25, 2024",
    time: "4:00 PM",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    category: "Others",
  },
  {
    id: "12",
    title: "Alumni Networking Event",
    description:
      "Network with successful ICT Club alumni and learn about their career journeys and industry insights.",
    date: "May 15, 2024",
    time: "7:00 PM",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&h=400&fit=crop",
    category: "Others",
  },
];

const EventsGrid = ({ activeCategory }: EventsGridProps) => {
  const filteredEvents = eventsData.filter(
    (event) => event.category === activeCategory
  );

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

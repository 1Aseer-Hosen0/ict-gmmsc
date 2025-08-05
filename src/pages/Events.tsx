import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsGrid from "@/components/sections/EventsGrid";
import DynamicBar from "@/components/sections/DynamicBar";
import HeroSection from "@/components/sections/Intro";
import { CalendarCheck, Image, Users } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("National");
  const { events } = useEvents();

  // Calculate dynamic counts for each category
  const categoryItems = useMemo(() => {
    const categoryCounts = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      {
        id: "National",
        label: "National",
        count: categoryCounts["National"] || 0,
        tooltip: "Our National Events",
      },
      {
        id: "Intra",
        label: "Intra",
        count: categoryCounts["Intra"] || 0,
        tooltip: "Our Intra Events",
      },
      {
        id: "Workshop",
        label: "Workshops",
        count: categoryCounts["Workshop"] || 0,
        tooltip: "Our Workshops",
      },
      {
        id: "Others",
        label: "Others",
        count: categoryCounts["Others"] || 0,
        tooltip: "See Other Events",
      },
    ];
  }, [events]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          icon={<CalendarCheck className="w-14 h-14 text-white" />}
          title="Our Events"
          description="Discover our exciting events, workshops, and competitions that shape the future of technology."
          primaryButton={{
            text: "Explore Gallery",
            icon: <Image className="mr-2 h-5 w-5" />,
            href: "/gallery",
          }}
          secondaryButton={{
            text: "Join Community",
            icon: <Users className="mr-2 h-5 w-5" />,
            href: "/login",
          }}
          stats={[
            { number: "16+", label: "Events" },
            { number: "4", label: "Categories" },
            { number: "700+", label: "Participants" },
          ]}
        />


      <main className="pt-20">
        {/* Dynamic Bar */}
        <DynamicBar
          title="Our Events"
          description="Explore our events by category"
          items={categoryItems}
          activeItem={activeCategory}
          onItemChange={setActiveCategory}
        />

        {/* Events Grid */}
        <EventsGrid activeCategory={activeCategory} />
      </main>

      <Footer />
    </div>
  );
};

export default Events;

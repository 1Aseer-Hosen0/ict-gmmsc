import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsGrid from "@/components/sections/EventsGrid";
import DynamicBar from "@/components/sections/DynamicBar";
import HeroSection from "@/components/sections/Intro";
import { CalendarCheck, Image, Users } from "lucide-react";

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("National");

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
          items={[
            {
              id: "National",
              label: "National",
              count: 3,
              tooltip: "Our National Events",
            },
            {
              id: "Intra",
              label: "Intra",
              count: 2,
              tooltip: "Our Intra Events",
            },
            {
              id: "Workshops",
              label: "Workshops",
              count: 6,
              tooltip: "Our Workshops",
            },
            {
              id: "Others",
              label: "Others",
              count: 4,
              tooltip: "See Other Events",
            },
          ]}
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

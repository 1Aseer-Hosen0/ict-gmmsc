import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { useState } from "react";
import DynamicBar from "@/components/sections/DynamicBar";
import HeroSection from "@/components/sections/Intro";
import { Calendar, Image, Users } from "lucide-react";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection
      backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
      icon={<Image className="w-14 h-14 text-white" />}
      title="Our Photos"
      description="Capturing moments, preserving memories. Explore our collection of events, workshops, and achievements."
      primaryButton={{
        text: 'Explore Events',
        icon: <Calendar className="mr-2 h-5 w-5" />,
        href: '/events',
      }}
      secondaryButton={{
        text: 'Join Community',
        icon: <Users className="mr-2 h-5 w-5" />,
        href: "/login",
      }}
      stats={[
        { number: '500+', label: 'Photos' },
        { number: '15+', label: 'Events' },
        { number: '4+', label: 'Years' },
      ]}
      />

      {/* Dynamic Bar */}
      <DynamicBar
        title="Browse Our Collection"
        description="Filter through our diverse collection of images from various events and activities"
        items={[
          { id: "All", label: "All", count: 150, tooltip: "Show all images" },
          {
            id: "Events",
            label: "Events",
            count: 85,
            tooltip: "View event galleries",
          },
          {
            id: "Workshops",
            label: "Workshops",
            count: 45,
            tooltip: "View workshop galleries",
          },
          { id: "Others", label: "Others", count: 20, tooltip: "Other images" },
        ]}
        activeItem={activeFilter}
        onItemChange={setActiveFilter}
      />

      {/* Gallery Grid */}
      <GalleryGrid activeFilter={activeFilter} />

      <Footer />
    </div>
  );
};

export default Gallery;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { useState } from "react";
import DynamicBar from "@/components/sections/DynamicBar";
import HeroSection from "@/components/sections/Intro";
import { Calendar, Image, Users } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { getUniqueCategories, getCategoryCount } = useGallery();
  
  const handleFilterChange = (filter: string) => {
    // If clicking the same filter, reset to "All"
    if (activeFilter === filter && filter !== "All") {
      setActiveFilter("All");
    } else {
      setActiveFilter(filter);
    }
  };

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
          { id: "All", label: "All", count: getCategoryCount("All"), tooltip: "Show all images" },
          ...getUniqueCategories().map(category => ({
            id: category,
            label: category,
            count: getCategoryCount(category),
            tooltip: `View ${category.toLowerCase()} galleries`,
          })),
        ]}
        activeItem={activeFilter}
        onItemChange={handleFilterChange}
      />

      {/* Gallery Grid */}
      <GalleryGrid activeFilter={activeFilter} />

      <Footer />
    </div>
  );
};

export default Gallery;

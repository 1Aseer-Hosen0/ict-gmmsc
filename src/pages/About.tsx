import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/Intro';
import AboutSrt from '@/components/sections/AboutSrt';
import Committee from '@/components/sections/Committee';
import GalleryPreview from '@/components/sections/GalleryPreview';
import PanelBar from '@/components/sections/PanelBar';
import { Calendar, Users } from 'lucide-react';

const About = () => {
  const [activeSession, setActiveSession] = useState("2023-24");

  const sessions = [
    { id: "2023-24", label: "2023-24" },
    { id: "2022-23", label: "2022-23" },
    { id: "2021-22", label: "2021-22" },
    { id: "Others", label: "Others" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
      <HeroSection
      backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
      icon={<Users className="w-14 h-14 text-white" />}
      title="About ICT Club"
      description="Empowering the next generation through innovation, collaboration, and continuous learning in technology."
      primaryButton={{
        text: 'Explore Events',
        icon: <Calendar className="mr-2 h-5 w-5" />,
        href: "/events",
      }}
      secondaryButton={{
        text: 'Join Community',
        icon: <Users className="mr-2 h-5 w-5" />,
        href: "/login",
      }}
      stats={[
        { number: '500+', label: 'Active Members' },
        { number: '15+', label: 'Events Hosted' },
        { number: '10+', label: 'Projects Completed' },
      ]}
      />
      <AboutSrt />
        <PanelBar
        sessions={sessions}
        activeSession={activeSession}
        onSessionChange={setActiveSession}
      />
        <Committee activeSession={activeSession} showHeader={false} />
        <GalleryPreview />
      </main>
      <Footer />
    </div>
  );
};

export default About;
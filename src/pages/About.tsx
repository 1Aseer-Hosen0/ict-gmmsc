import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/Intro';
import Committee from '@/components/sections/Committee';
import GalleryPreview from '@/components/sections/GalleryPreview';
import { Calendar, Users } from 'lucide-react';

const About = () => {
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
        onClick: () => alert('Explore Events Clicked!'),
      }}
      secondaryButton={{
        text: 'Join Community',
        icon: <Users className="mr-2 h-5 w-5" />,
        onClick: () => alert('Join Community Clicked!'),
      }}
      stats={[
        { number: '500+', label: 'Active Members' },
        { number: '15+', label: 'Events Hosted' },
        { number: '10+', label: 'Projects Completed' },
      ]}
      />
        <Committee startIndex={0} limit={6} />
        <GalleryPreview />
      </main>
      <Footer />
    </div>
  );
};

export default About;
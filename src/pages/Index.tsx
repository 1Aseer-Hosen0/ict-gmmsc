import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/Intro';
import About from '@/components/sections/About';
import Departments from '@/components/sections/Departments';
import Activities from '@/components/sections/Activities';
import Committee from '@/components/sections/Committee';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/Footer';
import { Image, Users, Home } from 'lucide-react';
import HomePic from "@/assets/home.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection
      backgroundImage={HomePic}
      icon={<Home className="w-14 h-14 text-white" />}
      title="ICT CLUB"
      description="Empowering minds through technology. Join our community of innovators, creators, and tech enthusiasts."
      primaryButton={{
        text: 'Explore Gallery',
        icon: <Image className="mr-2 h-5 w-5" />,
        href: "/gallery",
      }}
      secondaryButton={{
        text: 'Join ICT Club',
        icon: <Users className="mr-2 h-5 w-5" />,
        href: "/login",
      }}
      stats={[
        { number: '500+', label: 'Active Members' },
        { number: '15+', label: 'Events Hosted' },
        { number: '10+', label: 'Projects Completed' },
      ]}
      />
      <About />
      <Departments />
      <Activities />
      <Committee startIndex={0} limit={3} />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;

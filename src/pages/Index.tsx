import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Departments from '@/components/sections/Departments';
import Activities from '@/components/sections/Activities';
import Committee from '@/components/sections/Committee';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Departments />
      <Activities />
      <Committee />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;

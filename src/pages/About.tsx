import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutIntro from '@/components/sections/AboutIntro';
import Committee from '@/components/sections/Committee';
import GalleryPreview from '@/components/sections/GalleryPreview';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <AboutIntro />
        <Committee />
        <GalleryPreview />
      </main>
      <Footer />
    </div>
  );
};

export default About;
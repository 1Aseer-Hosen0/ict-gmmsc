import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForms from "@/components/sections/AuthForms";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-club-dark to-club-darker relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-club-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-club-accent/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Welcome
              </h1>
              <p className="text-muted-foreground text-lg">
                Join the ICT Club community or sign in to your account
              </p>
            </div>
            
            <AuthForms />
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
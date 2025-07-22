import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForms from "@/components/sections/AuthForms";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-club-dark to-club-darker relative overflow-hidden">
      {/* Luxurious Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-club-blue/5 via-transparent to-primary/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-club-accent/5 to-transparent"></div>
        
        {/* Large atmospheric particles */}
        <div className="absolute -top-60 -left-60 w-96 h-96 bg-gradient-to-br from-club-blue/30 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-gradient-to-bl from-club-accent/40 to-club-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/4 w-88 h-88 bg-gradient-to-tr from-primary/30 to-club-accent/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Medium floating particles */}
        <div className="absolute top-20 left-1/3 w-32 h-32 bg-club-blue/25 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-primary/30 rounded-full blur-xl animate-pulse delay-3000"></div>
        <div className="absolute top-2/3 left-20 w-20 h-20 bg-club-accent/35 rounded-full blur-xl animate-bounce delay-1500"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-gradient-to-br from-club-blue/20 to-transparent rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-1/4 left-10 w-12 h-12 bg-gradient-to-tr from-primary/25 to-transparent rotate-12 animate-spin" style={{animationDuration: '15s'}}></div>
        
        {/* Floating dots */}
        <div className="absolute top-1/5 left-1/5 w-3 h-3 bg-club-blue/50 rounded-full animate-ping"></div>
        <div className="absolute top-3/5 right-1/5 w-2 h-2 bg-primary/60 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-1/5 left-2/3 w-4 h-4 bg-club-accent/40 rounded-full animate-ping delay-4000"></div>
        
        {/* Radial gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-club-darker/50"></div>
        <div className="absolute inset-0 bg-gradient-conic from-transparent via-club-blue/5 to-transparent"></div>
        
        {/* Premium glow effects */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-48 h-1 bg-gradient-to-r from-transparent via-club-accent/25 to-transparent blur-sm rotate-45"></div>
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
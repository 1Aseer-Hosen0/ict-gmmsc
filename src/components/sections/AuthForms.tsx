import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Lock, User, Phone, Hash, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  class?: string;
  section?: string;
  id?: string;
  phone?: string;
  facebook?: string;
}

interface FormErrors {
  [key: string]: string;
}

const AuthForms = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    class: "",
    section: "",
    id: "",
    phone: "",
    facebook: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (isLogin: boolean) => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!isLogin) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.class) newErrors.class = "Class is required";
      if (!formData.section) newErrors.section = "Section is required";
      if (!formData.id) newErrors.id = "ID is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.facebook) newErrors.facebook = "Facebook ID link is required";
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Real-time password confirmation validation
    if (field === "confirmPassword" || (field === "password" && formData.confirmPassword)) {
      const password = field === "password" ? value : formData.password;
      const confirmPassword = field === "confirmPassword" ? value : formData.confirmPassword;
      
      if (confirmPassword && password !== confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (isLogin: boolean) => {
    if (!validateForm(isLogin)) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: isLogin ? "Login Successful" : "Registration Successful",
        description: isLogin 
          ? "Welcome back to ICT Club!" 
          : "Welcome to ICT Club! Please proceed with payment.",
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="w-full bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="login" className="data-[state=active]:bg-primary/20">
            Login
          </TabsTrigger>
          <TabsTrigger value="join" className="data-[state=active]:bg-primary/20">
            Join
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="login" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                  Sign in to your ICT Club account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.password && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* CAPTCHA Placeholder */}
                <div className="bg-muted/30 border border-border rounded-md p-4 text-center">
                  <div className="text-sm text-muted-foreground">CAPTCHA Verification</div>
                  <div className="text-xs text-muted-foreground mt-1">[Google reCAPTCHA will be here]</div>
                </div>

                <Button 
                  onClick={() => handleSubmit(true)}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? "Signing In..." : "Login"}
                </Button>
              </CardContent>
            </motion.div>
          </TabsContent>

          <TabsContent value="join" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-center">Join ICT Club</CardTitle>
                <CardDescription className="text-center">
                  Create your account and become a member
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`pl-10 ${errors.fullName ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.fullName && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.fullName}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="class"
                        placeholder="12"
                        value={formData.class}
                        onChange={(e) => handleInputChange("class", e.target.value)}
                        className={`pl-10 ${errors.class ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.class && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.class}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      placeholder="A"
                      value={formData.section}
                      onChange={(e) => handleInputChange("section", e.target.value)}
                      className={errors.section ? "border-destructive" : ""}
                    />
                    {errors.section && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.section}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id">ID</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="id"
                        placeholder="123456"
                        value={formData.id}
                        onChange={(e) => handleInputChange("id", e.target.value)}
                        className={`pl-10 ${errors.id ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.id && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.id}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="join-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="join-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="phone"
                      placeholder="+880 1234 567890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.phone && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.phone}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook ID Link</Label>
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/yourprofile"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange("facebook", e.target.value)}
                    className={errors.facebook ? "border-destructive" : ""}
                  />
                  {errors.facebook && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.facebook}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="join-password"
                        type="password"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.password && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.password}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.confirmPassword}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                {/* Payment Notice */}
                <Alert className="bg-primary/10 border-primary/20">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">
                    <strong>Important:</strong> Make sure you pay 50 Tk before joining the club, otherwise you will be kicked.
                  </AlertDescription>
                </Alert>

                {/* CAPTCHA Placeholder */}
                <div className="bg-muted/30 border border-border rounded-md p-4 text-center">
                  <div className="text-sm text-muted-foreground">CAPTCHA Verification</div>
                  <div className="text-xs text-muted-foreground mt-1">[Google reCAPTCHA will be here]</div>
                </div>

                <Button 
                  onClick={() => handleSubmit(false)}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </CardContent>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </Card>
  );
};

export default AuthForms;
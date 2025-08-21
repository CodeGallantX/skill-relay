import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Upload, 
  DollarSign, 
  Star, 
  Users, 
  TrendingUp,
  Check,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import VideoPlayerModal from '@/components/common/VideoPlayerModal';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'testimonials', 'pricing'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const NavLink = ({ href, children, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        activeSection === href
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <title>Skill Relay - Master Skills in Minutes</title>
      <meta name="description" content="Discover bite-sized video lessons from experts, create your own content, and monetize your knowledge on the world's fastest-growing skill-sharing platform." />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">SR</span>
              </div>
              <span className="font-bold text-xl gradient-text">SkillRelay</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink href="home" onClick={() => scrollToSection('home')}>
                Home
              </NavLink>
              <NavLink href="features" onClick={() => scrollToSection('features')}>
                Features
              </NavLink>
              <NavLink href="testimonials" onClick={() => scrollToSection('testimonials')}>
                Testimonials
              </NavLink>
              <NavLink href="pricing" onClick={() => scrollToSection('pricing')}>
                Pricing
              </NavLink>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="shadow-glow">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col space-y-2">
                <NavLink href="home" onClick={() => scrollToSection('home')}>
                  Home
                </NavLink>
                <NavLink href="features" onClick={() => scrollToSection('features')}>
                  Features
                </NavLink>
                <NavLink href="testimonials" onClick={() => scrollToSection('testimonials')}>
                  Testimonials
                </NavLink>
                <NavLink href="pricing" onClick={() => scrollToSection('pricing')}>
                  Pricing
                </NavLink>
                <div className="pt-4 flex flex-col space-y-2">
                  <Button variant="ghost" asChild>
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🚀 Now in Beta - Join Early Access
            </Badge>
            
            <h1 className="mb-6 gradient-text">
              Master Skills in Minutes, Not Hours
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover bite-sized video lessons from experts, create your own content, 
              and monetize your knowledge on the world's fastest-growing skill-sharing platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="shadow-glow text-lg px-8 py-6">
                <Link to="/signup">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => setIsDemoModalOpen(true)}>
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Expert Creators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Skill Videos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're learning new skills or sharing your expertise, 
              we've got the tools to help you thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="group hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Learn Anything</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Access thousands of bite-sized video lessons covering everything from 
                  coding to cooking, designed for busy professionals.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Share Your Expertise</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Create and upload your own skill videos with our intuitive tools. 
                  Build your audience and establish yourself as an expert.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Monetize Your Skills</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Turn your passion into profit with flexible monetization options. 
                  Earn from subscriptions, one-time purchases, or tips.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="mb-4">Loved by Creators & Learners</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who are already transforming their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <Card className="hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sarah Chen</CardTitle>
                    <CardDescription>UX Designer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "SkillRelay helped me learn React in just 2 weeks. The bite-sized format 
                  was perfect for my busy schedule. Now I'm earning $2k/month sharing my design skills!"
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <CardTitle className="text-lg">Marcus Johnson</CardTitle>
                    <CardDescription>Marketing Expert</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "The platform is incredibly intuitive. I've built a following of 10K+ learners 
                  and it's become my primary income source. The community is amazing!"
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <CardTitle className="text-lg">Aisha Patel</CardTitle>
                    <CardDescription>Data Scientist</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "As someone who learns better with short videos, this platform is perfect. 
                  I've mastered Python, SQL, and machine learning fundamentals here."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your learning journey. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold mb-2">$0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Access to 100+ free lessons</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Basic video quality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Community access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Mobile app access</span>
                  </div>
                </div>
                <Button className="w-full mt-8" variant="outline" asChild>
                  <Link to="/signup">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="hover:shadow-glow transition-all duration-300 animate-scale-in border-2 border-primary shadow-glow relative" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-yellow-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold mb-2">$19</div>
                <CardDescription>For serious learners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Unlimited access to all lessons</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>HD video quality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Offline downloads</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Create up to 10 lessons/month</span>
                  </div>
                </div>
                <Button className="w-full mt-8 shadow-glow" asChild>
                  <Link to="/signup">Start Pro Trial</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Creator Plan */}
            <Card className="hover:shadow-glow transition-all duration-300 animate-scale-in border-0 shadow-lg" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Creator</CardTitle>
                <div className="text-4xl font-bold mb-2">$49</div>
                <CardDescription>For professional creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Everything in Pro</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Unlimited lesson creation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Custom branding</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Revenue sharing program</span>
                  </div>
                </div>
                <Button className="w-full mt-8" variant="outline" asChild>
                  <Link to="/signup">Start Creating</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="mb-6 text-white">Ready to Transform Your Skills?</h2>
            <p className="text-xl mb-8 text-purple-100 leading-relaxed">
              Join thousands of learners and creators who are already building their future. 
              Start your journey today with our free plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-glow-yellow" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-purple-700">
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">SR</span>
                </div>
                <span className="font-bold text-xl gradient-text">SkillRelay</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                The fastest way to learn and share skills through bite-sized video lessons.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Mobile App</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">API</Link>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2">
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Community</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                <Link to="#" className="block text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SkillRelay. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Users className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <TrendingUp className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {isDemoModalOpen && (
        <VideoPlayerModal 
          videoUrl="https://www.w3schools.com/html/mov_bbb.mp4" 
          onClose={() => setIsDemoModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default LandingPage;
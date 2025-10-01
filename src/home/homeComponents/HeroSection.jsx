"use client"
import { useState, useEffect } from "react"
import {
  MapPin,
  Navigation,
  Satellite,
  Radio,
  Gauge,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Play,
  Zap,
  Shield,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

const heroSlides = [
  {
    id: 1,
    title: "Advanced GPS Controller for Precision Navigation",
    subtitle: "Real-Time GPS Tracking & Control System",
    description:
      "Experience industry-leading GPS controller technology with millimeter-accurate positioning. Our high-precision GPS navigation controller supports multi-constellation GNSS tracking including GPS, GLONASS, Galileo, and BeiDou for reliable real-time location monitoring and route optimization.",
    features: [
      "High-Precision GPS Positioning System",
      "Multi-GNSS Satellite Navigation Support",
      "Real-Time Location Tracking & Monitoring",
      "Advanced Route Optimization Algorithm"
    ],
    icon: MapPin,
    gradient: "from-blue-600 via-indigo-600 to-purple-800",
    accentColor: "#3b82f6",
  },
  {
    id: 2,
    title: "Smart GPS Controller with IoT Integration",
    subtitle: "Connected GPS Fleet Management Solution",
    description:
      "Transform your fleet operations with our intelligent GPS controller featuring IoT connectivity. Monitor vehicle location, speed, fuel consumption, and driver behavior in real-time. Perfect for logistics, transportation, and fleet management with cloud-based GPS tracking dashboard.",
    features: [
      "IoT-Enabled GPS Tracking Controller",
      "Real-Time Fleet Monitoring Dashboard",
      "Geofencing & Zone Alert System",
      "Fuel Efficiency & Route Analytics"
    ],
    icon: Navigation,
    gradient: "from-emerald-600 via-teal-600 to-cyan-800",
    accentColor: "#10b981",
  },
  {
    id: 3,
    title: "Industrial GPS Controller for Heavy Equipment",
    subtitle: "Rugged GPS Navigation & Asset Tracking",
    description:
      "Built for extreme conditions, our industrial-grade GPS controller withstands harsh environments while delivering precise positioning for construction equipment, mining vehicles, and agricultural machinery. Features include shock resistance, waterproof design, and extended temperature range operation.",
    features: [
      "Military-Grade GPS Controller Module",
      "IP67 Waterproof & Dustproof Design",
      "Wide Temperature Range (-40°C to 85°C)",
      "Heavy-Duty Vehicle GPS Tracking"
    ],
    icon: Satellite,
    gradient: "from-orange-600 via-red-600 to-pink-800",
    accentColor: "#f97316",
  },
  {
    id: 4,
    title: "Wireless GPS Controller with Remote Access",
    subtitle: "4G/5G Connected GPS Tracking Device",
    description:
      "Stay connected anywhere with our wireless GPS controller featuring 4G LTE and 5G connectivity. Control and monitor your assets remotely through mobile app or web portal. Ideal for vehicle tracking, asset management, personal safety, and logistics automation with instant location updates.",
    features: [
      "4G/5G Wireless GPS Controller",
      "Cloud-Based Remote Monitoring",
      "Mobile App & Web Dashboard Access",
      "Instant Location & Alert Notifications"
    ],
    icon: Radio,
    gradient: "from-violet-600 via-purple-600 to-indigo-800",
    accentColor: "#8b5cf6",
  },
];

const FloatingElement = ({ delay = 0, children, className = "" }) => (
  <div
    className={`animate-float ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: "6s",
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
    }}
  >
    {children}
  </div>
)

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(null)

  const nextSlide = () => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setDirection(index > currentSlide ? "right" : "left")
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 800)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000)
    return () => clearInterval(timer)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-7px) rotate(-1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px currentColor; opacity: 0.6; }
          50% { box-shadow: 0 0 30px currentColor; opacity: 1; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out-left {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100px); opacity: 0; }
        }
        @keyframes slide-out-right {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100px); opacity: 0; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
        .slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .slide-out-left { animation: slide-out-left 0.8s ease-out forwards; }
        .slide-out-right { animation: slide-out-right 0.8s ease-out forwards; }
        .animate-orbit { animation: orbit 20s linear infinite; }
        
        @media (max-width: 640px) {
          .hero-content { padding: 1rem; }
          .hero-title { font-size: 2rem; line-height: 1.2; }
          .hero-description { font-size: 0.9rem; line-height: 1.5; }
        }
      `}</style>
      
      <section className="relative w-full overflow-hidden min-h-[100vh] sm:min-h-[90vh] lg:min-h-[85vh] flex items-center">
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentHero.gradient} animate-gradient`} />
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Content Column */}
            <div className="lg:col-span-8 xl:col-span-7">
              <div
                className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-800 ease-out hero-content ${
                  isAnimating ? (direction === "right" ? "slide-out-left" : "slide-out-right") : direction === "right" ? "slide-in-right" : "slide-in-left"
                }`}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-gray-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg border border-white/20 animate-pulse-glow">
                  <currentHero.icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: currentHero.accentColor }} />
                  <span className="truncate">{currentHero.subtitle}</span>
                  <div className="hidden sm:flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight hero-title drop-shadow-lg">
                  {currentHero.title}
                </h1>
                
                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-light hero-description max-w-3xl drop-shadow">
                  {currentHero.description}
                </p>
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
                  {currentHero.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: currentHero.accentColor }} />
                      <span className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 text-center border border-white/30">
                    <div className="text-xl sm:text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-white/80">Accuracy</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 text-center border border-white/30">
                    <div className="text-xl sm:text-2xl font-bold text-white">&lt;1s</div>
                    <div className="text-xs text-white/80">Response</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 text-center border border-white/30">
                    <div className="text-xl sm:text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-white/80">Monitoring</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <Button
                    className="group relative overflow-hidden bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get GPS Controller
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="group border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" />
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative 3D Elements */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-5 relative h-96">
              {/* Central GPS Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-32 h-32 bg-white/20 backdrop-blur-md rounded-3xl border-2 border-white/40 flex items-center justify-center shadow-2xl animate-pulse">
                  <MapPin className="w-16 h-16 text-white" />
                </div>
              </div>
              
              {/* Orbiting Satellites */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FloatingElement delay={0} className="animate-orbit">
                  <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center shadow-lg">
                    <Satellite className="w-8 h-8 text-white" />
                  </div>
                </FloatingElement>
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '5s' }}>
                <FloatingElement delay={1} className="animate-orbit">
                  <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center shadow-lg">
                    <Navigation className="w-7 h-7 text-white" />
                  </div>
                </FloatingElement>
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '10s' }}>
                <FloatingElement delay={2} className="animate-orbit">
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-lg border border-white/30 flex items-center justify-center shadow-lg">
                    <Radio className="w-6 h-6 text-white" />
                  </div>
                </FloatingElement>
              </div>
              
              {/* Static Floating Elements */}
              <FloatingElement delay={0} className="absolute top-10 right-10">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center shadow-xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </FloatingElement>
              
              <FloatingElement delay={1.5} className="absolute bottom-20 left-5">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center shadow-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </FloatingElement>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-white' 
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75'
              } disabled:opacity-50`}
            />
          ))}
        </div>
        
        {/* Mobile Navigation */}
        <div className="block sm:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white active:scale-95 transition-all duration-200 disabled:opacity-50 border border-white/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white active:scale-95 transition-all duration-200 disabled:opacity-50 border border-white/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-10 sm:py-14 lg:py-20 text-center px-4">
        {/* Badge */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            ✨ Industry-Leading GPS Technology
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-4xl mx-auto leading-snug">
          Professional <span className="text-blue-600">GPS Controller System</span> for{" "}
          <span className="text-green-600">Real-Time Tracking</span>
        </h2>

        {/* Description */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our advanced <strong className="text-gray-900">GPS controller technology</strong> delivers 
          precision <strong className="text-gray-900">real-time GPS tracking</strong> and navigation solutions. 
          From fleet management to personal tracking, our{" "}
          <strong className="text-gray-900">GPS navigation controller</strong> provides industry-leading 
          accuracy, reliability, and seamless integration for all your location-based needs.
        </p>

        {/* Trust Indicators */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">10M+</div>
            <div className="text-sm text-gray-600">Devices Tracked</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Gauge className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">99.9%</div>
            <div className="text-sm text-gray-600">Uptime SLA</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">&lt;1s</div>
            <div className="text-sm text-gray-600">Update Rate</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">ISO</div>
            <div className="text-sm text-gray-600">Certified</div>
          </div>
        </div>
      </section>
    </>
  )
}
"use client"
import { useState, useEffect } from "react"
import {
  Shield,
  Users,
  FileCheck,
  Search,
  Heart,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import HeroBg2 from "../../assets/facematch.png"
import HeroBg3 from "../../assets/adharcard.png"
import HeroBg4 from "../../assets/faceverification.png"
import HeroBg5 from "../../assets/scan.png"

const heroSlides = [
  {
    id: 1,
    title: "Instant Online KYC & Document Verification",
    subtitle: "AI-Powered Identity Verification Service",
    description:
      "Stop worrying about fake IDs and forged papers. Our AI-powered eKYC verification system quickly validates Aadhaar, PAN, passports, and more — giving you instant results. Keep your business safe while ensuring smooth digital onboarding.",
    features: [
      "Instant Aadhaar eKYC Verification",
      "PAN Card Authenticity & KYC Check",
      "Passport & Visa Online Verification",
      "Driving License & RC Identity Validation"
    ],
    icon: FileCheck,
    gradient: "from-emerald-600 via-teal-600 to-cyan-800",
    accentColor: "#22c55e",
    bgImage: HeroBg2,
  },
  {
    id: 2,
    title: "Smarter Biometric & Face KYC Verification",
    subtitle: "AI-Driven Liveness & Identity Check",
    description:
      "Fraudsters can fake photos and videos, but they can't fake life. Our biometric identity verification and real-time liveness detection confirm genuine presence, blocking spoof attacks and ensuring secure online KYC verification.",
    features: [
      "AI Powered Face Matching & ID Check",
      "Real-Time Liveness Detection for eKYC",
      "Identity Match & Verification Score",
      "Frictionless Biometric KYC Onboarding"
    ],
    icon: Search,
    gradient: "from-orange-600 via-red-600 to-pink-800",
    accentColor: "#f97316",
    bgImage: HeroBg3,
  },
  {
    id: 3,
    title: "Business & Partner KYC Verification Made Easy",
    subtitle: "Corporate Identity & Compliance Checks",
    description:
      "Choose the right partners by verifying business credentials instantly. From GSTIN and CIN checks to MSME and FSSAI validation, our corporate KYC verification services help you build trust and prevent fraud.",
    features: [
      "Instant GSTIN Business Verification",
      "Company Registration (CIN) Online Check",
      "MSME & FSSAI Certificate Validation",
      "Director Identity & Digital KYC Verification"
    ],
    icon: Shield,
    gradient: "from-violet-600 via-purple-600 to-indigo-800",
    accentColor: "#8b5cf6",
    bgImage: HeroBg4,
  },
  {
    id: 4,
    title: "Trusted Identity & KYC Verification Platform",
    subtitle: "Simple, Secure & Fast Online Verification",
    description:
      "Whether for individuals or businesses, verifying identities has never been easier. Our online identity verification service ensures speed, accuracy, and compliance — helping you stay fraud-free while delivering seamless onboarding.",
    features: [
      "Accurate Online ID Verification Checks",
      "Instant Fraud & Risk Detection",
      "Seamless Digital KYC Onboarding",
      "Trusted Identity Verification for Businesses"
    ],
    icon: Heart,
    gradient: "from-rose-600 via-pink-600 to-red-800",
    accentColor: "#ef4444",
    bgImage: HeroBg5,
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
  const navigate = useNavigate()

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
          0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); }
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
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
        .slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .slide-out-left { animation: slide-out-left 0.8s ease-out forwards; }
        .slide-out-right { animation: slide-out-right 0.8s ease-out forwards; }
        
        .bg-transition {
          transition: background-image 1s ease-in-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .hero-content {
            padding: 1rem;
          }
          .hero-title {
            font-size: 2rem;
            line-height: 1.2;
          }
          .hero-description {
            font-size: 0.9rem;
            line-height: 1.5;
          }
        }
      `}</style>
      
      <section className="relative w-full overflow-hidden min-h-[100vh] sm:min-h-[90vh] lg:min-h-[80vh] flex items-center bg-gray-50 text-gray-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-transition"
          style={{ backgroundImage: `url(${currentHero.bgImage})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
        
        {/* Navigation Arrows - Hidden on mobile */}
        {/* <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="hidden lg:flex absolute left-4 xl:left-8 z-20 items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button> */}
        
        {/* <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="hidden lg:flex absolute right-4 xl:right-8 z-20 items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button> */}
        
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
               <h2 className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-gray-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg border border-gray-200 animate-pulse-glow">
  <currentHero.icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: currentHero.accentColor }} />
  <span className="truncate">{currentHero.subtitle}</span>
  <div className="hidden sm:flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
    ))}
  </div>
</h2>

                
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight hero-title">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    {currentHero.title}
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-light hero-description max-w-3xl">
                  {currentHero.description}
                </p>
                
                {/* Features Grid - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
                  {currentHero.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action Buttons - Fully Responsive */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <Button
                    className="group relative overflow-hidden text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    style={{ backgroundColor: currentHero.accentColor }}
                    onClick={() => navigate("/pricing")}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Pricing
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="group border-2 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-xl bg-white/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    style={{ borderColor: currentHero.accentColor }}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" />
Start KYC Verification
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements - Hidden on small screens */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-5">
              <div className="relative">
                <FloatingElement delay={0} className="absolute -top-10 -left-10">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </FloatingElement>
                
                <FloatingElement delay={1} className="absolute -top-5 -right-5">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
                    <FileCheck className="w-8 h-8 text-white" />
                  </div>
                </FloatingElement>
                
                <FloatingElement delay={2} className="absolute -bottom-10 left-5">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                </FloatingElement>
              </div>
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
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              } disabled:opacity-50`}
            />
          ))}
        </div>
        
        {/* Mobile Navigation Dots */}
        <div className="block sm:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex gap-4">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
   <section className="relative bg-gradient-to-b from-white to-gray-50 py-10 sm:py-14 lg:py-20 text-center">
  {/* Badge */}
  <div className="mb-4 sm:mb-6">
    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100">
      ✨ Trusted Partnerships
    </span>
  </div>

  {/* Heading */}
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 max-w-4xl mx-auto leading-snug">
    Trusted <span className="text-blue-600">Identity Verification Solution</span> for{" "}
    <span className="text-green-600">100+ Businesses</span>
  </h2>

  {/* Description */}
  <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
    VerifyEKYC provides fast, secure and AI-powered{" "}
    <strong className="text-gray-900">online KYC verification</strong> and{" "}
    <strong className="text-gray-900">identity verification services</strong>. 
    From Aadhaar and PAN checks to biometric face verification, our{" "}
    <strong className="text-gray-900">eKYC platform</strong> helps businesses stay 
    compliant, prevent fraud and onboard customers in minutes.
  </p>
</section>


    </>
  )
}
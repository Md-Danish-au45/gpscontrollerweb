"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, Navigation, Satellite, ArrowRight, Award, Shield, Users, TrendingUp, CheckCircle, Star, Zap, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const trustFeatures = [
  {
    icon: Clock,
    title: "REAL-TIME",
    subtitle: "Instant Updates",
    description: "GPS location updates every 1 second with 99.9% network uptime",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    stat: "<1s",
    statLabel: "Update Speed",
  },
  {
    icon: Satellite,
    title: "ACCURACY",
    subtitle: "Precision Tracking",
    description: "Multi-GNSS satellite support for centimeter-level positioning accuracy",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    stat: "99.9%",
    statLabel: "GPS Accuracy",
  },
  {
    icon: Shield,
    title: "SECURITY",
    subtitle: "Data Protected",
    description: "Bank-grade encryption with ISO 27001 certified infrastructure",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    stat: "256-bit",
    statLabel: "Encryption",
  },
]

const companyLogos = [
  { name: "Garmin", logo: "Garmin", category: "GPS Leader" },
  { name: "TomTom", logo: "TomTom", category: "Navigation" },
  { name: "Trimble", logo: "Trimble", category: "Precision GPS" },
  { name: "u-blox", logo: "u-blox", category: "GPS Chips" },
  { name: "HERE", logo: "HERE", category: "Mapping" },
  { name: "Qualcomm", logo: "Qualcomm", category: "5G Technology" },
]

const certifications = [
  { name: "ISO 27001", description: "Information Security Standard" },
  { name: "5G Ready", description: "Next-Gen Connectivity" },
  { name: "CE Certified", description: "European Compliance" },
  { name: "IP67 Rated", description: "Waterproof & Dustproof" },
]

const CountUpAnimation = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState("0")

  useEffect(() => {
    if (!isVisible) return

    if (end.includes("%")) {
      const numericEnd = Number.parseFloat(end.replace("%", ""))
      let start = 0
      const increment = numericEnd / (duration / 50)

      const timer = setInterval(() => {
        start += increment
        if (start >= numericEnd) {
          setCount(`${numericEnd}%`)
          clearInterval(timer)
        } else {
          setCount(`${start.toFixed(1)}%`)
        }
      }, 50)

      return () => clearInterval(timer)
    } else if (end.includes("s") || end.includes("-bit")) {
      setTimeout(() => setCount(end), duration / 2)
    } else {
      setCount(end)
    }
  }, [end, duration, isVisible])

  return <span>{count}</span>
}

const TrustFeatureCard = ({ feature, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`
        group relative overflow-hidden border-2 ${feature.borderColor}
        bg-white hover:shadow-2xl transition-all duration-500 ease-out
        transform hover:-translate-y-2
        ${isVisible ? "animate-in slide-in-from-bottom-4 fade-in" : "opacity-0"}
      `}
      style={{
        animationDelay: `${index * 200}ms`,
        animationDuration: "600ms",
        animationFillMode: "forwards",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 text-center relative z-10">
        {/* Background Gradient */}
        <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />

        {/* Icon */}
        <div className={`relative mb-4 mx-auto w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
          <feature.icon className={`w-8 h-8 ${feature.color}`} />
          <div className="absolute -top-1 -right-1">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-3">
          <div className={`text-2xl font-bold ${feature.color} mb-1`}>
            <CountUpAnimation end={feature.stat} isVisible={isVisible} />
          </div>
          <div className="text-xs text-gray-500 font-medium">{feature.statLabel}</div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
          <p className={`text-sm font-medium ${feature.color}`}>{feature.subtitle}</p>
        </div>

        {/* Hover Effect Bar */}
        <div className={`absolute bottom-0 left-0 w-full h-1 ${feature.color.replace("text-", "bg-")} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      </CardContent>
    </Card>
  )
}

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredLogo, setHoveredLogo] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Satellite Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated GPS Signal Rings */}
      <div className="absolute top-20 left-20 w-64 h-64 opacity-10">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-8 border-4 border-purple-500 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute inset-16 border-4 border-green-500 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className={`space-y-10 ${isVisible ? "animate-in slide-in-from-left-8 fade-in duration-700" : "opacity-0"}`}>
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200">
                <MapPin className="w-4 h-4" />
                Trusted GPS Technology
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Why Businesses Choose Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  GPS Tracking System
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Join 10,000+ businesses worldwide who rely on our advanced <strong className="text-gray-900">GPS vehicle tracking platform</strong> for real-time fleet management, asset monitoring, and intelligent route optimization.
              </p>
            </div>

            {/* Trust Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {trustFeatures.map((feature, index) => (
                <TrustFeatureCard key={index} feature={feature} index={index} isVisible={isVisible} />
              ))}
            </div>

            {/* Company Logos */}
            <div className={`${isVisible ? "animate-in slide-in-from-bottom-4 fade-in duration-700" : "opacity-0"}`} style={{ animationDelay: "600ms" }}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6 text-center">Compatible with Industry Leaders</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {companyLogos.map((company, index) => (
                  <div
                    key={index}
                    className="group relative flex items-center justify-center p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredLogo(company.name)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <span className="text-gray-600 font-bold text-xs sm:text-sm group-hover:text-blue-600 transition-colors duration-200 text-center">
                      {company.logo}
                    </span>

                    {/* Tooltip */}
                    {hoveredLogo === company.name && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap animate-in fade-in zoom-in duration-200 z-10">
                        {company.category}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`space-y-6 sm:space-y-8 ${isVisible ? "animate-in slide-in-from-right-8 fade-in duration-700" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
            {/* Award Badge */}
            <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white border-0 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

              <CardContent className="p-6 sm:p-8 relative z-10">
                <div className="flex items-start gap-3 mb-4 sm:mb-6">
                  <Badge className="bg-blue-500 text-white border-0 text-xs">LEADER</Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">2025</Badge>
                </div>

                <div>
                  <Navigation className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300 mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">GPS TRACKING INNOVATOR</h3>
                  <p className="text-blue-100 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    Recognized as the leading <strong>GPS vehicle tracking solution</strong> provider with cutting-edge IoT technology and AI-powered analytics for fleet management excellence.
                  </p>
                </div>

                <Button
                  variant="link"
                  className="text-white p-0 h-auto font-semibold text-sm group hover:text-blue-200 transition-colors duration-200"
                >
                  Discover Our Technology
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>

            {/* Customer Testimonial */}
            <Card className="bg-white border-2 border-gray-100 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Fleet Managers Love Us</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-xs sm:text-sm text-gray-500 ml-2">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  "The real-time GPS tracking accuracy is phenomenal. We've reduced fuel costs by 30% and improved delivery times significantly with route optimization."
                </p>

                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group">
                  View Customer Stories
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>

            {/* Certifications */}
            <div className={`${isVisible ? "animate-in slide-in-from-bottom-4 fade-in duration-700" : "opacity-0"}`} style={{ animationDelay: "800ms" }}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Certifications & Standards</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm">{cert.name}</span>
                    </div>
                    <p className="text-xs text-gray-600">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-300">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                  <CountUpAnimation end="150%" isVisible={isVisible} />
                </div>
                <div className="text-gray-600 text-xs sm:text-sm font-medium">YoY Growth</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">10K+</div>
                <div className="text-gray-600 text-xs sm:text-sm font-medium">Active Fleets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
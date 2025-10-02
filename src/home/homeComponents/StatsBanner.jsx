"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Satellite, Gauge, Clock, Shield, CircleCheck, ArrowRight, TrendingUp } from "lucide-react"

const statsData = [
  {
    value: "10M+",
    description: "Active GPS tracking devices monitored",
    icon: MapPin,
    color: "from-blue-500 to-cyan-500",
    name: "Devices Tracked"
  },
  {
    value: "99.9%",
    description: "GPS positioning accuracy achieved",
    icon: Satellite,
    color: "from-green-500 to-emerald-500",
    name: "Accuracy"
  },
  {
    value: "<1s",
    description: "Real-time location update speed",
    icon: Clock,
    color: "from-orange-500 to-amber-500",
    name: "Speed"
  },
  {
    value: "24/7",
    description: "Continuous vehicle monitoring support",
    icon: Shield,
    color: "from-purple-500 to-violet-500",
    name: "Uptime"
  },
]

const CountUpAnimation = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState("0")

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    let numericEnd
    let suffix = ""
    let prefix = ""

    // Handle different formats: 10M+, 99.9%, <1s, 24/7
    if (end.includes("M+")) {
      numericEnd = Number.parseInt(end.replace("M+", ""))
      suffix = "M+"
    } else if (end.includes("%")) {
      numericEnd = Number.parseFloat(end.replace("%", ""))
      suffix = "%"
    } else if (end.includes("<")) {
      prefix = "<"
      numericEnd = Number.parseInt(end.replace("<", "").replace("s", ""))
      suffix = "s"
    } else if (end.includes("/")) {
      setTimeout(() => setCount(end), duration / 2)
      return
    } else {
      numericEnd = Number.parseInt(end)
    }

    const increment = numericEnd / (duration / 50)

    const timer = setInterval(() => {
      start += increment
      if (start >= numericEnd) {
        setCount(`${prefix}${numericEnd}${suffix}`)
        clearInterval(timer)
      } else {
        if (suffix === "%") {
          setCount(`${start.toFixed(1)}${suffix}`)
        } else {
          setCount(`${prefix}${Math.floor(start)}${suffix}`)
        }
      }
    }, 50)

    return () => clearInterval(timer)
  }, [end, duration, isVisible])

  return <span>{count}</span>
}

const StatCard = ({ stat, index, isVisible }) => {
  const IconComponent = stat.icon

  return (
    <div
      className={`
        group relative w-full rounded-2xl p-px transition-all duration-500 ease-out
        transform hover:-translate-y-2 hover:shadow-2xl
        ${isVisible ? "animate-in slide-in-from-bottom-4 fade-in" : "opacity-0"}
      `}
      style={{
        animationDelay: `${index * 150}ms`,
        animationDuration: "600ms",
        animationFillMode: "forwards",
      }}
    >
      {/* Background Gradient Border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Card Content */}
      <div className="relative z-10 h-full w-full rounded-2xl bg-white border-2 border-gray-200 group-hover:border-transparent p-6 md:p-8 transition-all duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
            {stat.name}
          </span>
        </div>

        <div className="mb-3">
          <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            <CountUpAnimation end={stat.value} isVisible={isVisible} />
          </p>
        </div>

        <p className="text-sm text-gray-600 font-medium leading-relaxed">
          {stat.description}
        </p>

        {/* Decorative element */}
        <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-tl-full transition-opacity duration-500 group-hover:opacity-10`} />
      </div>
    </div>
  )
}

export default function StatsBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef()

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
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 tracking-wide mb-4 shadow-sm">
            <TrendingUp className="w-4 h-4" />
            Industry-Leading GPS Performance
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 ${isVisible ? "animate-in slide-in-from-top-4 fade-in duration-700" : "opacity-0"}`}
          >
            Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">GPS Tracking Solution</span> for Businesses
          </h2>

          <p
            className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed ${isVisible ? "animate-in slide-in-from-top-4 fade-in duration-700" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            Experience the most advanced <strong className="text-gray-900">GPS vehicle tracking system</strong> in India. Our real-time GPS monitoring platform delivers unmatched accuracy, speed, and reliability for <strong className="text-gray-900">fleet management</strong> and asset tracking solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>

        {/* Additional Info Section */}
        <div 
          className={`mt-12 sm:mt-16 text-center ${isVisible ? "animate-in fade-in duration-700" : "opacity-0"}`}
          style={{ animationDelay: "800ms" }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CircleCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">ISO Certified</p>
                <p className="text-xs text-gray-600">Quality Assured</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-gray-300" />
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Bank-Grade Security</p>
                <p className="text-xs text-gray-600">Data Protected</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-gray-300" />
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gauge className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Real-Time Updates</p>
                <p className="text-xs text-gray-600">Every Second</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-8 sm:mt-12 ${isVisible ? "animate-in fade-in duration-700" : "opacity-0"}`}
          style={{ animationDelay: "1000ms" }}
        >
          <a 
            href="#products" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group"
          >
            Explore GPS Tracking Solutions
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
          
          <p className="mt-4 text-sm text-gray-500">
            Join 10,000+ businesses using our GPS tracking system
          </p>
        </div>
      </div>
    </section>
  )
}
"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Satellite, 
  Radio, 
  Gauge, 
  Shield,
  ArrowRight,
  Zap,
  Globe,
  Wifi,
  Clock,
  CheckCircle,
  TrendingUp,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

const servicesData = [
  {
    id: 1,
    icon: MapPin,
    theme: {
      primary: 'from-blue-500 to-indigo-600',
      accent: '#3b82f6',
      bgGlow: 'bg-blue-500/10',
    },
    badge: 'REAL-TIME GPS TRACKING',
    title: 'Advanced GPS Tracking Controller for Fleet Management',
    description: 'Professional GPS controller with real-time vehicle tracking, route optimization, and fleet monitoring. Track multiple vehicles simultaneously with precision location updates every second.',
    features: [
      "Live GPS tracking with 1-second updates",
      "Multi-vehicle fleet management dashboard",
      "Route optimization & geofencing alerts",
      "Historical route playback & analytics"
    ],
    stats: { value: '10K+', label: 'Vehicles Tracked' }
  },
  {
    id: 2,
    icon: Satellite,
    theme: {
      primary: 'from-purple-500 to-pink-600',
      accent: '#a855f7',
      bgGlow: 'bg-purple-500/10',
    },
    badge: 'MULTI-GNSS NAVIGATION',
    title: 'Multi-Constellation GNSS GPS Controller System',
    description: 'High-precision GPS navigation controller supporting GPS, GLONASS, Galileo, and BeiDou satellites. Achieve centimeter-level accuracy for surveying, construction, and precision applications.',
    features: [
      "Support for GPS, GLONASS, Galileo, BeiDou",
      "Centimeter-level positioning accuracy",
      "RTK (Real-Time Kinematic) correction",
      "Professional surveying & mapping tools"
    ],
    stats: { value: '99.9%', label: 'Position Accuracy' }
  },
  {
    id: 3,
    icon: Radio,
    theme: {
      primary: 'from-emerald-500 to-teal-600',
      accent: '#10b981',
      bgGlow: 'bg-emerald-500/10',
    },
    badge: 'IOT GPS INTEGRATION',
    title: 'IoT-Connected GPS Controller with Cloud Platform',
    description: 'Smart GPS controller with 4G/5G connectivity and cloud integration. Monitor assets remotely, receive instant alerts, and access data from any device through our secure web portal.',
    features: [
      "4G LTE & 5G wireless connectivity",
      "Cloud-based GPS tracking platform",
      "Real-time alerts & notifications",
      "Mobile app & web dashboard access"
    ],
    stats: { value: '24/7', label: 'Cloud Monitoring' }
  },
  {
    id: 4,
    icon: Shield,
    theme: {
      primary: 'from-orange-500 to-red-600',
      accent: '#f97316',
      bgGlow: 'bg-orange-500/10',
    },
    badge: 'INDUSTRIAL GPS TRACKING',
    title: 'Rugged GPS Controller for Heavy Equipment & Machinery',
    description: 'Military-grade GPS tracking controller built for extreme conditions. IP67 waterproof, shock-resistant design for construction equipment, mining vehicles, and agricultural machinery.',
    features: [
      "IP67 waterproof & dustproof rating",
      "Shock & vibration resistant design",
      "Wide temperature range (-40°C to 85°C)",
      "Heavy-duty mounting & connections"
    ],
    stats: { value: '5 Years', label: 'Warranty' }
  },
  {
    id: 5,
    icon: Gauge,
    theme: {
      primary: 'from-cyan-500 to-blue-600',
      accent: '#06b6d4',
      bgGlow: 'bg-cyan-500/10',
    },
    badge: 'VEHICLE DIAGNOSTICS',
    title: 'GPS Controller with OBD-II Vehicle Diagnostics',
    description: 'Advanced GPS tracking controller with OBD-II integration. Monitor fuel consumption, engine health, speed, and driving behavior alongside real-time GPS location tracking.',
    features: [
      "OBD-II vehicle diagnostics integration",
      "Fuel consumption & efficiency tracking",
      "Engine health & error code monitoring",
      "Driver behavior & safety scoring"
    ],
    stats: { value: '50+', label: 'Data Points' }
  },
  {
    id: 6,
    icon: Zap,
    theme: {
      primary: 'from-yellow-500 to-orange-600',
      accent: '#eab308',
      bgGlow: 'bg-yellow-500/10',
    },
    badge: 'ASSET TRACKING',
    title: 'Battery-Powered GPS Controller for Asset Tracking',
    description: 'Long-lasting GPS tracker with up to 3 years battery life. Perfect for tracking containers, trailers, equipment, and valuable assets with minimal maintenance requirements.',
    features: [
      "Up to 3 years battery life on single charge",
      "Magnetic mounting for easy installation",
      "Scheduled & event-triggered tracking",
      "Low-power consumption design"
    ],
    stats: { value: '3 Years', label: 'Battery Life' }
  }
];

// Trusted Brands Data
const trustedBrands = [
  { name: 'Garmin', logo: 'G' },
  { name: 'TomTom', logo: 'TT' },
  { name: 'Trimble', logo: 'T' },
  { name: 'u-blox', logo: 'U' },
  { name: 'HERE', logo: 'H' },
  { name: 'Qualcomm', logo: 'Q' },
];

const ServiceCard = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;
  
  return (
    <div 
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
        index % 2 === 0 ? 'lg:ml-0' : 'lg:ml-12'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${data.theme.primary} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Glow Effect */}
      <div className={`absolute -inset-1 ${data.theme.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Card Content */}
      <div className="relative bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg group-hover:shadow-2xl transition-all duration-500">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Icon Column */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${data.theme.primary} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse" />
            </div>
          </div>
          
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
              <div className={`w-2 h-2 rounded-full ${data.theme.bgGlow} animate-pulse`} style={{ backgroundColor: data.theme.accent }} />
              <span className="text-xs font-bold text-gray-700 tracking-wide">{data.badge}</span>
            </div>
            
            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight lg:group-hover:text-transparent lg:group-hover:bg-gradient-to-r lg:group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: isHovered ? `linear-gradient(to right, ${data.theme.accent}, ${data.theme.accent}dd)` : 'none' }}>
              {data.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {data.description}
            </p>
            
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {data.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 group/feature">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300" style={{ color: isHovered ? data.theme.accent : '#10b981' }} />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats & CTA Column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end gap-4">
            {/* Stat Card */}
            <div className={`w-full max-w-[200px] p-4 rounded-xl bg-gradient-to-br ${data.theme.primary} text-white text-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
              <div className="text-3xl font-bold">{data.stats.value}</div>
              <div className="text-sm opacity-90">{data.stats.label}</div>
            </div>
            
            {/* CTA Button */}
            <Button 
              className="w-full max-w-[200px] group/btn relative overflow-hidden rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: data.theme.accent }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesShowcase() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Professional GPS Solutions</span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">GPS Controller</span> Solutions
            </h2>
            
            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Industry-leading <strong className="text-gray-900">GPS tracking controllers</strong> and <strong className="text-gray-900">navigation systems</strong> for real-time monitoring, fleet management, and precision positioning across all industries.
            </p>
            
            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Real-Time Tracking</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">99.9% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Wifi className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">IoT Connected</span>
              </div>
            </div>
          </div>
          
          {/* Services Cards */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} data={service} index={index} />
            ))}
          </div>
          
          {/* Trusted Brands Section */}
          <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 border-t border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-4">
                <Award className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-semibold text-gray-700">TRUSTED BY INDUSTRY LEADERS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Compatible with Leading <span className="text-blue-600">GPS Technologies</span>
              </h3>
            </div>
            
            {/* Brand Logos */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-center">
              {trustedBrands.map((brand, idx) => (
                <div 
                  key={idx}
                  className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-700 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:text-blue-600 transition-all duration-300">
                    {brand.logo}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2 group-hover:text-gray-900">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom Stats Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">10M+</div>
                </div>
                <div className="text-sm opacity-90">Active GPS Devices</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Gauge className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">99.9%</div>
                </div>
                <div className="text-sm opacity-90">Position Accuracy</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">&lt;1s</div>
                </div>
                <div className="text-sm opacity-90">Update Speed</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">24/7</div>
                </div>
                <div className="text-sm opacity-90">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
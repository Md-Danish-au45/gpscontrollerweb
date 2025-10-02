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
  Cloud,
  CheckCircle,
  TrendingUp,
  Award,
  Layers,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

const servicesData = [
  {
    id: 1,
    icon: Cloud,
    theme: {
      primary: 'from-blue-500 to-cyan-600',
      accent: '#0ea5e9',
      bgGlow: 'bg-blue-500/10',
    },
    badge: 'CLOUD-BASED GPS PLATFORM',
    title: 'IoT GPS Tracking Platform with Cloud Analytics',
    description: 'Enterprise-grade cloud GPS tracking platform powered by IoT technology. Real-time vehicle monitoring, advanced analytics, and AI-driven insights for intelligent fleet management and predictive maintenance.',
    features: [
      "Cloud-based GPS data processing & storage",
      "AI-powered route prediction & optimization",
      "Scalable IoT infrastructure for unlimited devices",
      "Advanced analytics dashboard with custom reports"
    ],
    stats: { value: 'Cloud', label: 'IoT Platform' }
  },
  {
    id: 2,
    icon: Wifi,
    theme: {
      primary: 'from-purple-500 to-indigo-600',
      accent: '#8b5cf6',
      bgGlow: 'bg-purple-500/10',
    },
    badge: '5G IOT CONNECTIVITY',
    title: 'Next-Gen 5G IoT GPS Tracking System',
    description: 'Ultra-fast 5G IoT GPS tracker with edge computing capabilities. Experience lightning-speed data transmission, low latency tracking, and seamless connectivity for mission-critical vehicle tracking applications.',
    features: [
      "5G & 4G LTE dual-mode IoT connectivity",
      "Edge computing for instant data processing",
      "Ultra-low latency (<10ms) tracking updates",
      "Seamless network switching & failover"
    ],
    stats: { value: '5G', label: 'IoT Network' }
  },
  {
    id: 3,
    icon: Layers,
    theme: {
      primary: 'from-emerald-500 to-green-600',
      accent: '#10b981',
      bgGlow: 'bg-emerald-500/10',
    },
    badge: 'IOT SENSOR INTEGRATION',
    title: 'Multi-Sensor IoT GPS Tracking Solution',
    description: 'Advanced IoT GPS system integrated with multiple sensors for comprehensive vehicle monitoring. Track temperature, fuel levels, door status, cargo weight, and environmental conditions in real-time.',
    features: [
      "Integration with 20+ IoT sensor types",
      "Temperature, fuel, humidity monitoring",
      "Door/cargo sensors with instant alerts",
      "Custom IoT sensor configuration support"
    ],
    stats: { value: '20+', label: 'IoT Sensors' }
  },
  {
    id: 4,
    icon: Activity,
    theme: {
      primary: 'from-orange-500 to-red-600',
      accent: '#f97316',
      bgGlow: 'bg-orange-500/10',
    },
    badge: 'PREDICTIVE IOT ANALYTICS',
    title: 'AI-Powered Predictive GPS IoT Analytics',
    description: 'Machine learning-enabled IoT GPS platform that predicts vehicle maintenance needs, driver behavior patterns, and optimal routes. Reduce downtime and maximize fleet efficiency with predictive intelligence.',
    features: [
      "ML-based predictive maintenance alerts",
      "Driver behavior pattern analysis",
      "Fuel consumption prediction algorithms",
      "Anomaly detection & risk assessment"
    ],
    stats: { value: 'AI/ML', label: 'Powered' }
  },
  {
    id: 5,
    icon: Globe,
    theme: {
      primary: 'from-cyan-500 to-blue-600',
      accent: '#06b6d4',
      bgGlow: 'bg-cyan-500/10',
    },
    badge: 'GLOBAL IOT COVERAGE',
    title: 'Worldwide IoT GPS Tracking with Roaming',
    description: 'Global IoT GPS tracking solution with international roaming support. Track vehicles across 150+ countries with seamless connectivity, unified dashboard, and multi-currency billing support.',
    features: [
      "150+ country IoT network coverage",
      "Automatic international roaming",
      "Multi-region data center support",
      "Global SIM with local connectivity"
    ],
    stats: { value: '150+', label: 'Countries' }
  },
  {
    id: 6,
    icon: Shield,
    theme: {
      primary: 'from-indigo-500 to-purple-600',
      accent: '#6366f1',
      bgGlow: 'bg-indigo-500/10',
    },
    badge: 'SECURE IOT ECOSYSTEM',
    title: 'Enterprise Security for IoT GPS Networks',
    description: 'Bank-grade security for IoT GPS infrastructure. End-to-end encryption, secure device authentication, blockchain-based data integrity, and compliance with ISO 27001 & GDPR standards.',
    features: [
      "AES-256 end-to-end IoT encryption",
      "Blockchain-verified location data",
      "Secure boot & device authentication",
      "ISO 27001 & GDPR compliant platform"
    ],
    stats: { value: 'ISO', label: 'Certified' }
  }
];

const trustedBrands = [
  { name: 'AWS IoT', logo: 'AWS' },
  { name: 'Azure IoT', logo: 'AZ' },
  { name: 'Google Cloud', logo: 'GC' },
  { name: 'IBM Watson', logo: 'IBM' },
  { name: 'Cisco IoT', logo: 'CS' },
  { name: 'Siemens', logo: 'SI' },
];

const ServiceCard = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;
  
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IoT-themed Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
        }} />
      </div>
      
      {/* Card Border with Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${data.theme.primary} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} style={{ padding: '2px' }}>
        <div className="w-full h-full bg-white rounded-2xl" />
      </div>
      
      {/* Card Content */}
      <div className="relative bg-white border-2 border-gray-100 group-hover:border-transparent rounded-2xl p-6 sm:p-8 shadow-md group-hover:shadow-2xl transition-all duration-500">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${data.theme.primary} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
              {/* IoT Connection Lines Animation */}
              <div className="absolute inset-0 rounded-xl">
                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
          
          {/* Title & Badge */}
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
              <Wifi className="w-3 h-3 text-gray-600 animate-pulse" />
              <span className="text-xs font-bold text-gray-700 tracking-wider">{data.badge}</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {data.title}
            </h3>
          </div>
          
          {/* Stats Badge */}
          <div className={`flex-shrink-0 px-4 py-3 rounded-xl bg-gradient-to-br ${data.theme.primary} text-white text-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
            <div className="text-lg sm:text-xl font-bold whitespace-nowrap">{data.stats.value}</div>
            <div className="text-xs opacity-90 whitespace-nowrap">{data.stats.label}</div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-6">
          {data.description}
        </p>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {data.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: data.theme.accent }} />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <Button 
          className="w-full group/btn relative overflow-hidden rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          style={{ backgroundColor: data.theme.accent }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-white">
            Explore IoT Solution
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
        </Button>
        
        {/* IoT Network Pattern Decoration */}
        <div className="absolute top-4 right-4 w-24 h-24 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="2" fill="currentColor" />
            <circle cx="30" cy="30" r="1.5" fill="currentColor" />
            <circle cx="70" cy="30" r="1.5" fill="currentColor" />
            <circle cx="30" cy="70" r="1.5" fill="currentColor" />
            <circle cx="70" cy="70" r="1.5" fill="currentColor" />
            <line x1="50" y1="50" x2="30" y2="30" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="70" y2="30" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="30" y2="70" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="70" y2="70" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function ServicesShowcase() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* IoT Network Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">IoT-Enabled GPS Technology</span>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Intelligent  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">IoT GPS Tracking </span> Systems
          </h2>
          
          {/* Subheading */}
         <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
  Advanced <strong className="text-gray-900">IoT-based GPS tracking systems</strong> with cloud integration, 
  <strong className="text-gray-900">AI-powered analytics</strong>, and ultra-fast 
  <strong className="text-gray-900">5G connectivity</strong>. Optimize fleet management, vehicle monitoring, 
  and asset tracking with intelligent, real-time GPS solutions.
</p>

        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} data={service} index={index} />
          ))}
        </div>
        
        {/* IoT Ecosystem Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 mb-4">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-700">TRUSTED IoT PARTNERS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Powered by Leading <span className="text-blue-600">IoT Cloud Platforms</span>
            </h3>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Our GPS tracking solutions integrate seamlessly with industry-leading IoT platforms for enterprise-grade reliability and scalability
            </p>
          </div>
          
          {/* Brand Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {trustedBrands.map((brand, idx) => (
              <div 
                key={idx}
                className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm sm:text-base font-bold text-gray-700 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:text-blue-600 transition-all duration-300">
                  {brand.logo}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-600 mt-2 group-hover:text-gray-900">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* IoT Stats Banner */}
        <div className="mt-16 sm:mt-20 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }} />
          
          <div className="relative p-8 sm:p-12 text-white">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Cloud className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">100%</div>
                </div>
                <div className="text-sm opacity-90">Cloud-Based IoT</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Wifi className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">5G</div>
                </div>
                <div className="text-sm opacity-90">IoT Connectivity</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Layers className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">API</div>
                </div>
                <div className="text-sm opacity-90">Integration Ready</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 mr-2" />
                  <div className="text-3xl sm:text-4xl font-bold">Secure</div>
                </div>
                <div className="text-sm opacity-90">End-to-End Encrypted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
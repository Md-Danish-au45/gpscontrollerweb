"use client"

import { motion } from "framer-motion"
import {
  Car, 
  Server, 
  MapPin, 
  Globe, 
  Shield, 
  Zap, 
  Target, // Mission
  Trophy, // Vision
  Users, // Team
  Code, // Technology
  TrendingUp, // Growth
  BarChart2, // Data
  ArrowRight
} from "lucide-react"
import Header from "./homeComponents/Header"
import Footer from "./homeComponents/Footer"
import AboutUs from "./homeComponents/About" // You might remove this if you replace its content fully
import { useEffect } from "react"
import TopBar from "./homeComponents/TopBar"

// SEO Keywords: GPS Tracking Solutions, IoT Asset Monitoring, Fleet Management Software, 
// Real-time Vehicle Tracking, Route Optimization, Telematics API, Supply Chain Visibility.

// --- Design Helpers ---

// Custom Card for a distinct look
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: delay }}
        className="p-8 bg-white rounded-2xl shadow-xl border-t-4 border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
        <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-green-100/70">
            <Icon className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
);

// Stat Component
const StatItem = ({ value, label, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 rounded-xl bg-gray-100 shadow-inner border border-gray-200"
    >
        <Icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
        <p className="text-4xl font-extrabold text-green-700">{value}</p>
        <p className="text-sm font-medium text-gray-600">{label}</p>
    </motion.div>
);

// --- Content Data ---

const missionVisionData = [
    {
        icon: Target,
        title: "Our Mission: Optimize Every Kilometer",
        description: "To empower logistics, fleet, and construction businesses with precise, reliable, and scalable GPS tracking solutions that maximize efficiency and security.",
        color: "text-blue-600 bg-blue-100",
        delay: 0.1,
    },
    {
        icon: Trophy,
        title: "Our Vision: The Future of IoT Telematics",
        description: "To be the leading IoT asset monitoring platform in India, setting the industry standard for real-time data accuracy and actionable fleet intelligence.",
        color: "text-purple-600 bg-purple-100",
        delay: 0.3,
    },
];

const technologyFeatures = [
    {
        icon: Code,
        title: "API-First Infrastructure",
        description: "Built on a flexible, developer-friendly Telematics API for easy integration into any existing ERP or in-house management system.",
        delay: 0.1,
    },
    {
        icon: Shield,
        title: "AES-256 Data Security",
        description: "We protect all real-time location data and IoT telemetry using bank-grade encryption and secure cloud protocols.",
        delay: 0.2,
    },
    {
        icon: BarChart2,
        title: "Advanced Data Analytics",
        description: "Turn raw GPS points into meaningful insights on driver behavior, fuel consumption, and route optimization performance.",
        delay: 0.3,
    },
    {
        icon: Users,
        title: "Scalability for Enterprise",
        description: "Our cloud architecture is designed to handle millions of data points per second, supporting fleets from 10 to 10,000+ vehicles.",
        delay: 0.4,
    },
];

const companyStats = [
    { label: "Assets Tracked Daily", value: "100K+", icon: Car },
    { label: "Real-time Uptime", value: "99.99%", icon: Zap },
    { label: "Countries Served", value: "5+", icon: Globe },
    { label: "Years of Expertise", value: "8+", icon: TrendingUp },
];


export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  return (
    <>
      <TopBar />
      <Header />
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-50">
        
        {/* H1: Hero Section */}
        <section className="relative bg-gradient-to-br from-green-700 to-gray-800 py-24 text-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-snug">
                        Building the Future of Fleet & Asset Tracking
                    </h1>
                    <p className="text-xl text-green-200 max-w-4xl mx-auto font-light">
                        We are GPS Controller, pioneers in next-generation IoT tracking solutions. Our platform provides unparalleled visibility, security, and intelligence for your mobile assets.
                    </p>
                </motion.div>
            </div>
        </section>

        {/* H2: Mission & Vision */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">Our Foundation</h2>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                        Driving innovation in GPS tracking through commitment to data accuracy and customer success.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {missionVisionData.map((item) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: item.delay }}
                            className={`p-8 rounded-xl shadow-lg border border-gray-200 ${item.color} bg-opacity-10 flex flex-col h-full`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.color}`}>
                                <item.icon className={`w-6 h-6 text-white`} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-gray-600 flex-grow">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* H2: Company Stats */}
        <section className="py-16 bg-green-50/50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {companyStats.map((stat, index) => (
                        <StatItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
        
        {/* H2: Technology & Platform */}
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">Our Technology Advantage</h2>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                        We build our platform with cutting-edge infrastructure to ensure speed, security, and seamless integration.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {technologyFeatures.map((item) => (
                        <FeatureCard key={item.title} {...item} />
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fleet Management?</h2>
                <p className="text-lg text-gray-400 mb-8">
                    Partner with the experts in IoT tracking solutions and start seeing measurable returns on your assets.
                </p>
                <a 
                    href="/contact-us"
                    className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-lg"
                >
                    Contact Sales & Get a Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                </a>
            </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
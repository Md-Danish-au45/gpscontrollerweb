"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Car, Shield, Clock, Star, ArrowUpRight, Menu, MapPin, Globe, BatteryCharging, Server } from "lucide-react"
import Header from "./homeComponents/Header"
import Footer from "./homeComponents/Footer"

// SEO Keywords: GPS Tracking, IoT Solutions, Fleet Management, Real-time Location, 
// Asset Tracking, Route Optimization, Telematics, Vehicle Tracking API, Supply Chain.
import TopBar from "./homeComponents/TopBar"

const stats = [
  { label: "Real-time Accuracy", value: "99.9%", icon: MapPin },
  { label: "Fleet Downtime Reduction", value: "85%", icon: Shield },
  { label: "Route Optimization Savings", value: "25%", icon: Globe },
  { label: "Client Satisfaction", value: "4.9/5", icon: Star },
]

const caseStudies = [
  {
    id: 1,
    title: "Logistics Giant Achieves 20% Fuel Savings with Route Optimization",
    company: "TransExpress Logistics",
    industry: "Fleet & Logistics Management",
    challenge: "Inefficient routing, high fuel consumption, and lack of real-time visibility on deliveries.",
    solution: "Implemented the GPS Controller platform with dynamic route optimization and real-time vehicle tracking API integration.",
    results: [
      "20% reduction in monthly fuel costs",
      "15% increase in on-time delivery rate (OTD)",
      "Instant driver performance and behavior reports",
      "Full compliance with transportation regulations",
    ],
    image: "https://www.commercialdesignindia.com/cloud/2025/05/19/9DfwaoRC-E_PS1_7166_FS1-1200x675.jpg",
    testimonial:
      "GPS Controller transformed our fleet operations. The route optimization features alone paid for the system within six months, significantly boosting our profitability.",
    author: "Ravi Shankar",
    position: "Head of Operations",
    metrics: {
      fuelReduction: "20%",
      onTimeDelivery: "15%",
      fleetSize: "500+",
      savingsROI: "100%",
    },
  },
  {
    id: 2,
    title: "Cold Chain Monitoring Secured by Advanced IoT Asset Tracking",
    company: "PharmaCold Solutions",
    industry: "Pharmaceutical & Cold Chain",
    challenge: "Ensuring temperature compliance and security for high-value pharma assets during transit across states.",
    solution: "Deployed specialized IoT asset tracking devices integrated with the platform for real-time temperature, humidity, and location monitoring.",
    results: [
      "100% compliance with temperature logs",
      "Zero product loss due to temperature deviations",
      "Instant alerts via telematics for unauthorized door openings",
      "Improved regulatory audit readiness",
    ],
    image: "https://plus.unsplash.com/premium_photo-1683141172508-b67ca5f17194?fm=jpg&q=60&w=3000",
    testimonial:
      "The IoT Solutions provided by GPS Controller gave us granular control over our sensitive shipments. It's the most reliable supply chain tracking system we've used.",
    author: "Dr. Anjali Verma",
    position: "Quality Assurance Director",
    metrics: {
      lossReduction: "0%",
      complianceRate: "100%",
      tempAccuracy: "±0.5°C",
      realTimeUpdates: "5 sec",
    },
  },
  {
    id: 3,
    title: "Construction Firm Boosts Security with Geo-fencing and GPS Monitoring",
    company: "BuildSafe Infrastructure",
    industry: "Construction & Heavy Machinery",
    challenge: "Preventing theft and unauthorized use of expensive heavy machinery across multiple remote sites.",
    solution: "Implemented heavy equipment GPS monitoring with custom geo-fencing and engine hour tracking to ensure machinery is only used within permitted hours/locations.",
    results: [
      "85% reduction in unauthorized machinery use",
      "Instant theft recovery via live location tracking",
      "Accurate billing and maintenance scheduling based on engine hours",
      "Lower insurance premiums due to enhanced security",
    ],
    image: "https://cdn.techinasia.com/wp-content/uploads/2025/04/1745549426_1737991117555-750x563.jpg",
    testimonial:
      "The GPS tracking system is robust and reliable. We now track every piece of equipment and get instant alerts the moment a vehicle leaves a site after hours. Excellent security solution.",
    author: "Gautam Rao",
    position: "Site Security Manager",
    metrics: {
      securityImprovement: "85%",
      recoveryTime: "Avg 3 hrs",
      sitesMonitored: "15+",
      equipmentTracked: "120+",
    },
  },
]


// Reusable Button Component with rounded corners
const Button = ({ children, onClick, className = "", size = "md" }) => {
  const baseClasses = "font-medium transition-all duration-300 rounded-full flex items-center justify-center";
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {children}
    </button>
  );
};

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
);



export default function CaseStudyPage() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const handleNavigate = () => {
      window.location.href = "/user";
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
          <TopBar/>
<Header/>
            {/* Hero Section with SEO Keywords */}
            <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Driving Efficiency: GPS Tracking & IoT Solutions Success Stories
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Discover how leading enterprises are achieving operational excellence, securing assets, and slashing costs with our advanced IoT and GPS tracking platform.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3 mx-auto">
                                        <stat.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">{stat.value}</h2>
                                    <h3 className="text-sm text-gray-600">{stat.label}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Case Studies Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Transforming Operations with Telematics</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            See how our clients have achieved remarkable results in fleet management and asset tracking using our powerful Vehicle Tracking API.
                        </p>
                    </motion.div>

                    <div className="space-y-20">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`grid lg:grid-cols-2 gap-12 items-center p-8 bg-white rounded-xl shadow-lg ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                            >
                                {/* Content */}
                                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                                        {study.industry}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{study.title}</h3>
                                    <p className="text-lg text-gray-600 mb-6">{study.company}</p>

                                    {/* Challenge & Solution */}
                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                                            <p className="text-gray-600">{study.challenge}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                                            <p className="text-gray-600">{study.solution}</p>
                                        </div>
                                    </div>

                                    {/* Results */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold text-gray-900 mb-4">Key Results:</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {study.results.map((result, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{result}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="bg-blue-50 border-l-4 border-l-blue-500 rounded-lg p-6">
                                        <p className="text-gray-700 italic mb-4">"{study.testimonial}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Car className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{study.author}</div>
                                                <div className="text-sm text-gray-600">{study.position}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image & Metrics */}
                                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                                    <div className="relative">
                                        <img
                                            src={study.image || "/placeholder.svg"}
                                            alt={study.title}
                                            className="w-full h-80 object-cover rounded-lg shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                                    </div>

                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        {Object.entries(study.metrics).map(([key, value], idx) => (
                                            <Card key={key} className="text-center p-4 hover:shadow-xl transition-shadow">
                                                <div className="p-0">
                                                    <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                                                    <div className="text-sm text-gray-600 capitalize">
                                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section with SEO Keywords */}
            <section className="py-20 bg-blue-700">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Optimize Your Fleet with Real-time GPS Tracking?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join hundreds of companies that trust GPS Controller for their secure IoT asset tracking and operational efficiency needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={handleNavigate} size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                                Get Started with Telematics
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                size="lg"
                                className="border border-white text-white hover:bg-white hover:text-blue-700 bg-transparent"
                            >
                                Schedule a Demo
                                <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
<Footer/>
        </div>
    );
}
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import Header from "./homeComponents/Header" 
import Footer from "./homeComponents/Footer" 
import HeroSection from "./homeComponents/HeroSection"
import ContactUs from "./homeComponents/Contact"
import TopBar from "./homeComponents/TopBar"

//  SectionHeader Component (Helper for ContactUsPage) 
const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12 px-4"
  >
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
  </motion.div>
)

//  InfoCard Component 
const InfoCard = ({ icon: Icon, title, content, animationDelay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay: animationDelay }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center flex flex-col items-center"
  >
    <div className="bg-blue-100 p-3 rounded-full mb-4">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>
    <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{content}</p>
  </motion.div>
)

//  ContactUsPage Component 
export default function ContactUsPage() {

  useEffect(()=>{
       window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
    },[])
  
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar/>
      <Header />
     
      <ContactUs/>
      <Footer />
    </div>
  )
}
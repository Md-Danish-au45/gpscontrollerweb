"use client"

import { motion } from "framer-motion"
import {
  Users,
  Award,
  FileSignature,
  Home,
  Zap,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react"
import Header from "./homeComponents/Header"
import Footer from "./homeComponents/Footer"
import AboutUs from "./homeComponents/About"
import { useEffect } from "react"
import TopBar from "./homeComponents/TopBar"

const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12 px-4"
  >
    <h2 className="text-4xl font-extrabold text-[#112D4E] mb-4">{title}</h2>
    <p className="text-lg text-[#3F72AF] max-w-3xl mx-auto font-medium">{subtitle}</p>
  </motion.div>
)

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
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#F9F7F7]">
        <AboutUs />
        <main className="flex-grow py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <section className="mb-20">
            <SectionHeader
              title="What We Do"
              subtitle="We provide a comprehensive, Platform that offers a wide range of verification services. With our cutting-edge technology, you can quickly and easily verify:"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Digital Identity Verification",
                  description: "Verify Aadhaar, PAN, Voter ID, Driving License, and other IDs — all in just a few clicks.",
                },
                {
                  icon: Award,
                  title: "Business Verification",
                  description: "Instantly check GST registration, MSME certificates, company status, and more to ensure you're working with legitimate entities.",
                },
                {
                  icon: FileSignature,
                  title: "Paperless Document Signing",
                  description: "Say goodbye to paperwork. Use Aadhaar-based eSign to sign legally valid documents online — safely and quickly.",
                },
                {
                  icon: Home,
                  title: "Property & Land Record Checks",
                  description: "Reduce risks by checking property ownership, title clarity, and any legal issues before making real estate decisions.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-[3rem] shadow-lg border border-gray-100 flex flex-col items-center text-center 
                  bg-gradient-to-br from-white to-[#DBE2EF]
                    ${index === 3 ? "lg:col-span-3 md:col-span-2 justify-self-center max-w-lg mx-auto" : ""}`}
                >
                  <item.icon className="w-12 h-12 text-[#3F72AF] mb-4" />
                  <h4 className="text-xl font-bold text-[#112D4E] mb-2">{item.title}</h4>
                  <p className="text-gray-700 font-normal">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <SectionHeader
              title="Why Choose Us?"
              subtitle="We are committed to providing you with the best verification experience."
            />
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Fast & Easy to Use",
                  description:
                    "Start verifying within minutes — no complicated setup or technical headaches.",
                },
                {
                  icon: CheckCircle,
                  title: "Highly Accurate Results",
                  description:
                    "We focus on delivering reliable verification results you can trust.",
                },
                {
                  icon: AlertCircle,
                  title: "Built-in Fraud Detection",
                  description:
                    "Stay protected with tools that flag suspicious or mismatched data instantly.",
                },
                {
                  icon: Lock,
                  title: "Data Privacy You Can Rely On",
                  description:
                    "We follow strong data protection practices to ensure your information stays private and secure.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4 bg-white"
                >
                  <item.icon className="w-8 h-8 text-[#3F72AF] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold text-[#112D4E] mb-2">{item.title}</h4>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}
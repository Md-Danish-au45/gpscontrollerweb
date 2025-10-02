"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Minus, HelpCircle, Search, MessageCircle, Phone, Mail,Contact,ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
const faqData = [
  // GPS Tracking and IoT Related FAQs - Added for SEO and User Clarity
  {
    id: 1,
    category: "Getting Started",
    question: "What is IoT GPS Tracking and how does your platform work?",
    answer:
      "IoT GPS Tracking uses connected sensors (devices) to monitor and manage assets in real-time. Our platform connects data from various IoT GPS devices, processes it using cloud analytics, and presents it on a unified dashboard. It provides features like real-time location tracking, fleet management, and predictive maintenance alerts.",
    popular: true,
  },
  {
    id: 2,
    category: "Integration",
    question: "How can I integrate your GPS tracking API with my existing fleet software?",
    answer:
      "Integration is seamless and developer-friendly. We offer a robust RESTful GPS Tracking API and SDKs for popular languages (Python, Node.js, Java). Our comprehensive documentation includes code examples for fetching live location data, setting up geo-fences, and receiving real-time event notifications. Most integrations can be completed within hours.",
    popular: true,
  },
  {
    id: 3,
    category: "Security",
    question: "How secure is my real-time GPS location data and IoT device information?",
    answer:
      "Security is our top priority. All GPS location data and IoT telemetry are secured using AES-256 encryption during transmission and at rest. We are compliant with industry standards like ISO 27001 and GDPR. Data access is strictly controlled via Role-Based Access Control (RBAC) and detailed audit logs are maintained for full transparency.",
    popular: true,
  },
  {
    id: 4,
    category: "Features",
    question: "Does your platform support Geo-fencing and automated alerts for vehicle tracking?",
    answer:
      "Yes, our vehicle GPS tracking solution includes advanced Geo-fencing capabilities. You can easily define virtual boundaries on the map. The system automatically sends immediate alerts via SMS, email, or API callback when a vehicle enters or exits a Geo-fence, or if unauthorized movement is detected. This is essential for effective fleet management.",
    popular: true,
  },
  {
    id: 5,
    category: "Hardware & Compatibility",
    question: "Which GPS tracking hardware or devices are compatible with your system?",
    answer:
      "Our platform is designed for maximum compatibility and supports a wide range of devices from manufacturers like Teltonika, Concox, and Queclink. We offer standard protocols (e.g., AVL, TCP/UDP) and a flexible parsing engine. If you have specific hardware, our technical team can assist in integrating any IoT tracking device quickly.",
    popular: false,
  },
  {
    id: 6,
    category: "Performance",
    question: "What is the update frequency and accuracy of your live GPS tracking?",
    answer:
      "Our system provides true real-time GPS updates, with configurable frequency typically set between 5 to 15 seconds for moving assets. We guarantee high location accuracy (typically $<5$ meters) by utilizing high-quality satellite data and smart filtering algorithms. This ensures your live tracking is always reliable.",
    popular: false,
  },
  {
    id: 7,
    category: "Pricing",
    question: "What is the pricing model for your IoT and GPS tracking services?",
    answer:
      "We offer flexible, subscription-based pricing tailored to the number of devices you track and the data usage. Plans start with basic GPS data tracking features, scaling up to enterprise-level solutions with advanced analytics and dedicated support. Contact our sales team for a custom quote based on your specific IoT fleet requirements.",
    popular: false,
  },
  {
    id: 8,
    category: "Support",
    question: "Do you offer technical support for API integration and device issues?",
    answer:
      "Absolutely. We provide dedicated 24/7 technical support for our enterprise users via live chat, email, and phone. Our support team specializes in IoT integration and troubleshooting device connectivity, ensuring minimal downtime for your GPS tracking solution.",
    popular: false,
  },
];


const categories = ["All", ...Array.from(new Set(faqData.map((faq) => faq.category)))]

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
  searchTerm,
}) => {
  const highlightText = (text, term) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="group overflow-hidden border border-gray-200 hover:border-gray-500/30 transition-all duration-300 hover:shadow-lg bg-white rounded-lg">
      <div className="p-0">
        <button
          onClick={onToggle}
          className="w-full text-left p-6 hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                {faq.popular && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-600 border border-gray-500/20">
                    Popular
                  </span>
                )}
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{faq.category}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors duration-200 pr-4">
                {highlightText(faq.question, searchTerm)}
              </h3>
            </div>
            <div
              className={`
                flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center
                transition-all duration-300 group-hover:border-gray-500 group-hover:bg-gray-500/10
                ${isOpen ? "border-gray-500 bg-gray-500/10 rotate-180" : ""}
              `}
            >
              {isOpen ? (
                <Minus className="w-4 h-4 text-gray-600" />
              ) : (
                <Plus className="w-4 h-4 text-gray-600 group-hover:text-gray-600" />
              )}
            </div>
          </div>
        </button>

        {/* Expandable Content */}
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-6 pb-6 pt-2">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{highlightText(faq.answer, searchTerm)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState([1]) // First item open by default
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const navigate = useNavigate()

  const toggleItem = (id) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularFAQs = faqData.filter((faq) => faq.popular)

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Content (Not Sticky) */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 bg-gray-500/10 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <HelpCircle className="w-4 h-4" />
                  Support Center
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Frequently asked Questions</h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Get answers to all your queries about our IoT and GPS Tracking platform. We are dedicated to providing the most reliable and scalable tracking solutions for your business.
                </p>

                {/* <button className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <span className="flex items-center gap-2">
                    View All Documentation
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button> */}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-gray-600 mb-2">24/7</div>
                  <div className="text-gray-600 text-sm font-medium">Support Available</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-gray-600 mb-2">5 sec</div>
                  <div className="text-gray-600 text-sm font-medium">Avg GPS Update Rate</div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Still need help?</h3>
                <div className="space-y-3">
                  {/* <button className="w-full justify-start bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-500/30 text-gray-700 hover:text-gray-600 transition-all duration-200 px-4 py-3 rounded-lg flex items-center">
                    <MessageCircle className="w-4 h-4 mr-3" />
                    Start Live Chat
                  </button> */}
                  <button onClick={()=>navigate("/contact-us")} className="w-full justify-start bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-500/30 text-gray-700 hover:text-gray-600 transition-all duration-200 px-4 py-3 rounded-lg flex items-center">
                    <Contact className="w-4 h-4 mr-3" />
                    Contact us
                  </button>
                  {/* <button className="w-full justify-start bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-500/30 text-gray-700 hover:text-gray-600 transition-all duration-200 px-4 py-3 rounded-lg flex items-center">
                    <Phone className="w-4 h-4 mr-3" />
                    Schedule Call
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Items (Sticky) */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-8 space-y-8 max-h-screen overflow-y-auto">
              {/* Search and Filters */}
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search GPS tracking and IoT questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 w-full bg-white border border-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 rounded-xl shadow-sm outline-none"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium
                        ${
                          selectedCategory === category
                            ? "bg-gray-600 hover:bg-gray-700 text-white shadow-md"
                            : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-500/30"
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Questions */}
              {searchTerm === "" && selectedCategory === "All" && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Most Popular Questions
                  </h3>
                  <div className="space-y-4">
                    {popularFAQs.slice(0, 4).map((faq, index) => (
                      <FAQItem
                        key={faq.id}
                        faq={faq}
                        isOpen={openItems.includes(faq.id)}
                        onToggle={() => toggleItem(faq.id)}
                        searchTerm={searchTerm}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Questions */}
              <div>
                {searchTerm || selectedCategory !== "All" ? (
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} found
                  </h3>
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    All Questions
                  </h3>
                )}

                <div className="space-y-4">
                  {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq, index) => (
                      <div key={faq.id}>
                        <FAQItem
                          faq={faq}
                          isOpen={openItems.includes(faq.id)}
                          onToggle={() => toggleItem(faq.id)}
                          searchTerm={searchTerm}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                      <p className="text-gray-600">Try adjusting your search terms or browse all categories</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
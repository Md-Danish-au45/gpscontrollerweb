"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Minus, HelpCircle, Search, MessageCircle, Phone, Mail,Contact,ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
const faqData = [
  {
    id: 1,
    category: "Getting Started",
    question: "What is e-KYC and how does Verify E-KYC work?",
    answer:
      "e-KYC (electronic Know Your Customer) is the process of verifying customer identity online. Verify E-KYC uses AI and machine learning to validate documents like Aadhaar, PAN, Voter ID, or Driving License in real time. Simply upload your document, and our system verifies it against government databases within seconds. This online e-KYC verification solution supports 50+ document types and provides instant compliance reports.",
    popular: true,
  },
  {
    id: 2,
    category: "Security",
    question: "Is online e-KYC verification safe and secure?",
    answer:
      "Yes. Verify E-KYC uses bank-grade AES-256 encryption and complies with ISO 27001, SOC 2, and GDPR standards. Your data is encrypted in transit and at rest, stored on secure servers, and never retained longer than required. We also provide audit logs and compliance reports, making our e-KYC verification one of the safest solutions available.",
    popular: true,
  },
  {
    id: 3,
    category: "Enterprise",
    question: "Can Verify E-KYC handle enterprise-level verification?",
    answer:
      "Absolutely. Verify E-KYC is built for scale, supporting millions of verifications per month with 99.9% uptime. Features include bulk e-KYC verification, enterprise API integration, and team management. Large organizations choose us as their trusted e-KYC verification service provider for compliance and reliability.",
    popular: true,
  },
  {
    id: 4,
    category: "Account",
    question: "How do I sign up for Verify E-KYC?",
    answer:
      "Creating an account takes less than 2 minutes. Click 'Sign Up', enter your business details, verify your email, and start verifying documents instantly. No credit card is required for the free trial. If you are searching 'how to verify e-KYC online?', this is the fastest way to begin.",
    popular: true,
  },
  {
    id: 5,
    category: "Pricing",
    question: "What is the cost of e-KYC verification service?",
    answer:
      "Verify E-KYC offers flexible pricing to suit startups and enterprises. Plans start from ₹15–20 per verification for basic checks, with discounts on higher volumes. Enterprise customers get custom quotes, SLA-backed performance, and dedicated support. Contact us for a personalized e-KYC pricing plan.",
    popular: false,
  },
  {
    id: 6,
    category: "Integration",
    question: "How can I integrate Verify E-KYC API?",
    answer:
      "Integration is quick and developer-friendly. We provide REST APIs and SDKs for Python, Node.js, PHP, and Java. With complete documentation and sandbox testing, most integrations are completed in a few hours. Developers often ask 'How to integrate e-KYC API?', and our platform makes it simple.",
    popular: false,
  },
  {
    id: 7,
    category: "Support",
    question: "Does Verify E-KYC provide customer support?",
    answer:
      "Yes, we provide 24/7 support via live chat, email, and phone for enterprise users. Our average response time is under 2 hours. Along with dedicated account managers, we also offer documentation, tutorials, and a community forum to help customers with their e-KYC verification needs.",
    popular: false,
  },
  {
    id: 8,
    category: "Compliance",
    question: "Is Verify E-KYC compliant with KYC/AML regulations?",
    answer:
      "Yes. Verify E-KYC complies with RBI KYC guidelines, AML regulations, GDPR, PCI DSS, and Indian data protection laws. We maintain certifications like ISO 27001 and SOC 2 Type II and undergo regular audits. Our platform provides audit trails and compliance reports to ensure regulators can easily verify adherence.",
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
                  Most questions and concerns about Verify E-KYC can be found here. Our platform has become the most
                  popular and trusted verification solution. Check out some answers you're looking for.
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
                  <div className="text-3xl font-bold text-gray-600 mb-2">2min</div>
                  <div className="text-gray-600 text-sm font-medium">Avg Response Time</div>
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
                    placeholder="Search frequently asked questions..."
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
                    {popularFAQs.slice(0, 3).map((faq, index) => (
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
// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Check, Shield, Zap, Star, ArrowRight, Globe, Lock } from "lucide-react"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"

// import Footer from "./homeComponents/Footer"
// import Header from "./homeComponents/Header"
// import { Badge } from "@/components/ui/badge"

// import useRazorpay from "@/hooks/useRazorpay"
// import { useCreateSubscriptionOrderMutation, useVerifySubscriptionPaymentMutation } from "@/app/api/paymentApiSlice"
// import { selectCurrentUser } from "@/features/auth/authSlice"
// import SubscriptionComponent from "./homeComponents/SubsciptionSection"
// import TopBar from "./homeComponents/TopBar"
// // Animation variants for sections
// const sectionVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// }

// // Animation variants for individual items
// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
// }

// const PricingPage = () => {
//   const [isAnnual, setIsAnnual] = useState(false)
//   const [selectedPlanId, setSelectedPlanId] = useState('professional'); // Default highlighted plan
//   const [loadingPlanId, setLoadingPlanId] = useState(null); // Track which plan button is loading
//   const navigate = useNavigate()
//   const razorpayLoaded = useRazorpay()
//   const user = useSelector(selectCurrentUser)

//   const [createSubscriptionOrder, { isLoading: isCreatingOrder }] = useCreateSubscriptionOrderMutation()
//   const [verifySubscriptionPayment, { isLoading: isVerifyingPayment }] = useVerifySubscriptionPaymentMutation()

//   const handlePurchase = async (planId, planName, planType) => {
//     if (!user) {
//       toast.info("Please log in to purchase a plan.")
//       navigate("/login")
//       return
//     }

//     if (!razorpayLoaded) {
//       toast.error("Payment gateway is still loading. Please wait a moment.")
//       return
//     }

//     setLoadingPlanId(planId); // Set loading state for this specific plan

//     try {
//       const orderData = await createSubscriptionOrder({ planName, planType }).unwrap()

//       if (orderData.paymentSkipped) {
//         toast.success("Subscription activated successfully!")
//         navigate("/user")
//         return
//       }

//       const options = {
//         key: orderData.key_id,
//         amount: orderData.order.amount,
//         currency: "INR",
//         name: "verify EKYC",
//         description: `Subscription for ${planName} - ${planType} plan`,
//         order_id: orderData.order.id,
//         handler: async function (response) {
//           try {
//             await verifySubscriptionPayment({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               transactionId: orderData.transactionId,
//             }).unwrap()

//             toast.success("Payment successful! Your subscription is active.")
//             navigate("/user")
//           } catch (verifyError) {
//             toast.error(verifyError.data?.message || "Payment verification failed. Please contact support.")
//           } finally {
//             setLoadingPlanId(null); // Clear loading state
//           }
//         },
//         prefill: {
//           name: user.name,
//           email: user.email,
//           contact: user.mobile,
//         },
//         notes: {
//           transactionId: orderData.transactionId,
//           userId: user._id,
//         },
//         theme: {
//           color: "#2563EB",
//         },
//         modal: {
//           ondismiss: function() {
//             setLoadingPlanId(null); // Clear loading state if payment modal is closed
//           }
//         }
//       }

//       const rzp = new window.Razorpay(options)
//       rzp.open()

//     } catch (err) {
//       toast.error(err.data?.message || "An error occurred. Please try again.")
//       setLoadingPlanId(null); // Clear loading state on error
//     }
//   }

//   const isLoading = isCreatingOrder || isVerifyingPayment;
//   const isAnyPlanLoading = loadingPlanId !== null; // Check if any plan is loading

//   // Hardcoded pricing data for the main plans
//   const plans = [
//     {
//       id: "personal",
//       name: "Personal",
//       description: "For Individuals",
//       monthlyPrice: "₹4,999",
//       yearlyPrice: "₹38,499",
//       features: [
//         "25 Verifications Included",
//         "Aadhaar & PAN",
//         "Driving License & Voter ID",
//         "Address Verification",
//         "Criminal Check",
//         "Profile Lookup",
//       ],
//       buttonText: "Choose Plan ",
//       buttonVariant: "outline",
//     },
//     {
//       id: "professional",
//       name: "Professional",
//       description: "For Small Businesses",
//       monthlyPrice: "₹18,999",
//       yearlyPrice: "₹1,46,299",
//       features: [
//         "100 Verifications Included",
//         "All Personal Features +",
//         "Passport & RC",
//         "Bank & GSTIN Verification",
//         "Employment Check",
//         "Liveness & Face Match",
//         "CoWIN",
//       ],
//       buttonText: "Choose Plan",
//       buttonVariant: "primary",
//     },
//     {
//       id: "enterprise",
//       name: "Enterprise",
//       description: "For Corporates / High-Volume Needs",
//       monthlyPrice: "₹89,999",
//       yearlyPrice: "₹6,92,999",
//       features: [
//         "500 Verifications Included",
//         "All Professional Features +",
//         "Unlimited Category Access",
//         "Custom Distribution",
//         "All 20+ Verification Types",
//         "SLA Support & Reporting",
//         "Dedicated Manager",
//       ],
//       buttonText: "Choose Plan",
//       buttonVariant: "outline",
//     },
//   ]

//   // Hardcoded data for service display section
//   const verificationServices = [
//     { name: "Address Verification", price: 299, popular: false },
//     { name: "PAN Verification", price: 399, popular: true },
//     { name: "Profile Lookup", price: 299, popular: false },
//     { name: "GSTIN Verification", price: 299, popular: false },
//     { name: "Aadhaar Verification", price: 299, popular: true },
//     { name: "Driving License Verification", price: 299, popular: false },
//     { name: "Bank Account Verification", price: 299, popular: false },
//     { name: "Voter ID Verification", price: 299, popular: false },
//     { name: "Liveness Detection", price: 299, popular: false },
//     { name: "Face Match", price: 299, popular: false },
//     { name: "Passport Verification", price: 299, popular: false },
//     { name: "Company Verification", price: 299, popular: false },
//     { name: "MSME Verification", price: 299, popular: false },
//     { name: "FSSAI License Verification", price: 299, popular: false },
//     { name: "Employment Verification", price: 299, popular: false },
//     { name: "Vehicle RC Verification", price: 299, popular: false },
//   ]

//   // Hardcoded data for features section
//   const features = [
//     { icon: Shield, title: "Bank-grade Security", description: "End-to-end encryption and compliance with industry standards" },
//     { icon: Zap, title: "Lightning Fast", description: "Get verification results in seconds, not hours" },
//     { icon: Globe, title: "Pan-India Coverage", description: "Comprehensive verification across all Indian states" },
//     { icon: Lock, title: "Privacy First", description: "No data storage policy ensures complete privacy" },
//   ]

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }, [])

//   return (
//     <div className="min-h-screen bg-white text-gray-800">
//       <TopBar/>
//       <Header />

//       <motion.div
//         className="bg-gradient-to-br from-blue-50 to-sky-100 py-20 overflow-hidden"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={sectionVariants}
//       >
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <motion.h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" variants={itemVariants}>
//             Simple, Transparent <span className="text-blue-600">Pricing</span>
//           </motion.h1>
//           <motion.p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" variants={itemVariants}>
//             Choose the perfect plan for your verification needs. All plans include access to our comprehensive suite of verification services.
//           </motion.p>

//           <motion.div className="flex items-center justify-center gap-3 mb-8" variants={itemVariants}>
//             <span className={`text-lg font-medium ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>Monthly</span>
//             <button
//               onClick={() => setIsAnnual(!isAnnual)}
//               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isAnnual ? "bg-blue-600" : "bg-gray-700"}`}
//             >
//               <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"}`}/>
//             </button>
//             <span className={`text-lg font-medium ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>Annual</span>
//             {/* {isAnnual && <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-sm">Save on yearly billing!</Badge>} */}
//           </motion.div>
//         </div>
//       </motion.div>

//       <motion.div
//         className="py-20 bg-white overflow-hidden"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={sectionVariants}
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-3 gap-8 mb-16">
//             {plans.map((plan) => {
//               const isPlanActive = user?.activeSubscriptions?.some(
//                 (sub) => sub.category === plan.name && new Date(sub.expiresAt) > new Date()
//               );
//               const isSelected = plan.id === selectedPlanId;
//               const isPlanLoading = loadingPlanId === plan.id;
//               const isOtherPlanLoading = isAnyPlanLoading && !isPlanLoading;

//               return (
//               <motion.div
//                 key={plan.id}
//                 className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border cursor-pointer ${isSelected ? "border-blue-500 scale-105" : "border-gray-200 hover:scale-[1.02]"} ${isPlanActive ? "border-green-500" : ""} ${isOtherPlanLoading ? "opacity-50" : ""} flex flex-col`}
//                 variants={itemVariants}
//                 onClick={() => !isAnyPlanLoading && setSelectedPlanId(plan.id)}
//               >
//                 {/* {isSelected && (
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                     <div className="bg-gradient-to-r from-blue-600 to-sky-700 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
//                       <Star className="w-4 h-4 fill-white" />
//                       Most Popular
//                     </div>
//                   </div>
//                 )} */}

//                 {/* {isPlanActive && (
//                   <div className="absolute top-4 right-4">
//                     <Badge className="bg-green-100 text-green-800 border-green-200">
//                       <Check className="w-3 h-3 mr-1" />
//                       Active Plan
//                     </Badge>
//                   </div>
//                 )} */}

//                 <div className="p-8 flex-1">
//                   <div className="text-center mb-8">
//                     <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
//                     <p className="text-gray-600 mb-6 h-12">{plan.description}</p>
//                     <div className="mb-6 h-20 flex flex-col justify-center">
//                       <div className="text-5xl font-extrabold text-gray-900">
//                         {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
//                       </div>
//                       <div className="text-gray-500 text-sm mt-1">
//                         {isAnnual ? "/year" : "/month"}
//                       </div>
//                     </div>
//                   </div>
//                   <ul className="space-y-4 mb-8">
//                     {plan.features.map((feature, index) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
//                         <span className="text-gray-700">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="p-8 pt-0">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent card's onClick from firing
//                       handlePurchase(plan.id, plan.name, isAnnual ? 'yearly' : 'monthly')
//                     }}
//                     disabled={isAnyPlanLoading}
//                     className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
//                       isPlanLoading 
//                         ? "bg-gradient-to-r from-blue-600 to-sky-700 text-white" 
//                         : isOtherPlanLoading 
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
//                           : isSelected 
//                             ? "bg-gradient-to-r from-blue-600 to-sky-700 text-white hover:shadow-lg transform hover:-translate-y-1" 
//                             : "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
//                     } ${isAnyPlanLoading && "cursor-not-allowed"}`}
//                   >
//                     {isPlanLoading ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Processing...
//                       </div>
//                     ) : (
//                       plan.buttonText
//                     )}
//                   </button>
//                 </div>
//               </motion.div>
//             )})}
//           </div>
//         </div>
//       </motion.div>

//       {/* <motion.div
//         className="py-20 bg-gradient-to-br from-blue-50 to-sky-50 overflow-hidden"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={sectionVariants}
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" variants={itemVariants}>
//               All Verification Services Included
//             </motion.h2>
//             <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
//               Access our complete suite of verification services with any plan. Pay-per-use pricing for maximum flexibility.
//             </motion.p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {verificationServices.map((service, index) => (
//               <motion.div
//                 key={index}
//                 className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border ${service.popular ? "border-blue-200" : "border-gray-100"}`}
//                 variants={itemVariants}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-lg flex items-center justify-center shadow-md">
//                     <Shield className="w-6 h-6 text-white" />
//                   </div>
//                   {service.popular && (
//                     <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
//                       Popular
//                     </div>
//                   )}
//                 </div>
//                 <h3 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h3>
//                 <div className="flex items-center justify-between">
//                   <div className="text-2xl font-bold text-blue-600">₹{service.price}</div>
//                   <div className="text-sm text-gray-500">per verification</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//           <motion.div className="text-center mt-12" variants={itemVariants}>
//             <button className="bg-gradient-to-r from-blue-600 to-sky-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto">
//               Start Verifying Now
//               <ArrowRight className="w-5 h-5" />
//             </button>
//           </motion.div>
//         </div>
//       </motion.div> */}

//       <motion.div
//         className="py-20 bg-white overflow-hidden"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={sectionVariants}
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" variants={itemVariants}>
//               Why Choose Our Platform?
//             </motion.h2>
//             <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
//               Built for businesses that need reliable, fast, and secure verification services.
//             </motion.p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="text-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                 variants={itemVariants}
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         className="py-20 bg-gradient-to-r from-blue-700 to-sky-800 overflow-hidden"
//         initial="hidden"
//         whileInView="visible"
//         viewport
//         ={{ once: true, amount: 0.3 }}
//         variants={sectionVariants}
//       >
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-6" variants={itemVariants}>
//             Ready to Get Started?
//           </motion.h2>
//           <motion.p className="text-xl text-blue-100 mb-8" variants={itemVariants}>
//             Join thousands of businesses that trust us for their verification needs.
//           </motion.p>
//           <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
//             <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
//               Start Free Trial
//             </button>
//             <button onClick={()=>navigate("/contact-us")} className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300">
//               Contact Sales
//             </button>
//           </motion.div>
//         </div>
//       </motion.div>
//       <SubscriptionComponent/>
//       <Footer/>
//     </div>
//   )
// }

// export default PricingPage;
"use client"

import { useState } from "react"
import { Check, Info, Star, Zap, Shield, Users, Building, Sparkles, Crown, Award, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useRazorpay from "@/hooks/useRazorpay"
import { useCreateSubscriptionOrderMutation, useVerifySubscriptionPaymentMutation } from "@/app/api/paymentApiSlice"
import { selectCurrentUser } from "@/features/auth/authSlice"
import TopBar from "./homeComponents/TopBar"
import Header from "./homeComponents/Header"
import Footer from "./homeComponents/Footer"

// Hardcoded data for the pricing plans displayed in this section
const pricingPlans = [
  {
    name: "Personal",
    monthlyPrice: "₹4,999",
    yearlyPrice: "₹38,499",
    description: "For Individuals",
    icon: Users,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    features: [
      { name: "25 Verifications/month", hasInfo: false },
      { name: "Aadhaar & PAN", hasInfo: false },
      { name: "Driving License & Voter ID", hasInfo: false },
      { name: "Address Verification", hasInfo: false },
      { name: "Criminal Check", hasInfo: false },
      { name: "Profile Lookup", hasInfo: true, tooltip: "Basic profile information checks." },
    ],
    cta: "Choose Plan",
  },
  {
    name: "Professional",
    monthlyPrice: "₹18,999",
    yearlyPrice: "₹1,46,299",
    description: "For Small Businesses",
    icon: Briefcase,
    gradient: "from-gray-900 via-gray-900 to-gray-900",
    features: [
      { name: "100 Verifications/month", hasInfo: false },
      { name: "All Personal Features", hasInfo: false },
      { name: "Passport & RC", hasInfo: false },
      { name: "Bank & GSTIN Verification", hasInfo: false },
      { name: "Employment Check", hasInfo: true, tooltip: "Verify employment history." },
      { name: "Liveness & Face Match", hasInfo: true, tooltip: "Advanced biometric checks." },
    ],
    cta: "Choose Plan",
  },
  {
    name: "Enterprise",
    monthlyPrice: "₹89,999",
    yearlyPrice: "₹6,92,999",
    description: "For Corporates / High-Volume Needs",
    icon: Shield,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    features: [
      { name: "500 Verifications/month", hasInfo: false },
      { name: "All Professional Features", hasInfo: false },
      { name: "Unlimited Category Access", hasInfo: true, tooltip: "Access to all current and future verification types." },
      { name: "All 20+ Verification Types", hasInfo: false },
      { name: "SLA Support & Reporting", hasInfo: true, tooltip: "Guaranteed uptime and detailed reports." },
      { name: "Dedicated Manager", hasInfo: true, tooltip: "A dedicated manager for your account." },
    ],
    cta: "Choose Plan",
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlanName, setSelectedPlanName] = useState('Professional'); // Default highlighted plan
  const [loadingPlanName, setLoadingPlanName] = useState(null); // Track which plan button is loading
  const navigate = useNavigate()
  const razorpayLoaded = useRazorpay()
  const user = useSelector(selectCurrentUser)
  
  const [createSubscriptionOrder, { isLoading: isCreatingOrder }] = useCreateSubscriptionOrderMutation()
  const [verifySubscriptionPayment, { isLoading: isVerifyingPayment }] = useVerifySubscriptionPaymentMutation()

  const handlePurchase = async (planName, planType) => {
    if (!user) {
      toast.info("Please log in to purchase a plan.")
      navigate("/login")
      return
    }
    if (!razorpayLoaded) {
      toast.error("Payment gateway is still loading. Please wait a moment.")
      return
    }

    setLoadingPlanName(planName); // Set loading state for this specific plan

    try {
      const orderData = await createSubscriptionOrder({ planName, planType }).unwrap()
      if (orderData.paymentSkipped) {
        toast.success("Subscription activated successfully!")
        navigate("/user")
        return
      }
      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: "INR",
        name: "verify EKYC",
        description: `Subscription for ${planName} - ${planType} plan`,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            await verifySubscriptionPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              transactionId: orderData.transactionId,
            }).unwrap()
            toast.success("Payment successful! Your subscription is active.")
            navigate("/user")
          } catch (verifyError) {
            toast.error(verifyError.data?.message || "Payment verification failed. Please contact support.")
          } finally {
            setLoadingPlanName(null); // Clear loading state
          }
        },
        prefill: { name: user.name, email: user.email, contact: user.mobile },
        notes: { transactionId: orderData.transactionId, userId: user._id },
        theme: { color: "#090e19ff" },
        modal: {
          ondismiss: function() {
            setLoadingPlanName(null); // Clear loading state if payment modal is closed
          }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      toast.error(err.data?.message || "An error occurred. Please try again.")
      setLoadingPlanName(null); // Clear loading state on error
    }
  }

  const isLoading = isCreatingOrder || isVerifyingPayment;
  const isAnyPlanLoading = loadingPlanName !== null; // Check if any plan is loading

  return (
    <>
          <TopBar/>
      <Header/>
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 md:py-24 relative overflow-hidden">

      {/* Premium Background Elements */}

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-gray-300 rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-gray-400 to-purple-400 rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white shadow-lg border border-gray-200 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-current" />
            </div>
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Trusted by 10,000+ Users
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">
best e-KYC solution for 
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              businesses
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
Choose the perfect e-KYC verification plan for your business needs. Our online KYC pricing is affordable, scalable, and fully compliant with regulatory standards. Whether you need Aadhaar-based e-KYC, bank account verification, or bulk document checks, we provide flexible plans that fit startups, SMEs, and enterprises.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <span className={`text-lg font-bold transition-all duration-300 ${
              !isAnnual ? "text-gray-700" : "text-gray-700"
            }`}>
              Monthly
            </span>

            <div className="relative">
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isAnnual ? "bg-gray-600" : "bg-gray-700"
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
              
              {isAnnual && (
                <Badge className="bg-green-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-md animate-pulse absolute -top-8 left-1/2 transform -translate-x-1/2">
                  Save Big!
                </Badge>
              )}
            </div>

            <span className={`text-lg font-bold transition-all duration-300 ${
              isAnnual ? "text-gray-700" : "text-gray-700"
            }`}>
              Annual
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => {
              const IconComponent = plan.icon;
              const isPlanActive = user?.activeSubscriptions?.some(
                (sub) => sub.category === plan.name && new Date(sub.expiresAt) > new Date()
              );
              const isSelected = plan.name === selectedPlanName;
              const isPlanLoading = loadingPlanName === plan.name;
              const isOtherPlanLoading = isAnyPlanLoading && !isPlanLoading;

              return (
                <Card
                  key={plan.name}
                  onClick={() => !isAnyPlanLoading && setSelectedPlanName(plan.name)}
                  className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl group cursor-pointer backdrop-blur-sm
                    ${isSelected 
                      ? "border-2 border-gray-500 shadow-md scale-[1.02] bg-white" 
                      : "border border-gray-200 hover:border-gray-300 bg-white hover:scale-[1.01] transform"
                    } 
                    ${isOtherPlanLoading ? "opacity-50" : ""}
                  `}
                >
                  {/* Gradient Border Effect */}
                  {isSelected && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-10 rounded-lg`} />
                  )}

                  {isPlanActive && (
                    <div className="absolute top-1 right-1">
                      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4 pt-7 relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className={`p-2 rounded-xl ${
                        isSelected 
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg` 
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-100 group-hover:text-gray-600"
                      } transition-all duration-300`}>
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-gray-600 text-xs mb-4 px-2">{plan.description}</p>
                    <div className="mb-3 h-16 flex flex-col justify-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <div className="text-left">
                          <div className="text-xs text-gray-600">{isAnnual ? "/year" : "/month"}</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 pb-6 relative z-10">
                    <ul className="space-y-2 mb-5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isSelected 
                              ? `bg-gradient-to-r ${plan.gradient}` 
                              : "bg-green-500"
                          }`}>
                            <Check className="w-2 h-2 text-white" />
                          </div>
                          <span className="text-xs text-gray-700 flex-1">{feature.name}</span>
                          {feature.hasInfo && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-gray-400 cursor-help hover:text-gray-500 transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs max-w-xs">
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card's onClick from firing
                        handlePurchase(plan.name, isAnnual ? 'yearly' : 'monthly')
                      }}
                      disabled={isAnyPlanLoading}
                      className={`w-full py-3 text-sm font-semibold transition-all duration-300 ${
                        isPlanLoading 
                          ? `bg-gradient-to-r ${plan.gradient} text-white` 
                          : isOtherPlanLoading 
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                            : isSelected 
                              ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg text-white shadow-md transform hover:scale-105` 
                              : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-500 hover:text-gray-600"
                      } ${isAnyPlanLoading && "cursor-not-allowed"}`}
                    >
                      {isPlanLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          {plan.cta}
                          {isSelected && <Sparkles className="w-4 h-4 ml-2" />}
                        </>
                      )}
                    </Button>
                    <p className="text-[10px] text-gray-500 text-center mt-3">
                      No setup fees • Cancel anytime
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TooltipProvider>

        {/* Custom Solution CTA */}
        <div className="text-center mt-10">
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
            <p className="text-gray-900 text-sm mb-3 font-semibold text-xl">Need a custom solution?</p>
            <Button
              onClick={() => navigate("/contact-us")}
              variant="outline"
              className="border-gray-900 md:text-lg bg-gray-900 text-white text-sm py-2 px-4 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
    
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
    <Footer/>
    </>

  )
}
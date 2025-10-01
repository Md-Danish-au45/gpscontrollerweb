// // "use client"

// // import { useState } from "react"
// // import { Check, Info, Star, Zap, Shield, Users, Building, Sparkles, Crown, Award, Briefcase } from "lucide-react"
// // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// // import { useSelector } from "react-redux"
// // import { useNavigate } from "react-router-dom"
// // import { toast } from "react-toastify"
// // import useRazorpay from "@/hooks/useRazorpay"
// // import { useCreateSubscriptionOrderMutation, useVerifySubscriptionPaymentMutation } from "@/app/api/paymentApiSlice"
// // import { selectCurrentUser } from "@/features/auth/authSlice"

// // // Hardcoded data for the pricing plans displayed in this section
// // const pricingPlans = [
// //   {
// //     name: "Personal",
// //     monthlyPrice: "₹4,999",
// //     yearlyPrice: "₹38,499",
// //     description: "For Individuals",
// //     icon: Users,
// //     gradient: "from-emerald-500 via-teal-500 to-cyan-500",
// //     features: [
// //       { name: "25 Verifications/month", hasInfo: false },
// //       { name: "Aadhaar & PAN", hasInfo: false },
// //       { name: "Driving License & Voter ID", hasInfo: false },
// //       { name: "Address Verification", hasInfo: false },
// //       { name: "Criminal Check", hasInfo: false },
// //       { name: "Profile Lookup", hasInfo: true, tooltip: "Basic profile information checks." },
// //     ],
// //     cta: "Choose Plan",
// //   },
// //   {
// //     name: "Professional",
// //     monthlyPrice: "₹18,999",
// //     yearlyPrice: "₹1,46,299",
// //     description: "For Small Businesses",
// //     icon: Briefcase,
// //     gradient: "from-gray-900 via-gray-900 to-gray-900",
// //     features: [
// //       { name: "100 Verifications/month", hasInfo: false },
// //       { name: "All Personal Features", hasInfo: false },
// //       { name: "Passport & RC", hasInfo: false },
// //       { name: "Bank & GSTIN Verification", hasInfo: false },
// //       { name: "Employment Check", hasInfo: true, tooltip: "Verify employment history." },
// //       { name: "Liveness & Face Match", hasInfo: true, tooltip: "Advanced biometric checks." },
// //     ],
// //     cta: "Choose Plan",
// //   },
// //   {
// //     name: "Enterprise",
// //     monthlyPrice: "₹89,999",
// //     yearlyPrice: "₹6,92,999",
// //     description: "For Corporates / High-Volume Needs",
// //     icon: Shield,
// //     gradient: "from-amber-500 via-orange-500 to-red-500",
// //     features: [
// //       { name: "500 Verifications/month", hasInfo: false },
// //       { name: "All Professional Features", hasInfo: false },
// //       { name: "Unlimited Category Access", hasInfo: true, tooltip: "Access to all current and future verification types." },
// //       { name: "All 20+ Verification Types", hasInfo: false },
// //       { name: "SLA Support & Reporting", hasInfo: true, tooltip: "Guaranteed uptime and detailed reports." },
// //       { name: "Dedicated Manager", hasInfo: true, tooltip: "A dedicated manager for your account." },
// //     ],
// //     cta: "Choose Plan",
// //   },
// // ]

// // export default function PricingSection() {
// //   const [isAnnual, setIsAnnual] = useState(false)
// //   const [selectedPlanName, setSelectedPlanName] = useState('Professional'); // Default highlighted plan
// //   const [loadingPlanName, setLoadingPlanName] = useState(null); // Track which plan button is loading
// //   const navigate = useNavigate()
// //   const razorpayLoaded = useRazorpay()
// //   const user = useSelector(selectCurrentUser)
  
// //   const [createSubscriptionOrder, { isLoading: isCreatingOrder }] = useCreateSubscriptionOrderMutation()
// //   const [verifySubscriptionPayment, { isLoading: isVerifyingPayment }] = useVerifySubscriptionPaymentMutation()

// //   const handlePurchase = async (planName, planType) => {
// //     if (!user) {
// //       toast.info("Please log in to purchase a plan.")
// //       navigate("/login")
// //       return
// //     }
// //     if (!razorpayLoaded) {
// //       toast.error("Payment gateway is still loading. Please wait a moment.")
// //       return
// //     }

// //     setLoadingPlanName(planName); // Set loading state for this specific plan

// //     try {
// //       const orderData = await createSubscriptionOrder({ planName, planType }).unwrap()
// //       if (orderData.paymentSkipped) {
// //         toast.success("Subscription activated successfully!")
// //         navigate("/user")
// //         return
// //       }
// //       const options = {
// //         key: orderData.key_id,
// //         amount: orderData.order.amount,
// //         currency: "INR",
// //         name: "verify EKYC",
// //         description: `Subscription for ${planName} - ${planType} plan`,
// //         order_id: orderData.order.id,
// //         handler: async function (response) {
// //           try {
// //             await verifySubscriptionPayment({
// //               razorpay_order_id: response.razorpay_order_id,
// //               razorpay_payment_id: response.razorpay_payment_id,
// //               razorpay_signature: response.razorpay_signature,
// //               transactionId: orderData.transactionId,
// //             }).unwrap()
// //             toast.success("Payment successful! Your subscription is active.")
// //             navigate("/user")
// //           } catch (verifyError) {
// //             toast.error(verifyError.data?.message || "Payment verification failed. Please contact support.")
// //           } finally {
// //             setLoadingPlanName(null); // Clear loading state
// //           }
// //         },
// //         prefill: { name: user.name, email: user.email, contact: user.mobile },
// //         notes: { transactionId: orderData.transactionId, userId: user._id },
// //         theme: { color: "#090e19ff" },
// //         modal: {
// //           ondismiss: function() {
// //             setLoadingPlanName(null); // Clear loading state if payment modal is closed
// //           }
// //         }
// //       }
// //       const rzp = new window.Razorpay(options)
// //       rzp.open()
// //     } catch (err) {
// //       toast.error(err.data?.message || "An error occurred. Please try again.")
// //       setLoadingPlanName(null); // Clear loading state on error
// //     }
// //   }

// //   const isLoading = isCreatingOrder || isVerifyingPayment;
// //   const isAnyPlanLoading = loadingPlanName !== null; // Check if any plan is loading

// //   return (
// //     <section className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 md:py-24 relative overflow-hidden">
// //       {/* Premium Background Elements */}
// //       <div className="absolute inset-0">
// //         <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
// //         <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
// //         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
// //       </div>

// //       {/* Geometric Patterns */}
// //       <div className="absolute inset-0 opacity-5">
// //         <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rotate-45"></div>
// //         <div className="absolute bottom-20 right-20 w-24 h-24 border border-gray-300 rotate-12"></div>
// //         <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-gray-400 to-purple-400 rounded-full"></div>
// //         <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// //         {/* Header Section */}
// //         <div className="text-center mb-16">
// //           <div className="inline-flex items-center gap-3 bg-white shadow-lg border border-gray-200 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
// //             <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
// //               <Star className="w-3 h-3 text-white fill-current" />
// //             </div>
// //             <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
// //               Trusted by 50,000+ Users
// //             </span>
// //             <div className="flex">
// //               {[...Array(5)].map((_, i) => (
// //                 <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
// //               ))}
// //             </div>
// //           </div>

// //           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
// //             <span className="text-gray-900">
// //               Simple, Transparent
// //             </span>
// //             <br />
// //             <span className="bg-gradient-to-r from-gray-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
// //               Pricing
// //             </span>
// //           </h1>

// //           <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
// //             Choose the perfect plan for your verification needs.
// //           </p>

// //           {/* Toggle Switch */}
// //           <div className="flex items-center justify-center gap-6 mb-12">
// //             <span className={`text-lg font-bold transition-all duration-300 ${
// //               !isAnnual ? "text-gray-700" : "text-gray-700"
// //             }`}>
// //               Monthly
// //             </span>

// //             <div className="relative">
// //               <button
// //                 onClick={() => setIsAnnual(!isAnnual)}
// //                 className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
// //                   isAnnual ? "bg-gray-600" : "bg-gray-700"
// //                 }`}
// //               >
// //                 <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
// //                   isAnnual ? "translate-x-6" : "translate-x-1"
// //                 }`} />
// //               </button>
              
// //               {isAnnual && (
// //                 <Badge className="bg-green-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-md animate-pulse absolute -top-8 left-1/2 transform -translate-x-1/2">
// //                   Save Big!
// //                 </Badge>
// //               )}
// //             </div>

// //             <span className={`text-lg font-bold transition-all duration-300 ${
// //               isAnnual ? "text-gray-700" : "text-gray-700"
// //             }`}>
// //               Annual
// //             </span>
// //           </div>
// //         </div>

// //         {/* Pricing Cards */}
// //         <TooltipProvider>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
// //             {pricingPlans.map((plan) => {
// //               const IconComponent = plan.icon;
// //               const isPlanActive = user?.activeSubscriptions?.some(
// //                 (sub) => sub.category === plan.name && new Date(sub.expiresAt) > new Date()
// //               );
// //               const isSelected = plan.name === selectedPlanName;
// //               const isPlanLoading = loadingPlanName === plan.name;
// //               const isOtherPlanLoading = isAnyPlanLoading && !isPlanLoading;

// //               return (
// //                 <Card
// //                   key={plan.name}
// //                   onClick={() => !isAnyPlanLoading && setSelectedPlanName(plan.name)}
// //                   className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl group cursor-pointer backdrop-blur-sm
// //                     ${isSelected 
// //                       ? "border-2 border-gray-500 shadow-md scale-[1.02] bg-white" 
// //                       : "border border-gray-200 hover:border-gray-300 bg-white hover:scale-[1.01] transform"
// //                     } 
// //                     ${isOtherPlanLoading ? "opacity-50" : ""}
// //                   `}
// //                 >
// //                   {/* Gradient Border Effect */}
// //                   {isSelected && (
// //                     <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-10 rounded-lg`} />
// //                   )}

// //                   {isPlanActive && (
// //                     <div className="absolute top-1 right-1">
// //                       <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
// //                         <Check className="w-3 h-3 mr-1" />
// //                         Active
// //                       </Badge>
// //                     </div>
// //                   )}

// //                   <CardHeader className="text-center pb-4 pt-7 relative z-10">
// //                     <div className="flex justify-center mb-3">
// //                       <div className={`p-2 rounded-xl ${
// //                         isSelected 
// //                           ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg` 
// //                           : "bg-gray-100 text-gray-600 group-hover:bg-gray-100 group-hover:text-gray-600"
// //                       } transition-all duration-300`}>
// //                         <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
// //                       </div>
// //                     </div>
// //                     <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
// //                     <p className="text-gray-600 text-xs mb-4 px-2">{plan.description}</p>
// //                     <div className="mb-3 h-16 flex flex-col justify-center">
// //                       <div className="flex items-center justify-center gap-1 mb-1">
// //                         <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
// //                           {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
// //                         </span>
// //                         <div className="text-left">
// //                           <div className="text-xs text-gray-600">{isAnnual ? "/year" : "/month"}</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </CardHeader>

// //                   <CardContent className="px-4 pb-6 relative z-10">
// //                     <ul className="space-y-2 mb-5">
// //                       {plan.features.map((feature, idx) => (
// //                         <li key={idx} className="flex items-center gap-2">
// //                           <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
// //                             isSelected 
// //                               ? `bg-gradient-to-r ${plan.gradient}` 
// //                               : "bg-green-500"
// //                           }`}>
// //                             <Check className="w-2 h-2 text-white" />
// //                           </div>
// //                           <span className="text-xs text-gray-700 flex-1">{feature.name}</span>
// //                           {feature.hasInfo && (
// //                             <Tooltip>
// //                               <TooltipTrigger>
// //                                 <Info className="w-3 h-3 text-gray-400 cursor-help hover:text-gray-500 transition-colors" />
// //                               </TooltipTrigger>
// //                               <TooltipContent className="text-xs max-w-xs">
// //                                 <p>{feature.tooltip}</p>
// //                               </TooltipContent>
// //                             </Tooltip>
// //                           )}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                     <Button
// //                       onClick={(e) => {
// //                         e.stopPropagation(); // Prevent card's onClick from firing
// //                         handlePurchase(plan.name, isAnnual ? 'yearly' : 'monthly')
// //                       }}
// //                       disabled={isAnyPlanLoading}
// //                       className={`w-full py-3 text-sm font-semibold transition-all duration-300 ${
// //                         isPlanLoading 
// //                           ? `bg-gradient-to-r ${plan.gradient} text-white` 
// //                           : isOtherPlanLoading 
// //                             ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
// //                             : isSelected 
// //                               ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg text-white shadow-md transform hover:scale-105` 
// //                               : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-500 hover:text-gray-600"
// //                       } ${isAnyPlanLoading && "cursor-not-allowed"}`}
// //                     >
// //                       {isPlanLoading ? (
// //                         <div className="flex items-center justify-center gap-2">
// //                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                           Processing...
// //                         </div>
// //                       ) : (
// //                         <>
// //                           {plan.cta}
// //                           {isSelected && <Sparkles className="w-4 h-4 ml-2" />}
// //                         </>
// //                       )}
// //                     </Button>
// //                     <p className="text-[10px] text-gray-500 text-center mt-3">
// //                       No setup fees • Cancel anytime
// //                     </p>
// //                   </CardContent>
// //                 </Card>
// //               )
// //             })}
// //           </div>
// //         </TooltipProvider>

// //         {/* Custom Solution CTA */}
// //         <div className="text-center mt-10">
// //           <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
// //             <p className="text-gray-900 text-sm mb-3 font-semibold text-xl">Need a custom solution?</p>
// //             <Button
// //               onClick={() => navigate("/contact-us")}
// //               variant="outline"
// //               className="border-gray-900 md:text-lg bg-gray-900 text-white text-sm py-2 px-4 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
// //             >
// //               Contact Sales
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Custom CSS for animations */}
// //       <style jsx>{`
// //         @keyframes pulse {
// //           0%, 100% { opacity: 0.2; }
// //           50% { opacity: 0.4; }
// //         }
// //         .animate-pulse {
// //           animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
// //         }
// //       `}</style>
// //     </section>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"
// import { Check, Info, Star, Zap, Shield, Users, Building, Sparkles, Crown, Award, Briefcase } from "lucide-react"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import useRazorpay from "@/hooks/useRazorpay"
// // --- FIX: Import the hook to fetch pricing plans ---
// import { useGetPricingPlansQuery } from "@/app/api/pricingApiSlice"
// import { useCreateSubscriptionOrderMutation, useVerifySubscriptionPaymentMutation } from "@/app/api/paymentApiSlice"
// import { selectCurrentUser } from "@/features/auth/authSlice"

// // A mapping from plan names to icons and gradients for UI display
// const planUIMap = {
//   Personal: { icon: Users, gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
//   Professional: { icon: Briefcase, gradient: "from-gray-900 via-gray-900 to-gray-900" },
//   Enterprise: { icon: Shield, gradient: "from-amber-500 via-orange-500 to-red-500" },
// };

// // Features can also be fetched from the backend, but for now, we can keep them here for simplicity.
// const planFeaturesMap = {
//     Personal: [
//       { name: "25 Verifications/month", hasInfo: false },
//       { name: "Aadhaar & PAN", hasInfo: false },
//       { name: "Driving License & Voter ID", hasInfo: false },
//       { name: "Address Verification", hasInfo: false },
//       { name: "Criminal Check", hasInfo: false },
//       { name: "Profile Lookup", hasInfo: true, tooltip: "Basic profile information checks." },
//     ],
//     Professional: [
//       { name: "100 Verifications/month", hasInfo: false },
//       { name: "All Personal Features", hasInfo: false },
//       { name: "Passport & RC", hasInfo: false },
//       { name: "Bank & GSTIN Verification", hasInfo: false },
//       { name: "Employment Check", hasInfo: true, tooltip: "Verify employment history." },
//       { name: "Liveness & Face Match", hasInfo: true, tooltip: "Advanced biometric checks." },
//     ],
//     Enterprise: [
//       { name: "500 Verifications/month", hasInfo: false },
//       { name: "All Professional Features", hasInfo: false },
//       { name: "Unlimited Category Access", hasInfo: true, tooltip: "Access to all current and future verification types." },
//       { name: "All 20+ Verification Types", hasInfo: false },
//       { name: "SLA Support & Reporting", hasInfo: true, tooltip: "Guaranteed uptime and detailed reports." },
//       { name: "Dedicated Manager", hasInfo: true, tooltip: "A dedicated manager for your account." },
//     ],
// };


// export default function PricingSection() {
//   const [isAnnual, setIsAnnual] = useState(false)
//   const [selectedPlanName, setSelectedPlanName] = useState('Professional'); 
//   const [loadingPlanName, setLoadingPlanName] = useState(null); 
//   const navigate = useNavigate()
//   const razorpayLoaded = useRazorpay()
//   const user = useSelector(selectCurrentUser)
  
//   // --- FIX: Fetch pricing plans directly from the backend API ---
//   const { data: pricingPlans, isLoading: isLoadingPlans, isError } = useGetPricingPlansQuery();

//   const [createSubscriptionOrder, { isLoading: isCreatingOrder }] = useCreateSubscriptionOrderMutation()
//   const [verifySubscriptionPayment, { isLoading: isVerifyingPayment }] = useVerifySubscriptionPaymentMutation()

//   const handlePurchase = async (planName, planType) => {
//     if (!user) {
//       toast.info("Please log in to purchase a plan.")
//       navigate("/login")
//       return
//     }
//     if (!razorpayLoaded) {
//       toast.error("Payment gateway is still loading. Please wait a moment.")
//       return
//     }

//     setLoadingPlanName(planName); 

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
//             setLoadingPlanName(null); 
//           }
//         },
//         prefill: { name: user.name, email: user.email, contact: user.mobile },
//         notes: { transactionId: orderData.transactionId, userId: user._id },
//         theme: { color: "#090e19ff" },
//         modal: {
//           ondismiss: function() {
//             setLoadingPlanName(null); 
//           }
//         }
//       }
//       const rzp = new window.Razorpay(options)
//       rzp.open()
//     } catch (err) {
//       toast.error(err.data?.message || "An error occurred. Please try again.")
//       setLoadingPlanName(null); 
//     }
//   }

//   const isAnyPlanLoading = loadingPlanName !== null;

//   if (isLoadingPlans) {
//     return (
//         <div className="flex justify-center items-center w-full min-h-screen">
//             <div className="w-16 h-16 border-4 border-gray-600 border-solid rounded-full animate-spin border-t-transparent"></div>
//         </div>
//     );
//   }

//   if (isError || !pricingPlans) {
//       return (
//         <div className="flex flex-col justify-center items-center w-full min-h-screen text-center">
//             <h2 className="text-2xl font-bold text-red-600">Failed to load pricing plans.</h2>
//             <p className="text-gray-600 mt-2">Please check your network connection or contact support.</p>
//         </div>
//       )
//   }

//   return (
//     <section className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 md:py-24 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-3 bg-white shadow-lg border border-gray-200 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
//             <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//               <Star className="w-3 h-3 text-white fill-current" />
//             </div>
//             <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
//               Trusted by 50,000+ Users
//             </span>
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//               ))}
//             </div>
//           </div>

//           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//             <span className="text-gray-900">Simple, Transparent</span><br />
//             <span className="bg-gradient-to-r from-gray-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Pricing</span>
//           </h1>

//           <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//             Choose the perfect plan for your verification needs.
//           </p>

//           {/* Toggle Switch */}
//           <div className="flex items-center justify-center gap-6 mb-12">
//             <span className="text-lg font-bold text-gray-700">Monthly</span>
//             <div className="relative">
//               <button
//                 onClick={() => setIsAnnual(!isAnnual)}
//                 className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isAnnual ? "bg-gray-600" : "bg-gray-700"}`}
//               >
//                 <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${isAnnual ? "translate-x-6" : "translate-x-1"}`} />
//               </button>
//               {isAnnual && (
//                 <Badge className="bg-green-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-md animate-pulse absolute -top-8 left-1/2 transform -translate-x-1/2">Save Big!</Badge>
//               )}
//             </div>
//             <span className="text-lg font-bold text-gray-700">Annual</span>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <TooltipProvider>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
//             {pricingPlans.map((plan) => {
//               const uiDetails = planUIMap[plan.name] || { icon: Star, gradient: "from-gray-400 to-gray-600" };
//               const IconComponent = uiDetails.icon;
//               const features = planFeaturesMap[plan.name] || [];

//               const isPlanActive = user?.activeSubscriptions?.some(
//                 (sub) => sub.category === plan.name && new Date(sub.expiresAt) > new Date()
//               );
//               const isSelected = plan.name === selectedPlanName;
//               const isPlanLoading = loadingPlanName === plan.name;
//               const isOtherPlanLoading = isAnyPlanLoading && !isPlanLoading;

//               return (
//                 <Card
//                   key={plan.name}
//                   onClick={() => !isAnyPlanLoading && setSelectedPlanName(plan.name)}
//                   className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl group cursor-pointer backdrop-blur-sm ${isSelected ? "border-2 border-gray-500 shadow-md scale-[1.02] bg-white" : "border border-gray-200 hover:border-gray-300 bg-white hover:scale-[1.01] transform"} ${isOtherPlanLoading ? "opacity-50" : ""}`}
//                 >
//                   {isSelected && <div className={`absolute inset-0 bg-gradient-to-r ${uiDetails.gradient} opacity-10 rounded-lg`} />}
//                   {isPlanActive && <div className="absolute top-1 right-1"><Badge className="bg-green-100 text-green-800 border-green-200 text-xs"><Check className="w-3 h-3 mr-1" />Active</Badge></div>}
//                   <CardHeader className="text-center pb-4 pt-7 relative z-10">
//                     <div className="flex justify-center mb-3">
//                       <div className={`p-2 rounded-xl ${isSelected ? `bg-gradient-to-r ${uiDetails.gradient} text-white shadow-lg` : "bg-gray-100 text-gray-600 group-hover:bg-gray-100 group-hover:text-gray-600"} transition-all duration-300`}>
//                         <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
//                     <p className="text-gray-600 text-xs mb-4 px-2">{plan.description || `For ${plan.name} needs`}</p>
//                     <div className="mb-3 h-16 flex flex-col justify-center">
//                       <div className="flex items-center justify-center gap-1 mb-1">
//                         <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                           ₹{isAnnual ? plan.yearly.price.toLocaleString('en-IN') : plan.monthly.price.toLocaleString('en-IN')}
//                         </span>
//                         <div className="text-left">
//                           <div className="text-xs text-gray-600">{isAnnual ? "/year" : "/month"}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="px-4 pb-6 relative z-10">
//                     <ul className="space-y-2 mb-5">
//                       {features.map((feature, idx) => (
//                         <li key={idx} className="flex items-center gap-2">
//                           <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? `bg-gradient-to-r ${uiDetails.gradient}` : "bg-green-500"}`}>
//                             <Check className="w-2 h-2 text-white" />
//                           </div>
//                           <span className="text-xs text-gray-700 flex-1">{feature.name}</span>
//                           {feature.hasInfo && (
//                             <Tooltip>
//                               <TooltipTrigger><Info className="w-3 h-3 text-gray-400 cursor-help hover:text-gray-500 transition-colors" /></TooltipTrigger>
//                               <TooltipContent className="text-xs max-w-xs"><p>{feature.tooltip}</p></TooltipContent>
//                             </Tooltip>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                     <Button
//                       onClick={(e) => { e.stopPropagation(); handlePurchase(plan.name, isAnnual ? 'yearly' : 'monthly') }}
//                       disabled={isAnyPlanLoading}
//                       className={`w-full py-3 text-sm font-semibold transition-all duration-300 ${isPlanLoading ? `bg-gradient-to-r ${uiDetails.gradient} text-white` : isOtherPlanLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : isSelected ? `bg-gradient-to-r ${uiDetails.gradient} hover:shadow-lg text-white shadow-md transform hover:scale-105` : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-500 hover:text-gray-600"} ${isAnyPlanLoading && "cursor-not-allowed"}`}
//                     >
//                       {isPlanLoading ? (
//                         <div className="flex items-center justify-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Processing...
//                         </div>
//                       ) : ( <>Choose Plan {isSelected && <Sparkles className="w-4 h-4 ml-2" />}</> )}
//                     </Button>
//                     <p className="text-[10px] text-gray-500 text-center mt-3">No setup fees • Cancel anytime</p>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>
//         </TooltipProvider>

//         {/* Custom Solution CTA */}
//         <div className="text-center mt-10">
//           <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
//             <p className="text-gray-900 text-sm mb-3 font-semibold text-xl">Need a custom solution?</p>
//             <Button
//               onClick={() => navigate("/contact-us")}
//               variant="outline"
//               className="border-gray-900 md:text-lg bg-gray-900 text-white text-sm py-2 px-4 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Contact Sales
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Check, Info, Star, Zap, Shield, Users, Building, Sparkles, Crown, Award, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useRazorpay from "@/hooks/useRazorpay"
import { useGetPricingPlansQuery } from "@/app/api/pricingApiSlice"
import { useCreateSubscriptionOrderMutation, useVerifySubscriptionPaymentMutation } from "@/app/api/paymentApiSlice"
import { selectCurrentUser } from "@/features/auth/authSlice"

// A mapping from plan names to icons and gradients for UI display
const planUIMap = {
  Personal: { icon: Users, gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
  Professional: { icon: Briefcase, gradient: "from-gray-900 via-gray-900 to-gray-900" },
  Enterprise: { icon: Shield, gradient: "from-amber-500 via-orange-500 to-red-500" },
};

// Features can also be fetched from the backend, but for now, we can keep them here for simplicity.
const planFeaturesMap = {
    Personal: [
      { name: "25 Verifications/month", hasInfo: false },
      { name: "Aadhaar & PAN", hasInfo: false },
      { name: "Driving License & Voter ID", hasInfo: false },
      { name: "Address Verification", hasInfo: false },
      { name: "Criminal Check", hasInfo: false },
      { name: "Profile Lookup", hasInfo: true, tooltip: "Basic profile information checks." },
    ],
    Professional: [
      { name: "100 Verifications/month", hasInfo: false },
      { name: "All Personal Features", hasInfo: false },
      { name: "Passport & RC", hasInfo: false },
      { name: "Bank & GSTIN Verification", hasInfo: false },
      { name: "Employment Check", hasInfo: true, tooltip: "Verify employment history." },
      { name: "Liveness & Face Match", hasInfo: true, tooltip: "Advanced biometric checks." },
    ],
    Enterprise: [
      { name: "500 Verifications/month", hasInfo: false },
      { name: "All Professional Features", hasInfo: false },
      { name: "Unlimited Category Access", hasInfo: true, tooltip: "Access to all current and future verification types." },
      { name: "All 20+ Verification Types", hasInfo: false },
      { name: "SLA Support & Reporting", hasInfo: true, tooltip: "Guaranteed uptime and detailed reports." },
      { name: "Dedicated Manager", hasInfo: true, tooltip: "A dedicated manager for your account." },
    ],
};


export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlanName, setSelectedPlanName] = useState('Professional');
  const [loadingPlanName, setLoadingPlanName] = useState(null);
  const navigate = useNavigate()
  const razorpayLoaded = useRazorpay()
  const user = useSelector(selectCurrentUser)
  
  const { data: allPricingPlans, isLoading: isLoadingPlans, isError } = useGetPricingPlansQuery();
  
  const pricingPlans = allPricingPlans?.filter(plan =>
    plan && ["Personal", "Professional", "Enterprise"].includes(plan.name)
  ) || [];

  const [createSubscriptionOrder] = useCreateSubscriptionOrderMutation()
  const [verifySubscriptionPayment] = useVerifySubscriptionPaymentMutation()

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

    setLoadingPlanName(planName);

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
        name: "Verify EKYC",
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
            setLoadingPlanName(null);
          }
        },
        prefill: { name: user.name, email: user.email, contact: user.mobile },
        notes: { transactionId: orderData.transactionId, userId: user._id },
        theme: { color: "#090e19ff" },
        modal: {
          ondismiss: function() {
            setLoadingPlanName(null);
          }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      toast.error(err.data?.message || "An error occurred. Please try again.")
      setLoadingPlanName(null);
    }
  }

  const isAnyPlanLoading = loadingPlanName !== null;

  if (isLoadingPlans) {
    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="w-16 h-16 border-4 border-gray-600 border-solid rounded-full animate-spin border-t-transparent"></div>
        </div>
    );
  }

  if (isError || !pricingPlans) {
      return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen text-center">
            <h2 className="text-2xl font-bold text-red-600">Failed to load pricing plans.</h2>
            <p className="text-gray-600 mt-2">Please check your network connection or contact support.</p>
        </div>
      )
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-3 bg-white shadow-lg border border-gray-200 px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white fill-current" />
            </div>
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Trusted by 50,000+ Users
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">Simple, Transparent</span><br />
            <span className="bg-gradient-to-r from-gray-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Pricing</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your verification needs.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <span className="text-lg font-bold text-gray-700">Monthly</span>
            <div className="relative">
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isAnnual ? "bg-gray-600" : "bg-gray-700"}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${isAnnual ? "translate-x-6" : "translate-x-1"}`} />
              </button>
              {isAnnual && (
                <Badge className="bg-green-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-md animate-pulse absolute -top-8 left-1/2 transform -translate-x-1/2">Save Big!</Badge>
              )}
            </div>
            <span className="text-lg font-bold text-gray-700">Annual</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => {
              const uiDetails = planUIMap[plan.name] || { icon: Star, gradient: "from-gray-400 to-gray-600" };
              const IconComponent = uiDetails.icon;
              const features = planFeaturesMap[plan.name] || [];

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
                  className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl group cursor-pointer backdrop-blur-sm ${isSelected ? "border-2 border-gray-500 shadow-md scale-[1.02] bg-white" : "border border-gray-200 hover:border-gray-300 bg-white hover:scale-[1.01] transform"} ${isOtherPlanLoading ? "opacity-50" : ""}`}
                >
                  {isSelected && <div className={`absolute inset-0 bg-gradient-to-r ${uiDetails.gradient} opacity-10 rounded-lg`} />}
                  {isPlanActive && <div className="absolute top-1 right-1"><Badge className="bg-green-100 text-green-800 border-green-200 text-xs"><Check className="w-3 h-3 mr-1" />Active</Badge></div>}
                  <CardHeader className="text-center pb-4 pt-7 relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className={`p-2 rounded-xl ${isSelected ? `bg-gradient-to-r ${uiDetails.gradient} text-white shadow-lg` : "bg-gray-100 text-gray-600 group-hover:bg-gray-100 group-hover:text-gray-600"} transition-all duration-300`}>
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-gray-600 text-xs mb-4 px-2">{plan.description || `For ${plan.name} needs`}</p>
                    <div className="mb-3 h-16 flex flex-col justify-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          {/* --- FIX: Using Optional Chaining (?.) to prevent crash --- */}
                          ₹{isAnnual 
                             ? (plan.yearly?.price?.toLocaleString('en-IN') ?? 'N/A') 
                             : (plan.monthly?.price?.toLocaleString('en-IN') ?? 'N/A')}
                        </span>
                        <div className="text-left">
                          <div className="text-xs text-gray-600">{isAnnual ? "/year" : "/month"}</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-6 relative z-10">
                    <ul className="space-y-2 mb-5">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? `bg-gradient-to-r ${uiDetails.gradient}` : "bg-green-500"}`}>
                            <Check className="w-2 h-2 text-white" />
                          </div>
                          <span className="text-xs text-gray-700 flex-1">{feature.name}</span>
                          {feature.hasInfo && (
                            <Tooltip>
                              <TooltipTrigger><Info className="w-3 h-3 text-gray-400 cursor-help hover:text-gray-500 transition-colors" /></TooltipTrigger>
                              <TooltipContent className="text-xs max-w-xs"><p>{feature.tooltip}</p></TooltipContent>
                            </Tooltip>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handlePurchase(plan.name, isAnnual ? 'yearly' : 'monthly') }}
                      disabled={isAnyPlanLoading}
                      className={`w-full py-3 text-sm font-semibold transition-all duration-300 ${isPlanLoading ? `bg-gradient-to-r ${uiDetails.gradient} text-white` : isOtherPlanLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : isSelected ? `bg-gradient-to-r ${uiDetails.gradient} hover:shadow-lg text-white shadow-md transform hover:scale-105` : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-500 hover:text-gray-600"} ${isAnyPlanLoading && "cursor-not-allowed"}`}
                    >
                      {isPlanLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : ( <>Choose Plan {isSelected && <Sparkles className="w-4 h-4 ml-2" />}</> )}
                    </Button>
                    <p className="text-[10px] text-gray-500 text-center mt-3">No setup fees • Cancel anytime</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TooltipProvider>

        {/* Custom Solution CTA */}
        <div className="text-center mt-10">
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-gray-200">
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
    </section>
  )
}


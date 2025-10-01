// import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import { 
//   CheckCircle, 
//   Loader2, 
//   Star, 
//   ArrowRight, 
//   ChevronLeft, 
//   ChevronRight, 
//   Play, 
//   Pause,
//   Users,
//   Shield,
//   Clock,
//   Zap,
//   TrendingUp,
//   Award
// } from "lucide-react";

// // Import your existing API hook
// import { useGetServicesQuery } from "@/app/api/serviceApiSlice";

// // Import your existing static images
// import criminal from "@/assets/criminal.png";
// import PANCardImage from "@/assets/PANCardImage.svg";
// import AadharCardImage from "@/assets/AadharCardImage.svg";
// import VoterCardImage from "@/assets/VoterCardImage.svg";

// // A small array of static images to use as fallbacks for API services without an image
// const fallbackImages = [PANCardImage, AadharCardImage, VoterCardImage];

// // Enhanced service card component with professional design
// const ServiceCard = ({ service, index, isActive, onClick, isCenter }) => {
//   const imageUrl = service.imageUrl || service.serviceImage || fallbackImages[index % fallbackImages.length];
  
//   // Format usage count for better readability
//   const formatUsageCount = (count) => {
//     if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
//     if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
//     return count.toString();
//   };

//   return (
//     <div className={`flex-shrink-0 w-[85vw] sm:w-[380px] lg:w-[420px] mx-2 sm:mx-4 transition-all duration-700 transform ${
//       isCenter ? 'scale-100 z-10' : 'scale-90 opacity-60'
//     }`}>
//       <div 
//   onClick={() => onClick && onClick(service)}
//   className={`relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 h-[480px] sm:h-[520px] text-gray-900 shadow-2xl border border-gray-100 overflow-hidden group transition-all duration-500 flex flex-col
//     ${service.isStatic ? 'cursor-default' : 'cursor-pointer hover:shadow-3xl'}
//     ${isCenter ? 'ring-4 ring-blue-400 scale-105 z-20' : 'opacity-70'}
//   `}
// >

//         {/* Premium badge for top services */}
//         {!service.isStatic && service.globalUsageCount > 10000 && (
//           <div className="absolute top-4 right-4 z-10">
//             <div className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
//               <Award className="w-3 h-3" />
//               POPULAR
//             </div>
//           </div>
//         )}

//         {/* Enhanced image section with background gradient */}
//         <div className="relative w-full h-44 sm:h-48 flex items-center justify-center mb-6 rounded-2xl bg-gradient-to-br from-white-50 via-white-50 to-white-50 group-hover:from-white-100 group-hover:to-white-100 transition-all duration-500">
//           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
//           <img 
//             src={imageUrl} 
//             alt={service.name}
//             className="relative z-10 h-32 sm:h-36 w-auto object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
//           />
//         </div>

//         {/* Enhanced service content */}
//         <div className="flex flex-col justify-between h-full">
//           <div>
//             {/* Service title */}
//             <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
//               {service.name}
//             </h3>

//             {/* Service stats and status */}
//             {!service.isStatic ? (
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center text-green-600 text-sm font-medium">
//                     <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
//                     <span>Active Service</span>
//                   </div>
//                   <div className="flex items-center text-blue-600 text-sm font-medium">
//                     <TrendingUp className="w-4 h-4 mr-1" />
//                     <span>Trusted</span>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
//                   <div className="flex items-center text-gray-700">
//                     <Users className="w-4 h-4 mr-2 text-blue-600" />
//                     <span className="text-sm font-medium">{formatUsageCount(service.globalUsageCount)} verified</span>
//                   </div>
//                   <div className="flex items-center text-gray-700">
//                     <Clock className="w-4 h-4 mr-2 text-green-600" />
//                     <span className="text-sm font-medium">Instant</span>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center text-amber-600 text-sm font-medium">
//                   <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
//                   <span>Coming Soon</span>
//                 </div>
//                 <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-200">
//                   <div className="flex items-center text-amber-700">
//                     <Star className="w-4 h-4 mr-2" />
//                     <span className="text-sm font-medium">Be the first to get notified</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Enhanced pricing and CTA section */}
//           <div className="mt-auto space-y-4">
//             <div className="flex items-end justify-between">
//               <div>
//                 <div className="flex items-baseline">
//                   <span className="text-3xl font-bold text-gray-900">₹{service.price}</span>
//                   <span className="text-gray-500 ml-2 text-base">/verification</span>
//                 </div>
//                 {!service.isStatic && (
//                   <div className="flex items-center mt-1">
//                     <Shield className="w-4 h-4 text-green-500 mr-1" />
//                     <span className="text-xs text-green-600 font-medium">Secure & Instant</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               className={`w-full py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-500 flex items-center justify-center group/btn ${
//                 service.isStatic 
//                   ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 cursor-default hover:from-gray-200 hover:to-gray-300' 
//                   : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
//               }`}
//             >
//               {service.isStatic ? (
//                 <>
//                   <Star className="w-5 h-5 mr-2 text-amber-400" />
//                   <span>Notify Me</span>
//                 </>
//               ) : (
//                 <>
//                   <Zap className="w-5 h-5 mr-2 group-hover/btn:animate-pulse" />
//                   <span>Start Verification</span>
//                   <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Animated border effect for active cards */}
//        {isCenter && (
//   <div className="absolute inset-0 rounded-3xl bg-blue-100 opacity-20 animate-pulse pointer-events-none"></div>
// )}

//       </div>
//     </div>
//   );
// };

// export default function ServicesSection() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [visibleCards, setVisibleCards] = useState(1);
//   const intervalRef = useRef();
//   const containerRef = useRef();
  
//   // Fetch all services
//   const { 
//     data: servicesResponse, 
//     isLoading, 
//     isError, 
//     error 
//   } = useGetServicesQuery();

//   // Calculate visible cards based on screen size
//   useEffect(() => {
//     const updateVisibleCards = () => {
//       const width = window.innerWidth;
//       if (width >= 1024) setVisibleCards(3);
//       else if (width >= 640) setVisibleCards(2);
//       else setVisibleCards(1);
//     };

//     updateVisibleCards();
//     window.addEventListener('resize', updateVisibleCards);
//     return () => window.removeEventListener('resize', updateVisibleCards);
//   }, []);

//   // Show all active services along with static 'Coming Soon' cards
//   const allServices = useMemo(() => {
//     const services = servicesResponse?.data || [];
//     const activeServices = services.filter(service => service.is_active);
//     const sortedServices = [...activeServices].sort((a, b) => b.globalUsageCount - a.globalUsageCount);

//     const staticServices = [
//       {
//         _id: 'static-criminal-verification',
//         name: 'Criminal Background Verification',
//         price: 299,
//         globalUsageCount: 0,
//         is_active: false,
//         isStatic: true,
//         category: 'Criminal Verification',
//         serviceImage: criminal
//       },
//       {
//         _id: 'static-pan-verification',
//         name: 'PAN Card Verification',
//         price: 49,
//         globalUsageCount: 0,
//         is_active: false,
//         isStatic: true,
//         category: 'Identity Verification',
//         serviceImage: PANCardImage
//       },
//       {
//         _id: 'static-aadhaar-verification', 
//         name: 'Aadhaar Card Verification',
//         price: 99,
//         globalUsageCount: 0,
//         is_active: false,
//         isStatic: true,
//         category: 'Identity Verification',
//         serviceImage: AadharCardImage
//       },
//     ];
    
//     return [...staticServices, ...sortedServices];
//   }, [servicesResponse]);

//   // Enhanced auto-scroll functionality
//   useEffect(() => {
//     if (isAutoPlaying && allServices.length > 0) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % allServices.length);
//       }, 4500);
//     }
    
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isAutoPlaying, allServices.length]);

//   const handleCardClick = useCallback((service) => {
//     if (!service.isStatic) {
//       window.location.href = `/product/${service._id}`;
//     }
//   }, []);

//   // Handle manual navigation
//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 12000);
//   };

//   const goToPrevious = () => {
//     const newIndex = currentIndex === 0 ? allServices.length - 1 : currentIndex - 1;
//     goToSlide(newIndex);
//   };

//   const goToNext = () => {
//     const newIndex = (currentIndex + 1) % allServices.length;
//     goToSlide(newIndex);
//   };

//   const toggleAutoPlay = () => {
//     setIsAutoPlaying(!isAutoPlaying);
//   };

//   // Calculate center card index for mobile
//   const getCenterIndex = () => {
//     if (visibleCards === 1) return currentIndex;
//     return currentIndex + Math.floor(visibleCards / 2);
//   };

//   // Handle loading state
//   if (isLoading) {
//     return (
//       <section className="w-full bg-gradient-to-b from-gray-50 via-blue-50 to-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="relative">
//             <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
//             <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-blue-200 rounded-full animate-ping"></div>
//           </div>
//           <h2 className="mt-6 text-2xl font-bold text-gray-900">Loading Professional Services...</h2>
//           <p className="mt-2 text-gray-600">Preparing your verification solutions</p>
//         </div>
//       </section>
//     );
//   }

//   // Handle error state
//   if (isError) {
//     return (
//       <section className="w-full bg-gradient-to-b from-red-50 to-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-200">
//             <h2 className="text-3xl font-bold text-red-700 mb-4">Service Temporarily Unavailable</h2>
//             <p className="text-gray-600 mb-6">
//               {error?.data?.message || "We're working to restore our services. Please try again shortly."}
//             </p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-50 py-20 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Enhanced header section */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-sm font-bold mb-8 shadow-xl animate-bounce">
//             <CheckCircle className="w-5 h-5" />
//             India's #1 Verification Platform
//             <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//           </div>
          
//           <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
//             Premium Identity &
//             <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent block">
//               Verification Services
//             </span>
//           </h2>
          
//           <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
//             Trusted by <span className="font-bold text-blue-600">1000+</span> businesses across India. 
//             Instant, secure, and reliable verification solutions powered by cutting-edge technology.
//           </p>

//           <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base">
//             <div className="flex items-center gap-2 text-gray-700">
//               <Shield className="w-5 h-5 text-green-500" />
//               <span className="font-medium">Bank-Grade Security</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <Zap className="w-5 h-5 text-blue-500" />
//               <span className="font-medium">Instant Results</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <Award className="w-5 h-5 text-purple-500" />
//               <span className="font-medium">99.9% Accuracy</span>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced carousel container with navigation arrows */}
//         <div className="relative">
//           {/* Navigation Arrows for desktop */}
//           <button 
//             onClick={goToPrevious} 
//             className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-gray-200 text-gray-600 hover:bg-white transition-colors duration-300 absolute left-[-40px] top-1/2 -translate-y-1/2 z-20 shadow-xl"
//             aria-label="Previous slide"
//           >
//             <ChevronLeft className="w-8 h-8" />
//           </button>
          
//           <button 
//             onClick={goToNext} 
//             className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-gray-200 text-gray-600 hover:bg-white transition-colors duration-300 absolute right-[-40px] top-1/2 -translate-y-1/2 z-20 shadow-xl"
//             aria-label="Next slide"
//           >
//             <ChevronRight className="w-8 h-8" />
//           </button>

//           {/* Enhanced moving cards container */}
//           <div className="relative ">
//             <div 
//               ref={containerRef}
//               className="flex transition-transform duration-1000 ease-in-out"
//              style={{
//   transform: visibleCards === 1
//     ? `translateX(-${currentIndex * 100}%)` // Mobile: ek card full width center
//     : `translateX(-${currentIndex * (150 / visibleCards)}%)` // Tablet/Desktop: multiple cards
// }}

//             >
//               {allServices.map((service, index) => (
//                 <ServiceCard 
//                   key={service._id} 
//                   service={service} 
//                   index={index}
//                   isActive={index === currentIndex}
//                   isCenter={Math.abs(index - getCenterIndex()) <= Math.floor(visibleCards / 2)}
//                   onClick={handleCardClick}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Mobile progress indicators */}
//           <div className="lg:hidden flex justify-center items-center gap-3 mt-12">
//             <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
//               {allServices.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`transition-all duration-500 rounded-full ${
//                     index === currentIndex 
//                       ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-indigo-600' 
//                       : 'w-3 h-3 bg-gray-300'
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* Enhanced call to action section */}
//         <div className="mt-24">
//           <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-16 text-white overflow-hidden shadow-2xl">
//             {/* Background pattern */}
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-yellow-600/20 backdrop-blur-3xl"></div>
//             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
            
//             <div className="relative z-10 text-center">
//               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-8">
//                 <Star className="w-4 h-4" />
//                 Join 1000+ Satisfied Customers
//               </div>
              
//               <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
//                 Transform Your Business with
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
//                   Instant Verification
//                 </span>
//               </h3>
              
//               <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
//                 Experience the power of real-time verification with our enterprise-grade APIs. 
//                 Reduce fraud by 95% and boost customer trust instantly.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                 <button className="group inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2">
//                   <Zap className="w-6 h-6 group-hover:animate-bounce" />
//                   Start Free Trial
//                   <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
//                 </button>
                
//                 <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-500 border border-white/20">
//                   <Shield className="w-6 h-6" />
//                   View All Services
//                 </button>
//               </div>
              
//               <div className="flex flex-wrap justify-center gap-8 mt-12 text-blue-200">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                   <span className="font-medium">No Setup Fees</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                   <span className="font-medium">24/7 Support</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                   <span className="font-medium">Enterprise Ready</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  CheckCircle,
  Loader2,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Zap,
  Award,
  Users,
} from "lucide-react";

// Import your existing API hook
import { useGetServicesQuery } from "@/app/api/serviceApiSlice";

// Import your existing static images
import criminal from "@/assets/criminal.png";
import PANCardImage from "@/assets/PANCardImage.svg";
import AadharCardImage from "@/assets/AadharCardImage.svg";
import VoterCardImage from "@/assets/VoterCardImage.svg";

// A small array of static images to use as fallbacks for API services without an image
const fallbackImages = [PANCardImage, AadharCardImage, VoterCardImage];

// Slugify function to create URL-friendly names (same as in your header)
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
};

// Simple and professional service card component
const ServiceCard = ({ service, onClick }) => {
  const imageUrl = service.imageUrl || service.serviceImage || fallbackImages[0];
  
  const formatUsageCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M+`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K+`;
    return count.toString();
  };

  return (
    <div
      onClick={() => onClick && onClick(service)}
      className={`
        flex-shrink-0 w-full md:w-[350px] lg:w-[380px]
        bg-white rounded-2xl shadow-lg border border-gray-100
        p-6 flex flex-col items-center text-center
        transition-transform duration-300 hover:shadow-xl
        ${!service.isStatic ? 'cursor-pointer hover:-translate-y-2' : ''}
      `}
    >
      <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gray-50">
        <img
          src={imageUrl}
          alt={service.name}
          className="w-16 h-16 object-contain"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-900 leading-tight">
        {service.name}
      </h3>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Users className="w-4 h-4 mr-1 text-blue-500" />
        <span>
          {service.isStatic
            ? "Coming Soon"
            : `${formatUsageCount(service.globalUsageCount)} verified users`}
        </span>
      </div>

      <p className="text-3xl font-bold mb-4 text-gray-900">
        ₹{service.price}
        <span className="text-base font-normal text-gray-500">/verification</span>
      </p>

      <button
        className={`
          w-full py-2.5 px-4 rounded-xl font-semibold text-sm
          transition-colors duration-300 flex items-center justify-center
          ${
            service.isStatic
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }
        `}
      >
        {service.isStatic ? (
          <>
            <Clock className="w-4 h-4 mr-2" />
            Notify Me
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 mr-2" />
            Start Verification
          </>
        )}
      </button>
    </div>
  );
};

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef();

  const {
    data: servicesResponse,
    isLoading,
    isError,
    error,
  } = useGetServicesQuery();

  const allServices = useMemo(() => {
    const services = servicesResponse?.data || [];
    const activeServices = services.filter((s) => s.is_active);
    const sortedServices = [...activeServices].sort(
      (a, b) => b.globalUsageCount - a.globalUsageCount
    );

    const staticServices = [
      {
        _id: 'static-criminal-verification',
        name: 'Criminal Background Verification',
        price: 299,
        globalUsageCount: 0,
        is_active: false,
        isStatic: true,
        serviceImage: criminal,
      },
      {
        _id: 'static-pan-verification',
        name: 'PAN Card Verification',
        price: 49,
        globalUsageCount: 0,
        is_active: false,
        isStatic: true,
        serviceImage: PANCardImage,
      },
      {
        _id: 'static-aadhaar-verification',
        name: 'Aadhaar Card Verification',
        price: 99,
        globalUsageCount: 0,
        is_active: false,
        isStatic: true,
        serviceImage: AadharCardImage,
      },
      {
        _id: 'static-voter-verification',
        name: 'Voter ID Verification',
        price: 79,
        globalUsageCount: 0,
        is_active: false,
        isStatic: true,
        serviceImage: VoterCardImage,
      },
    ];

    return [...sortedServices, ...staticServices];
  }, [servicesResponse]);

  const handleCardClick = useCallback((service) => {
    if (!service.isStatic) {
      // Fixed: Using slugify function instead of service._id to match your header routing
      const slugifiedName = slugify(service.name);
      window.location.href = `/product/${slugifiedName}`;
    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allServices.length) % allServices.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allServices.length);
  };
  
  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0].offsetWidth;
      containerRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }, [currentIndex]);

  if (isLoading) {
    return (
      <section className="py-20 flex items-center justify-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-4">
          Error Loading Services
        </h2>
        <p className="text-gray-600">
          We could not load the services. Please try again.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Professional Services
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Instant, secure, and reliable verification solutions.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out"
            >
              {allServices.map((service, index) => (
                <div key={service._id} className="flex-none w-full md:w-1/2 lg:w-1/3 p-2">
                  <ServiceCard service={service} onClick={handleCardClick} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows for both mobile and desktop */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-gray-600 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-gray-600 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
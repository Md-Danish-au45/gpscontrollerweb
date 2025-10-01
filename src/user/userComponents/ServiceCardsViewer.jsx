"use client"

import { useState, useMemo, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "@/cards/ServiceCard";
import ServiceListCard from "./ServiceListCard";
import { UserInfoCard } from "./UserInfoCard";
import { UserDetailsCard } from "./UserDetailsCard";
import SubscriptionPurchaseCard from "./SubscriptionPurchaseCard";
import CategoryFilter from "./CategoryFilter";
import CalendarWidget from "./CalendarWidget";
import VerificationResultsWidget from "./VerificationResultsWidget";
import { useExecuteSubscribedServiceMutation } from "@/app/api/verificationApiSlice";
import { useGetProfileQuery } from "@/app/api/authApiSlice";
import { X, RefreshCw, LayoutGrid, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetPricingPlansQuery } from "@/app/api/pricingApiSlice";

export default function ServiceCardsViewer({ services = [], pricingPlans = [], isLoading, userInfo, onNavigateToVerificationHistory, selectedCategory }) {
  const [activeService, setActiveService] = useState(null);
  const [purchasePlan, setPurchasePlan] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationError, setVerificationError] = useState(null);
  const [inputData, setInputData] = useState(null);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const [activeCategory, setActiveCategory] = useState('All'); // For main category filter
  const [activeSubcategory, setActiveSubcategory] = useState(null); // For subcategory filter

  const { refetch: refetchUserProfile } = useGetProfileQuery();
  const [executeService, { isLoading: isVerifying }] = useExecuteSubscribedServiceMutation();

  const { data: pricingPlansData, isLoading: isLoadingPricing } = useGetPricingPlansQuery();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Sync category with sidebar selection (if provided)
  useEffect(() => {
    if (selectedCategory === undefined) return;
    const trimmed = String(selectedCategory || '').trim();
    const normalized = (trimmed.toLowerCase() === 'all services' || trimmed.toLowerCase() === 'all') ? 'All' : trimmed;
    setActiveCategory(normalized);
    setActiveSubcategory(null);
  }, [selectedCategory]);

  // When subcategory is set but category is 'All', attempt to infer its parent to prevent empty state
  useEffect(() => {
    if (!activeSubcategory || !isAllCategory(activeCategory)) return;
    const match = services.find(s => normalize(s.subcategory) === normalize(activeSubcategory));
    if (match?.category) {
      setActiveCategory(match.category);
    }
  }, [activeSubcategory, activeCategory, services]);

  // Updated subscription check logic
  const getServiceSubscription = useMemo(() => {
    if (!userInfo?.activeSubscriptions) return new Map();
    const subscriptionMap = new Map();
    
    userInfo.activeSubscriptions.forEach(sub => {
      // Check if subscription is active and has remaining usage
      const isActive = new Date(sub.expiresAt) > new Date();
      const hasRemainingUsage = sub.usageCount < sub.usageLimit;
      
      if (isActive && hasRemainingUsage) {
        const key = sub.category || sub.subcategory;
        if (key) {
          subscriptionMap.set(key, {
            ...sub,
            remaining: sub.usageLimit - sub.usageCount
          });
        }
      }
    });
    
    return subscriptionMap;
  }, [userInfo]);

  // Simplified verification count logic
  const getServiceVerifications = useMemo(() => {
    const verificationMap = {};
    
    services.forEach(service => {
      const subscription = getServiceSubscription.get(service.subcategory);
      verificationMap[service._id] = subscription ? subscription.remaining : 0;
    });
    
    return verificationMap;
  }, [services, getServiceSubscription]);

  // Helper functions for category filtering
  const normalize = (str) => String(str || '').toLowerCase().trim();
  const isAllCategory = (cat) => normalize(cat) === 'all' || normalize(cat) === 'all services';

  // Extract unique categories and filter services
  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(services.map(s => s.category).filter(Boolean))];
    return uniqueCategories;
  }, [services]);

  const filteredServices = useMemo(() => {
    if (isAllCategory(activeCategory)) {
      return services;
    }
    return services.filter(service => normalize(service.category) === normalize(activeCategory));
  }, [services, activeCategory]);

  const handleActionButtonClick = (service) => {
    setVerificationResult(null);
    setVerificationError(null);
    setInputData(null);
    
    // Updated subscription check logic
    const subscription = getServiceSubscription.get(service.subcategory);
    const isSubscribed = subscription && subscription.remaining > 0;

    if (isSubscribed) {
      if (service.subcategory) {
        navigate(`/user/service/${service.subcategory}`);
      } else {
        setActiveService(service);
        setPurchasePlan(null);
      }
    } else {
      if (service.subcategory) {
        const dynamicPlanForPurchase = { 
          name: service.subcategory, 
          price: service.price || 299,
          monthly: { price: service.price || 299 } 
        };
        setPurchasePlan(dynamicPlanForPurchase);
        setActiveService(null);
      } else {
        const staticPlanName = `${service.category} Plan`;
        toast.error(`This service can only be accessed by purchasing the "${staticPlanName}".`);
        setActiveService(null);
        setPurchasePlan(null);
      }
    }
  };

  const handleCloseModal = () => {
    setActiveService(null);
    setPurchasePlan(null);
  };

  const handleExecuteVerification = async (payload) => {
    if (!activeService) return;
    setInputData(payload);
    setVerificationResult(null);
    setVerificationError(null);
    try {
      const result = await executeService({
        serviceKey: activeService.service_key,
        payload
      }).unwrap();
      setVerificationResult(result.data);
      await refetchUserProfile();
    } catch (err) {
      setVerificationError(err.data || { message: "Service execution failed." });
      toast.error(err.data?.message || "Could not execute service.");
    }
  };

  const handleNewVerification = () => {
    setVerificationResult(null);
    setVerificationError(null);
    setInputData(null);
  };

  if (isLoading || isLoadingPricing) {
    return (
      <div className="flex justify-center items-center w-full h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Category Filter Component */}
      <CategoryFilter
        services={services}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        activeSubcategory={activeSubcategory}
        onSubcategorySelect={setActiveSubcategory}
      />

      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
        {/* Left Side - Services */}
        <div className="flex-1 min-w-0">
          {/* View Mode Toggle Buttons */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-gray-800">Available Services</h2>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-200">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 h-8 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 h-8 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {filteredServices.map((service) => {
                const subscription = getServiceSubscription.get(service.subcategory);
                const isSubscribed = subscription && subscription.remaining > 0;
                const remainingVerifications = subscription ? subscription.remaining : 0;
                return (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    imageSrc={service.imageUrl || "/placeholder.svg"}
                    serviceName={service.name}
                    verificationCount={remainingVerifications}
                    price={service.price}
                    buttonType={isSubscribed ? "verify" : "purchase"}
                    onButtonClick={() => handleActionButtonClick(service)}
                    isSubscribed={isSubscribed}
                  />
                );
              })}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredServices.map((service) => {
                const subscription = getServiceSubscription.get(service.subcategory);
                const isSubscribed = subscription && subscription.remaining > 0;
                const remainingVerifications = subscription ? subscription.remaining : 0;
                return (
                  <ServiceListCard
                    key={service._id}
                    service={service}
                    buttonType={isSubscribed ? "verify" : "purchase"}
                    onButtonClick={() => handleActionButtonClick(service)}
                    remainingVerifications={remainingVerifications}
                    isSubscribed={isSubscribed}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side - Widgets */}
        <div className="xl:w-80 flex-shrink-0 space-y-4 lg:space-y-6">
          {/* Calendar Widget */}
          <CalendarWidget />
          
          {/* Verification Results Widget */}
          <VerificationResultsWidget onNavigateToVerificationHistory={onNavigateToVerificationHistory} />
        </div>
      </div>

      {/* Verification & Purchase Modals */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-0 right-0 z-20 p-2 rounded-full text-gray-500 bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="p-6 space-y-4">
                {!(verificationResult || verificationError) ? (
                  <UserInfoCard
                    services={[activeService]}
                    activeServiceId={activeService.service_key}
                    onVerify={handleExecuteVerification}
                    isVerifying={isVerifying}
                    isSubscribed={true}
                  />
                ) : (
                  <>
                    <UserDetailsCard
                      result={verificationResult}
                      error={verificationError}
                      serviceName={activeService?.name}
                      inputData={inputData}
                    />
                    <Button
                      onClick={handleNewVerification}
                      variant="outline"
                      className="w-full"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Perform New Verification
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {purchasePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative z-10 w-full max-w-lg">
            <SubscriptionPurchaseCard
              planData={purchasePlan}
              userInfo={userInfo}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
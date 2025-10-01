"use client"

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Shield, Award, Loader2, Tag, X, Zap, Crown } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

// API hooks for coupon and the DYNAMIC payment flow
import { useLazyValidateCouponCodeQuery } from "@/app/api/couponApiSlice";
import { useCreateDynamicSubscriptionOrderMutation, useVerifySubscriptionPaymentMutation } from "@/app/api/paymentApiSlice";
import { useGetProfileQuery } from "@/app/api/authApiSlice";
import { useNavigate } from "react-router-dom";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Enhanced subscription purchase card with billing cycle and quantity options
export default function SubscriptionPurchaseCard({ planData, userInfo, onClose }) {
  // State for coupon handling
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState(null);
  
  // New state for billing cycle and quantity
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [quantity, setQuantity] = useState(150); // Start with monthly minimum
  const [customQuantity, setCustomQuantity] = useState('');
  const [customError, setCustomError] = useState('');

  const navigate = useNavigate()
  // REMOVED: Unnecessary state for plan selection

  // API mutation hooks, now only for the dynamic flow
  const [createDynamicOrder, { isLoading: isCreatingOrder }] = useCreateDynamicSubscriptionOrderMutation();
  const [verifySubscriptionPayment, { isLoading: isVerifyingPayment }] = useVerifySubscriptionPaymentMutation();
  const [triggerValidation, { isLoading: isValidatingCoupon }] = useLazyValidateCouponCodeQuery();
  const { refetch: refetchUserProfile } = useGetProfileQuery();

  const isProcessing = isCreatingOrder || isVerifyingPayment;
  
  // Simple price calculation based on product unit price and quantity
  const getCurrentPrice = () => {
    // Always use the product's own price; billing cycle doesn't change unit price
    const unitPrice = Number(
      planData?.price ??
      planData?.monthly?.price ??
      planData?.quarterly?.price ??
      planData?.yearly?.price ?? 0
    ) || 0;

    let duration = '1 month';
    switch (billingCycle) {
      case 'quarterly':
        duration = '3 months';
        break;
      case 'yearly':
        duration = '12 months';
        break;
      default:
        duration = '1 month';
        break;
    }

    return {
      price: unitPrice * quantity,
      basePrice: unitPrice * quantity,
      quantity: quantity,
      duration: duration,
      unitPrice
    };
  };

  const priceInfo = getCurrentPrice();

  const handleApplyCoupon = async () => {
    if (!couponInput || !planData?.name) return;
    setCouponError(null);

    try {
      const result = await triggerValidation(couponInput).unwrap();
      const coupon = result.data;

      // ... Coupon validation logic remains the same and works correctly
      if (new Date(coupon.expiryDate) < new Date()) {
        const errorMessage = "This coupon has expired.";
        setCouponError(errorMessage); toast.error(errorMessage); return;
      }
      if (coupon.maxUses && coupon.timesUsed >= coupon.maxUses) {
        const errorMessage = "This coupon has reached its usage limit.";
        setCouponError(errorMessage); toast.error(errorMessage); return;
      }
      if (coupon.applicableCategories.length > 0 && !coupon.applicableCategories.includes(planData.name)) {
        const errorMessage = `This coupon is not valid for the "${planData.name}" plan.`;
        setCouponError(errorMessage); toast.error(errorMessage); return;
      }
      if (coupon.minAmount > 0 && priceInfo.price < coupon.minAmount) {
        const errorMessage = `This coupon requires a minimum purchase of ₹${coupon.minAmount}.`;
        setCouponError(errorMessage); toast.error(errorMessage); return;
      }

      setAppliedCoupon(coupon);
      toast.success("Coupon applied successfully!");

    } catch (err) {
      const errorMessage = err?.data?.message || "Invalid or expired coupon code.";
      setAppliedCoupon(null);
      setCouponError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
    toast.success("Coupon removed.");
  };

  // Get minimum quantity for each billing cycle
  const getMinimumQuantity = (cycle) => {
    switch (cycle) {
      case 'monthly':
        return 150;
      case 'quarterly':
        return 500;
      case 'yearly':
        return 1000;
      default:
        return 150;
    }
  };

  // Preset quantities by cycle (Yearly should show 1000 and 5000)
  const getPresetQuantities = (cycle) => {
    if (cycle === 'yearly') return [1000, 5000];
    if (cycle === 'quarterly') return [500, 1000, 2500];
    // monthly
    return [150, 500, 1000];
  };

  // Handle billing cycle change with minimum quantity enforcement
  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
    const minQuantity = getMinimumQuantity(cycle);
    if (quantity < minQuantity) {
      setQuantity(minQuantity);
    }
    setCustomQuantity(''); // Clear custom input when changing cycle
    setCustomError('');
  };

  // Handle preset quantity button clicks
  const handleQuantitySelect = (qty) => {
    const minQuantity = getMinimumQuantity(billingCycle);
    const selectedQuantity = Math.max(qty, minQuantity);
    setQuantity(selectedQuantity);
    setCustomQuantity(selectedQuantity.toString());
    setCustomError('');
  };

  // Handle custom quantity input
  const handleCustomQuantityChange = (e) => {
    const value = e.target.value;
    setCustomQuantity(value);
    const numValue = parseInt(value);
    const cycleMin = getMinimumQuantity(billingCycle);
    // show error if below cycle minimum
    if (!isNaN(numValue) && numValue > 0) {
      if (numValue < cycleMin) {
        setCustomError(`Minimum for ${billingCycle} is ${cycleMin}`);
        // Do not update quantity downward; keep previous valid quantity
      } else {
        setCustomError('');
        setQuantity(numValue);
      }
    } else {
      setCustomError('');
    }
  };

  const handlePurchase = async () => {
    // Validate minimum quantity requirements
    const cycleMinQuantity = getMinimumQuantity(billingCycle);
    const customMinQuantity = 50;
    
    // Check if this is custom input (different conditions)
    const isCustomInput = customQuantity && parseInt(customQuantity) > 0;
    const effectiveMinQuantity = isCustomInput ? Math.max(customMinQuantity, cycleMinQuantity) : cycleMinQuantity;
    
    if (quantity < effectiveMinQuantity) {
      if (isCustomInput && quantity < customMinQuantity) {
        toast.error(`Minimum quantity for custom input is ${customMinQuantity}`);
      } else {
        toast.error(`Minimum quantity for ${billingCycle} is ${cycleMinQuantity}`);
      }
      return;
    }

    try {
      // Create order with explicit unit price and total to avoid server defaults
      const orderResponse = await createDynamicOrder({
        subcategory: planData.name,
        billingCycle: billingCycle,
        quantity: quantity,
        duration: priceInfo.duration,
        unitPrice: priceInfo.unitPrice,
        totalAmount: finalPrice,
        currency: 'INR',
        couponCode: appliedCoupon?.code || null, // Include coupon code if applied
      }).unwrap();

      const { order, key_id, transactionId } = orderResponse;
      const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!isScriptLoaded) throw new Error("Razorpay SDK failed to load.");

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "eKYC Solutions",
        description: `Subscription for ${planData.name} - ${quantity} verifications (${priceInfo.duration}) @ ₹${priceInfo.unitPrice} each`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await verifySubscriptionPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              transactionId: transactionId,
            }).unwrap();
            
            // Immediately close modal and refetch user profile
            onClose();
            await refetchUserProfile();
            
            toast.success("Subscription activated successfully!");
            navigate(`/user/service/${planData.name}`);
          } catch (err) {
            toast.error(err.data?.message || "Payment verification failed.");
          }
        },
        prefill: { name: userInfo.name, email: userInfo.email },
        theme: { color: "#2563eb" },
        modal: { ondismiss: () => toast.error("Payment was cancelled.") },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      toast.error(err.data?.message || "Could not initiate purchase.");
    }
  };

  // Enhanced price calculation logic with coupon support
  let finalPrice = priceInfo.price;
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount.type === 'fixed') {
      discountAmount = appliedCoupon.discount.value;
    } else {
      discountAmount = (priceInfo.price * appliedCoupon.discount.value) / 100;
    }
    finalPrice = Math.max(0, priceInfo.price - discountAmount);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-xl">
        <Card className="w-full bg-white shadow-2xl border-0 overflow-hidden">
          <CardHeader className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-4 sm:p-6 text-center">
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </motion.button>
            <div className="mb-3">
              <Crown className="w-10 h-10 mx-auto mb-2 text-yellow-300" />
              <CardTitle className="text-xl font-bold mb-1">
                Premium Subscription
              </CardTitle>
              <p className="text-blue-100 text-sm font-medium">
                {planData.name} Verification
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-blue-100">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
              <span>•</span>
              <Award className="w-4 h-4" />
              <span>Instant Access</span>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            
            {/* Billing Cycle Tabs */}
            <div className="space-y-4">
              <Label className="text-base sm:text-lg font-semibold text-gray-800">Choose Billing Cycle</Label>
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {[
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'quarterly', label: 'Quarterly' },
                  { value: 'yearly', label: 'Yearly' }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={billingCycle === option.value ? "default" : "outline"}
                    onClick={() => handleBillingCycleChange(option.value)}
                    className={`text-xs sm:text-sm py-2 px-1 ${
                      billingCycle === option.value 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <Label className="text-base sm:text-lg font-semibold text-gray-800">
                Verification Quantity
              </Label>
              <div className={`grid gap-1 sm:gap-2 ${getPresetQuantities(billingCycle).length <= 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                {getPresetQuantities(billingCycle).map((qty) => (
                  <Button
                    key={qty}
                    variant={quantity === qty ? "default" : "outline"}
                    onClick={() => handleQuantitySelect(qty)}
                    className={`text-xs sm:text-sm py-2 px-1 ${
                      quantity === qty 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {qty}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Label className="text-xs sm:text-sm text-gray-600">Custom Quantity:</Label>
                <Input
                  type="number"
                  min={getMinimumQuantity(billingCycle)}
                  value={customQuantity}
                  onChange={handleCustomQuantityChange}
                  className="w-20 sm:w-24 h-8 sm:h-9 text-xs sm:text-sm"
                  placeholder="Enter quantity"
                />
                {customError && <span className="text-xs text-red-600">{customError}</span>}
              </div>
            </div>

            {/* Price Display */}
            <div className="text-center">
              <Label className="text-base sm:text-lg font-semibold text-gray-800 block">
                Total Price
              </Label>
              <p className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">
                ₹{priceInfo.price.toFixed(0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 pt-1">
                {quantity} verifications for {priceInfo.duration}
              </p>
{/* Removed savings logic - no discounts */}
            </div>

            <div className="space-y-3">
              {!showCouponInput ? (
                <Button variant="ghost" className="w-full justify-start p-0 h-auto text-blue-600 hover:text-blue-700 font-medium" onClick={() => setShowCouponInput(true)}>
                  <Tag className="mr-2 h-4 w-4" />
                  Have a promo code?
                </Button>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="coupon-input" className="text-sm font-medium text-gray-700">Promo Code</Label>
                  <div className="flex gap-3">
                    <Input id="coupon-input" placeholder="Enter promo code" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} disabled={!!appliedCoupon} className="font-mono h-11" />
                    <Button onClick={handleApplyCoupon} disabled={isValidatingCoupon || !couponInput || !!appliedCoupon} variant="outline" className="h-11 px-6">
                      {isValidatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                    </Button>
                  </div>
                  {couponError && !appliedCoupon && <p className="text-sm text-red-600">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <p className="font-medium text-sm">Promo code applied!</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleRemoveCoupon}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 space-y-4">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900">Order Summary</h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 truncate">{planData.name} - {quantity} verifications</span>
                  <span className="font-medium">₹{priceInfo.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                  <span>{priceInfo.duration} billing cycle</span>
                  <span>{billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span className="truncate">Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-base sm:text-lg text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="font-bold text-lg sm:text-2xl text-gray-900">₹{finalPrice.toFixed(2)}</span>
                    {appliedCoupon && <div className="text-xs sm:text-sm text-gray-500 line-through">₹{priceInfo.price.toFixed(2)}</div>}
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handlePurchase} disabled={isProcessing} className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg text-sm sm:text-base">
              {isProcessing ? <><Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />Processing...</> : <><Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /><span className="hidden sm:inline">Buy {quantity} Verifications</span><span className="sm:hidden">Buy {quantity}</span></>}
            </Button>

            <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
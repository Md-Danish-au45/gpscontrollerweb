// import { useSelector } from 'react-redux';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { 
//   selectCurrentToken, 
//   selectCurrentUserRole 
// } from '@/features/auth/authSlice';

// import PrivacyPolicy from '../home/PrivacyPolicyPage';
// import ErrorPage from "@/pages/ErrorPage";
// import HomePage from "@/home/HomePage";
// import LoginPage from "@/pages/LoginPage";
// import SignUpPage from "@/pages/SignUpPage";
// import AdminLoginPage from '@/admin/AdminLoginPage';
// import AboutUsPage from '@/home/AboutUsPage';
// import ContactUsPage from '@/home/ContactUsPage';
// import ProductPage from '@/home/ProductPage';
// import PricingPage from '@/home/PricingPage';
// import ResetPasswordPage from '@/components/ResetPasswordPage';
// import BlogLanding from '../home/BlogLanding';
// import BlogPage from '../home/BlogPage';
// import TermsAndConditionsPage from '../home/Terms&ConditionPage';
// import DisclaimerPage from '../home/Disclaimer';
// import HowToVerifyPage from '../home/HowToGetVerify';
// import CaseStudyPage from '../home/CaseStudyPage'; 
// import { EmailVerification } from '../components/EmailVerification';


// // ✅ RootRedirect for "/"
// const RootRedirect = () => {
//   const token = useSelector(selectCurrentToken);
//   const role = useSelector(selectCurrentUserRole);

//   if (token) {
//     // Agar login hai toh user/admin par bhejo
//     return <Navigate to={role === 'admin' ? '/admin' : '/user'} replace />;
//   }

//   // Agar login nahi hai toh normal homepage
//   return <HomePage />;
// };


// export const publicRoutes = [
//   {
//     path: '/',
//     element: <RootRedirect />,   // 👈 fixed here
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/about-us',
//     element: <AboutUsPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/privacy-policy',
//     element: <PrivacyPolicy />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/how-to-get-verify',
//     element: <HowToVerifyPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/case-study',
//     element: <CaseStudyPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/terms-and-condition',
//     element: <TermsAndConditionsPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/disclaimer',
//     element: <DisclaimerPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/contact-us',
//     element: <ContactUsPage />,
//     errorElement: <ErrorPage />
//   },
//   // {
//   //   path: '/product/:id',
//   //   element: <ProductPage />,
//   //   errorElement: <ErrorPage />
//   // },

//   {
//   path: '/product/:slug',
//   element: <ProductPage />,
//   errorElement: <ErrorPage />
// },

//   {
//     path: '/pricing',
//     element: <PricingPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/admin-login',
//     element: <AdminLoginPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/blog',
//     element: <BlogLanding />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/blog/:slug',
//     element: <BlogPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/login',
//     element: <LoginPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/signup',
//     element: <SignUpPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/reset-password',
//     element: <ResetPasswordPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '/verify-email/:token',
//     element: <EmailVerification />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: '*',
//     element: <ErrorPage />, 
//   },
// ];


// // ✅ RedirectIfLoggedIn (unchanged except cleanup)
// export const RedirectIfLoggedIn = () => {
//   const token = useSelector(selectCurrentToken);
//   const role = useSelector(selectCurrentUserRole);
//   const location = useLocation();

//   if (token) {
//     const queryParams = new URLSearchParams(location.search);
//     const statusParam = queryParams.get('status');
//     if (statusParam) {
//       return <Navigate to={`/user/service/${statusParam}`} replace />;
//     }

//     const from = location.state?.from?.pathname;
//     if (from && from !== location.pathname) {
//       return <Navigate to={from} replace />;
//     }
    
//     // Default redirect
//     const redirectTo = role === 'admin' ? '/admin' : '/user';
//     return <Navigate to={redirectTo} replace />;
//   }

//   return <Outlet />;
// };
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { 
  selectCurrentToken, 
  selectCurrentUserRole 
} from '@/features/auth/authSlice';

import PrivacyPolicy from '../home/PrivacyPolicyPage';
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/home/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import AdminLoginPage from '@/admin/AdminLoginPage';
import AboutUsPage from '@/home/AboutUsPage';
import ContactUsPage from '@/home/ContactUsPage';
import ProductPage from '@/home/ProductPage';
import PricingPage from '@/home/PricingPage';
import ResetPasswordPage from '@/components/ResetPasswordPage';
import BlogLanding from '../home/BlogLanding';
import BlogPage from '../home/BlogPage';
import TermsAndConditionsPage from '../home/Terms&ConditionPage';
import DisclaimerPage from '../home/Disclaimer';
import HowToVerifyPage from '../home/HowToGetVerify';
import CaseStudyPage from '../home/CaseStudyPage'; 
import { EmailVerification } from '../components/EmailVerification';
import ComingSoon from '../pages/CommingSoon';

// PROBLEM: The RootRedirect component was removed because it was forcing
// logged-in users away from the homepage. The homepage should be accessible to everyone.

export const publicRoutes = [
  {
    // FIX: Changed element from <RootRedirect /> to <HomePage />
    // This allows logged-in users to visit the homepage.
    path: '/',
    element: <HomePage />,   
    errorElement: <ErrorPage />
  },
  {
    path: '/about-us',
    element: <AboutUsPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />
  },
  {
    path: '/how-to-get-verify',
    element: <HowToVerifyPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/case-study',
    element: <CaseStudyPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/terms-and-condition',
    element: <TermsAndConditionsPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/disclaimer',
    element: <DisclaimerPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/contact-us',
    element: <ContactUsPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/product/:slug',
    element: <ProductPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/pricing',
    element: <PricingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/admin-login',
    element: <AdminLoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/blog',
    element: <BlogLanding />,
    errorElement: <ErrorPage />
  },
  {
    path: '/blog/:slug',
    element: <BlogPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/verify-email/:token',
    element: <EmailVerification />,
    errorElement: <ErrorPage />
  },
    {
    path: '/gps-tracking',
    element: <ComingSoon 
      title="GPS Tracking Solutions for Vehicles & Assets" 
      desc="Explore real-time GPS tracking for vehicles, assets, and smart devices." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '/iot-sensors',
    element: <ComingSoon 
      title="IoT Sensors for Smart Monitoring" 
      desc="Monitor industrial IoT sensors with GPS and cloud connectivity." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '/fleet-management',
    element: <ComingSoon 
      title="Fleet Management with GPS & IoT" 
      desc="Manage fleets with advanced GPS IoT tracking systems." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '/asset-tracking',
    element: <ComingSoon 
      title="Asset Tracking with IoT Devices" 
      desc="Track assets in real-time using IoT GPS technology." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '/smart-devices',
    element: <ComingSoon 
      title="Smart GPS & IoT Devices" 
      desc="Discover connected IoT devices and smart GPS sensors." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '/realtime-monitoring',
    element: <ComingSoon 
      title="Real-time IoT Sensor Monitoring" 
      desc="Enable live IoT sensor monitoring and automation." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '/industrial-iot',
    element: <ComingSoon 
      title="Industrial IoT Solutions" 
      desc="IoT sensors for manufacturing, logistics, and automation." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '/cloud-iot-platform',
    element: <ComingSoon 
      title="Cloud-Connected IoT GPS Platform" 
      desc="Connect IoT devices with cloud-based GPS tracking solutions." 
    />,
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />, 
  },
];


// This component is correctly designed to prevent logged-in users from
// seeing pages like /login or /signup. It should remain as is.
export const RedirectIfLoggedIn = () => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentUserRole);
  const location = useLocation();

  if (token) {
    const queryParams = new URLSearchParams(location.search);
    const statusParam = queryParams.get('status');
    if (statusParam) {
      return <Navigate to={`/user/service/${statusParam}`} replace />;
    }

    const from = location.state?.from?.pathname;
    if (from && from !== location.pathname) {
      return <Navigate to={from} replace />;
    }
    
    // Default redirect for auth pages
    const redirectTo = role === 'admin' ? '/admin' : '/user';
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
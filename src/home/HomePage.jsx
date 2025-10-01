
import Header from "./homeComponents/Header"
import ServicesSection from "./homeComponents/ServiceSection"
import StatsBanner from "./homeComponents/StatsBanner"
import TrustSection from "./homeComponents/TrustSection"
import CustomerReviews from "./homeComponents/CustomerReviewSection"
import LandingPageFooter from "./homeComponents/Footer"
import SubscriptionSection from "./homeComponents/SubsciptionSection"
import FAQSection from "./homeComponents/FAQSection"
import ServicesShowcase from "./homeComponents/ServiceShowCaseComponent"
import HeroSection from "./homeComponents/HeroSection"
import TopBar from "./homeComponents/TopBar"
import { useEffect } from "react"
import GoToTopButton from "./homeComponents/GoToTopButton"

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <TopBar />
      <Header />
      <HeroSection />
      <ServicesSection />
      <ServicesShowcase />
      <StatsBanner />
      <TrustSection />
      <CustomerReviews />
      <FAQSection />
      <SubscriptionSection />
      <LandingPageFooter />
      {/* Keep button hidden if you don't want it visible */}
      {/* <GoToTopButtoon /> */}
    </div>
  );
}

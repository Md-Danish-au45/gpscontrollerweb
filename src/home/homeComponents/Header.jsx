
"use client"

import { useState, useEffect, useRef } from "react"
import { 
    ChevronDown, Menu, X, ArrowRight, User, BookOpen, 
    Newspaper, Building, Send, Shield, Briefcase, CreditCard, FileText, BarChart, Users, Globe, Zap, CheckCircle, Star, Award, TrendingUp 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useGetServicesQuery } from "@/app/api/serviceApiSlice"
import { selectCurrentUser, logOut } from "@/features/auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import VerifyMyKyc from "@/assets/logo.png"

// Slugify function to create URL-friendly names
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

// --- ICONS MAPPING ---
const categoryIcons = {
  "Identity Verification": <Shield className="w-5 h-5 text-blue-500" />,
  "Business Verification": <Briefcase className="w-5 h-5 text-purple-500" />,
  "PAN verification": <CreditCard className="w-5 h-5 text-red-500" />,
  "CIN verification": <Building className="w-5 h-5 text-indigo-500" />,
  "Document Verification": <FileText className="w-5 h-5 text-indigo-500" />,
  "Background Verification": <Users className="w-5 h-5 text-red-500" />,
};

const serviceTypeIcons = {
  "Instant": <Zap className="w-4 h-4 text-amber-500" />,
  "Secure": <Shield className="w-4 h-4 text-blue-500" />,
  "Digital": <Globe className="w-4 h-4 text-green-500" />,
  "Comprehensive": <BarChart className="w-4 h-4 text-purple-500" />,
};

// --- NAVIGATION ITEMS ---
const staticNavItems = [
  // { name: "Products", hasDropdown: true, isProducts: true, icon: <Zap className="w-4 h-4" /> },
  // { name: "Pricing", hasDropdown: false, href: "/pricing", icon: <CreditCard className="w-4 h-4" /> },
  {
    name: "Resources", hasDropdown: true, icon: <BookOpen className="w-4 h-4" />,
    items: [
      { name: "Case Studies", href: "/case-study", description: "Customer success stories", icon: <TrendingUp className="w-5 h-5 text-blue-500" />, badge: "Success" },
      // { name: "Blog", href: "/blog", description: "Industry insights and updates", icon: <Newspaper className="w-5 h-5 text-green-500" />, badge: "New" },
      // { name: "Documentation", href: "/docs", description: "API guides and integration", icon: <FileText className="w-5 h-5 text-purple-500" />, badge: "API" },
    ],
  },
  { name: "Blogs", hasDropdown: false, href: "/blog",description: "Industry insights and updates", icon:  <Newspaper className="w-5 h-5" />, badge: "New" },
  {
    name: "Company", hasDropdown: true, icon: <Building className="w-4 h-4" />,
    items: [
      { name: "About Us", href: "/about-us", description: "Our mission and team", icon: <Users className="w-5 h-5 text-indigo-500" />, badge: "Team" },
      { name: "Contact", href: "/contact-us", description: "Get in touch with us", icon: <Send className="w-5 h-5 text-orange-500" />, badge: "24/7" },
      // { name: "Careers", href: "/careers", description: "Join our growing team", icon: <Award className="w-5 h-5 text-green-500" />, badge: "Hiring" },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [processedProducts, setProcessedProducts] = useState(null);
  const [navigationItems] = useState(staticNavItems);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { data: servicesData } = useGetServicesQuery();
  
  const dropdownTimeoutRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (servicesData && Array.isArray(servicesData.data)) {
      let grouped = servicesData.data.reduce((acc, service) => {
        const category = service.category?.trim();
        if (category) {
          if (!acc[category]) acc[category] = [];
          acc[category].push(service);
        }
        return acc;
      }, {});
      
      if (grouped["PAN"]) { grouped["PAN verification"] = grouped["PAN"]; delete grouped["PAN"]; }
      if (grouped["CIN"]) { grouped["CIN verification"] = grouped["CIN"]; delete grouped["CIN"]; }

      const order = ["Identity Verification", "Business Verification", "PAN verification", "CIN verification"];
      const reordered = Object.fromEntries(
          order.filter(key => grouped[key]).map(key => [key, grouped[key]])
      );
      Object.assign(reordered, grouped);

      if (reordered["Identity Verification"]) {
        reordered["Identity Verification"].push(
          { _id: "static-pan", name: "PAN Card Verification", type: "Instant" },
          { _id: "static-aadhar", name: "Aadhar Verification", type: "Secure" }
        );
      }
      
      setProcessedProducts(reordered);
      if (!hoveredCategory && Object.keys(reordered).length > 0) {
        setHoveredCategory(Object.keys(reordered)[0]);
      }
    }
  }, [servicesData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => {
      document.body.style.overflow = !prev ? "hidden" : "unset";
      return !prev;
    });
  };
  
  const handleNavigation = (href) => {
    if (href) navigate(href);
    setActiveDropdown(null);
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  const handleDropdownEnter = (name) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };
  
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };
  
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
    if (isMobileMenuOpen) toggleMobileMenu();
  };
  
  const navigateToUserAccount = () => {
    navigate(user?.role === 'admin' ? "/admin" : "/user");
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  const getServiceIcon = (serviceType) => {
    return serviceTypeIcons[serviceType] || <CheckCircle className="w-4 h-4 text-gray-400" />;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-200/75 shadow-lg" : "bg-white border-b border-gray-100"}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
            <img src={VerifyMyKyc} className="w-12 h-12 object-contain" alt="Verify E-KYC Logo" />
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl font-bold leading-tight bg-gradient-to-r from-green-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
                GPS Controller
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Track Anything, Anywhere</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative" onMouseEnter={() => handleDropdownEnter(item.name)} onMouseLeave={handleDropdownLeave}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${activeDropdown === item.name ? "text-blue-600 bg-blue-50/80 shadow-sm" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`} />}
                </button>

                {item.hasDropdown && activeDropdown === item.name && (
                  <div
                    onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)} onMouseLeave={handleDropdownLeave}
                    className={`absolute top-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/75 rounded-2xl shadow-2xl z-50 origin-top animate-fade-in-down overflow-hidden ${index > 1 ? 'right-0' : 'left-0'}`}
                  >
                    {item.isProducts ? (
                      <div className="flex w-auto max-w-4xl">
                        <div className="w-82 p-4 space-y-1 bg-gradient-to-b from-blue-50/50 to-gray-50/50 border-r border-gray-100">
                          <div className="px-3 py-2 mb-2">
                            <h3 className="font-bold text-gray-900 text-sm">Verification Services</h3>
                            <p className="text-xs text-gray-500 mt-1">Choose a category</p>
                          </div>
                          {processedProducts && Object.keys(processedProducts).map((category) => (
                            <button key={category} onMouseEnter={() => setHoveredCategory(category)}
                              className={`flex items-center gap-3 w-full p-3 text-left rounded-xl transition-all duration-200 ${hoveredCategory === category ? "bg-white shadow-md border border-blue-100 text-blue-600" : "text-gray-700 hover:bg-white/80 hover:shadow-sm hover:text-blue-600"}`}>
                              <div className={`p-2 rounded-lg ${hoveredCategory === category ? "bg-blue-100" : "bg-gray-100"}`}>
                                {categoryIcons[category] || <Shield className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{category}</p>
                                <p className="text-xs text-gray-500 truncate">{processedProducts[category]?.length || 0} services</p>
                              </div>
                              <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${hoveredCategory === category ? 'translate-x-0.5 text-blue-500' : 'text-gray-400'}`} />
                            </button>
                          ))}
                        </div>
                        <div className="flex-1 p-6 min-w-146">
                          {hoveredCategory && processedProducts && processedProducts[hoveredCategory] ? (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 rounded-xl">{categoryIcons[hoveredCategory] || <Shield className="w-6 h-6 text-blue-600" />}</div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900">{hoveredCategory}</h3>
                                        <p className="text-sm text-gray-600 mt-1">Comprehensive {hoveredCategory.toLowerCase()} solutions</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {processedProducts[hoveredCategory].map((service) => (
                                      <a key={service._id} href="#" onClick={(e) => { e.preventDefault(); handleNavigation(`/product/${slugify(service.name)}`) }}
                                        className="group block p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-200 bg-white hover:bg-blue-50/30">
                                        <div className="flex items-start justify-between mb-2">
                                          <div className="flex items-center gap-2">
                                            {getServiceIcon(service.type)}
                                            <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{service.name}</p>
                                          </div>
                                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">Live</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <p className="text-xs text-gray-600">Instant digital verification</p>
                                          <div className="flex items-center text-xs text-gray-500"><Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />4.8</div>
                                        </div>
                                      </a>
                                    ))}
                                </div>
                            </div>
                          ) : (
                            <div className="text-center py-12"><Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">Select a category to view services</p></div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-80 p-3">
                        <div className="mb-2 px-3 py-2"><h3 className="font-bold text-gray-900 text-sm">{item.name}</h3><p className="text-xs text-gray-500 mt-1">Explore our {item.name.toLowerCase()}</p></div>
                        {item.items?.map((subItem) => (
                          <a key={subItem.name} href="#" onClick={(e) => { e.preventDefault(); handleNavigation(subItem.href) }} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50/80 transition-all duration-200 group">
                            <div className="flex-shrink-0 p-2 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">{subItem.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1"><p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{subItem.name}</p>{subItem.badge && <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">{subItem.badge}</span>}</div>
                              <p className="text-xs text-gray-600 leading-relaxed">{subItem.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {user ? (
     <div className="hidden lg:block relative group">
  <Button variant="outline" className="rounded-xl font-medium text-sm gap-2">
      <User className="w-4 h-4" /> Account 
      <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180`} />
  </Button>
  <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <button onClick={navigateToUserAccount} className="w-full text-left p-2 text-sm rounded-md hover:bg-gray-100">Go to Dashboard</button>
      <button onClick={handleLogout} className="w-full text-left p-2 text-sm rounded-md hover:bg-red-50 text-red-600">Log Out</button>
  </div>
</div>

            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Button variant="ghost" onClick={() => navigate("/login")} className="font-medium text-sm rounded-xl hover:bg-gray-100 transition-all duration-200">Sign In</Button>
                <Button onClick={() => navigate("/signup")} className="rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 text-white">
                  Get Started <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            )}
            <button className="lg:hidden p-2.5 -mr-2 rounded-xl hover:bg-gray-100 transition-colors duration-200" onClick={toggleMobileMenu}>
              <Menu size={22} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
        <div ref={mobileMenuRef} className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img src={VerifyMyKyc} className="w-10 h-10 object-contain" alt="Verify E-KYC Logo" />
                <div><h2 className="font-bold text-gray-900">GPS Controller</h2><p className="text-xs text-gray-500">Menu</p></div>
              </div>
              <button onClick={toggleMobileMenu} className="p-2 rounded-xl hover:bg-gray-100 transition-colors"><X size={24} className="text-gray-500" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {navigationItems.map(item => (
                <div key={item.name} className="border-b border-gray-100 last:border-none">
                  {item.hasDropdown ? (
                    <div>
                      <button onClick={() => setActiveDropdown(prev => prev === item.name ? null : item.name)} className="w-full flex justify-between items-center py-4 font-semibold text-gray-900 text-lg">
                        <div className="flex items-center gap-3">{item.icon}{item.name}</div>
                        <ChevronDown className={`w-5 h-5 transition-transform text-gray-400 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === item.name ? 'max-h-[2000px]' : 'max-h-0'}`}>
                        {item.isProducts ? (
                          <div className="pb-4 pl-7">
                            {processedProducts && Object.keys(processedProducts).map(category => (
                              <div key={category} className="mb-6 last:mb-0">
                                <div className="flex items-center gap-3 mb-3 p-2">
                                  <div className="p-1.5 bg-blue-100 rounded-lg">{categoryIcons[category] || <Shield className="w-4 h-4 text-blue-600" />}</div>
                                  <h5 className="font-bold text-gray-800 text-sm">{category}</h5>
                                </div>
                                <div className="space-y-2">
                                  {processedProducts[category].map(service => (
                                    <a key={service._id} href="#" onClick={e => { e.preventDefault(); handleNavigation(`/product/${slugify(service.name)}`) }} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                      {getServiceIcon(service.type)}
                                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{service.name}</span>
                                      <span className="ml-auto px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Live</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="pb-4 pl-7 space-y-2">
                            {item.items?.map(subItem => (
                              <a key={subItem.name} href="#" onClick={e => { e.preventDefault(); handleNavigation(subItem.href) }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm border border-gray-100">{subItem.icon}</div>
                                <div className="flex-1"><span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{subItem.name}</span></div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <a href="#" onClick={e => { e.preventDefault(); handleNavigation(item.href) }} className="w-full flex items-center gap-3 py-4 font-semibold text-gray-900 text-lg">{item.icon}{item.name}</a>
                  )}
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200 bg-gradient-to-t from-gray-50/50 to-white space-y-3">
              {user ? (
                <>
                  <Button onClick={navigateToUserAccount} className="w-full h-14 text-base rounded-xl">Go to Account</Button>
                  <Button onClick={handleLogout} variant="outline" className="w-full h-14 text-base rounded-xl">Log Out</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleNavigation("/login")} variant="outline" className="w-full h-14 text-base rounded-xl border-gray-300 hover:border-gray-400">Sign In</Button>
                 <Button
  onClick={() => handleNavigation("/signup")}
  className="w-full h-14 text-base rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg text-white"
>
  Get Started <ArrowRight className="w-5 h-5 ml-2" />
</Button>

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
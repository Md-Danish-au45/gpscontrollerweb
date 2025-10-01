import { useState, useMemo, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Custom styles for scrollbar hiding
const scrollbarStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// Main categories with their subcategories
const CATEGORY_SUBCATEGORY_MAPPING = {
  "All": [],
  "Identity Verification": [
    "Address Verification",
    "Passport Verification", 
    "Voter ID verification",
    "Driving License verification"
  ],
  "Financial & Business Checks": [
    "GSTIN verification",
    "Bank Account Verification", 
    "Buissness Check"
  ],
  "Employer Verification": [
    "Employer Verification"
  ],
  "Biometric & AI-Based Verification": [
    "Facematch",
    "Liveness"
  ],
  "Profile & Database Lookup": [
    "Profile Lookup"
  ],
  "Legal & Compliance Checks": [
    "Criminal and Court Record Verification"
  ],
  "Vehicle Verification": [
    "Driving License verification"
  ]
};

export default function CategoryFilter({ 
  services = [], 
  activeCategory, 
  onCategorySelect, 
  activeSubcategory,
  onSubcategorySelect 
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Get available categories from services data
  const availableCategories = useMemo(() => {
    const categories = new Set();
    services.forEach(service => {
      // Normalize and sanitize category labels to avoid stray numeric pills like "5"
      const raw = service?.category;
      if (raw === undefined || raw === null) return;
      const label = String(raw).trim();
      // Skip empty labels and pure numeric labels (e.g., "5") which cause extra pills
      if (!label || /^\d+$/.test(label)) return;
      categories.add(label);
    });
    return ['All', ...Array.from(categories)];
  }, [services]);

  // Get service count for each category
  const getServiceCount = (category) => {
    if (category === 'All') return services.length;
    return services.filter(service => service.category === category).length;
  };

  // Helper: derive subcategories for any category
  const getSubcategoriesForCategory = (category) => {
    if (!category || category === 'All') return [];
    const predefined = CATEGORY_SUBCATEGORY_MAPPING[category];
    if (predefined && predefined.length > 0) return predefined;
    // Derive dynamically from services when not predefined
    const inCategory = services.filter(s => String(s?.category || '').trim() === category);
    const uniqueSubs = Array.from(new Set(inCategory.map(s => s?.subcategory || s?.name).filter(Boolean)));
    return uniqueSubs;
  };

  // Get subcategories for the active category (used in active filter pill area)
  const availableSubcategories = useMemo(() => {
    return getSubcategoriesForCategory(activeCategory);
  }, [activeCategory, services]);

  // Reset subcategory when category changes
  useEffect(() => {
    onSubcategorySelect(null);
  }, [activeCategory, onSubcategorySelect]);

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
    onSubcategorySelect(null); // Reset subcategory when category changes
    setOpenDropdown(null);
  };

  const handleSubcategoryClick = (subcategory, parentCategory) => {
    // Ensure category and subcategory are in sync to avoid empty results
    if (parentCategory && parentCategory !== activeCategory) {
      onCategorySelect(parentCategory);
    }
    onSubcategorySelect(subcategory);
    setOpenDropdown(null);
  };

  return (
    <div className="mb-4 sm:mb-6">
      <style>{scrollbarStyles}</style>
      {/* Main Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Services</h1>
      
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-1 sm:gap-3 mb-4 pb-2 sm:pb-0">
        {availableCategories.map((category) => {
          const subcategoriesForThis = getSubcategoriesForCategory(category);
          const hasSubcategories = subcategoriesForThis.length > 0;
          const isActive = activeCategory === category;
          
          if (hasSubcategories) {
            return (
              <DropdownMenu 
                key={category}
                open={openDropdown === category}
                onOpenChange={(open) => setOpenDropdown(open ? category : null)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={isActive ? "default" : "outline"}
                    className={`flex-shrink-0 justify-between px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 rounded-lg touch-manipulation ${
                      isActive
                        ? 'text-white shadow-lg hover:shadow-xl'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
                    }`}
                    style={isActive ? { backgroundColor: '#154DEB' } : {}}
                  >
                    <span className="truncate text-left max-w-[120px] sm:max-w-none">{category}</span>
                    <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" side="bottom" sideOffset={6} className="w-56 shadow-lg border-gray-200 bg-white">
                  {subcategoriesForThis.map((subcategory) => (
                    <DropdownMenuItem
                      key={subcategory}
                      onClick={() => handleSubcategoryClick(subcategory, category)}
                      className={`cursor-pointer px-3 py-2 text-sm transition-all duration-200 ${
                        activeSubcategory === subcategory 
                          ? 'text-white font-medium border-l-2' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      style={activeSubcategory === subcategory ? { backgroundColor: '#154DEB', borderLeftColor: '#154DEB' } : {}}
                    >
                      {subcategory}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          } else {
            return (
              <Button
                key={category}
                variant={isActive ? "default" : "outline"}
                onClick={() => handleCategoryClick(category)}
                className={`flex-shrink-0 justify-center px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 rounded-lg touch-manipulation ${
                  isActive
                    ? 'text-white shadow-lg hover:shadow-xl'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
                }`}
                style={isActive ? { backgroundColor: '#154DEB' } : {}}
              >
                <span className="truncate text-left max-w-[120px] sm:max-w-none">{category}</span>
              </Button>
            );
          }
        })}
      </div>
      
      {/* Active Subcategory Display */}
      {activeSubcategory && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 font-medium">Active filter:</span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-white border" style={{ backgroundColor: '#154DEB' }}>
            {activeSubcategory}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSubcategorySelect(null)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-xs px-2 py-1 rounded-md transition-all duration-200"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
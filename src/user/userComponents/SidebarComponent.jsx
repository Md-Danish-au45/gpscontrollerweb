// // "use client"

// // import {
// //   LayoutDashboard, Shield, User, BarChart3, PieChart, Settings, LogOut,
// //   ChevronDown, Building, Scale, Scan, Database, Briefcase, Car,
// // } from "lucide-react"
// // import { useState, useRef, useEffect } from "react"
// // import { useNavigate } from "react-router-dom"
// // import { Button } from "@/components/ui/button"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import {
// //   Tooltip,
// //   TooltipContent,
// //   TooltipProvider,
// //   TooltipTrigger,
// // } from "@/components/ui/tooltip"
// // import userPic from "@/assets/UserImage.svg"
// // import { useDispatch } from "react-redux"
// // import { logOut } from "@/features/auth/authSlice"
// // import { useSelector } from 'react-redux';
// // import { selectCurrentUser } from '@/features/auth/authSlice';

// // // Generate a random color for the avatar background
// // const generateRandomColor = (name) => {
// //   if (!name) return '#2A689B'; // A professional dark blue
// //   const colors = ['#2A689B', '#4C7A54', '#7F5E9B', '#A76950', '#8A6D3A', '#4F7C8F', '#6B5B95', '#9C6F7F'];
// //   const index = name.charCodeAt(0) % colors.length;
// //   return colors[index];
// // };

// // const serviceCategories = [
// //     { value: 'Identity Verification', label: 'Identity Verification', icon: User },
// //     { value: 'Financial & Business Checks', label: 'Financial & Business Checks', icon: Building },
// //     { value: 'Legal & Compliance Checks', label: 'Legal & Compliance Checks', icon: Scale },
// //     { value: 'Vehicle Verification', label: 'Vehicle Verification', icon: Car },
// //     { value: 'Biometric & AI-Based Verification', label: 'Biometric & AI-Based Verification', icon: Scan },
// //     { value: 'Profile & Database Lookup', label: 'Profile & Database Lookup', icon: Database },
// //     { value: 'Employer Verification', label: 'Employer Verification', icon: Briefcase },
// // ];

// // const navigationData = {
// //   reports: [
// //     { title: "Purchase History", icon: BarChart3, view: "history" },
// //     { title: "Verification Results", icon: PieChart, view: "verification-results" },
// //   ],
// // };

// // const scrollbarStyles = `
// //   .modern-scrollbar::-webkit-scrollbar { width: 6px; }
// //   .modern-scrollbar::-webkit-scrollbar-track { background: transparent; }
// //   .modern-scrollbar::-webkit-scrollbar-thumb { background: rgba(180, 190, 200, 0.7); border-radius: 3px; }
// //   .modern-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(140, 150, 160, 0.9); }
// //   .modern-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(180, 190, 200, 0.7) transparent; }
// // `;

// // export default function SidebarComponent({
// //   isOpen,
// //   activeView,
// //   onNavigate,
// //   activeCategory,
// //   onCategorySelect,
// //   // Add a new prop to handle closing the sidebar
// //   onClose,
// // }) {
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const dropdownRef = useRef(null);
// //   const [isServicesOpen, setIsServicesOpen] = useState(true);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const user = useSelector(selectCurrentUser);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setShowDropdown(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   const handleProfileClick = () => {
// //     onNavigate('profile');
// //     if (window.innerWidth < 768) setShowDropdown(false);
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       setShowDropdown(false);
// //       await dispatch(logOut());
// //       navigate("/");
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const avatarBgColor = generateRandomColor(user?.name);

// //   const NavItem = ({ children, label, disabled }) => {
// //     if (isOpen || disabled) {
// //       return <>{children}</>;
// //     }
// //     return (
// //       <Tooltip delayDuration={100}>
// //         <TooltipTrigger asChild>{children}</TooltipTrigger>
// //         <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
// //           <p>{label}</p>
// //         </TooltipContent>
// //       </Tooltip>
// //     );
// //   };

// //   const MenuButton = ({ icon: Icon, label, isActive, onClick }) => (
// //     <NavItem label={label}>
// //         <button
// //           onClick={onClick}
// //           className={`w-full flex items-center transition-all duration-200 ease-in-out ${isOpen ? 'px-4 py-3 rounded-xl mx-2' : 'p-3 mx-auto rounded-xl w-12 h-12 justify-center'} ${isActive ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
// //         >
// //           <Icon className={`${isOpen ? 'w-5 h-5 mr-2' : 'w-5 h-5'} transition-all duration-200`} />
// //           {isOpen && <span className="font-semibold text-sm truncate">{label}</span>}
// //         </button>
// //     </NavItem>
// //   );

// //   const SubMenuButton = ({ icon: Icon, label, isActive, onClick }) => {
// //       if (isOpen) {
// //           return (
// //             <button
// //                 onClick={onClick}
// //                 className={`w-full flex items-center px-4 py-2.5 mx-2 my-1 rounded-lg transition-all duration-200 ease-in-out text-sm ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
// //             >
// //                 <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
// //                 <span className="font-medium truncate">{label}</span>
// //             </button>
// //           )
// //       }

// //       return (
// //         <Tooltip delayDuration={100}>
// //             <TooltipTrigger asChild>
// //                 <button
// //                     onClick={onClick}
// //                     className={`w-12 h-12 mx-auto my-0.5 rounded-xl transition-all duration-200 ease-in-out flex items-center justify-center ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
// //                 >
// //                     <Icon className="w-5 h-5" />
// //                 </button>
// //             </TooltipTrigger>
// //             <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
// //                 <p>{label}</p>
// //             </TooltipContent>
// //         </Tooltip>
// //       )
// //   };

// //   return (
// //     <TooltipProvider>
// //       <style>{scrollbarStyles}</style>

// //       {/* This is the overlay that closes the sidebar on outside clicks */}
// //       <div
// //         className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
// //         onClick={onClose} // <-- **FIXED: This calls the onClose function**
// //         aria-hidden="true"
// //       />

// //      <aside
// //   className={`fixed left-0 z-40 bg-white/80 backdrop-blur-sm shadow-xl border-r border-gray-100 transition-all duration-300 ease-out ${isOpen ? "w-64" : "w-20"} ${isOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'}`}
// //   style={{ top: window.innerWidth < 768 ? '64px' : '73px', height: 'calc(100vh - 73px)'}}
// // >


// //         <div className="flex flex-col h-full">
// //           <div className="flex-1 overflow-y-auto modern-scrollbar py-4">
// //             <div className="mb-6 w-full px-2">
// //               <MenuButton
// //                 icon={LayoutDashboard}
// //                 label="Dashboard"
// //                 isActive={activeView === "dashboard"}
// //                 onClick={() => onNavigate("dashboard")}
// //               />
// //             </div>

// //             <div className="mb-6 w-full px-2">
// //               {isOpen && (
// //                 <div className="px-4 mb-3">
// //                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
// //                 </div>
// //               )}
// //               <NavItem label="Verifications">
// //                   <button
// //                     onClick={() => setIsServicesOpen(!isServicesOpen)}
// //                     className={`w-full flex items-center transition-all duration-200 ease-in-out ${isOpen ? 'px-4 py-3 rounded-xl justify-between' : 'p-3 mx-auto rounded-xl w-12 h-12 justify-center'} ${activeView === "services" ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
// //                   >
// //                     <div className={`flex items-center ${isOpen ? 'gap-2' : 'gap-0'}`}>
// //                       <Shield className="w-5 h-5" />
// //                       {isOpen && <span className="font-semibold text-sm">Verifications</span>}
// //                     </div>
// //                     {isOpen && (
// //                       <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
// //                     )}
// //                   </button>
// //               </NavItem>

// //               {isServicesOpen && (
// //                 <div className="mt-2 space-y-0.5 pb-2">
// //                   {serviceCategories.map((category) => {
// //                     const isActive = activeView === "services" && activeCategory === category.label;
// //                     return (
// //                       <SubMenuButton
// //                         key={category.value}
// //                         icon={category.icon}
// //                         label={category.label}
// //                         isActive={isActive}
// //                         onClick={() => onCategorySelect(category.label)}
// //                       />
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="mb-6 w-full px-2">
// //               {isOpen && (
// //                 <div className="px-4 mb-3">
// //                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reports</h3>
// //                 </div>
// //               )}
// //               <div className="space-y-1">
// //                 {navigationData.reports.map((item) => (
// //                   <MenuButton
// //                     key={item.title}
// //                     icon={item.icon}
// //                     label={item.title}
// //                     isActive={activeView === item.view}
// //                     onClick={() => onNavigate(item.view)}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm p-3">
// //             {isOpen ? (
// //               <div className="relative" ref={dropdownRef}>
// //                 <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
// //                    <Avatar className="h-8 w-8 border border-gray-200">
// //                       {user.avatar && user.avatar.trim() !== '' && <AvatarImage src={user.avatar} alt={user?.name} />}
// //                       <AvatarFallback className="text-white text-xs font-semibold" style={{ backgroundColor: avatarBgColor }}>
// //                           {user?.name?.charAt(0).toUpperCase() || 'U'}
// //                       </AvatarFallback>
// //                   </Avatar>
// //                   <div className="flex-1 min-w-0">
// //                     <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
// //                     <p className="text-xs text-gray-500 truncate">{user?.role || 'Administrator'}</p>
// //                   </div>
// //                   <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-200">
// //                     <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
// //                   </Button>
// //                 </div>
// //                 {showDropdown && (
// //                   <div className="absolute right-0 bottom-full mb-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]">
// //                     <button onClick={handleProfileClick} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
// //                       <User className="w-4 h-4 text-gray-500" />
// //                       <span className="font-medium">My Profile</span>
// //                     </button>
// //                     <div className="h-px bg-gray-200 mx-2 my-1"></div>
// //                     <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
// //                       <LogOut className="w-4 h-4 text-red-500" />
// //                       <span className="font-medium">Logout</span>
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <div className="flex flex-col items-center space-y-3">
// //                 <Tooltip delayDuration={100}>
// //                   <TooltipTrigger asChild>
// //                     <button onClick={handleProfileClick} className="rounded-full">
// //                        <Avatar className="w-10 h-10 ring-2 ring-white">
// //                             <AvatarImage src={user.avatar || userPic} alt={user?.name || "User"} />
// //                             <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: avatarBgColor }}>
// //                                 {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
// //                             </AvatarFallback>
// //                         </Avatar>
// //                     </button>
// //                   </TooltipTrigger>
// //                   <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
// //                     <p>{user?.name || 'My Profile'}</p>
// //                   </TooltipContent>
// //                 </Tooltip>

// //                 <Tooltip delayDuration={100}>
// //                   <TooltipTrigger asChild>
// //                     <Button onClick={handleLogout} variant="ghost" size="icon" className="w-10 h-10 hover:bg-red-50 hover:text-red-600 text-gray-600">
// //                       <LogOut className="w-4 h-4" />
// //                     </Button>
// //                   </TooltipTrigger>
// //                   <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
// //                     <p>Log out</p>
// //                   </TooltipContent>
// //                 </Tooltip>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </aside>
// //     </TooltipProvider>
// //   )
// // }

// "use client"

// import {
//   LayoutDashboard, Shield, User, BarChart3, PieChart, Settings, LogOut,
//   ChevronDown, Building, Scale, Scan, Database, Briefcase, Car,
// } from "lucide-react"
// import { useState, useRef, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import userPic from "@/assets/UserImage.svg"
// import { useDispatch } from "react-redux"
// import { logOut } from "@/features/auth/authSlice"
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '@/features/auth/authSlice';

// // Generate a random color for the avatar background
// const generateRandomColor = (name) => {
//   if (!name) return '#2A689B'; // A professional dark blue
//   const colors = ['#2A689B', '#4C7A54', '#7F5E9B', '#A76950', '#8A6D3A', '#4F7C8F', '#6B5B95', '#9C6F7F'];
//   const index = name.charCodeAt(0) % colors.length;
//   return colors[index];
// };

// const serviceCategories = [
//     { value: 'Identity Verification', label: 'Identity Verification', icon: User },
//     { value: 'Financial & Business Checks', label: 'Financial & Business Checks', icon: Building },
//     { value: 'Legal & Compliance Checks', label: 'Legal & Compliance Checks', icon: Scale },
//     { value: 'Vehicle Verification', label: 'Vehicle Verification', icon: Car },
//     { value: 'Biometric & AI-Based Verification', label: 'Biometric & AI-Based Verification', icon: Scan },
//     { value: 'Profile & Database Lookup', label: 'Profile & Database Lookup', icon: Database },
//     { value: 'Employer Verification', label: 'Employer Verification', icon: Briefcase },
// ];

// const navigationData = {
//   reports: [
//     { title: "Purchase History", icon: BarChart3, view: "history" },
//     { title: "Verification Results", icon: PieChart, view: "verification_history" },
//   ],
// };

// const scrollbarStyles = `
//   .modern-scrollbar::-webkit-scrollbar { width: 6px; }
//   .modern-scrollbar::-webkit-scrollbar-track { background: transparent; }
//   .modern-scrollbar::-webkit-scrollbar-thumb { background: rgba(180, 190, 200, 0.7); border-radius: 3px; }
//   .modern-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(140, 150, 160, 0.9); }
//   .modern-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(180, 190, 200, 0.7) transparent; }
// `;

// export default function SidebarComponent({
//   isOpen,
//   activeView,
//   onNavigate,
//   activeCategory,
//   onCategorySelect,
// }) {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   const [isServicesOpen, setIsServicesOpen] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(selectCurrentUser);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleProfileClick = () => {
//     onNavigate('profile');
//     if (window.innerWidth < 768) setShowDropdown(false);
//   };

//   const handleLogout = async () => {
//     try {
//       setShowDropdown(false);
//       await dispatch(logOut());
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const avatarBgColor = generateRandomColor(user?.name);

//   const NavItem = ({ children, label, disabled }) => {
//     if (isOpen || disabled) {
//       return <>{children}</>;
//     }
//     return (
//       <Tooltip delayDuration={100}>
//         <TooltipTrigger asChild>{children}</TooltipTrigger>
//         <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
//           <p>{label}</p>
//         </TooltipContent>
//       </Tooltip>
//     );
//   };

//   const MenuButton = ({ icon: Icon, label, isActive, onClick }) => (
//     <NavItem label={label}>
//         <button
//           onClick={onClick}
//           className={`w-full flex items-center transition-all duration-200 ease-in-out ${isOpen ? 'px-4 py-3 rounded-xl mx-2' : 'p-3 mx-auto rounded-xl w-12 h-12 justify-center'} ${isActive ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
//         >
//           <Icon className={`${isOpen ? 'w-5 h-5 mr-2' : 'w-5 h-5'} transition-all duration-200`} />
//           {isOpen && <span className="font-semibold text-sm truncate">{label}</span>}
//         </button>
//     </NavItem>
//   );

//   const SubMenuButton = ({ icon: Icon, label, isActive, onClick }) => {
//       if (isOpen) {
//           return (
//             <button
//                 onClick={onClick}
//                 className={`w-full flex items-center px-4 py-2.5 mx-2 my-1 rounded-lg transition-all duration-200 ease-in-out text-sm ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
//             >
//                 <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
//                 <span className="font-medium truncate">{label}</span>
//             </button>
//           )
//       }

//       return (
//         <Tooltip delayDuration={100}>
//             <TooltipTrigger asChild>
//                 <button
//                     onClick={onClick}
//                     className={`w-12 h-12 mx-auto my-0.5 rounded-xl transition-all duration-200 ease-in-out flex items-center justify-center ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
//                 >
//                     <Icon className="w-5 h-5" />
//                 </button>
//             </TooltipTrigger>
//             <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
//                 <p>{label}</p>
//             </TooltipContent>
//         </Tooltip>
//       )
//   };

//   return (
//     <TooltipProvider>
//       <style>{scrollbarStyles}</style>

//       <div
//         className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         onClick={() => {}}
//         aria-hidden="true"
//       />

//      <aside
//   className={`fixed left-0 z-40 bg-white/80 backdrop-blur-sm shadow-xl border-r border-gray-100 transition-all duration-300 ease-out ${isOpen ? "w-64" : "w-20"} ${isOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'}`}
//   style={{ top: window.innerWidth < 768 ? '64px' : '73px', height: 'calc(100vh - 73px)'}}
// >


//         <div className="flex flex-col h-full">
//           <div className="flex-1 overflow-y-auto modern-scrollbar py-4">
//             <div className="mb-6 w-full px-2">
//               <MenuButton
//                 icon={LayoutDashboard}
//                 label="Dashboard"
//                 isActive={activeView === "dashboard"}
//                 onClick={() => onNavigate("dashboard")}
//               />
//             </div>

//             <div className="mb-6 w-full px-2">
//               {isOpen && (
//                 <div className="px-4 mb-3">
//                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
//                 </div>
//               )}
//               <NavItem label="Verifications">
//                   <button
//                     onClick={() => setIsServicesOpen(!isServicesOpen)}
//                     className={`w-full flex items-center transition-all duration-200 ease-in-out ${isOpen ? 'px-4 py-3 rounded-xl justify-between' : 'p-3 mx-auto rounded-xl w-12 h-12 justify-center'} ${activeView === "services" ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
//                   >
//                     <div className={`flex items-center ${isOpen ? 'gap-2' : 'gap-0'}`}>
//                       <Shield className="w-5 h-5" />
//                       {isOpen && <span className="font-semibold text-sm">Verifications</span>}
//                     </div>
//                     {isOpen && (
//                       <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
//                     )}
//                   </button>
//               </NavItem>

//               {isServicesOpen && (
//                 <div className="mt-2 space-y-0.5 pb-2">
//                   {serviceCategories.map((category) => {
//                     const isActive = activeView === "services" && activeCategory === category.label;
//                     return (
//                       <SubMenuButton
//                         key={category.value}
//                         icon={category.icon}
//                         label={category.label}
//                         isActive={isActive}
//                         onClick={() => onCategorySelect(category.label)}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             <div className="mb-6 w-full px-2">
//               {isOpen && (
//                 <div className="px-4 mb-3">
//                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reports</h3>
//                 </div>
//               )}
//               <div className="space-y-1">
//                 {navigationData.reports.map((item) => (
//                   <MenuButton
//                     key={item.title}
//                     icon={item.icon}
//                     label={item.title}
//                     isActive={activeView === item.view}
//                     onClick={() => onNavigate(item.view)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm p-3">
//             {isOpen ? (
//               <div className="relative" ref={dropdownRef}>
//                 <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
//                    <Avatar className="h-8 w-8 border border-gray-200">
//                       {user.avatar && user.avatar.trim() !== '' && <AvatarImage src={user.avatar} alt={user?.name} />}
//                       <AvatarFallback className="text-white text-xs font-semibold" style={{ backgroundColor: avatarBgColor }}>
//                           {user?.name?.charAt(0).toUpperCase() || 'U'}
//                       </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
//                     <p className="text-xs text-gray-500 truncate">{user?.role || 'Administrator'}</p>
//                   </div>
//                   <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:bg-gray-200">
//                     <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
//                   </Button>
//                 </div>
//                 {showDropdown && (
//                   <div className="absolute right-0 bottom-full mb-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]">
//                     <button onClick={handleProfileClick} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
//                       <User className="w-4 h-4 text-gray-500" />
//                       <span className="font-medium">My Profile</span>
//                     </button>
//                     <div className="h-px bg-gray-200 mx-2 my-1"></div>
//                     <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
//                       <LogOut className="w-4 h-4 text-red-500" />
//                       <span className="font-medium">Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center space-y-3">
//                 <Tooltip delayDuration={100}>
//                   <TooltipTrigger asChild>
//                     <button onClick={handleProfileClick} className="rounded-full">
//                        <Avatar className="w-10 h-10 ring-2 ring-white">
//                             <AvatarImage src={user.avatar || userPic} alt={user?.name || "User"} />
//                             <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: avatarBgColor }}>
//                                 {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
//                             </AvatarFallback>
//                         </Avatar>
//                     </button>
//                   </TooltipTrigger>
//                   <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
//                     <p>{user?.name || 'My Profile'}</p>
//                   </TooltipContent>
//                 </Tooltip>

//                 <Tooltip delayDuration={100}>
//                   <TooltipTrigger asChild>
//                     <Button onClick={handleLogout} variant="ghost" size="icon" className="w-10 h-10 hover:bg-red-50 hover:text-red-600 text-gray-600">
//                       <LogOut className="w-4 h-4" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
//                     <p>Log out</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>
//     </TooltipProvider>
//   )
// }

"use client"

import {
  LayoutDashboard, Shield, User, BarChart3, PieChart, Settings, LogOut,
  ChevronDown, Building, Scale, Scan, Database, Briefcase, Car,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import userPic from "@/assets/UserImage.svg"
import { useDispatch } from "react-redux"
import { logOut } from "@/features/auth/authSlice"
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';

// Generate a random color for the avatar background
const generateRandomColor = (name) => {
  if (!name) return '#2A689B'; // A professional dark blue
  const colors = ['#2A689B', '#4C7A54', '#7F5E9B', '#A76950', '#8A6D3A', '#4F7C8F', '#6B5B95', '#9C6F7F'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const serviceCategories = [
    { value: 'Identity Verification', label: 'Identity Verification', icon: User },
    { value: 'Financial & Business Checks', label: 'Financial & Business Checks', icon: Building },
    { value: 'Legal & Compliance Checks', label: 'Legal & Compliance Checks', icon: Scale },
    { value: 'Vehicle Verification', label: 'Vehicle Verification', icon: Car },
    { value: 'Biometric & AI-Based Verification', label: 'Biometric & AI-Based Verification', icon: Scan },
    { value: 'Profile & Database Lookup', label: 'Profile & Database Lookup', icon: Database },
    { value: 'Employer Verification', label: 'Employer Verification', icon: Briefcase },
];

const navigationData = {
  reports: [
    { title: "Purchase History", icon: BarChart3, view: "history" },
    { title: "Verification Results", icon: PieChart, view: "verification_history" },
  ],
};

const scrollbarStyles = `
  .modern-scrollbar::-webkit-scrollbar { width: 6px; }
  .modern-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .modern-scrollbar::-webkit-scrollbar-thumb { background: rgba(180, 190, 200, 0.7); border-radius: 3px; }
  .modern-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(140, 150, 160, 0.9); }
  .modern-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(180, 190, 200, 0.7) transparent; }
`;

export default function SidebarComponent({
  isOpen,
  activeView,
  onNavigate,
  activeCategory,
  onCategorySelect,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isServicesOpen, setIsServicesOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    onNavigate('profile');
    if (window.innerWidth < 768) setShowDropdown(false);
  };

  const handleLogout = async () => {
    try {
      setShowDropdown(false);
      await dispatch(logOut());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const avatarBgColor = generateRandomColor(user?.name);

  const NavItem = ({ children, label, disabled }) => {
    if (isOpen || disabled) {
      return <>{children}</>;
    }
    return (
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const MenuButton = ({ icon: Icon, label, isActive, onClick }) => (
    <NavItem label={label}>
        <button
          onClick={onClick}
          className={`w-full flex items-center transition-all duration-200 ease-in-out ${isOpen ? 'px-4 py-3 rounded-xl mx-2' : 'p-3 mx-auto rounded-xl w-12 h-12 justify-center'} ${isActive ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
        >
          <Icon className={`${isOpen ? 'w-5 h-5 mr-2' : 'w-5 h-5'} transition-all duration-200`} />
          {isOpen && <span className="font-semibold text-sm truncate">{label}</span>}
        </button>
    </NavItem>
  );

  const SubMenuButton = ({ icon: Icon, label, isActive, onClick }) => {
      if (isOpen) {
          return (
            <button
                onClick={onClick}
                className={`w-full flex items-center px-4 py-2.5 mx-2 my-1 rounded-lg transition-all duration-200 ease-in-out text-sm ${isActive ? 'bg-blue-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
                <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="font-medium truncate">{label}</span>
            </button>
          )
      }

      return (
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                <button
                    onClick={onClick}
                    className={`w-12 h-12 mx-auto my-0.5 rounded-xl transition-all duration-200 ease-in-out flex items-center justify-center ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                    <Icon className="w-5 h-5" />
                </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
      )
  };

  return (
    <TooltipProvider>
      <style>{scrollbarStyles}</style>

      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => {}}
        aria-hidden="true"
      />

     <aside
  className={`fixed left-0 z-40 bg-gray-900 backdrop-blur-sm shadow-xl border-r border-gray-700 transition-all duration-300 ease-out ${isOpen ? "w-64" : "w-20"} ${isOpen ? 'translate-x-0' : 'md:translate-x-0 -translate-x-full'}`}
  style={{ top: window.innerWidth < 768 ? '64px' : '73px', height: 'calc(100vh - 73px)'}}
>


        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto modern-scrollbar py-4">
            <div className="mb-6 w-full px-2">
              <MenuButton
                icon={LayoutDashboard}
                label="Dashboard"
                isActive={activeView === "dashboard"}
                onClick={() => onNavigate("dashboard")}
              />
            </div>

            <div className="mb-6 w-full px-2">
              {isOpen && (
                <div className="px-4 mb-3">
                  <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Services</h3>
                </div>
              )}
              <NavItem label="Verifications">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={`w-full flex items-center transition-all duration-200 ease-in-out ${isOpen ? 'px-4 py-3 rounded-xl justify-between' : 'p-3 mx-auto rounded-xl w-12 h-12 justify-center'} ${activeView === "services" ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/20' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                  >
                    <div className={`flex items-center ${isOpen ? 'gap-2' : 'gap-0'}`}>
                      <Shield className="w-5 h-5" />
                      {isOpen && <span className="font-semibold text-sm">Verifications</span>}
                    </div>
                    {isOpen && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
                    )}
                  </button>
              </NavItem>

              {isServicesOpen && (
                <div className="mt-2 space-y-0.5 pb-2">
                  {serviceCategories.map((category) => {
                    const isActive = activeView === "services" && activeCategory === category.label;
                    return (
                      <SubMenuButton
                        key={category.value}
                        icon={category.icon}
                        label={category.label}
                        isActive={isActive}
                        onClick={() => onCategorySelect(category.label)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mb-6 w-full px-2">
              {isOpen && (
                <div className="px-4 mb-3">
                  <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Reports</h3>
                </div>
              )}
              <div className="space-y-1">
                {navigationData.reports.map((item) => (
                  <MenuButton
                    key={item.title}
                    icon={item.icon}
                    label={item.title}
                    isActive={activeView === item.view}
                    onClick={() => onNavigate(item.view)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 bg-gray-900/80 backdrop-blur-sm p-3">
            {isOpen ? (
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800 relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                   <Avatar className="h-8 w-8 border border-gray-200">
                      {user.avatar && user.avatar.trim() !== '' && <AvatarImage src={user.avatar} alt={user?.name} />}
                      <AvatarFallback className="text-white text-xs font-semibold" style={{ backgroundColor: avatarBgColor }}>
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-300 truncate">{user?.role || 'Administrator'}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:bg-gray-700">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
                  </Button>
                </div>
                {showDropdown && (
                  <div className="absolute right-0 bottom-full mb-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]">
                    <button onClick={handleProfileClick} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">My Profile</span>
                    </button>
                    <div className="h-px bg-gray-200 mx-2 my-1"></div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <button onClick={handleProfileClick} className="rounded-full">
                       <Avatar className="w-10 h-10 ring-2 ring-white">
                            <AvatarImage src={user.avatar || userPic} alt={user?.name || "User"} />
                            <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: avatarBgColor }}>
                                {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
                    <p>{user?.name || 'My Profile'}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button onClick={handleLogout} variant="ghost" size="icon" className="w-10 h-10 hover:bg-red-50 hover:text-red-600 text-gray-600">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5} className="bg-gray-800 text-white border-none shadow-lg">
                    <p>Log out</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
"use client"

import { useMemo, useEffect, useState } from "react";
import { TrendingUp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, AreaChart, Area, ReferenceLine, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton, ChartSkeleton } from "@/components/skeletons/Skeletons";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

export default function DashboardAnalytics({ transactions, isLoading }) {
  const userInfo = useSelector(selectCurrentUser);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])

  // Generate time series data from actual timestamps
  const generateTimeSeriesData = (services) => {
    if (services.length === 0) return [];

    // Get all timestamps from selected services
    const allTimestamps = [];
    services.forEach(service => {
      if (service.usageTimestamps && service.usageTimestamps.length > 0) {
        service.usageTimestamps.forEach(timestamp => {
          allTimestamps.push(new Date(timestamp));
        });
      }
    });

    if (allTimestamps.length === 0) {
      // Fallback to simulated data if no timestamps exist
      return generateFallbackData(services);
    }

    // Find date range
    const minDate = new Date(Math.min(...allTimestamps));
    const maxDate = new Date(Math.max(...allTimestamps));
    const today = new Date();

    // Use a reasonable date range (last 30 days or from first usage to today)
    const startDate = new Date(Math.max(
      minDate.getTime(),
      today.getTime() - (30 * 24 * 60 * 60 * 1000) // 30 days ago
    ));
    const endDate = new Date(Math.max(maxDate.getTime(), today.getTime()));

    // Generate date range
    const dateRange = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Count usage per day for each service
    return dateRange.map(date => {
      const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const dataPoint = { date: dateStr, fullDate: date };

      services.forEach(service => {
        let dailyCount = 0;

        if (service.usageTimestamps && service.usageTimestamps.length > 0) {
          dailyCount = service.usageTimestamps.filter(timestamp => {
            const timestampDate = new Date(timestamp);
            return timestampDate.toDateString() === date.toDateString();
          }).length;
        }

        dataPoint[service.service] = dailyCount;
      });

      return dataPoint;
    });
  };

  // Fallback data generation for services without timestamps
  const generateFallbackData = (services) => {
    // Generate last 15 days of data
    const dates = [];
    const today = new Date();
    for (let i = 14; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
    }

    return dates.map((date, index) => {
      const dataPoint = { date };

      services.forEach(service => {
        // Simulate realistic usage patterns based on total usage count
        const totalUsage = service.usageCount;
        const baseUsage = Math.max(0, totalUsage / 15); // Average per day

        // Add some randomness and trend
        const randomFactor = 0.3 + Math.random() * 0.7; // 0.3 to 1.0
        const trendFactor = (index / 14) * 0.5 + 0.75; // Slight upward trend

        const dailyUsage = Math.round(baseUsage * randomFactor * trendFactor);
        dataPoint[service.service] = Math.max(0, dailyUsage);
      });

      return dataPoint;
    });
  };

  const chartData = useMemo(() => {
    if (!userInfo || !userInfo.usedServices || selectedServices.length === 0) {
      return [];
    }

    return generateTimeSeriesData(selectedServices);
  }, [userInfo, selectedServices]);

  // Check if any selected services have timestamp data
  const hasTimestampData = useMemo(() => {
    return selectedServices.some(service =>
      service.usageTimestamps && service.usageTimestamps.length > 0
    );
  }, [selectedServices]);

  // Available services for selection
  const availableServices = useMemo(() => {
    if (!userInfo || !userInfo.usedServices) return [];

    // Create a completely new array with new objects to avoid read-only issues
    const servicesCopy = userInfo.usedServices.map(service => ({
      id: service.service,
      name: service.serviceName || 'Unknown Service',
      usageCount: service.usageCount,
      service: service.service,
      usageTimestamps: service.usageTimestamps ? [...service.usageTimestamps] : [],
      hasTimestamps: service.usageTimestamps && service.usageTimestamps.length > 0
    }));

    return servicesCopy.sort((a, b) => b.usageCount - a.usageCount);
  }, [userInfo]);

  // Colors for different lines
  const lineColors = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#f59e0b'];

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.service === service.service);

      if (isSelected) {
        // Remove service
        return prev.filter(s => s.service !== service.service);
      } else if (prev.length < 3) {
        // Add service (max 3)
        return [...prev, service];
      }

      return prev;
    });
  };

  // Initialize with top 2 services
  useEffect(() => {
    if (availableServices.length > 0 && selectedServices.length === 0) {
      setSelectedServices(availableServices.slice(0, 2));
    }
  }, [availableServices]);

  // Calculate real percentage changes for cards (moved before statsData)
  const calculateRealPercentageChange = useMemo(() => {
    if (!userInfo || !userInfo.usedServices || userInfo.usedServices.length === 0) {
      return { total: "+0%", address: "+0%", pan: "+0%", profile: "+0%" };
    }

    // Get current month data
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Filter current month transactions
    const currentMonthTransactions = transactions ? transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    }) : [];

    // Get previous month data
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const previousMonthTransactions = transactions ? transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate.getMonth() === previousMonth && transactionDate.getFullYear() === previousYear;
    }) : [];

    // Calculate percentage changes
    const calculateChange = (current, previous) => {
      if (previous === 0) return current > 0 ? "+100%" : "+0%";
      const change = ((current - previous) / previous) * 100;
      return change >= 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
    };

    // Helper function to get service count
    const getServiceCount = (serviceName, transactionList = transactions) => {
      if (!transactionList) return 0;
      return transactionList.filter(transaction => {
        const service = transaction.service;
        if (!service || !service.name) return false;
        return service.name.toLowerCase().includes(serviceName.toLowerCase());
      }).length;
    };

    return {
      total: calculateChange(currentMonthTransactions.length, previousMonthTransactions.length),
      address: calculateChange(
        getServiceCount('address', currentMonthTransactions),
        getServiceCount('address', previousMonthTransactions)
      ),
      pan: calculateChange(
        getServiceCount('pan', currentMonthTransactions),
        getServiceCount('pan', previousMonthTransactions)
      ),
      profile: calculateChange(
        getServiceCount('profile', currentMonthTransactions),
        getServiceCount('profile', previousMonthTransactions)
      )
    };
  }, [userInfo, transactions]);

  const statsData = useMemo(() => {
    if (!userInfo || !userInfo.usedServices || userInfo.usedServices.length === 0) {
      return [
        { title: "Total Verifications", value: "0", change: "+0%", color: "bg-blue-500", textColor: "text-white" },
        { title: "Address Lookup by Mobile", value: "0", change: "+0%", color: "bg-green-500", textColor: "text-white" },
        { title: "Fetch PAN By Phone", value: "0", change: "+0%", color: "bg-purple-500", textColor: "text-white" },
        { title: "Profile & Address Verification", value: "0", change: "+0%", color: "bg-orange-500", textColor: "text-white" },
      ];
    }

    // Calculate total verifications from userInfo.usedServices
    const totalVerifications = userInfo.usedServices.reduce((acc, service) => acc + service.usageCount, 0);

    // Get specific service counts
    const getServiceCount = (serviceName) => {
      const service = userInfo.usedServices.find(s => 
        s.serviceName?.toLowerCase().includes(serviceName.toLowerCase()) ||
        s.service?.toLowerCase().includes(serviceName.toLowerCase())
      );
      return service ? service.usageCount : 0;
    };

    const addressLookupCount = getServiceCount('address') || getServiceCount('mobile');
    const panFetchCount = getServiceCount('pan') || getServiceCount('phone');
    const profileVerificationCount = getServiceCount('profile') || getServiceCount('address verification');

    return [
      {
        title: "Total Verifications",
        value: totalVerifications.toLocaleString(),
        change: calculateRealPercentageChange.total,
        color: "bg-blue-500",
        textColor: "text-white"
      },
      {
        title: "Address Lookup by Mobile",
        value: addressLookupCount.toLocaleString(),
        change: calculateRealPercentageChange.address,
        color: "bg-green-500",
        textColor: "text-white"
      },
      {
        title: "Fetch PAN By Phone",
        value: panFetchCount.toLocaleString(),
        change: calculateRealPercentageChange.pan,
        color: "bg-purple-500",
        textColor: "text-white"
      },
      {
        title: "Profile & Address Verification",
        value: profileVerificationCount.toLocaleString(),
        change: calculateRealPercentageChange.profile,
        color: "bg-orange-500",
        textColor: "text-white"
      }
    ];
  }, [userInfo, transactions, calculateRealPercentageChange]);

  // Top verifications data (like top products in reference)
  const topVerificationsData = useMemo(() => {
    if (!userInfo || !userInfo.usedServices || userInfo.usedServices.length === 0) {
      return [];
    }

    // Create a map of service IDs to service names from the transactions list
    const serviceNameMap = transactions.reduce((map, transaction) => {
        if (transaction.service && transaction.service._id && transaction.service.name) {
            map[transaction.service._id] = transaction.service.name;
        }
        return map;
    }, {});

    // Calculate total verifications
    const totalVerifications = userInfo.usedServices.reduce((acc, service) => acc + service.usageCount, 0);

    // Create sorted services with popularity and sales percentage
    const sortedServices = userInfo.usedServices
      .map(service => ({
        name: serviceNameMap[service.service] || service.serviceName || 'Unknown Service',
        count: service.usageCount,
        popularity: totalVerifications > 0 ? (service.usageCount / totalVerifications) * 100 : 0,
        sales: totalVerifications > 0 ? ((service.usageCount / totalVerifications) * 100).toFixed(0) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4); // Top 4 services

    return sortedServices;
  }, [userInfo, transactions]);

  // Total purchase amount calculation - only successful payments
  const totalPurchaseAmount = useMemo(() => {
    if (!transactions || transactions.length === 0) return 0;
    return transactions.reduce((total, transaction) => {
      // Only include successful/completed transactions
      if (transaction.status === 'completed' || transaction.status === 'success' || transaction.paymentStatus === 'completed') {
        return total + (transaction.amount || 0);
      }
      return total; // Skip failed/cancelled transactions
    }, 0);
  }, [transactions]);

  // Calculate real percentage for circular chart based on actual data
  const calculateRealPercentage = useMemo(() => {
    if (!userInfo || !userInfo.usedServices || userInfo.usedServices.length === 0) return 0;
    
    const totalVerifications = userInfo.usedServices.reduce((acc, service) => acc + service.usageCount, 0);
    const totalTransactions = transactions ? transactions.length : 0;
    
    // Calculate percentage based on verification efficiency
    if (totalTransactions === 0) return 0;
    
    // Real calculation: (Total verifications / Total transactions) * 100
    const efficiency = (totalVerifications / totalTransactions) * 100;
    return Math.min(Math.max(efficiency, 0), 100); // Keep between 0-100
  }, [userInfo, transactions]);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.relative')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

    if (isLoading) {
    return (
      <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Loading Header */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        {/* Chart Skeleton */}
        <ChartSkeleton />

        {/* Additional loading indicators */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <Card key={index} className={`${stat.color} border-0 shadow-sm`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${stat.textColor} opacity-90 mb-1`}>{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                {stat.change && (
                  <div className="flex items-center gap-1">
                    <span className={`text-sm ${stat.textColor} opacity-90`}>{stat.change}</span>
                    <TrendingUp className={`w-4 h-4 ${stat.textColor}`} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {/* Service Usage Trend Chart */}
      <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg mt-2 font-semibold text-gray-900">Total Verifications</CardTitle>
              {selectedServices.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {hasTimestampData ? 'Real verification data over time' : 'Simulated data (no timestamps available)'}
                </p>
              )}
            </div>

            {/* Service Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="text-sm font-medium">
                  {selectedServices.length === 0
                    ? 'Select Services'
                    : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                  }
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Select 2-3 services to compare</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedServices.length}/3 services selected
                    </p>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {availableServices.map((service, index) => {
                      const isSelected = selectedServices.some(s => s.service === service.service);
                      const canSelect = selectedServices.length < 3 || isSelected;

                      return (
                        <button
                          key={service.service}
                          onClick={() => handleServiceToggle(service)}
                          disabled={!canSelect}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors ${
                            isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          } ${!canSelect ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {service.name}
                                </p>
                                {service.hasTimestamps && (
                                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full flex-shrink-0">
                                    Real data
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">
                                {service.usageCount} total uses
                                {service.hasTimestamps && ` • ${service.usageTimestamps.length} timestamps`}
                              </p>
                            </div>
                            {isSelected && (
                              <div
                                className="w-3 h-3 rounded-full ml-2 flex-shrink-0"
                                style={{ backgroundColor: lineColors[selectedServices.findIndex(s => s.service === service.service)] }}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pr-1 sm:pr-4 pl-4 sm:pl-6">
          {chartData.length > 0 ? (
            <div 
              className="h-80 w-full focus:outline-none transition-all duration-300 hover:scale-[1.01]" 
              style={{ outline: 'none !important' }}
              onFocus={(e) => e.target.blur()}
            >
              <ResponsiveContainer width="100%" height="100%">
                {/* Enhanced AreaChart with attractive styling */}
                <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#154DEB" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="#154DEB" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#154DEB" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="areaFill2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="areaFill3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" strokeOpacity={0.6} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: "#6b7280", fontWeight: 500 }} 
                    minTickGap={20}
                    tickMargin={8}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: "#6b7280", fontWeight: 500 }} 
                    allowDecimals={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Legend 
                    verticalAlign="top" 
                    align="center" 
                    height={40} 
                    iconType="line" 
                    wrapperStyle={{ 
                      paddingBottom: '16px', 
                      color: '#374151',
                      fontSize: '13px',
                      fontWeight: '500'
                    }} 
                    formatter={(value) => (
                      <span className="truncate font-medium" style={{ display:'inline-block', maxWidth: 140 }}>
                        {value}
                      </span>
                    )} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
                      border: '1px solid #e2e8f0', 
                      color: '#1e293b', 
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }} 
                    cursor={{ 
                      stroke: '#154DEB', 
                      strokeWidth: 2,
                      strokeDasharray: '4 4',
                      strokeOpacity: 0.6
                    }} 
                    labelStyle={{ color: '#374151', fontWeight: '600' }}
                  />
                  
                  {/* Enhanced Reference Line */}
                  {chartData[Math.floor(chartData.length/2)] && (
                    <ReferenceLine 
                      x={chartData[Math.floor(chartData.length/2)].date} 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      strokeDasharray="6 4" 
                      strokeOpacity={0.8}
                    />
                  )}

                  {/* Enhanced Area for first selected service */}
                  {selectedServices[0] && (
                    <Area 
                      type="monotone" 
                      dataKey={selectedServices[0].service} 
                      stroke="#154DEB" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#areaFill)" 
                      name={selectedServices[0].name} 
                      dot={{ 
                        r: 4, 
                        fill: '#154DEB',
                        stroke: '#ffffff',
                        strokeWidth: 2
                      }} 
                      activeDot={{ 
                        r: 6, 
                        stroke: '#154DEB', 
                        strokeWidth: 3,
                        fill: '#ffffff',
                        filter: 'drop-shadow(0 2px 4px rgba(21, 77, 235, 0.3))'
                      }} 
                    />
                  )}
                  
                  {/* Enhanced additional services as areas */}
                  {selectedServices.slice(1).map((service, index) => (
                    <Area
                      key={service.service}
                      type="monotone"
                      dataKey={service.service}
                      stroke={lineColors[index+1]}
                      strokeWidth={2.5}
                      fill={`url(#areaFill${index+2})`}
                      fillOpacity={0.6}
                      name={service.name}
                      dot={{ 
                        r: 3, 
                        fill: lineColors[index+1],
                        stroke: '#ffffff',
                        strokeWidth: 1.5
                      }}
                      activeDot={{ 
                        r: 5, 
                        stroke: lineColors[index+1], 
                        strokeWidth: 2,
                        fill: '#ffffff'
                      }}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 w-full flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-gray-500 text-lg">
                  {availableServices.length === 0
                    ? 'No service usage data available'
                    : 'Select 2-3 services to view trends'
                  }
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {availableServices.length === 0
                    ? 'Start using services to see your usage statistics'
                    : 'Use the dropdown above to choose services for comparison'
                  }
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Top Verifications Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Top Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topVerificationsData.length > 0 ? (
                topVerificationsData.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">0{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base">{service.name}</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${service.popularity}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{service.sales}%</span>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No verification data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Total Purchase Amount Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Total Purchase Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 sm:py-8">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                ₹{totalPurchaseAmount.toLocaleString()}
              </div>
              <p className="text-gray-600 mb-4">Total Expense</p>
              <div className="mt-4 sm:mt-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto relative">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#154DEB"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${calculateRealPercentage * 2.51} ${100 * 2.51}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round(calculateRealPercentage)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
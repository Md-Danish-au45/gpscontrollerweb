import { useState, useMemo } from "react";
import { useGetVerificationHistoryQuery } from "@/app/api/verificationApiSlice";
import { User, Shield, CheckCircle, XCircle, Clock } from "lucide-react";

export default function VerificationResultsWidget({ onNavigateToVerificationHistory }) {
  const [page] = useState(1);
  const { data: response, isLoading } = useGetVerificationHistoryQuery({ page, limit: 4 });
  const results = response?.data || [];
  
  const getServiceIcon = (serviceName = "") => {
    const name = (serviceName || '').toLowerCase();
    if (name.includes('identity')) return User;
    if (name.includes('address')) return Shield;
    if (name.includes('phone')) return Shield;
    return Shield;
  };
  
  const getExperienceText = (serviceName = "") => {
    const name = (serviceName || '').toLowerCase();
    if (name.includes('identity')) return 'Identity Expert';
    if (name.includes('address')) return 'Address Expert';
    if (name.includes('phone')) return 'Phone Expert';
    return 'Verification Expert';
  };
  
  // Get recent verification results (last 4)
  const recentResults = useMemo(() => {
    return results.slice(0, 4).map((result, index) => ({
      id: result._id,
      name: result.service?.name || 'Verification Service',
      status: result.status,
      date: new Date(result.createdAt).toLocaleDateString(),
      icon: getServiceIcon(result.service?.name),
      experience: getExperienceText(result.service?.name)
    }));
  }, [results]);
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Verification Results</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Verification Results</h3>
      </div>
      
      {/* Results List */}
      <div className="space-y-2 sm:space-y-3">
        {recentResults.length > 0 ? (
          recentResults.map((result) => (
            <div key={result.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
              {/* Profile Picture */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                {result.name.charAt(0)}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <h4 className="font-semibold text-gray-800 truncate text-sm sm:text-base">{result.name}</h4>
                  {getStatusIcon(result.status)}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{result.experience}</p>
                <p className="text-xs text-gray-500">{result.date}</p>
              </div>
              
              {/* Status */}
              <div className="flex flex-col items-end flex-shrink-0">
                <span className={`text-xs font-medium ${getStatusColor(result.status)}`}>
                  {result.status === 'success' ? 'Verified' : 
                   result.status === 'failed' ? 'Failed' : 'Pending'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 sm:py-8">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
            <p className="text-gray-500 text-xs sm:text-sm">No verification results yet</p>
            <p className="text-gray-400 text-xs">Complete your first verification to see results here</p>
          </div>
        )}
      </div>
    </div>
  );
}

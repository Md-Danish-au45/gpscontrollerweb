import { useState, useMemo } from "react";

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Get days of week
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  }, [currentMonth, currentYear, startingDayOfWeek, daysInMonth]);
  
  // Navigation removed per design requirement
  
  const isToday = (day) => {
    if (!day) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date.toDateString() === today.toDateString();
  };
  
  const isCurrentMonth = () => {
    return currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h3>
      </div>
      
      {/* Calendar Grid */}
      <div className="space-y-1 sm:space-y-2">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                text-center py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors
                ${day ? 'cursor-pointer hover:bg-gray-100' : ''}
                ${isToday(day) ? 'bg-blue-500 text-white' : 'text-gray-700'}
                ${!day ? 'invisible' : ''}
              `}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

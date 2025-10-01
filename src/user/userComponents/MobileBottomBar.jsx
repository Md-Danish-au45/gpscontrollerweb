import {
  LayoutDashboard, Shield, User, MoreVertical, BarChart3, PieChart, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const BottomBarButton = ({ icon: Icon, label, isActive, onClick }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={`flex flex-col items-center justify-center h-16 flex-1 ${
      isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-xs font-semibold">{label}</span>
  </Button>
);

export default function MobileBottomBar({ activeView, onNavigate, onLogout }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg md:hidden">
      <div className="flex justify-between items-center w-full">
        <BottomBarButton
          icon={LayoutDashboard}
          label="Home"
          isActive={activeView === "dashboard"}
          onClick={() => onNavigate("dashboard")}
        />
        <BottomBarButton
          icon={Shield}
          label="Verifications"
          isActive={activeView === "services"}
          onClick={() => onNavigate("services")}
        />
        <BottomBarButton
          icon={User}
          label="Profile"
          isActive={activeView === "profile"}
          onClick={() => onNavigate("profile")}
        />
        {/* <BottomBarButton
          icon={BarChart3}
          label="History"
          isActive={activeView === "history"}
          onClick={() => onNavigate("history")}
        />
        <BottomBarButton
          icon={PieChart}
          label="Results"
          isActive={activeView === "verification-results"}
          onClick={() => onNavigate("verification-results")}
        />
        <BottomBarButton
          icon={LogOut}
          label="Logout"
          isActive={false}
          onClick={onLogout}
        /> */}
      </div>
    </div>
  );
}

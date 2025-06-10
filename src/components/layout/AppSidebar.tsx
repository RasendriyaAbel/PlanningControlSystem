import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Settings,
  Wrench,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Factory,
  Users,
  Bell,
  HelpCircle,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  submenu?: { title: string; href: string }[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Perencanaan Produksi",
    href: "/production",
    icon: Calendar,
    badge: "12",
  },
  {
    title: "Manajemen Inventori",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Monitoring Mesin",
    href: "/machines",
    icon: Wrench,
    badge: "Alert",
  },
  {
    title: "Laporan & Analisis",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Manajemen User",
    href: "/users",
    icon: Users,
  },
  {
    title: "Pengaturan",
    href: "/settings",
    icon: Settings,
  },
];

const bottomItems: SidebarItem[] = [
  {
    title: "Notifikasi",
    href: "/notifications",
    icon: Bell,
    badge: "3",
  },
  {
    title: "Bantuan",
    href: "/help",
    icon: HelpCircle,
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const SidebarItemComponent = ({ item }: { item: SidebarItem }) => {
    const active = isActive(item.href);
    const Icon = item.icon;

    return (
      <Link
        to={item.href}
        onMouseEnter={() => setHoveredItem(item.href)}
        onMouseLeave={() => setHoveredItem(null)}
        className={cn(
          "group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-production-50 hover:text-production-700",
          active
            ? "bg-production-100 text-production-700 shadow-sm"
            : "text-gray-700 hover:text-gray-900",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0",
            active ? "text-production-600" : "text-gray-500",
          )}
        />

        {!collapsed && (
          <>
            <span className="ml-3 truncate">{item.title}</span>
            {item.badge && (
              <Badge
                variant={item.badge === "Alert" ? "destructive" : "secondary"}
                className="ml-auto text-xs"
              >
                {item.badge}
              </Badge>
            )}
          </>
        )}

        {collapsed && hoveredItem === item.href && (
          <div className="absolute left-full ml-2 z-50 rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
            {item.title}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
          </div>
        )}

        {active && (
          <div className="absolute inset-y-0 right-0 w-1 bg-production-600 rounded-l-full" />
        )}
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-production-600 text-white">
            <Factory className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                AutoManufacture
              </h1>
              <p className="text-xs text-gray-500">Planning Control System</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 rounded-full hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {sidebarItems.map((item) => (
          <SidebarItemComponent key={item.href} item={item} />
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        {bottomItems.map((item) => (
          <SidebarItemComponent key={item.href} item={item} />
        ))}
      </div>

      {/* User Section */}
      {!collapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-production-500 to-production-600 flex items-center justify-center text-white font-semibold">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Admin Manager
              </p>
              <p className="text-xs text-gray-500 truncate">
                admin@automanufacture.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

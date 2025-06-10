import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-production-600",
  subtitle,
  badge,
}: StatCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success-600";
      case "negative":
        return "text-danger-600";
      default:
        return "text-gray-600";
    }
  };

  const getChangeBackground = () => {
    switch (changeType) {
      case "positive":
        return "bg-success-50";
      case "negative":
        return "bg-danger-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={cn("rounded-lg p-2 bg-gray-50", iconColor)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {badge && (
              <Badge variant={badge.variant || "default"} className="text-xs">
                {badge.text}
              </Badge>
            )}
          </div>

          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}

          {change && (
            <div
              className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                getChangeBackground(),
                getChangeColor(),
              )}
            >
              {change}
            </div>
          )}
        </div>
      </CardContent>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-production-500 to-production-600" />
    </Card>
  );
}

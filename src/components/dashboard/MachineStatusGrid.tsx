import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Power,
  AlertTriangle,
  Settings,
  TrendingUp,
  Clock,
  Thermometer,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MachineStatus {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance" | "warning";
  efficiency: number;
  temperature: number;
  runtime: string;
  lastMaintenance: string;
  currentJob?: string;
}

const machines: MachineStatus[] = [
  {
    id: "M001",
    name: "Mesin Produksi A1",
    status: "online",
    efficiency: 95,
    temperature: 78,
    runtime: "24j 15m",
    lastMaintenance: "2 hari lalu",
    currentJob: "Engine Block - Batch #001",
  },
  {
    id: "M002",
    name: "Mesin Produksi A2",
    status: "warning",
    efficiency: 67,
    temperature: 95,
    runtime: "18j 32m",
    lastMaintenance: "1 minggu lalu",
    currentJob: "Cylinder Head - Batch #002",
  },
  {
    id: "M003",
    name: "Mesin Assembly B1",
    status: "maintenance",
    efficiency: 0,
    temperature: 23,
    runtime: "0j 0m",
    lastMaintenance: "Sedang berlangsung",
    currentJob: "Maintenance terjadwal",
  },
  {
    id: "M004",
    name: "Mesin Assembly B2",
    status: "online",
    efficiency: 88,
    temperature: 82,
    runtime: "12j 45m",
    lastMaintenance: "3 hari lalu",
    currentJob: "Motor Assembly - Batch #005",
  },
  {
    id: "M005",
    name: "Mesin Quality Control",
    status: "online",
    efficiency: 92,
    temperature: 45,
    runtime: "6j 15m",
    lastMaintenance: "1 hari lalu",
    currentJob: "Inspeksi Quality - Batch #003",
  },
  {
    id: "M006",
    name: "Mesin Packaging",
    status: "offline",
    efficiency: 0,
    temperature: 25,
    runtime: "0j 0m",
    lastMaintenance: "2 minggu lalu",
    currentJob: "Tidak aktif",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-success-500";
    case "warning":
      return "bg-warning-500";
    case "maintenance":
      return "bg-production-500";
    case "offline":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "online":
      return (
        <Badge className="bg-success-100 text-success-700 hover:bg-success-100">
          Online
        </Badge>
      );
    case "warning":
      return (
        <Badge className="bg-warning-100 text-warning-700 hover:bg-warning-100">
          Peringatan
        </Badge>
      );
    case "maintenance":
      return (
        <Badge className="bg-production-100 text-production-700 hover:bg-production-100">
          Maintenance
        </Badge>
      );
    case "offline":
      return <Badge variant="secondary">Offline</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getEfficiencyColor = (efficiency: number) => {
  if (efficiency >= 90) return "text-success-600";
  if (efficiency >= 70) return "text-warning-600";
  return "text-danger-600";
};

const getTemperatureColor = (temperature: number) => {
  if (temperature > 90) return "text-danger-600";
  if (temperature > 80) return "text-warning-600";
  return "text-success-600";
};

export function MachineStatusGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Status Mesin Real-time
        </h3>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Kelola Mesin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {machines.map((machine) => (
          <Card
            key={machine.id}
            className="relative overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  {machine.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full status-indicator",
                      getStatusColor(machine.status),
                    )}
                  />
                  {getStatusBadge(machine.status)}
                </div>
              </div>
              <p className="text-sm text-gray-600">{machine.id}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Current Job */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Pekerjaan Saat Ini
                </p>
                <p className="text-sm text-gray-900">{machine.currentJob}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <TrendingUp className="h-3 w-3" />
                    Efisiensi
                  </div>
                  <div
                    className={cn(
                      "text-lg font-semibold",
                      getEfficiencyColor(machine.efficiency),
                    )}
                  >
                    {machine.efficiency}%
                  </div>
                  <Progress value={machine.efficiency} className="h-1" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Thermometer className="h-3 w-3" />
                    Suhu
                  </div>
                  <div
                    className={cn(
                      "text-lg font-semibold",
                      getTemperatureColor(machine.temperature),
                    )}
                  >
                    {machine.temperature}°C
                  </div>
                  <div className="text-xs text-gray-500">Normal: 20-85°C</div>
                </div>
              </div>

              {/* Runtime & Maintenance */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <Clock className="h-3 w-3" />
                    Runtime
                  </div>
                  <p className="font-medium text-gray-900">{machine.runtime}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <Settings className="h-3 w-3" />
                    Maintenance
                  </div>
                  <p className="font-medium text-gray-900">
                    {machine.lastMaintenance}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Gauge className="h-3 w-3 mr-1" />
                  Monitor
                </Button>
                {machine.status === "warning" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-warning-600 border-warning-300 hover:bg-warning-50"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Periksa
                  </Button>
                )}
                {machine.status === "offline" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-success-600 border-success-300 hover:bg-success-50"
                  >
                    <Power className="h-3 w-3 mr-1" />
                    Aktifkan
                  </Button>
                )}
              </div>
            </CardContent>

            {/* Status indicator bar */}
            <div
              className={cn(
                "absolute bottom-0 left-0 h-1 w-full",
                getStatusColor(machine.status),
              )}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

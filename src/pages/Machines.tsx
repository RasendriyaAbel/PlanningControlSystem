import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  Power,
  AlertTriangle,
  Settings,
  TrendingUp,
  Clock,
  Thermometer,
  Gauge,
  Activity,
  Wrench,
  Play,
  Pause,
  Stop,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MachineDetail {
  id: string;
  name: string;
  type: string;
  status: "online" | "offline" | "maintenance" | "warning" | "error";
  efficiency: number;
  temperature: number;
  pressure: number;
  vibration: number;
  runtime: string;
  totalRuntime: string;
  lastMaintenance: string;
  nextMaintenance: string;
  currentJob?: string;
  operator: string;
  location: string;
  manufacturer: string;
  model: string;
  yearInstalled: number;
}

const machines: MachineDetail[] = [
  {
    id: "M001",
    name: "Mesin Produksi A1",
    type: "CNC Milling Machine",
    status: "online",
    efficiency: 95,
    temperature: 78,
    pressure: 85,
    vibration: 0.2,
    runtime: "24j 15m",
    totalRuntime: "8,543 jam",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-02-10",
    currentJob: "Engine Block - Batch #001",
    operator: "Ahmad Sutrisno",
    location: "Lantai Produksi A",
    manufacturer: "FANUC",
    model: "ROBODRILL α-D21MiA5",
    yearInstalled: 2020,
  },
  {
    id: "M002",
    name: "Mesin Produksi A2",
    type: "CNC Lathe Machine",
    status: "warning",
    efficiency: 67,
    temperature: 95,
    pressure: 92,
    vibration: 0.8,
    runtime: "18j 32m",
    totalRuntime: "12,234 jam",
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-01-25",
    currentJob: "Cylinder Head - Batch #002",
    operator: "Siti Nurhaliza",
    location: "Lantai Produksi A",
    manufacturer: "OKUMA",
    model: "LB3000 EXII MY",
    yearInstalled: 2019,
  },
  {
    id: "M003",
    name: "Mesin Assembly B1",
    type: "Assembly Robot",
    status: "maintenance",
    efficiency: 0,
    temperature: 23,
    pressure: 0,
    vibration: 0,
    runtime: "0j 0m",
    totalRuntime: "6,789 jam",
    lastMaintenance: "Sedang berlangsung",
    nextMaintenance: "2024-03-15",
    currentJob: "Maintenance terjadwal",
    operator: "Tim Maintenance",
    location: "Lantai Assembly B",
    manufacturer: "KUKA",
    model: "KR 210 R2700 extra",
    yearInstalled: 2021,
  },
  {
    id: "M004",
    name: "Mesin Assembly B2",
    type: "Assembly Robot",
    status: "online",
    efficiency: 88,
    temperature: 82,
    pressure: 78,
    vibration: 0.3,
    runtime: "12j 45m",
    totalRuntime: "4,567 jam",
    lastMaintenance: "2024-01-12",
    nextMaintenance: "2024-02-12",
    currentJob: "Motor Assembly - Batch #005",
    operator: "Budi Santoso",
    location: "Lantai Assembly B",
    manufacturer: "ABB",
    model: "IRB 6640-185/2.55",
    yearInstalled: 2022,
  },
];

const performanceData = [
  { time: "00:00", efficiency: 85, temperature: 75, vibration: 0.1 },
  { time: "04:00", efficiency: 88, temperature: 78, vibration: 0.2 },
  { time: "08:00", efficiency: 92, temperature: 82, vibration: 0.15 },
  { time: "12:00", efficiency: 95, temperature: 85, vibration: 0.18 },
  { time: "16:00", efficiency: 89, temperature: 88, vibration: 0.25 },
  { time: "20:00", efficiency: 87, temperature: 84, vibration: 0.22 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-success-500";
    case "warning":
      return "bg-warning-500";
    case "maintenance":
      return "bg-production-500";
    case "error":
      return "bg-danger-500";
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
    case "error":
      return <Badge variant="destructive">Error</Badge>;
    case "offline":
      return <Badge variant="secondary">Offline</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function Machines() {
  const [selectedMachine, setSelectedMachine] = useState<string>("M001");
  const [viewMode, setViewMode] = useState<string>("grid");

  const currentMachine =
    machines.find((m) => m.id === selectedMachine) || machines[0];

  const stats = {
    total: machines.length,
    online: machines.filter((m) => m.status === "online").length,
    warning: machines.filter((m) => m.status === "warning").length,
    maintenance: machines.filter((m) => m.status === "maintenance").length,
    offline: machines.filter(
      (m) => m.status === "offline" || m.status === "error",
    ).length,
    avgEfficiency: Math.round(
      machines
        .filter((m) => m.status === "online")
        .reduce((sum, m) => sum + m.efficiency, 0) /
        machines.filter((m) => m.status === "online").length,
    ),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoring Mesin</h1>
          <p className="text-gray-600 mt-1">
            Monitor performa dan status mesin produksi real-time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Grid View</SelectItem>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="detail">Detail View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Pengaturan
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Mesin</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Wrench className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online</p>
                <p className="text-2xl font-bold text-success-600">
                  {stats.online}
                </p>
              </div>
              <Power className="h-8 w-8 text-success-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peringatan</p>
                <p className="text-2xl font-bold text-warning-600">
                  {stats.warning}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-production-600">
                  {stats.maintenance}
                </p>
              </div>
              <Settings className="h-8 w-8 text-production-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-gray-600">
                  {stats.offline}
                </p>
              </div>
              <Stop className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Efisiensi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.avgEfficiency}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Machine Grid/List View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <Card
              key={machine.id}
              className="relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedMachine(machine.id)}
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
                <p className="text-sm text-gray-600">{machine.type}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Pekerjaan Saat Ini
                  </p>
                  <p className="text-sm text-gray-900">{machine.currentJob}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <TrendingUp className="h-3 w-3" />
                      Efisiensi
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {machine.efficiency}%
                    </div>
                    <Progress value={machine.efficiency} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Thermometer className="h-3 w-3" />
                      Suhu
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {machine.temperature}°C
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Activity className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                  {machine.status === "online" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  )}
                  {machine.status === "offline" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-success-600 border-success-300 hover:bg-success-50"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </CardContent>
              <div
                className={cn(
                  "absolute bottom-0 left-0 h-1 w-full",
                  getStatusColor(machine.status),
                )}
              />
            </Card>
          ))}
        </div>
      )}

      {/* Detail View */}
      {viewMode === "detail" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Machine Selector */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Pilih Mesin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {machines.map((machine) => (
                <Button
                  key={machine.id}
                  variant={selectedMachine === machine.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedMachine(machine.id)}
                >
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full mr-3",
                      getStatusColor(machine.status),
                    )}
                  />
                  {machine.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Machine Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {currentMachine.name}
                    </CardTitle>
                    <p className="text-gray-600">{currentMachine.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(currentMachine.status)}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="performance" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="performance">Performa</TabsTrigger>
                    <TabsTrigger value="details">Detail</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Gauge className="h-4 w-4" />
                          Efisiensi
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {currentMachine.efficiency}%
                        </div>
                        <Progress
                          value={currentMachine.efficiency}
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Thermometer className="h-4 w-4" />
                          Suhu
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {currentMachine.temperature}°C
                        </div>
                        <div className="text-xs text-gray-500">
                          Normal: 20-85°C
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Gauge className="h-4 w-4" />
                          Tekanan
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {currentMachine.pressure} PSI
                        </div>
                        <div className="text-xs text-gray-500">
                          Normal: 70-90 PSI
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Activity className="h-4 w-4" />
                          Getaran
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {currentMachine.vibration} mm/s
                        </div>
                        <div className="text-xs text-gray-500">
                          Normal: &lt; 0.5 mm/s
                        </div>
                      </div>
                    </div>

                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            className="opacity-30"
                          />
                          <XAxis
                            dataKey="time"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                          />
                          <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.1}
                            strokeWidth={2}
                            name="Efisiensi (%)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Informasi Umum
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">ID Mesin:</span>
                            <span className="font-medium">
                              {currentMachine.id}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lokasi:</span>
                            <span className="font-medium">
                              {currentMachine.location}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Operator:</span>
                            <span className="font-medium">
                              {currentMachine.operator}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Runtime Saat Ini:
                            </span>
                            <span className="font-medium">
                              {currentMachine.runtime}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Total Runtime:
                            </span>
                            <span className="font-medium">
                              {currentMachine.totalRuntime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Spesifikasi
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Manufacturer:</span>
                            <span className="font-medium">
                              {currentMachine.manufacturer}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Model:</span>
                            <span className="font-medium">
                              {currentMachine.model}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Tahun Install:
                            </span>
                            <span className="font-medium">
                              {currentMachine.yearInstalled}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Pekerjaan Saat Ini:
                            </span>
                            <span className="font-medium">
                              {currentMachine.currentJob}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="maintenance" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Jadwal Maintenance
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Maintenance Terakhir:
                            </span>
                            <span className="font-medium">
                              {typeof currentMachine.lastMaintenance ===
                                "string" &&
                              currentMachine.lastMaintenance.includes("-")
                                ? new Date(
                                    currentMachine.lastMaintenance,
                                  ).toLocaleDateString("id-ID")
                                : currentMachine.lastMaintenance}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Maintenance Berikutnya:
                            </span>
                            <span className="font-medium">
                              {new Date(
                                currentMachine.nextMaintenance,
                              ).toLocaleDateString("id-ID")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Interval:</span>
                            <span className="font-medium">30 hari</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Status Maintenance
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Filter Udara:</span>
                            <Badge className="bg-success-100 text-success-700">
                              OK
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Oli Mesin:</span>
                            <Badge className="bg-warning-100 text-warning-700">
                              Perlu Ganti
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Belt:</span>
                            <Badge className="bg-success-100 text-success-700">
                              OK
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Kalibrasi:</span>
                            <Badge className="bg-success-100 text-success-700">
                              OK
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

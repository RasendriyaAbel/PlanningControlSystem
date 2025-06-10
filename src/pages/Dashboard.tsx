import { StatCard } from "@/components/dashboard/StatCard";
import {
  ProductionChart,
  MachineEfficiencyChart,
} from "@/components/dashboard/ProductionChart";
import { MachineStatusGrid } from "@/components/dashboard/MachineStatusGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Factory,
  TrendingUp,
  Package,
  AlertTriangle,
  Users,
  Clock,
  Target,
  Wrench,
  Calendar,
  BarChart3,
  Play,
  Pause,
  Settings,
} from "lucide-react";

const todayProduction = [
  {
    shift: "Shift 1 (06:00-14:00)",
    completed: 85,
    target: 100,
    percentage: 85,
  },
  {
    shift: "Shift 2 (14:00-22:00)",
    completed: 92,
    target: 100,
    percentage: 92,
  },
  {
    shift: "Shift 3 (22:00-06:00)",
    completed: 45,
    target: 100,
    percentage: 45,
  },
];

const recentAlerts = [
  {
    id: 1,
    message: "Mesin A2 - Suhu melebihi batas normal (95°C)",
    type: "warning",
    time: "5 menit lalu",
  },
  {
    id: 2,
    message: "Inventori komponen C-001 hampir habis (< 50 unit)",
    type: "error",
    time: "15 menit lalu",
  },
  {
    id: 3,
    message: "Maintenance mesin B1 selesai lebih awal",
    type: "success",
    time: "1 jam lalu",
  },
];

const upcomingSchedule = [
  {
    id: 1,
    task: "Maintenance Preventif Mesin C1",
    time: "14:00",
    status: "scheduled",
  },
  {
    id: 2,
    task: "Quality Inspection Batch #M001",
    time: "16:30",
    status: "in-progress",
  },
  {
    id: 3,
    task: "Shift Handover Meeting",
    time: "18:00",
    status: "scheduled",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Produksi
          </h1>
          <p className="text-gray-600 mt-1">
            Monitoring real-time sistem kontrol manufaktur otomotif
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Laporan
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Pengaturan
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Produksi Hari Ini"
          value="1,247"
          change="+12.5% dari kemarin"
          changeType="positive"
          icon={Factory}
          iconColor="text-production-600"
          subtitle="Unit produksi"
        />
        <StatCard
          title="Efisiensi Rata-rata"
          value="87.3%"
          change="+3.2% dari minggu lalu"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-success-600"
          badge={{ text: "Target: 85%", variant: "secondary" }}
        />
        <StatCard
          title="Mesin Aktif"
          value="18/24"
          change="6 dalam maintenance"
          changeType="neutral"
          icon={Wrench}
          iconColor="text-warning-600"
          subtitle="Operasional"
        />
        <StatCard
          title="Alert Aktif"
          value="3"
          change="2 prioritas tinggi"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-danger-600"
          badge={{ text: "Perlu Tindakan", variant: "destructive" }}
        />
      </div>

      {/* Production Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionChart />
        <MachineEfficiencyChart />
      </div>

      {/* Today's Production Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Progress Produksi Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayProduction.map((shift, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {shift.shift}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {shift.completed}/{shift.target} unit
                    </span>
                    <Badge
                      variant={
                        shift.percentage >= 90
                          ? "default"
                          : shift.percentage >= 70
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {shift.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={shift.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Machine Status Grid */}
      <MachineStatusGrid />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alert Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div
                    className={`h-2 w-2 rounded-full mt-2 ${
                      alert.type === "warning"
                        ? "bg-warning-500"
                        : alert.type === "error"
                          ? "bg-danger-500"
                          : "bg-success-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Lihat
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              Lihat Semua Alert
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Jadwal Mendatang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSchedule.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.time}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{item.task}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === "in-progress" ? (
                      <Badge className="bg-production-100 text-production-700 hover:bg-production-100">
                        <Play className="h-3 w-3 mr-1" />
                        Berlangsung
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Pause className="h-3 w-3 mr-1" />
                        Terjadwal
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              Kelola Jadwal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

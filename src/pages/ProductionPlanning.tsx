import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Plus,
  Filter,
  Download,
  Play,
  Pause,
  Edit,
  Trash2,
  Clock,
  Users,
  Package,
} from "lucide-react";

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  status: "pending" | "in-progress" | "completed" | "paused";
  priority: "low" | "medium" | "high" | "urgent";
  startDate: string;
  endDate: string;
  assignedMachine: string;
  operator: string;
  progress: number;
}

const productionOrders: ProductionOrder[] = [
  {
    id: "PO-001",
    product: "Engine Block V6 - Honda Civic",
    quantity: 500,
    status: "in-progress",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    assignedMachine: "Mesin A1",
    operator: "Ahmad Sutrisno",
    progress: 65,
  },
  {
    id: "PO-002",
    product: "Cylinder Head - Yamaha R15",
    quantity: 300,
    status: "pending",
    priority: "medium",
    startDate: "2024-01-18",
    endDate: "2024-01-22",
    assignedMachine: "Mesin B2",
    operator: "Siti Nurhaliza",
    progress: 0,
  },
  {
    id: "PO-003",
    product: "Piston Set - Kawasaki Ninja",
    quantity: 800,
    status: "completed",
    priority: "low",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    assignedMachine: "Mesin C1",
    operator: "Budi Santoso",
    progress: 100,
  },
  {
    id: "PO-004",
    product: "Connecting Rod - Toyota Avanza",
    quantity: 600,
    status: "paused",
    priority: "urgent",
    startDate: "2024-01-16",
    endDate: "2024-01-19",
    assignedMachine: "Mesin A2",
    operator: "Dewi Sartika",
    progress: 40,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline">Menunggu</Badge>;
    case "in-progress":
      return (
        <Badge className="bg-production-100 text-production-700 hover:bg-production-100">
          Berlangsung
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-success-100 text-success-700 hover:bg-success-100">
          Selesai
        </Badge>
      );
    case "paused":
      return (
        <Badge className="bg-warning-100 text-warning-700 hover:bg-warning-100">
          Ditangguhkan
        </Badge>
      );
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "low":
      return (
        <Badge variant="outline" className="text-gray-600">
          Rendah
        </Badge>
      );
    case "medium":
      return <Badge variant="secondary">Sedang</Badge>;
    case "high":
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          Tinggi
        </Badge>
      );
    case "urgent":
      return <Badge variant="destructive">Mendesak</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function ProductionPlanning() {
  const [orders, setOrders] = useState(productionOrders);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredOrders = orders.filter(
    (order) => filterStatus === "all" || order.status === filterStatus,
  );

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    inProgress: orders.filter((o) => o.status === "in-progress").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Perencanaan Produksi
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola dan monitor jadwal produksi manufaktur
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Order Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Buat Order Produksi Baru</DialogTitle>
                <DialogDescription>
                  Tambahkan order produksi baru ke dalam jadwal
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Produk</Label>
                  <Input id="product" placeholder="Nama produk..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Kuantitas</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Jumlah unit..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="urgent">Mendesak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="machine">Mesin</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mesin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a1">Mesin A1</SelectItem>
                      <SelectItem value="a2">Mesin A2</SelectItem>
                      <SelectItem value="b1">Mesin B1</SelectItem>
                      <SelectItem value="b2">Mesin B2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Simpan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Order</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Menunggu</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Berlangsung</p>
                <p className="text-2xl font-bold text-production-600">
                  {stats.inProgress}
                </p>
              </div>
              <Play className="h-8 w-8 text-production-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-success-600">
                  {stats.completed}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-success-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Order Produksi</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="in-progress">Berlangsung</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="paused">Ditangguhkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Order</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kuantitas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioritas</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Mesin</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.product}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{order.quantity.toLocaleString()} unit</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        Mulai:{" "}
                        {new Date(order.startDate).toLocaleDateString("id-ID")}
                      </p>
                      <p>
                        Selesai:{" "}
                        {new Date(order.endDate).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{order.assignedMachine}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{order.operator}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-production-600 h-2 rounded-full"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {order.status === "in-progress" ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : order.status === "pending" ||
                        order.status === "paused" ? (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

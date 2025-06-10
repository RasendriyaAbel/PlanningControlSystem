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
  Package,
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Edit,
  Trash2,
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  location: string;
  supplier: string;
  unitPrice: number;
  lastRestock: string;
  status: "good" | "low" | "critical" | "overstock";
}

const inventoryItems: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Engine Block V6",
    category: "Komponen Utama",
    stock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "pcs",
    location: "Gudang A-1",
    supplier: "PT Astra Honda Motor",
    unitPrice: 2500000,
    lastRestock: "2024-01-10",
    status: "good",
  },
  {
    id: "INV-002",
    name: "Cylinder Head",
    category: "Komponen Utama",
    stock: 12,
    minStock: 15,
    maxStock: 80,
    unit: "pcs",
    location: "Gudang A-2",
    supplier: "PT Yamaha Motor",
    unitPrice: 1800000,
    lastRestock: "2024-01-08",
    status: "low",
  },
  {
    id: "INV-003",
    name: "Piston Set",
    category: "Komponen Engine",
    stock: 5,
    minStock: 25,
    maxStock: 150,
    unit: "set",
    location: "Gudang B-1",
    supplier: "PT Kawasaki Motor",
    unitPrice: 750000,
    lastRestock: "2024-01-05",
    status: "critical",
  },
  {
    id: "INV-004",
    name: "Ball Bearing",
    category: "Komponen Kecil",
    stock: 250,
    minStock: 50,
    maxStock: 200,
    unit: "pcs",
    location: "Gudang C-3",
    supplier: "PT NSK Indonesia",
    unitPrice: 125000,
    lastRestock: "2024-01-12",
    status: "overstock",
  },
  {
    id: "INV-005",
    name: "Connecting Rod",
    category: "Komponen Engine",
    stock: 85,
    minStock: 30,
    maxStock: 120,
    unit: "pcs",
    location: "Gudang A-3",
    supplier: "PT Toyota Motor",
    unitPrice: 950000,
    lastRestock: "2024-01-11",
    status: "good",
  },
];

const getStatusBadge = (status: string, stock: number, minStock: number) => {
  switch (status) {
    case "critical":
      return <Badge variant="destructive">Kritis</Badge>;
    case "low":
      return (
        <Badge className="bg-warning-100 text-warning-700 hover:bg-warning-100">
          Rendah
        </Badge>
      );
    case "overstock":
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          Overstock
        </Badge>
      );
    default:
      return (
        <Badge className="bg-success-100 text-success-700 hover:bg-success-100">
          Normal
        </Badge>
      );
  }
};

const getStockIndicator = (
  stock: number,
  minStock: number,
  maxStock: number,
) => {
  const percentage = (stock / maxStock) * 100;
  let color = "bg-success-500";

  if (stock <= minStock / 2) color = "bg-danger-500";
  else if (stock <= minStock) color = "bg-warning-500";
  else if (stock > maxStock * 0.9) color = "bg-orange-500";

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
};

export default function Inventory() {
  const [items, setItems] = useState(inventoryItems);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: items.length,
    critical: items.filter((item) => item.status === "critical").length,
    low: items.filter((item) => item.status === "low").length,
    overstock: items.filter((item) => item.status === "overstock").length,
    totalValue: items.reduce(
      (sum, item) => sum + item.stock * item.unitPrice,
      0,
    ),
  };

  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manajemen Inventori
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola stok komponen dan bahan baku manufaktur
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Item Inventori</DialogTitle>
                <DialogDescription>
                  Tambahkan item baru ke dalam inventori
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Nama Item</Label>
                  <Input id="item-name" placeholder="Nama komponen..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="komponen-utama">
                        Komponen Utama
                      </SelectItem>
                      <SelectItem value="komponen-engine">
                        Komponen Engine
                      </SelectItem>
                      <SelectItem value="komponen-kecil">
                        Komponen Kecil
                      </SelectItem>
                      <SelectItem value="bahan-baku">Bahan Baku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stok Awal</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-stock">Min. Stok</Label>
                    <Input id="min-stock" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Simpan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Item</p>
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
                <p className="text-sm font-medium text-gray-600">Stok Kritis</p>
                <p className="text-2xl font-bold text-danger-600">
                  {stats.critical}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-danger-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stok Rendah</p>
                <p className="text-2xl font-bold text-warning-600">
                  {stats.low}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-warning-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overstock</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.overstock}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nilai Total</p>
                <p className="text-lg font-bold text-gray-900">
                  Rp {(stats.totalValue / 1000000).toFixed(1)}M
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Inventori</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Cari item..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select
                  value={filterCategory}
                  onValueChange={setFilterCategory}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="critical">Kritis</SelectItem>
                    <SelectItem value="low">Rendah</SelectItem>
                    <SelectItem value="good">Normal</SelectItem>
                    <SelectItem value="overstock">Overstock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Harga/Unit</TableHead>
                <TableHead>Nilai Total</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Restock terakhir:{" "}
                        {new Date(item.lastRestock).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                          {item.stock} {item.unit}
                        </span>
                        <span className="text-gray-500">
                          Min: {item.minStock}
                        </span>
                      </div>
                      {getStockIndicator(
                        item.stock,
                        item.minStock,
                        item.maxStock,
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status, item.stock, item.minStock)}
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-sm">{item.supplier}</TableCell>
                  <TableCell>
                    Rp {item.unitPrice.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="font-medium">
                    Rp {(item.stock * item.unitPrice).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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

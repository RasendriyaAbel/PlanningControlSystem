import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const productionData = [
  {
    month: "Jan",
    engines: 2400,
    motorcycles: 1800,
    target: 2200,
  },
  {
    month: "Feb",
    engines: 1398,
    motorcycles: 2100,
    target: 2200,
  },
  {
    month: "Mar",
    engines: 2800,
    motorcycles: 1900,
    target: 2200,
  },
  {
    month: "Apr",
    engines: 3908,
    motorcycles: 2400,
    target: 2200,
  },
  {
    month: "Mei",
    engines: 4800,
    motorcycles: 2200,
    target: 2200,
  },
  {
    month: "Jun",
    engines: 3800,
    motorcycles: 2500,
    target: 2200,
  },
];

export function ProductionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Produksi Bulanan</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="engines"
              stroke="#2563eb"
              strokeWidth={3}
              name="Mesin Mobil"
              dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="motorcycles"
              stroke="#16a34a"
              strokeWidth={3}
              name="Mesin Motor"
              dot={{ fill: "#16a34a", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

const machineData = [
  { name: "Mesin A1", efficiency: 95, status: "online" },
  { name: "Mesin A2", efficiency: 87, status: "online" },
  { name: "Mesin B1", efficiency: 92, status: "maintenance" },
  { name: "Mesin B2", efficiency: 78, status: "online" },
  { name: "Mesin C1", efficiency: 96, status: "online" },
  { name: "Mesin C2", efficiency: 0, status: "offline" },
];

export function MachineEfficiencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Efisiensi Mesin</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={machineData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [`${value}%`, "Efisiensi"]}
            />
            <Bar
              dataKey="efficiency"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Efisiensi (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

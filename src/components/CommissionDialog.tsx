import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Calendar,
  Award,
  BarChart3
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface CommissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Datos de ejemplo para los gráficos
const monthlyData = [
  { month: "Ene", meta: 50000, vendido: 45000, comision: 4500 },
  { month: "Feb", meta: 50000, vendido: 62000, comision: 6200 },
  { month: "Mar", meta: 55000, vendido: 48000, comision: 4800 },
  { month: "Abr", meta: 55000, vendido: 71000, comision: 7100 },
  { month: "May", meta: 60000, vendido: 58000, comision: 5800 },
  { month: "Jun", meta: 60000, vendido: 65000, comision: 6500 },
];

const weeklyData = [
  { semana: "S1", ventas: 15000, comision: 1500 },
  { semana: "S2", ventas: 18000, comision: 1800 },
  { semana: "S3", ventas: 22000, comision: 2200 },
  { semana: "S4", ventas: 10000, comision: 1000 },
];

const goalData = [
  { name: "Cumplida", value: 45, color: "#22c55e" },
  { name: "Por cumplir", value: 55, color: "#f59e0b" },
];

const CommissionDialog = ({ open, onOpenChange }: CommissionDialogProps) => {
  const [selectedMonth, setSelectedMonth] = useState("Jun");
  const [selectedView, setSelectedView] = useState("current");

  const currentMonth = monthlyData.find(m => m.month === selectedMonth);
  const metaCumplida = currentMonth && currentMonth.vendido >= currentMonth.meta;
  const exceso = currentMonth && currentMonth.vendido > currentMonth.meta 
    ? currentMonth.vendido - currentMonth.meta 
    : 0;

  const totalComisionAcumulada = monthlyData.reduce((acc, curr) => acc + curr.comision, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-5 w-5" />
            Mi Comisión - Seguimiento de Metas
          </DialogTitle>
          <DialogDescription>
            Visualiza tu progreso mensual, metas cumplidas y comparaciones históricas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selectores */}
          <div className="flex gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mes Actual</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthlyData.map((month) => (
                    <SelectItem key={month.month} value={month.month}>
                      {month.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Vista</label>
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Mes Actual</SelectItem>
                  <SelectItem value="comparison">Comparación</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tarjetas de Resumen */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Meta del Mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${currentMonth?.meta.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {selectedMonth} 2024
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Vendido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${currentMonth?.vendido.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {metaCumplida ? "Meta cumplida ✅" : "Por debajo de meta"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Comisión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${currentMonth?.comision.toLocaleString()}</div>
                {exceso > 0 && (
                  <p className="text-xs text-green-600">
                    +${exceso.toLocaleString()} sobre meta
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Acumulado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalComisionAcumulada.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Total del año
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Estado de la Meta */}
          {metaCumplida && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">¡Meta Cumplida!</h3>
                    <p className="text-sm text-green-600">
                      Has superado tu meta de {selectedMonth} por ${exceso.toLocaleString()}. 
                      Comisión extra ganada: ${(exceso * 0.1).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Gráficos según la vista seleccionada */}
          {selectedView === "current" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Meta vs Vendido */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progreso vs Meta - {selectedMonth}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={[currentMonth]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, ""]} />
                      <Legend />
                      <Bar dataKey="meta" fill="#f59e0b" name="Meta" />
                      <Bar dataKey="vendido" fill="#22c55e" name="Vendido" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico circular de cumplimiento */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Estado de Meta</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={goalData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {goalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedView === "comparison" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Comparación Mensual - 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="meta" stroke="#f59e0b" strokeWidth={2} name="Meta" />
                    <Line type="monotone" dataKey="vendido" stroke="#22c55e" strokeWidth={2} name="Vendido" />
                    <Line type="monotone" dataKey="comision" stroke="#3b82f6" strokeWidth={2} name="Comisión" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {selectedView === "weekly" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progreso Semanal - {selectedMonth}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="ventas" fill="#3b82f6" name="Ventas" />
                    <Bar dataKey="comision" fill="#22c55e" name="Comisión" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommissionDialog;
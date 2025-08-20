import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, Calendar, DollarSign, Award, Clock } from "lucide-react";

// Datos de ejemplo
const monthlyData = [
  { month: "Ene", actual: 12000, target: 15000 },
  { month: "Feb", actual: 18000, target: 15000 },
  { month: "Mar", actual: 14500, target: 15000 },
  { month: "Abr", actual: 22000, target: 15000 },
  { month: "May", actual: 19500, target: 15000 },
  { month: "Jun", actual: 16800, target: 15000 },
];

const weeklyData = [
  { week: "Semana 1", commission: 3200 },
  { week: "Semana 2", commission: 4800 },
  { week: "Semana 3", commission: 5200 },
  { week: "Semana 4", commission: 2100 },
];

const productData = [
  { name: "Racks de Techo", value: 45, color: "#8B5CF6" },
  { name: "Cúpulas", value: 30, color: "#06B6D4" },
  { name: "Accesorios", value: 15, color: "#10B981" },
  { name: "Especiales", value: 10, color: "#F59E0B" },
];

const Commission = () => {
  const currentMonth = "Junio";
  const currentCommission = 16800;
  const monthlyTarget = 15000;
  const yearlyTarget = 180000;
  const yearlyCommission = 108800;
  const progressPercentage = (currentCommission / monthlyTarget) * 100;
  const yearlyProgressPercentage = (yearlyCommission / yearlyTarget) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mi Comisión</h1>
          <p className="text-muted-foreground">Seguimiento de tu desempeño y comisiones</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comisión del Mes</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {progressPercentage >= 100 ? (
                  <span className="text-green-600">
                    ¡Meta superada! +${(currentCommission - monthlyTarget).toLocaleString()}
                  </span>
                ) : (
                  <span className="text-orange-600">
                    Faltan ${(monthlyTarget - currentCommission).toLocaleString()} para la meta
                  </span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meta Mensual</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${monthlyTarget.toLocaleString()}</div>
              <Progress value={progressPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(progressPercentage)}% completado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comisión Anual</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${yearlyCommission.toLocaleString()}</div>
              <Progress value={yearlyProgressPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(yearlyProgressPercentage)}% del objetivo anual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge variant={progressPercentage >= 100 ? "default" : "secondary"} className="text-lg px-3 py-1">
                  {progressPercentage >= 100 ? "¡Meta Alcanzada!" : "En Progreso"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Estado del mes actual
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Comparación Mensual</TabsTrigger>
            <TabsTrigger value="weekly">Progreso Semanal</TabsTrigger>
            <TabsTrigger value="products">Por Producto</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Comparación Mes a Mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${value.toLocaleString()}`, 
                        name === 'actual' ? 'Comisión Actual' : 'Meta'
                      ]}
                    />
                    <Bar dataKey="target" fill="#e2e8f0" name="Meta" />
                    <Bar dataKey="actual" fill="#8B5CF6" name="Comisión Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Progreso Semanal - {currentMonth}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Comisión']} />
                    <Line 
                      type="monotone" 
                      dataKey="commission" 
                      stroke="#06B6D4" 
                      strokeWidth={3}
                      dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {weeklyData.map((week, index) => (
                    <div key={index} className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{week.week}</p>
                      <p className="text-lg font-bold text-primary">${week.commission.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comisiones por Tipo de Producto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {productData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Commission;
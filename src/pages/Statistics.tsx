import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, TrendingUp, DollarSign, ShoppingCart, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ExchangeRate {
  from: string;
  to: string;
  rate: string;
}

const Statistics = () => {
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState<Date>();
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { from: "ARS", to: "CLP", rate: "0,757575" },
    { from: "CLP", to: "ARS", rate: "1,320000" },
    { from: "CLP", to: "USD", rate: "0,001000" },
    { from: "USD", to: "CLP", rate: "1000,000000" }
  ]);

  // Data for Racks y Cupulas chart
  const monthlyData = [
    { month: 'ENERO', RACKS: 1082262.32, CUPULAS: 0 },
    { month: 'FEBRERO', RACKS: 0, CUPULAS: 0 },
    { month: 'MARZO', RACKS: 0, CUPULAS: 0 },
    { month: 'ABRIL', RACKS: 0, CUPULAS: 0 },
    { month: 'MAYO', RACKS: 28638696.75, CUPULAS: 17882262.32 },
    { month: 'JUNIO', RACKS: 25432671.27, CUPULAS: 36304725.64 },
    { month: 'JULIO', RACKS: 21334316.92, CUPULAS: 71645715.66 },
    { month: 'AGOSTO', RACKS: 15582827.26, CUPULAS: 41724439.58 },
    { month: 'SEPTIEMBRE', RACKS: 0, CUPULAS: 0 },
    { month: 'OCTUBRE', RACKS: 0, CUPULAS: 0 },
    { month: 'NOVIEMBRE', RACKS: 0, CUPULAS: 0 },
    { month: 'DICIEMBRE', RACKS: 0, CUPULAS: 0 },
  ];

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleSaveRate = (index: number) => {
    console.log(`Saving exchange rate: ${exchangeRates[index].from} to ${exchangeRates[index].to}`);
  };

  const handleReload = () => {
    console.log("Reloading statistics");
  };

  const handleRateChange = (index: number, newRate: string) => {
    const updatedRates = [...exchangeRates];
    updatedRates[index].rate = newRate;
    setExchangeRates(updatedRates);
  };

  return (
    <div className="min-h-screen bg-google-gray-50 font-roboto">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-12">
          <Button 
            onClick={handleBackToHome}
            className="bg-google-green-600 hover:bg-google-green-700 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-200 font-medium"
          >
            INICIO
          </Button>
          <h1 className="text-4xl font-google-sans font-normal text-google-gray-800">
            Estadísticas
          </h1>
          <div></div>
        </div>

        {/* Exchange Rates Section */}
        <Card className="mb-8 shadow-md border-0 rounded-2xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-google-sans font-medium text-google-gray-800 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-google-blue-600" />
              Tasas de Cambio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="bg-google-gray-50 p-4 rounded-xl space-y-3">
                  <div className="text-sm font-medium text-google-gray-600">
                    {rate.from} → {rate.to}
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      value={rate.rate}
                      onChange={(e) => handleRateChange(index, e.target.value)}
                      className="flex-1 border-google-gray-300 rounded-lg"
                    />
                    <Button 
                      onClick={() => handleSaveRate(index)}
                      className="bg-google-blue-600 hover:bg-google-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm"
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filter Section */}
        <Card className="mb-8 shadow-md border-0 rounded-2xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-google-sans font-medium text-google-gray-800 flex items-center gap-3">
              <CalendarIcon className="h-6 w-6 text-google-blue-600" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <span className="font-medium text-google-gray-700">Período</span>
              <div className="flex-1 max-w-md">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-google-gray-300 rounded-lg hover:border-google-blue-300",
                        !filterDate && "text-google-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDate ? format(filterDate, "PPP") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 shadow-lg rounded-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDate}
                      onSelect={setFilterDate}
                      initialFocus
                      className="p-3 rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button 
                onClick={handleReload}
                className="bg-google-blue-600 hover:bg-google-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-md"
              >
                Actualizar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* General CLP Statistics */}
        <Card className="mb-8 shadow-lg border-0 rounded-2xl bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-google-sans font-medium text-google-gray-800 text-center">
              Resumen General CLP + (ARS convertido a CLP) + (USD convertido a CLP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-google-red to-google-red-600 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="h-8 w-8 text-white/80" />
                  <span className="text-white/70 text-sm font-medium">Sin verificar</span>
                </div>
                <div className="text-2xl font-bold mb-1">$70,907,500</div>
                <div className="text-white/80 text-sm">Ventas pendientes</div>
              </div>
              
              <div className="bg-gradient-to-br from-google-green to-google-green-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="h-8 w-8 text-white/80" />
                  <span className="text-white/70 text-sm font-medium">Confirmadas</span>
                </div>
                <div className="text-2xl font-bold mb-1">$17,583,000</div>
                <div className="text-white/80 text-sm">Ventas verificadas</div>
              </div>
              
              <div className="bg-gradient-to-br from-google-blue to-google-blue-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <ShoppingCart className="h-8 w-8 text-white/80" />
                  <span className="text-white/70 text-sm font-medium">Egresos</span>
                </div>
                <div className="text-2xl font-bold mb-1">$51,147,035</div>
                <div className="text-white/80 text-sm">Gastos totales</div>
              </div>
              
              <div className="bg-gradient-to-br from-google-gray-600 to-google-gray-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-8 w-8 text-white/80" />
                  <span className="text-white/70 text-sm font-medium">Balance</span>
                </div>
                <div className="text-2xl font-bold mb-1">-$35,564,035</div>
                <div className="text-white/80 text-sm">Ganancia neta</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-google-green-50 border border-google-green-200 p-6 rounded-2xl">
                <h3 className="font-google-sans font-medium text-xl text-google-green-700 mb-4">Racks</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-google-gray-700">
                    <span>Monto total:</span>
                    <span className="font-medium">$9,512,000</span>
                  </div>
                  <div className="flex justify-between text-google-gray-700">
                    <span>Cantidad vendida:</span>
                    <span className="font-medium">23 unidades</span>
                  </div>
                </div>
              </div>
              <div className="bg-google-blue-50 border border-google-blue-200 p-6 rounded-2xl">
                <h3 className="font-google-sans font-medium text-xl text-google-blue-700 mb-4">Cúpulas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-google-gray-700">
                    <span>Monto total:</span>
                    <span className="font-medium">$8,071,000</span>
                  </div>
                  <div className="flex justify-between text-google-gray-700">
                    <span>Cantidad vendida:</span>
                    <span className="font-medium">20 unidades</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Sales Table */}
            <div className="mb-8">
              <div className="bg-google-green-600 text-white p-4 rounded-t-2xl shadow-sm">
                <h3 className="font-google-sans font-medium text-lg text-center">Ventas Verificadas por Vendedor</h3>
              </div>
              <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-google-green-50 border-b border-google-green-100">
                      <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                      <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                      <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                      <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                      <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                      <td className="p-4 text-google-gray-700">$3,171,000.00</td>
                      <td className="p-4 text-google-gray-700">$0.00</td>
                      <td className="p-4 text-google-gray-700">$7,950,000.00</td>
                    </tr>
                    <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                      <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                      <td className="p-4 text-google-gray-700">$4,830,000.00</td>
                      <td className="p-4 text-google-gray-700">$1,082,000.00</td>
                      <td className="p-4 text-google-gray-700">$550,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Unverified Sales Table */}
            <div className="mb-8">
              <div className="bg-google-red-600 text-white p-4 rounded-t-2xl shadow-sm">
                <h3 className="font-google-sans font-medium text-lg text-center">Ventas Sin Verificar por Vendedor</h3>
                <p className="text-white/80 text-sm text-center mt-1">Faltan abonos por verificar</p>
              </div>
              <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-google-red-50 border-b border-google-red-100">
                      <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                      <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                      <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                      <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                      <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                      <td className="p-4 text-google-gray-700">$20,638,500.00</td>
                      <td className="p-4 text-google-gray-700">—</td>
                      <td className="p-4 text-google-gray-700">—</td>
                    </tr>
                    <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                      <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                      <td className="p-4 text-google-gray-700">$34,187,000.00</td>
                      <td className="p-4 text-google-gray-700">—</td>
                      <td className="p-4 text-google-gray-700">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Verified Sales Chart */}
              <div className="bg-white p-8 rounded-2xl shadow-md border border-google-green-100">
                <h3 className="font-google-sans font-medium text-xl text-google-gray-800 text-center mb-6">
                  Ventas Verificadas por Vendedor
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#1a73e8"
                        strokeWidth="20"
                        strokeDasharray="64, 36"
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#34a853"
                        strokeWidth="20"
                        strokeDasharray="36, 64"
                        strokeDashoffset="-64"
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="50" textAnchor="middle" className="text-xs font-medium fill-google-gray-700">
                        Total Verificadas
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center space-x-6 mt-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-google-blue-600 rounded-sm mr-3"></div>
                    <span className="text-google-gray-700">MIGUEL: $11,121,000</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-google-green-600 rounded-sm mr-3"></div>
                    <span className="text-google-gray-700">FRANYELIS: $6,462,000</span>
                  </div>
                </div>
              </div>

              {/* Unverified Sales Chart */}
              <div className="bg-white p-8 rounded-2xl shadow-md border border-google-red-100">
                <h3 className="font-google-sans font-medium text-xl text-google-gray-800 text-center mb-6">
                  Ventas Sin Verificar por Vendedor
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#1a73e8"
                        strokeWidth="20"
                        strokeDasharray="38, 62"
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#ea4335"
                        strokeWidth="20"
                        strokeDasharray="62, 38"
                        strokeDashoffset="-38"
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="50" textAnchor="middle" className="text-xs font-medium fill-google-gray-700">
                        Pendientes
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center space-x-6 mt-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-google-blue-600 rounded-sm mr-3"></div>
                    <span className="text-google-gray-700">MIGUEL: $20,638,500</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-google-red-600 rounded-sm mr-3"></div>
                    <span className="text-google-gray-700">FRANYELIS: $34,187,000</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Racks y Cupulas Chart */}
        <Card className="mb-8 shadow-lg border-0 rounded-2xl bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-google-sans font-medium text-google-gray-800 text-center flex items-center justify-center gap-3">
              <TrendingUp className="h-6 w-6 text-google-blue-600" />
              Racks y Cúpulas - Ventas Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    fontSize={11}
                    stroke="#616161"
                  />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    domain={[0, 80000000]}
                    stroke="#616161"
                    fontSize={11}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'CLP',
                        minimumFractionDigits: 2
                      }).format(Number(value)),
                      name
                    ]}
                    labelFormatter={(label) => `Mes: ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ 
                      paddingTop: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  />
                  <Bar 
                    dataKey="RACKS" 
                    fill="#34a853" 
                    name="RACKS"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar 
                    dataKey="CUPULAS" 
                    fill="#1a73e8" 
                    name="CUPULAS"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Currency Statistics Sections */}
        
        {/* CLP Pesos Chilenos */}
        <Card className="mb-8 shadow-lg border-0 rounded-2xl bg-white">
          <CardHeader className="pb-6 border-b border-google-gray-200">
            <CardTitle className="text-2xl font-google-sans font-medium text-google-gray-800 text-center flex items-center justify-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              CLP - Pesos Chilenos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-google-red to-google-red-600 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Sin verificar</span>
                </div>
                <div className="text-xl font-bold mb-1">$55.607.500</div>
                <div className="text-white/80 text-sm">Ventas pendientes</div>
              </div>
              <div className="bg-gradient-to-br from-google-green to-google-green-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Confirmadas</span>
                </div>
                <div className="text-xl font-bold mb-1">$9.583.000</div>
                <div className="text-white/80 text-sm">Ventas verificadas</div>
              </div>
              <div className="bg-gradient-to-br from-google-blue to-google-blue-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <ShoppingCart className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Egresos</span>
                </div>
                <div className="text-xl font-bold mb-1">$51.147.035</div>
                <div className="text-white/80 text-sm">Gastos totales</div>
              </div>
              <div className="bg-gradient-to-br from-google-gray-600 to-google-gray-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Balance</span>
                </div>
                <div className="text-xl font-bold mb-1">-$42.064.035</div>
                <div className="text-white/80 text-sm">Ganancia neta</div>
              </div>
            </div>

            {/* CLP Tables - Using the same modern style */}
            <div className="space-y-8">
              <div>
                <div className="bg-google-green-600 text-white p-4 rounded-t-2xl shadow-sm">
                  <h3 className="font-google-sans font-medium text-lg text-center">Ventas Verificadas por Vendedor</h3>
                </div>
                <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-google-green-50 border-b border-google-green-100">
                        <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                        <td className="p-4 text-google-gray-700">$3,171,000.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                      </tr>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                        <td className="p-4 text-google-gray-700">$4,830,000.00</td>
                        <td className="p-4 text-google-gray-700">$1,082,000.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="bg-google-red-600 text-white p-4 rounded-t-2xl shadow-sm">
                  <h3 className="font-google-sans font-medium text-lg text-center">Ventas Sin Verificar por Vendedor</h3>
                  <p className="text-white/80 text-sm text-center mt-1">Faltan abonos por verificar</p>
                </div>
                <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-google-red-50 border-b border-google-red-100">
                        <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                        <td className="p-4 text-google-gray-700">$20,638,500.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$2,000,000.00</td>
                      </tr>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                        <td className="p-4 text-google-gray-700">$31,887,000.00</td>
                        <td className="p-4 text-google-gray-700">$1,082,000.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* USD Dolares Americanos */}
        <Card className="mb-8 shadow-lg border-0 rounded-2xl bg-white">
          <CardHeader className="pb-6 border-b border-google-gray-200">
            <CardTitle className="text-2xl font-google-sans font-medium text-google-gray-800 text-center flex items-center justify-center gap-3">
              <DollarSign className="h-6 w-6 text-blue-600" />
              USD - Dólares Americanos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-google-red to-google-red-600 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Sin verificar</span>
                </div>
                <div className="text-xl font-bold mb-1">$15.300</div>
                <div className="text-white/80 text-sm">Ventas pendientes</div>
              </div>
              <div className="bg-gradient-to-br from-google-green to-google-green-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Confirmadas</span>
                </div>
                <div className="text-xl font-bold mb-1">$8.500</div>
                <div className="text-white/80 text-sm">Ventas verificadas</div>
              </div>
              <div className="bg-gradient-to-br from-google-blue to-google-blue-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <ShoppingCart className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Egresos</span>
                </div>
                <div className="text-xl font-bold mb-1">$51.147</div>
                <div className="text-white/80 text-sm">Gastos totales</div>
              </div>
              <div className="bg-gradient-to-br from-google-gray-600 to-google-gray-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Balance</span>
                </div>
                <div className="text-xl font-bold mb-1">-$42.647</div>
                <div className="text-white/80 text-sm">Ganancia neta</div>
              </div>
            </div>

            {/* USD Tables */}
            <div className="space-y-8">
              <div>
                <div className="bg-google-green-600 text-white p-4 rounded-t-2xl shadow-sm">
                  <h3 className="font-google-sans font-medium text-lg text-center">Ventas Verificadas por Vendedor</h3>
                </div>
                <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-google-green-50 border-b border-google-green-100">
                        <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$7,950.00</td>
                      </tr>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$550.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="bg-google-red-600 text-white p-4 rounded-t-2xl shadow-sm">
                  <h3 className="font-google-sans font-medium text-lg text-center">Ventas Sin Verificar por Vendedor</h3>
                  <p className="text-white/80 text-sm text-center mt-1">Faltan abonos por verificar</p>
                </div>
                <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-google-red-50 border-b border-google-red-100">
                        <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$12,450.00</td>
                      </tr>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                        <td className="p-4 text-google-gray-700">$2,300.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$550.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ARS Pesos Argentinos */}
        <Card className="mb-8 shadow-lg border-0 rounded-2xl bg-white">
          <CardHeader className="pb-6 border-b border-google-gray-200">
            <CardTitle className="text-2xl font-google-sans font-medium text-google-gray-800 text-center flex items-center justify-center gap-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
              ARS - Pesos Argentinos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-google-red to-google-red-600 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Sin verificar</span>
                </div>
                <div className="text-xl font-bold mb-1">$0.00</div>
                <div className="text-white/80 text-sm">Ventas pendientes</div>
              </div>
              <div className="bg-gradient-to-br from-google-green to-google-green-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Confirmadas</span>
                </div>
                <div className="text-xl font-bold mb-1">$0.00</div>
                <div className="text-white/80 text-sm">Ventas verificadas</div>
              </div>
              <div className="bg-gradient-to-br from-google-blue to-google-blue-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <ShoppingCart className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Egresos</span>
                </div>
                <div className="text-xl font-bold mb-1">$67,514,086</div>
                <div className="text-white/80 text-sm">Gastos totales</div>
              </div>
              <div className="bg-gradient-to-br from-google-gray-600 to-google-gray-700 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="h-7 w-7 text-white/80" />
                  <span className="text-white/70 text-xs font-medium">Balance</span>
                </div>
                <div className="text-xl font-bold mb-1">-$67,514,086</div>
                <div className="text-white/80 text-sm">Ganancia neta</div>
              </div>
            </div>

            {/* ARS Tables */}
            <div className="space-y-8">
              <div>
                <div className="bg-google-green-600 text-white p-4 rounded-t-2xl shadow-sm">
                  <h3 className="font-google-sans font-medium text-lg text-center">Ventas Verificadas por Vendedor</h3>
                </div>
                <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-google-green-50 border-b border-google-green-100">
                        <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                      </tr>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="bg-google-red-600 text-white p-4 rounded-t-2xl shadow-sm">
                  <h3 className="font-google-sans font-medium text-lg text-center">Ventas Sin Verificar por Vendedor</h3>
                  <p className="text-white/80 text-sm text-center mt-1">Faltan abonos por verificar</p>
                </div>
                <div className="overflow-x-auto bg-white rounded-b-2xl shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-google-red-50 border-b border-google-red-100">
                        <th className="p-4 text-left font-medium text-google-gray-700">Vendedor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Común</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Distribuidor</th>
                        <th className="p-4 text-left font-medium text-google-gray-700">Cliente Argentino</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">MIGUEL</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                      </tr>
                      <tr className="border-b border-google-gray-100 hover:bg-google-gray-50 transition-colors">
                        <td className="p-4 font-medium text-google-gray-800">FRANYELIS</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                        <td className="p-4 text-google-gray-700">$0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={handleBackToHome}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            INICIO
          </Button>
          <h1 className="text-3xl font-bold text-foreground">
            ESTADISTICAS
          </h1>
          <div></div>
        </div>

        {/* Exchange Rates Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">TASAS DE CAMBIO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Moneda</span>
                    <span className="font-medium text-sm">Valor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium min-w-[80px]">
                      {rate.from} a {rate.to}
                    </span>
                    <Input
                      value={rate.rate}
                      onChange={(e) => handleRateChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => handleSaveRate(index)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4"
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Filtro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="font-medium">MES</span>
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filterDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDate ? format(filterDate, "PPP") : "---------- de ----"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filterDate}
                      onSelect={setFilterDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button 
                onClick={handleReload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Recargar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* General CLP Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              General CLP + (ARS convertido a CLP) + (USD convertido a CLP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-red-500 text-white p-4 rounded text-center">
                <div className="font-semibold mb-2">VENTAS SIN VERIFICAR</div>
                <div className="text-xl font-bold">$70,907,500.00</div>
              </div>
              <div className="bg-green-500 text-white p-4 rounded text-center">
                <div className="font-semibold mb-2">MONTO DE VENTAS</div>
                <div className="text-xl font-bold">$17,583,000.00</div>
              </div>
              <div className="bg-blue-500 text-white p-4 rounded text-center">
                <div className="font-semibold mb-2">GASTOS</div>
                <div className="text-xl font-bold">$51,147,035.00</div>
              </div>
              <div className="bg-gray-600 text-white p-4 rounded text-center">
                <div className="font-semibold mb-2">GANANCIA</div>
                <div className="text-xl font-bold">-$35,564,035.00</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-bold text-lg mb-2">RACKS</h3>
                <div className="space-y-1">
                  <div>Monto: $9,512,000.00</div>
                  <div>Cantidad de Racks: 23</div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-bold text-lg mb-2">CUPULAS</h3>
                <div className="space-y-1">
                  <div>Monto: $8,071,000.00</div>
                  <div>Cantidad de Cupulas: 20</div>
                </div>
              </div>
            </div>

            {/* Verified Sales Table */}
            <div className="mb-8">
              <div className="bg-green-600 text-white p-3 rounded-t">
                <h3 className="font-bold text-center">TOTAL DE VENTAS VERIFICADAS POR VENDEDOR</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-green-100">
                  <thead>
                    <tr className="bg-green-200">
                      <th className="border border-gray-300 p-2 text-left">VENDEDOR</th>
                      <th className="border border-gray-300 p-2 text-left">CLIENTE COMÚN</th>
                      <th className="border border-gray-300 p-2 text-left">CLIENTE DISTRIBUIDOR</th>
                      <th className="border border-gray-300 p-2 text-left">CLIENTE ARGENTINO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">MIGUEL</td>
                      <td className="border border-gray-300 p-2">$3,171,000.00</td>
                      <td className="border border-gray-300 p-2">$0.00</td>
                      <td className="border border-gray-300 p-2">$7,950,000.00</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">FRANYELIS</td>
                      <td className="border border-gray-300 p-2">$4,830,000.00</td>
                      <td className="border border-gray-300 p-2">$1,082,000.00</td>
                      <td className="border border-gray-300 p-2">$550,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Unverified Sales Table */}
            <div className="mb-8">
              <div className="bg-red-600 text-white p-3 rounded-t">
                <h3 className="font-bold text-center">TOTAL DE VENTAS SIN VERIFICAR POR VENDEDOR(FALTAN ABONOS POR VERIFICAR)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-red-100">
                  <thead>
                    <tr className="bg-red-200">
                      <th className="border border-gray-300 p-2 text-left">VENDEDOR</th>
                      <th className="border border-gray-300 p-2 text-left">CLIENTE COMÚN</th>
                      <th className="border border-gray-300 p-2 text-left">CLIENTE DISTRIBUIDOR</th>
                      <th className="border border-gray-300 p-2 text-left">CLIENTE ARGENTINO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">MIGUEL</td>
                      <td className="border border-gray-300 p-2">$20,638,500.00</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">FRANYELIS</td>
                      <td className="border border-gray-300 p-2">$34,187,000.00</td>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Verified Sales Chart */}
              <div className="bg-green-200 p-6 rounded">
                <h3 className="font-bold text-center mb-4"># Ventas por vendedor</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#3B82F6"
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
                        stroke="#EC4899"
                        strokeWidth="20"
                        strokeDasharray="36, 64"
                        strokeDashoffset="-64"
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-blue-600">
                        MIGUEL: 11,121,000
                      </text>
                      <text x="50" y="55" textAnchor="middle" className="text-xs font-bold fill-pink-600">
                        FRANYELIS: 6,462,000
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                    <span>MIGUEL: 11,121,000</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-pink-500 mr-2"></div>
                    <span>FRANYELIS: 6,462,000</span>
                  </div>
                </div>
              </div>

              {/* Unverified Sales Chart */}
              <div className="bg-red-200 p-6 rounded">
                <h3 className="font-bold text-center mb-4"># Ventas NO VERIFICADAS por vendedor</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#3B82F6"
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
                        stroke="#EC4899"
                        strokeWidth="20"
                        strokeDasharray="62, 38"
                        strokeDashoffset="-38"
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="45" textAnchor="middle" className="text-xs font-bold fill-blue-600">
                        MIGUEL: 20,638,500
                      </text>
                      <text x="50" y="55" textAnchor="middle" className="text-xs font-bold fill-pink-600">
                        FRANYELIS: 34,187,000
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                    <span>MIGUEL: 20,638,500</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-pink-500 mr-2"></div>
                    <span>FRANYELIS: 34,187,000</span>
                  </div>
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
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

        {/* Statistics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Racks Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">RACKS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Los 5 Racks mas vendidos
              </p>
              {/* This would be populated with actual rack data */}
              <div className="mt-4 space-y-2">
                <div className="text-sm text-muted-foreground">
                  Datos de racks se mostrarán aquí...
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cupulas Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">CUPULAS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                Las 5 Cupulas mas vendidas
              </p>
              {/* This would be populated with actual cupula data */}
              <div className="mt-4 space-y-2">
                <div className="text-sm text-muted-foreground">
                  Datos de cúpulas se mostrarán aquí...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, User, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Mes");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const dayNames = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

  // Get days in month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust for Monday start

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // Sample events data with detailed information  
  const events = {
    6: [{ 
      id: "9441",
      title: "#9441 [PF] MITSUBISHI L200 KATANA CR", 
      type: "ENVÍO",
      color: "bg-primary/80 hover:bg-primary",
      client: "Juan Carlos Mendoza",
      vehicle: "MITSUBISHI L200 KATANA CR",
      time: "09:00 AM",
      status: "Confirmado",
      location: "Santiago Centro",
      phone: "+56 9 8765 4321"
    }],
    7: [
      { 
        id: "9449",
        title: "#9449 [PF] TOYOTA HILUX REVO", 
        type: "ENVÍO",
        color: "bg-primary/80 hover:bg-primary",
        client: "María González",
        vehicle: "TOYOTA HILUX REVO",
        time: "10:30 AM",
        status: "Confirmado",
        location: "Las Condes",
        phone: "+56 9 1234 5678"
      },
      { 
        id: "9445",
        title: "#9445 [PF] PEUGEOT LANDTREK con barra de techo", 
        type: "ENVÍO",
        color: "bg-primary/80 hover:bg-primary",
        client: "Pedro Ramírez",
        vehicle: "PEUGEOT LANDTREK con barra de techo",
        time: "02:00 PM",
        status: "Pendiente",
        location: "Providencia",
        phone: "+56 9 9876 5432"
      }
    ],
    8: [
      { 
        id: "9446",
        title: "#9446 [PF] TOYOTA PRADO 150 4 PUERTAS | TALLER", 
        type: "INSTALACIÓN EN TALLER",
        color: "bg-amber-500/80 hover:bg-amber-500",
        client: "Ana Silva",
        vehicle: "TOYOTA PRADO 150 4 PUERTAS",
        time: "08:00 AM",
        status: "En proceso",
        location: "Taller Principal",
        phone: "+56 9 5555 1234"
      },
      { 
        id: "9443",
        title: "#9443 [PF] JEEP WRANGLER JK 4 PUERTAS", 
        type: "INSTALACIÓN DE CÚPULA",
        color: "bg-blue-500/80 hover:bg-blue-500",
        client: "Roberto Torres",
        vehicle: "JEEP WRANGLER JK 4 PUERTAS",
        time: "11:00 AM",
        status: "Programado",
        location: "Área de Instalación",
        phone: "+56 9 7777 8888"
      }
    ],
    9: [{ 
      id: "2792",
      title: "#2792 C TOYOTA HILUX VIGO", 
      type: "INSTALACIÓN DE CÚPULA",
      color: "bg-blue-500/80 hover:bg-blue-500",
      client: "Luis Morales",
      vehicle: "TOYOTA HILUX VIGO",
      time: "09:30 AM",
      status: "Confirmado",
      location: "Área de Instalación",
      phone: "+56 9 4444 3333"
    }],
    12: [{ 
      id: "9447",
      title: "#9447 [PF] SUZUKI JIMNY 4 GENERACIÓN con barra de techo", 
      type: "ENVÍO",
      color: "bg-primary/80 hover:bg-primary",
      client: "Carmen López",
      vehicle: "SUZUKI JIMNY 4 GENERACIÓN con barra de techo",
      time: "03:00 PM",
      status: "Confirmado",
      location: "Ñuñoa",
      phone: "+56 9 2222 1111"
    }]
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const days = getDaysInMonth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleBackToHome}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              INICIO
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevMonth} className="border-border hover:bg-accent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextMonth} className="border-border hover:bg-accent">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleToday} className="border-border hover:bg-accent">
                Hoy
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
              ENVÍO
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20 px-3 py-1">
              INSTALACIÓN DE CÚPULA
            </Badge>
            <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20 px-3 py-1">
              ESPECIAL
            </Badge>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1">
              INSTALACIÓN EN TALLER
            </Badge>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">
            {monthNames[currentDate.getMonth()]} de {currentDate.getFullYear()}
          </h1>
        </div>

        <div className="flex justify-end gap-2 mb-4">
          {["Mes", "1 Semana", "2 Semanas", "3 Semanas"].map((view) => (
            <Button
              key={view}
              variant={viewMode === view ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode(view)}
            >
              {view}
            </Button>
          ))}
        </div>

        <Card className="border-border shadow-lg bg-card/50 backdrop-blur">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 bg-card border-b border-border">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center font-semibold border-r border-border last:border-r-0 text-primary">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className="min-h-[120px] p-2 border-r border-b border-border last:border-r-0 bg-background hover:bg-accent/30 transition-colors"
              >
                {day && (
                  <>
                    <div className="text-right mb-2 text-foreground font-semibold">{day}</div>
                    <div className="space-y-1">
                      {events[day]?.map((event, eventIndex) => (
                        <button
                          key={eventIndex}
                          onClick={() => handleOrderClick(event)}
                          className={`w-full ${event.color} text-white text-xs p-2 rounded-md text-left font-medium transition-all cursor-pointer shadow-sm hover:shadow-md transform hover:scale-[1.02]`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <Package className="h-3 w-3" />
                            <span className="font-semibold">#{event.id}</span>
                          </div>
                          <div className="truncate text-xs opacity-90">
                            {event.vehicle}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-2.5 w-2.5" />
                            <span className="text-xs opacity-80">{event.time}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl bg-background border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                Detalles del Pedido #{selectedOrder?.id}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Información completa del pedido y programación
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="border-border bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                      <User className="h-5 w-5 text-primary" />
                      Información del Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Cliente:</label>
                      <p className="text-foreground font-semibold">{selectedOrder.client}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Teléfono:</label>
                      <p className="text-foreground">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Ubicación:</label>
                      <p className="text-foreground">{selectedOrder.location}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      Programación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tipo de Servicio:</label>
                      <Badge 
                        variant="secondary" 
                        className={`
                          ${selectedOrder.type === 'ENVÍO' ? 'bg-primary/10 text-primary border-primary/20' : ''}
                          ${selectedOrder.type === 'INSTALACIÓN DE CÚPULA' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : ''}
                          ${selectedOrder.type === 'INSTALACIÓN EN TALLER' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : ''}
                          mt-1
                        `}
                      >
                        {selectedOrder.type}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Hora:</label>
                      <p className="text-foreground font-semibold">{selectedOrder.time}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Estado:</label>
                      <Badge 
                        variant={selectedOrder.status === 'Confirmado' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 border-border bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                      <Package className="h-5 w-5 text-primary" />
                      Detalles del Vehículo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Vehículo:</label>
                      <p className="text-foreground font-semibold text-lg">{selectedOrder.vehicle}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;
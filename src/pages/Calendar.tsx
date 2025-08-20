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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Action Bar - Gmail style */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleBackToHome}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg px-3 py-2"
            >
              ← Inicio
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handlePrevMonth}
                className="h-8 w-8 p-0 hover:bg-accent rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleNextMonth}
                className="h-8 w-8 p-0 hover:bg-accent rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleToday}
                className="ml-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg px-3 py-1.5"
              >
                Hoy
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {["Mes", "Semana", "Día"].map((view) => (
              <Button
                key={view}
                variant="ghost"
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === view 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => setViewMode(view)}
              >
                {view}
              </Button>
            ))}
          </div>
        </div>

        {/* Month Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-foreground tracking-tight">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
        </div>

        {/* Legend - Minimal */}
        <div className="flex items-center gap-6 mb-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/80"></div>
            <span className="text-sm text-muted-foreground">Envío</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/80"></div>
            <span className="text-sm text-muted-foreground">Instalación cúpula</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <span className="text-sm text-muted-foreground">Taller</span>
          </div>
        </div>

        {/* Calendar Grid - Gmail minimal style */}
        <div className="bg-card rounded-lg border border-border/50 overflow-hidden shadow-sm">
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-border/30">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground bg-muted/30">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className="min-h-[110px] p-3 border-r border-b border-border/20 last:border-r-0 hover:bg-muted/30 transition-colors"
              >
                {day && (
                  <>
                    <div className="text-right mb-3 text-sm font-medium text-foreground">{day}</div>
                    <div className="space-y-2">
                      {events[day]?.map((event, eventIndex) => (
                        <button
                          key={eventIndex}
                          onClick={() => handleOrderClick(event)}
                          className="w-full p-2 rounded-md text-left transition-all cursor-pointer group hover:shadow-sm border border-transparent hover:border-border/50"
                          style={{
                            backgroundColor: event.type === 'ENVÍO' ? 'hsl(var(--primary) / 0.1)' :
                                           event.type === 'INSTALACIÓN DE CÚPULA' ? 'hsl(217 91% 60% / 0.1)' :
                                           'hsl(45 93% 47% / 0.1)'
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <div 
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: event.type === 'ENVÍO' ? 'hsl(var(--primary))' :
                                               event.type === 'INSTALACIÓN DE CÚPULA' ? 'hsl(217 91% 60%)' :
                                               'hsl(45 93% 47%)'
                              }}
                            ></div>
                            <span className="text-xs font-medium text-foreground">#{event.id}</span>
                          </div>
                          <div className="text-xs text-muted-foreground truncate mb-1">
                            {event.vehicle}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{event.time}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Detail Modal - Minimal Gmail style */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl bg-background border border-border/50 shadow-xl">
            <DialogHeader className="border-b border-border/30 pb-4">
              <DialogTitle className="text-xl font-medium text-foreground flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: selectedOrder?.type === 'ENVÍO' ? 'hsl(var(--primary))' :
                                   selectedOrder?.type === 'INSTALACIÓN DE CÚPULA' ? 'hsl(217 91% 60%)' :
                                   'hsl(45 93% 47%)'
                  }}
                ></div>
                Pedido #{selectedOrder?.id}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                {selectedOrder?.type}
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="pt-6 space-y-6">
                {/* Client Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-foreground border-b border-border/30 pb-2">
                    Información del Cliente
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Cliente:</span>
                      <p className="font-medium text-foreground mt-1">{selectedOrder.client}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Teléfono:</span>
                      <p className="font-medium text-foreground mt-1">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ubicación:</span>
                      <p className="font-medium text-foreground mt-1">{selectedOrder.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hora:</span>
                      <p className="font-medium text-foreground mt-1">{selectedOrder.time}</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-foreground border-b border-border/30 pb-2">
                    Detalles del Vehículo
                  </h3>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Vehículo:</span>
                    <p className="font-medium text-foreground mt-1 text-base">{selectedOrder.vehicle}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Estado:</span>
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${
                        selectedOrder.status === 'Confirmado' ? 'bg-primary/10 text-primary' : 
                        'bg-muted text-muted-foreground'
                      }`}
                    >
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;
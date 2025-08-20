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
  const [filterType, setFilterType] = useState("TODOS"); // New filter state

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

  // Sample events data with detailed information - All 4 service types
  const events = {
    6: [{ 
      id: "9441",
      title: "#9441 [PF] MITSUBISHI L200 KATANA CR", 
      type: "ENVÍO",
      color: "bg-green-500/80 hover:bg-green-500",
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
        color: "bg-green-500/80 hover:bg-green-500",
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
        type: "INSTALACIÓN DE CÚPULA",
        color: "bg-blue-500/80 hover:bg-blue-500",
        client: "Pedro Ramírez",
        vehicle: "PEUGEOT LANDTREK con barra de techo",
        time: "02:00 PM",
        status: "Pendiente",
        location: "Área de Instalación",
        phone: "+56 9 9876 5432"
      }
    ],
    8: [
      { 
        id: "9446",
        title: "#9446 [PF] TOYOTA PRADO 150 4 PUERTAS | TALLER", 
        type: "INSTALACIÓN EN TALLER",
        color: "bg-yellow-500/80 hover:bg-yellow-500",
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
        type: "ESPECIAL",
        color: "bg-red-600/80 hover:bg-red-600",
        client: "Roberto Torres",
        vehicle: "JEEP WRANGLER JK 4 PUERTAS",
        time: "11:00 AM",
        status: "Programado",
        location: "Área Especial",
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
      color: "bg-green-500/80 hover:bg-green-500",
      client: "Carmen López",
      vehicle: "SUZUKI JIMNY 4 GENERACIÓN con barra de techo",
      time: "03:00 PM",
      status: "Confirmado",
      location: "Ñuñoa",
      phone: "+56 9 2222 1111"
    }],
    15: [{ 
      id: "8901",
      title: "#8901 [ESP] FORD RANGER RAPTOR", 
      type: "ESPECIAL",
      color: "bg-red-600/80 hover:bg-red-600",
      client: "Diego Vargas",
      vehicle: "FORD RANGER RAPTOR",
      time: "01:00 PM",
      status: "Urgente",
      location: "Área Especial",
      phone: "+56 9 3333 4444"
    }],
    20: [{ 
      id: "7854",
      title: "#7854 [T] CHEVROLET COLORADO", 
      type: "INSTALACIÓN EN TALLER",
      color: "bg-yellow-500/80 hover:bg-yellow-500",
      client: "Sofía Herrera",
      vehicle: "CHEVROLET COLORADO",
      time: "10:00 AM",
      status: "En espera",
      location: "Taller Principal",
      phone: "+56 9 6666 7777"
    }]
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Filter events based on selected filter type
  const getFilteredEvents = (dayEvents) => {
    if (!dayEvents) return [];
    if (filterType === "TODOS") return dayEvents;
    return dayEvents.filter(event => event.type === filterType);
  };

  const days = getDaysInMonth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="w-full max-w-none mx-auto px-8 py-4">
        {/* Top Action Bar - Compact */}
        <div className="flex items-center justify-between mb-4">
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

        {/* Month Title - Compact */}
        <div className="mb-4">
          <h1 className="text-2xl font-light text-foreground tracking-tight">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
        </div>

        {/* Filter Buttons - Compact horizontal */}
        <div className="flex items-center justify-center gap-3 mb-4 pb-3 border-b border-border/30">
          <Button
            onClick={() => setFilterType("TODOS")}
            variant="ghost"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-accent ${
              filterType === "TODOS" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Todos
          </Button>
          <Button
            onClick={() => setFilterType("ENVÍO")}
            variant="ghost"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
              filterType === "ENVÍO" 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "text-muted-foreground hover:text-green-700 hover:bg-green-50"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Envío
          </Button>
          <Button
            onClick={() => setFilterType("INSTALACIÓN DE CÚPULA")}
            variant="ghost"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
              filterType === "INSTALACIÓN DE CÚPULA" 
                ? "bg-blue-50 text-blue-700 border border-blue-200" 
                : "text-muted-foreground hover:text-blue-700 hover:bg-blue-50"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Instalación de cúpula
          </Button>
          <Button
            onClick={() => setFilterType("ESPECIAL")}
            variant="ghost"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
              filterType === "ESPECIAL" 
                ? "bg-red-50 text-red-700 border border-red-200" 
                : "text-muted-foreground hover:text-red-700 hover:bg-red-50"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-red-600"></div>
            Especial
          </Button>
          <Button
            onClick={() => setFilterType("INSTALACIÓN EN TALLER")}
            variant="ghost"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
              filterType === "INSTALACIÓN EN TALLER" 
                ? "bg-amber-50 text-amber-700 border border-amber-200" 
                : "text-muted-foreground hover:text-amber-700 hover:bg-amber-50"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            Instalación en taller
          </Button>
        </div>

        {/* Calendar Grid - Horizontal event bars */}
        <div className="bg-card rounded-lg border border-border/50 overflow-hidden shadow-sm">
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b border-border/30">
            {dayNames.map((day) => (
              <div key={day} className="p-3 text-center text-lg font-semibold text-foreground bg-muted/30">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body with Horizontal Events */}
          <div className="relative">
            {/* Day Numbers Grid */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => (
                <div
                  key={index}
                  className="h-[160px] p-3 border-r border-b border-border/20 last:border-r-0 hover:bg-muted/30 transition-colors"
                >
                  {day && (
                    <div className="text-right text-lg font-bold text-foreground">{day}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Horizontal Event Bars Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {Object.entries(events).map(([dayNum, dayEvents]) => {
                const dayIndex = days.findIndex(d => d === parseInt(dayNum));
                if (dayIndex === -1) return null;

                const row = Math.floor(dayIndex / 7);
                const col = dayIndex % 7;
                
                return getFilteredEvents(dayEvents).map((event, eventIndex) => {
                  // Calculate position within the specific day cell
                  const cellWidth = 100 / 7; // Each cell is 1/7 of the total width
                  const topOffset = row * 160 + 45 + (eventIndex * 30); // Reduced spacing for single line design
                  const leftOffset = col * cellWidth + 0.5; // Start at the beginning of the cell + small margin
                  const eventWidth = cellWidth - 1; // Fill the cell width minus margins
                  
                  // Service type abbreviation
                  const serviceType = event.type === 'ENVÍO' ? 'PF' : 
                                     event.type === 'INSTALACIÓN DE CÚPULA' ? 'C' : 
                                     event.type === 'ESPECIAL' ? 'ESP' : 'RT';
                  
                  return (
                    <button
                      key={`${dayNum}-${eventIndex}`}
                      onClick={() => handleOrderClick(event)}
                      className="absolute pointer-events-auto transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer z-10 rounded-lg p-2 text-left"
                      style={{
                        top: `${topOffset}px`,
                        left: `${leftOffset}%`,
                        width: `${eventWidth}%`,
                        backgroundColor: event.type === 'ENVÍO' ? 'hsl(142 76% 36% / 0.15)' :
                                       event.type === 'INSTALACIÓN DE CÚPULA' ? 'hsl(217 91% 60% / 0.15)' :
                                       event.type === 'ESPECIAL' ? 'hsl(0 84% 60% / 0.15)' :
                                       'hsl(45 93% 47% / 0.15)',
                        minHeight: '26px',
                        border: `1px solid ${
                          event.type === 'ENVÍO' ? 'hsl(142 76% 36% / 0.3)' :
                          event.type === 'INSTALACIÓN DE CÚPULA' ? 'hsl(217 91% 60% / 0.3)' :
                          event.type === 'ESPECIAL' ? 'hsl(0 84% 60% / 0.3)' :
                          'hsl(45 93% 47% / 0.3)'
                        }`
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {/* Color dot indicator */}
                        <div 
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: event.type === 'ENVÍO' ? 'hsl(142 76% 36%)' :
                                           event.type === 'INSTALACIÓN DE CÚPULA' ? 'hsl(217 91% 60%)' :
                                           event.type === 'ESPECIAL' ? 'hsl(0 84% 60%)' :
                                           'hsl(45 93% 47%)'
                          }}
                        ></div>
                        
                        <div className="flex-1 min-w-0">
                          {/* Single line with order number, service type and vehicle */}
                          <div className="text-sm font-bold text-foreground truncate">
                            #{event.id} [{serviceType}] {event.vehicle}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                });
              })}
            </div>
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
                    backgroundColor: selectedOrder?.type === 'ENVÍO' ? 'hsl(142 76% 36%)' :
                                   selectedOrder?.type === 'INSTALACIÓN DE CÚPULA' ? 'hsl(217 91% 60%)' :
                                   selectedOrder?.type === 'ESPECIAL' ? 'hsl(0 84% 60%)' :
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
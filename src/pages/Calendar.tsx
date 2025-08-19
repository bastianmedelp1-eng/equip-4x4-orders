import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Mes");

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

  // Sample events data
  const events = {
    6: [{ title: "#9441 [PF] MITSUBISHI L200 KATANA CR", color: "bg-green-400" }],
    7: [{ title: "#9449 [PF] TOYOTA HILUX REVO", color: "bg-green-400" }, { title: "#9445 [PF] PEUGEOT LANDTREK con barra de techo", color: "bg-green-400" }],
    8: [{ title: "#9446 [PF] TOYOTA PRADO 150 4 PUERTAS | TALLER", color: "bg-yellow-400" }, { title: "#9443 [PF] JEEP WRANGLER JK 4 PUERTAS", color: "bg-blue-400" }],
    9: [{ title: "#2792 C TOYOTA HILUX VIGO", color: "bg-blue-400" }],
    12: [{ title: "#9447 [PF] SUZUKI JIMNY 4 GENERACIÓN con barra de techo", color: "bg-green-400" }],
    13: [{ title: "#9448 [PF] SUZUKI NEW JIMNY 5 PUERTAS", color: "bg-green-400" }],
    14: [{ title: "#9446 [PF] TOYOTA PRADO 150 4 PUERTAS | TALLER", color: "bg-yellow-400" }],
    15: [{ title: "#9443 [PF] JEEP WRANGLER JK 4 PUERTAS", color: "bg-blue-400" }],
    18: [{ title: "#2934 C FORD RANGER con barra de techo", color: "bg-blue-400" }],
    19: [{ title: "#2894 [PF] WRINGLE WHOLE JK | TALLER", color: "bg-yellow-400" }],
    20: [{ title: "#2799 C NISSAN NAVARA", color: "bg-blue-400" }],
    21: [{ title: "#2798 C VW AMAROK AMAROK", color: "bg-blue-400" }],
    22: [{ title: "#2737 C TOYOTA HILUX VIGO", color: "bg-blue-400" }]
  };

  const days = getDaysInMonth();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleBackToHome}
              className="bg-green-600 hover:bg-green-700 text-white px-6"
            >
              INICIO
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleToday}>
                Hoy
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button className="bg-green-600 hover:bg-green-700">ENVÍO</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">INSTALACIÓN DE CÚPULA</Button>
            <Button className="bg-red-600 hover:bg-red-700">ESPECIAL</Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-black">INSTALACIÓN EN TALLER</Button>
          </div>
        </div>

        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">
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

        <div className="border border-gray-600 rounded-lg overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 bg-gray-800">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center font-semibold border-r border-gray-600 last:border-r-0 text-blue-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className="min-h-[120px] p-2 border-r border-b border-gray-600 last:border-r-0 bg-gray-900"
              >
                {day && (
                  <>
                    <div className="text-right mb-2 text-white font-semibold">{day}</div>
                    <div className="space-y-1">
                      {events[day]?.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`${event.color} text-black text-xs p-1 rounded text-center font-medium`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
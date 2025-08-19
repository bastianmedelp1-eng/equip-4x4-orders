import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";

interface VehicleData {
  id: number;
  image: string;
  brand: string;
  model: string;
  code: string;
  years: string;
  roofRack: boolean;
  dome: boolean;
  accessories: string;
  observations: string;
  stock: number;
  pdfLink: string;
}

const mockVehicleData: VehicleData[] = [
  {
    id: 1,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "4RUNNER 5TA GENERACION",
    code: "2010-2025",
    years: "2010-2025",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
    stock: 1,
    pdfLink: "Link PDF"
  },
  {
    id: 2,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "4RUNNER 4TA GENERACION",
    code: "2003-2009",
    years: "2003-2009",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
    stock: 1,
    pdfLink: "Link PDF"
  },
  {
    id: 3,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "FJ CRUISER",
    code: "2006-2014",
    years: "2006-2014",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "https://drive.google.com/file/d/1PmrF647C-RthGRm-MzFGVJo2h4EWnl/view?usp=drive_link",
    stock: 0,
    pdfLink: "Link PDF"
  },
  {
    id: 4,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "PRADO 150 4 PUERTAS",
    code: "2010-2022",
    years: "2010-2022",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
    stock: 0,
    pdfLink: "Link PDF"
  },
  {
    id: 5,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "PRADO 150 5 PUERTAS",
    code: "2010-2022",
    years: "2010-2022",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
    stock: 0,
    pdfLink: "Link PDF"
  },
  {
    id: 6,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "PRADO J20 4 PUERTAS",
    code: "2007-2009",
    years: "2007-2009",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "se instala en las fijaciones de las barras originales sin perforar el vehículo",
    stock: 0,
    pdfLink: "Link PDF"
  },
  {
    id: 7,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "RAV4 5TA GENERACION",
    code: "2018-2025",
    years: "2018-2025",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "se perforan el techo de la camioneta se instala bancas removibles",
    stock: 0,
    pdfLink: "Link PDF"
  },
  {
    id: 8,
    image: "/placeholder-car.png",
    brand: "TOYOTA",
    model: "RAV4 4TA GENERACION",
    code: "2013-2017",
    years: "2013-2017",
    roofRack: false,
    dome: false,
    accessories: "Sin accesorios",
    observations: "se instala en las bases originales que trae la camioneta sin perforar ni modificar el vehículo",
    stock: 0,
    pdfLink: "Link PDF"
  }
];

const PriceSearch = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={handleBackToHome}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            INICIO
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-6">
          Buscador de precios
        </h1>

        <div className="mb-6">
          <Button variant="outline" className="px-8">
            Filtrar
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="font-semibold">Imagen</TableHead>
                <TableHead className="font-semibold">Marca</TableHead>
                <TableHead className="font-semibold">Modelo</TableHead>
                <TableHead className="font-semibold">Código</TableHead>
                <TableHead className="font-semibold">Años</TableHead>
                <TableHead className="font-semibold">Rack de techo</TableHead>
                <TableHead className="font-semibold">Cúpula</TableHead>
                <TableHead className="font-semibold">Accesorios</TableHead>
                <TableHead className="font-semibold">Observaciones</TableHead>
                <TableHead className="font-semibold">Stock</TableHead>
                <TableHead className="font-semibold">Link PDF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVehicleData.map((vehicle) => (
                <TableRow key={vehicle.id} className="border-b">
                  <TableCell>
                    <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.code}</TableCell>
                  <TableCell>{vehicle.years}</TableCell>
                  <TableCell className="text-center">
                    {!vehicle.roofRack && <X className="h-4 w-4 text-red-500 mx-auto" />}
                  </TableCell>
                  <TableCell className="text-center">
                    {!vehicle.dome && <X className="h-4 w-4 text-red-500 mx-auto" />}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {vehicle.accessories}
                  </TableCell>
                  <TableCell className="text-sm max-w-xs">
                    {vehicle.observations.startsWith('https://') ? (
                      <a 
                        href={vehicle.observations} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate block"
                      >
                        {vehicle.observations}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{vehicle.observations}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{vehicle.stock}</TableCell>
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      {vehicle.pdfLink}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PriceSearch;
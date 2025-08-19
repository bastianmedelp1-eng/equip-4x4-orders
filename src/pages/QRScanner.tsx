import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const navigate = useNavigate();
  const [scannedCode, setScannedCode] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScannedCode(e.target.value);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Atrás
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <Button 
                onClick={handleGoHome}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                <Home className="h-4 w-4 mr-2" />
                INICIO
              </Button>

              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-foreground">
                  Escaner QR
                </h1>
                
                <p className="text-sm text-muted-foreground">
                  Mantenga el cursor activo dentro del campo de texto y escanee con el Lector QR
                </p>

                <div className="max-w-md mx-auto">
                  <Input
                    type="text"
                    value={scannedCode}
                    onChange={handleInputChange}
                    placeholder="Escanee el código QR aquí..."
                    className="text-center text-lg py-3"
                    autoFocus
                  />
                </div>

                <p className="text-sm text-muted-foreground mt-8">
                  Gracias por hacer negocios con EQUIPPERS 4X4!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRScanner;
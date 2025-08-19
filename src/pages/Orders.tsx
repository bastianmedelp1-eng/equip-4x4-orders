import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Orders = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header with home button */}
      <div className="p-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white mb-6"
        >
          <Home className="h-4 w-4 mr-2" />
          INICIO
        </Button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold text-foreground mb-6">TIPO DE PEDIDO</h1>
          
          <Card className="border-2 border-blue-200">
            <CardContent className="p-6">
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="w-full h-12 text-muted-foreground">
                  <SelectValue placeholder="SELECCIONE UNA OPCION" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rack">RACK</SelectItem>
                  <SelectItem value="cupula">CUPULA</SelectItem>
                  <SelectItem value="especial">ESPECIAL</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Orders;
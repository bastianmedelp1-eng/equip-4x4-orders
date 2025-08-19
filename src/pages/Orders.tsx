import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Home, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Orders = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("");
  const [items, setItems] = useState([]);

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value);
    if (value === "cupula") {
      navigate("/lista-cupulas");
    }
  };

  const handleAddItem = () => {
    // Add item logic here
    console.log("Add item clicked");
  };

  const handleCreateOrder = () => {
    console.log("Create order clicked");
  };

  const handleCancel = () => {
    setOrderType("");
  };

  if (orderType === "especial") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="p-4 border-b">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white mb-4"
          >
            <Home className="h-4 w-4 mr-2" />
            INICIO
          </Button>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">TIPO DE PEDIDO</span>
            <div className="border rounded p-2 bg-muted/50">ESPECIAL</div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* DATOS DE VENTA */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE VENTA</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">VENDEDOR</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="miguel">MIGUEL</SelectItem>
                      <SelectItem value="daniela">DANIELA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">FECHA DE ENTREGA</Label>
                  <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                </div>
                <div>
                  <Label className="text-sm font-medium">TIPO DE CLIENTE</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="particular">PARTICULAR</SelectItem>
                      <SelectItem value="empresa">EMPRESA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">ACTIVIDAD</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">OBSERVACIONES</Label>
                  <Textarea className="bg-background" rows={3} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ENTREGA */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">ENTREGA</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">ENVIO | EMPRESA DE TRANSPORTE</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="starken">STARKEN</SelectItem>
                      <SelectItem value="chilexpress">CHILEXPRESS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">ENTREGA PAGADA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">INSTALACION EN TALLER | FECHA</Label>
                  <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS CLIENTE */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS CLIENTE</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">NOMBRE DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">RUT DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">DIRECCION DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">CIUDAD DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">TELEFONO DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">CORREO DEL CLIENTE</Label>
                  <Input type="email" className="bg-background" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS DE PAGO */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE PAGO</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">ESTATUS ENVIO PAGO</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="NO ENVIADO" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        <SelectItem value="no-enviado">NO ENVIADO</SelectItem>
                        <SelectItem value="enviado">ENVIADO</SelectItem>
                        <SelectItem value="pagado">PAGADO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">VALOR DEL PRODUCTO</Label>
                    <Input className="bg-background" />
                  </div>
                </div>

                {/* Payment installments */}
                {[1, 2, 3].map((num) => (
                  <div key={num} className="space-y-4 border-t pt-4">
                    <h3 className="font-medium">ABONO {num}</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm">RESTA CANTIDAD</Label>
                        <Input className="bg-background" />
                      </div>
                      <div>
                        <Label className="text-sm">FECHA DE PAGO ABONO</Label>
                        <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                      </div>
                      <div>
                        <Label className="text-sm">METODO DE PAGO ABORNO</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border shadow-lg z-50">
                            <SelectItem value="efectivo">EFECTIVO</SelectItem>
                            <SelectItem value="transferencia">TRANSFERENCIA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">MONEDA ABONO {num === 2 ? '2' : num === 3 ? '3' : ''}</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border shadow-lg z-50">
                            <SelectItem value="clp">CLP</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">URL FOTO ABONO {num}</Label>
                      <Input className="bg-background" placeholder="URL de la foto" />
                    </div>
                  </div>
                ))}

                <div>
                  <Label className="text-sm font-medium">URL Factura</Label>
                  <Input className="bg-background" placeholder="URL de la factura" />
                </div>

                <div className="text-xs text-red-600 border border-red-200 bg-red-50 p-2 rounded">
                  Campos faltantes: vendedor|fechaDeEntrega|instalacion|nombreCliente|rutCliente|direccionCliente|ciudadCliente|telefonoCliente|pagoTotal
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex gap-4 justify-start">
            <Button onClick={handleCreateOrder} className="bg-blue-500 hover:bg-blue-600 text-white">
              GUARDAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orderType === "cupula") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="p-4 border-b">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white mb-4"
          >
            <Home className="h-4 w-4 mr-2" />
            INICIO
          </Button>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">TIPO DE PEDIDO</span>
            <div className="border rounded p-2 bg-muted/50">CUPULA</div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* LINK URL LOGO */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">LINK URL LOGO</h2>
              <div>
                <Label className="text-sm font-medium">URL o imagen elegida</Label>
                <Input className="bg-background" />
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white mt-4">
                GENERAR COTIZ
              </Button>
            </CardContent>
          </Card>

          {/* DATOS DE VENTA */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE VENTA</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">VENDEDOR</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="miguel">MIGUEL</SelectItem>
                      <SelectItem value="daniela">DANIELA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">FECHA DE ENTREGA</Label>
                  <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                </div>
                <div>
                  <Label className="text-sm font-medium">TIPO DE CLIENTE</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="particular">PARTICULAR</SelectItem>
                      <SelectItem value="empresa">EMPRESA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS DE VEHICULO */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE VEHICULO</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">MARCA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="toyota">TOYOTA</SelectItem>
                      <SelectItem value="ford">FORD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">MODELO</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="hilux">HILUX</SelectItem>
                      <SelectItem value="ranger">RANGER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">AÑO</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS DE LA CUPULA */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE LA CUPULA</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">TIPO DE CUPULA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="alta">ALTA</SelectItem>
                      <SelectItem value="baja">BAJA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">ALTURA DE CUPULA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="standard">STANDARD</SelectItem>
                      <SelectItem value="personalizada">PERSONALIZADA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">ANCHO DE LA CUPULA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="standard">STANDARD</SelectItem>
                      <SelectItem value="ancho">ANCHO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">COLOR DE LA CERRAJA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="negro">NEGRO</SelectItem>
                      <SelectItem value="plateado">PLATEADO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RACK DE TECHO DE LA CUPULA */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">RACK DE TECHO DE LA CUPULA</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">LARGO</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="corto">CORTO</SelectItem>
                      <SelectItem value="largo">LARGO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">ACCESORIOS</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="basico">BASICO</SelectItem>
                      <SelectItem value="completo">COMPLETO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">INSTALACION</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="incluida">INCLUIDA</SelectItem>
                      <SelectItem value="sin-instalacion">SIN INSTALACION</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* COMPORTAMIENTOS INTERNOS */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">COMPORTAMIENTOS INTERNOS</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">BODEGA TRASERA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">CAJON LATERAL</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">BOTELLA TRASERA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">PUERTA EXTERIOR</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LUCES */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">LUCES</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">LUCES INTERMITENTES</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">LUCES TRASERA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS CLIENTE */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS CLIENTE</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">RUT</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">DIRECCION</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">CIUDAD</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">TELEFONO</Label>
                  <Input className="bg-background" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">CORREO</Label>
                  <Input type="email" className="bg-background" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS DE PAGO */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE PAGO</h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">NOMBRE DE VENTA INICIAL</Label>
                  <Input className="bg-background" />
                </div>

                {/* Payment installments */}
                {[1, 2, 3].map((num) => (
                  <div key={num} className="space-y-4 border-t pt-4">
                    <h3 className="font-medium">ABONO {num}</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm">ABONO {num}</Label>
                        <Input className="bg-background" />
                      </div>
                      <div>
                        <Label className="text-sm">FECHA DE PAGO ABONO {num}</Label>
                        <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                      </div>
                      <div>
                        <Label className="text-sm">METODO DE PAGO ABONO {num}</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border shadow-lg z-50">
                            <SelectItem value="efectivo">EFECTIVO</SelectItem>
                            <SelectItem value="transferencia">TRANSFERENCIA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">MONEDA ABONO {num}</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border shadow-lg z-50">
                            <SelectItem value="clp">CLP</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">URL FOTO ABONO {num}</Label>
                      <Input className="bg-background" placeholder="URL de la foto" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex gap-4 justify-start">
            <Button onClick={handleCreateOrder} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              CREAR PEDIDO
            </Button>
            <Button onClick={handleCancel} variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500">
              CANCELAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orderType === "rack") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="p-4 border-b">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white mb-4"
          >
            <Home className="h-4 w-4 mr-2" />
            INICIO
          </Button>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">TIPO DE PEDIDO</span>
            <div className="border rounded p-2 bg-muted/50">RACK</div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* DATOS DE VENTA */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE VENTA</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">VENDEDOR</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="miguel">MIGUEL</SelectItem>
                      <SelectItem value="daniela">DANIELA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">FECHA DE ENTREGA</Label>
                  <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                </div>
                <div>
                  <Label className="text-sm font-medium">TIPO DE CLIENTE</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="particular">PARTICULAR</SelectItem>
                      <SelectItem value="empresa">EMPRESA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS DE VEHICULO */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE VEHICULO</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">CANAL DE VENTA</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">OBSERVACIONES</Label>
                  <Textarea className="bg-background" rows={3} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ITEMS */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">ITEMS</h2>
              <div className="grid md:grid-cols-6 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">CANTIDAD</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">ACCESORIO</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="rack-techo">Rack de techo</SelectItem>
                      <SelectItem value="rack-pickup">Rack de pick up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">MARCA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="TOYOTA" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="toyota">TOYOTA</SelectItem>
                      <SelectItem value="ford">FORD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">MODELO</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="hilux">HILUX</SelectItem>
                      <SelectItem value="ranger">RANGER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">AÑO</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="h-4 w-4 mr-1" />
                    AGREGAR ITEM
                  </Button>
                </div>
              </div>

              {/* Items Table */}
              <div className="border rounded">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>ACCESORIO</TableHead>
                      <TableHead>CANTIDAD</TableHead>
                      <TableHead>TIPO DE RACK</TableHead>
                      <TableHead>MARCA</TableHead>
                      <TableHead>MODELO</TableHead>
                      <TableHead>AÑO</TableHead>
                      <TableHead>ACCION</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                          No hay items agregados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* ENTREGA */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">ENTREGA</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">ENVIO | EMPRESA DE TRANSPORTE</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="starken">STARKEN</SelectItem>
                      <SelectItem value="chilexpress">CHILEXPRESS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">ENTREGA PAGADA</Label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="si">SI</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">INSTALACION EN TALLER | FECHA</Label>
                  <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS CLIENTE */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS CLIENTE</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">NOMBRE DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">RUT DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">DIRECCION DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">CIUDAD DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">TELEFONO DEL CLIENTE</Label>
                  <Input className="bg-background" />
                </div>
                <div>
                  <Label className="text-sm font-medium">CORREO DEL CLIENTE</Label>
                  <Input type="email" className="bg-background" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DATOS DE PAGO */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">DATOS DE PAGO</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">VALOR DEL PRODUCTO</Label>
                    <Input className="bg-background" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">ESTATUS ENVIO PAGO</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-lg z-50">
                        <SelectItem value="pendiente">PENDIENTE</SelectItem>
                        <SelectItem value="pagado">PAGADO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Payment installments */}
                {[1, 2, 3].map((num) => (
                  <div key={num} className="space-y-4 border-t pt-4">
                    <h3 className="font-medium">ABONO {num}</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm">RESTA CANTIDAD</Label>
                        <Input className="bg-background" />
                      </div>
                      <div>
                        <Label className="text-sm">FECHA DE {num === 1 ? 'PRIMER' : num === 2 ? 'SEGUNDO' : 'TERCER'} ABONO</Label>
                        <Input type="date" className="bg-background" placeholder="dd-mm-aaaa" />
                      </div>
                      <div>
                        <Label className="text-sm">METODO DE PAGO {num === 1 ? 'PRIMER' : num === 2 ? 'SEGUNDO' : 'TERCER'} ABONO</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border shadow-lg z-50">
                            <SelectItem value="efectivo">EFECTIVO</SelectItem>
                            <SelectItem value="transferencia">TRANSFERENCIA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">MONEDA ABONO</Label>
                        <Select>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border shadow-lg z-50">
                            <SelectItem value="clp">CLP</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">URL FOTO ABONO {num}</Label>
                      <Input className="bg-background" placeholder="URL de la foto" />
                    </div>
                  </div>
                ))}

                <div>
                  <Label className="text-sm font-medium">URL Factura</Label>
                  <Input className="bg-background" placeholder="URL de la factura" />
                </div>

                <div className="text-xs text-red-600 border border-red-200 bg-red-50 p-2 rounded">
                  Campos faltantes: vendedor|fecha|cliente|tipoCliente|direccionCliente|ciudadCliente|telefono|Cliente|pagTotal
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex gap-4 justify-start">
            <Button onClick={handleCreateOrder} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              CREAR PEDIDO
            </Button>
            <Button onClick={handleCancel} variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500">
              CANCELAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <Select value={orderType} onValueChange={handleOrderTypeChange}>
                <SelectTrigger className="w-full h-12 text-muted-foreground">
                  <SelectValue placeholder="SELECCIONE UNA OPCION" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
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
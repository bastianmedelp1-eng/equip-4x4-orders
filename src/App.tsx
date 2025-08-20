import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import Sellers from "./pages/Sellers";
import Accessories from "./pages/Accessories";
import OrdersList from "./pages/OrdersList";
import Orders from "./pages/Orders";
import CupulasList from "./pages/CupulasList";
import RacksList from "./pages/RacksList";
import SpecialsList from "./pages/SpecialsList";
import Calendar from "./pages/Calendar";
import PriceSearch from "./pages/PriceSearch";
import Quotations from "./pages/Quotations";
import SalesHistory from "./pages/SalesHistory";
import Statistics from "./pages/Statistics";
import ExpenseCategories from "./pages/ExpenseCategories";
import Workers from "./pages/Workers";
import QRScanner from "./pages/QRScanner";
import Expenses from "./pages/Expenses";
import LaserCutting from "./pages/LaserCutting";
import Products from "./pages/Products";
import ToolsView from "./pages/ToolsView";
import WorkOrderSearch from "./pages/WorkOrderSearch";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/marcas" element={<Brands />} />
          <Route path="/modelos" element={<Models />} />
          <Route path="/vendedores" element={<Sellers />} />
          <Route path="/accesorios" element={<Accessories />} />
          <Route path="/pedidos" element={<OrdersList />} />
          <Route path="/pedido" element={<Orders />} />
          <Route path="/lista-cupulas" element={<CupulasList />} />
          <Route path="/lista-racks" element={<RacksList />} />
          <Route path="/lista-especiales" element={<SpecialsList />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/buscador-precios" element={<PriceSearch />} />
          <Route path="/cotizacion" element={<Quotations />} />
          <Route path="/historial-ventas" element={<SalesHistory />} />
          <Route path="/estadisticas" element={<Statistics />} />
          <Route path="/categorias-gasto" element={<ExpenseCategories />} />
          <Route path="/trabajadores" element={<Workers />} />
          <Route path="/escaner-qr" element={<QRScanner />} />
          <Route path="/gastos" element={<Expenses />} />
          <Route path="/corte-laser" element={<LaserCutting />} />
          <Route path="/herramientas" element={<Tools />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/vista-herramientas" element={<ToolsView />} />
          <Route path="/buscar-orden" element={<WorkOrderSearch />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

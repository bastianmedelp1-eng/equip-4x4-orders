import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "@/pages/Auth";
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
import Commission from "./pages/Commission";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col w-full">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Index />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/usuarios" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Users />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/marcas" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Brands />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/modelos" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Models />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/vendedores" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Sellers />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/accesorios" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Accessories />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/pedidos" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <OrdersList />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/pedido" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Orders />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/lista-cupulas" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <CupulasList />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/lista-racks" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <RacksList />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/lista-especiales" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <SpecialsList />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/calendario" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Calendar />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/buscador-precios" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <PriceSearch />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/cotizacion" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Quotations />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/historial-ventas" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <SalesHistory />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/estadisticas" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Statistics />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/categorias-gasto" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <ExpenseCategories />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/trabajadores" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Workers />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/escaner-qr" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <QRScanner />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/gastos" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Expenses />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/corte-laser" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <LaserCutting />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/herramientas" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Tools />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/productos" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Products />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/vista-herramientas" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <ToolsView />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/buscar-orden" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <WorkOrderSearch />
                    </main>
                  </ProtectedRoute>
                } />
                <Route path="/mi-comision" element={
                  <ProtectedRoute>
                    <Header />
                    <main className="flex-1">
                      <Commission />
                    </main>
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

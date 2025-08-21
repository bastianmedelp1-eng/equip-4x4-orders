import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Users, 
  Tag, 
  Car, 
  Package, 
  ShoppingCart, 
  List, 
  Star, 
  Calendar, 
  Search, 
  FileText, 
  BarChart3, 
  DollarSign, 
  UserCheck, 
  QrCode, 
  Zap, 
  SearchCheck, 
  Wrench,
  Home
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

// Import custom icons
import iconUsuarios from "@/assets/icon-usuarios.png";
import iconMarcas from "@/assets/icon-marcas.png";
import iconPedido from "@/assets/icon-pedido.png";
import iconCalendario from "@/assets/icon-calendario.png";
import iconCotizacion from "@/assets/icon-cotizacion.png";
import iconProductos from "@/assets/icon-productos.png";
import iconHistorial from "@/assets/icon-historial.png";
import iconEstadisticas from "@/assets/icon-estadisticas.png";

const menuItems = [
  { title: "Inicio", url: "/", icon: Home },
  
  // Productos
  { title: "Productos", url: "/productos", icon: iconProductos, isCustomIcon: true },
  { title: "Marcas", url: "/marcas", icon: iconMarcas, isCustomIcon: true },
  { title: "Modelos", url: "/modelos", icon: Car },
  { title: "Accesorios", url: "/accesorios", icon: Package },
  { title: "Especiales", url: "/lista-especiales", icon: Star },
  
  // Pedidos y Ventas
  { title: "Pedidos", url: "/pedidos", icon: iconPedido, isCustomIcon: true },
  { title: "Cotización", url: "/cotizacion", icon: iconCotizacion, isCustomIcon: true },
  { title: "Buscador de precios", url: "/buscador-precios", icon: Search },
  { title: "Historial de ventas", url: "/historial-ventas", icon: iconHistorial, isCustomIcon: true },
  
  // Finanzas
  { title: "Gastos", url: "/gastos", icon: DollarSign },
  { title: "Categorías de gasto", url: "/categorias-gasto", icon: Tag },
  { title: "Estadísticas", url: "/estadisticas", icon: iconEstadisticas, isCustomIcon: true },
  
  // Personas
  { title: "Usuarios", url: "/usuarios", icon: iconUsuarios, isCustomIcon: true },
  { title: "Vendedores", url: "/vendedores", icon: Users },
  { title: "Trabajadores", url: "/trabajadores", icon: UserCheck },
  
  // Operaciones
  { title: "Buscar orden de trabajo", url: "/buscar-orden", icon: SearchCheck },
  { title: "Corte Láser", url: "/corte-laser", icon: Zap },
  { title: "Escanear QR", url: "/escaner-qr", icon: QrCode },
  
  // Herramientas
  { title: "Herramientas", url: "/herramientas", icon: Wrench },
  { title: "Vista de Herramientas", url: "/vista-herramientas", icon: Wrench },
  
  // Agenda
  { title: "Calendario", url: "/calendario", icon: iconCalendario, isCustomIcon: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/ce13be00-df3c-4711-b669-77508ef1cd72.png" 
            alt="Logo" 
            className="h-8 w-8 object-contain flex-shrink-0"
          />
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">Equipers 4x4</h2>
              <p className="text-sm text-muted-foreground">Sistema de Pedidos</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavCls}
                    >
                      {item.isCustomIcon ? (
                        <img 
                          src={item.icon as string} 
                          alt={item.title}
                          className="mr-2 h-4 w-4 object-contain"
                        />
                      ) : (
                        <item.icon className="mr-2 h-4 w-4" />
                      )}
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
import Header from "@/components/Header";
import DashboardGrid from "@/components/DashboardGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Equipers 4x4 - Sistema de Pedidos
          </h2>
          <p className="text-muted-foreground">
            Gestiona tu negocio de equipamiento 4x4 de manera profesional
          </p>
        </div>
        <DashboardGrid />
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border mt-12">
        © 2024 Equipers 4x4. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Index;

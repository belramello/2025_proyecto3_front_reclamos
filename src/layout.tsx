import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* AGREGADO: w-full para ancho completo y relative para posicionamiento */}
      <main className="w-full relative flex flex-col min-h-screen bg-gray-50/50"> 
        <div className="p-4 pb-0">
            <SidebarTrigger />
        </div>
        {/* El children (tu pantalla) ahora tiene espacio para crecer */}
        <div className="flex-1 w-full">
            {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
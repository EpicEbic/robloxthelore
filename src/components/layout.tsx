
import { ReactNode } from "react";
import { WikiSidebar } from "@/components/wiki-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full dark text-foreground bg-background">
        <WikiSidebar />
        <div className="flex-1 overflow-auto flex flex-col custom-scrollbar" id="main-scroll-container">
          <main className="relative flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

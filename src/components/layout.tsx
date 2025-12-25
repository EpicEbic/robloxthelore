
import { ReactNode, useEffect, useRef } from "react";
import { WikiSidebar } from "@/components/wiki-sidebar";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const { open: sidebarOpen } = useSidebar();
  const prevSidebarOpenRef = useRef(sidebarOpen);
  const prevIsMobileRef = useRef(isMobile);

  // Save and restore scroll position when size changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const saveScrollPosition = () => {
      if (container) {
        scrollPositionRef.current = container.scrollTop;
      }
    };

    const restoreScrollPosition = () => {
      if (container && scrollPositionRef.current > 0) {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop = scrollPositionRef.current;
          }
        });
      }
    };

    // Save scroll position when sidebar state changes
    if (prevSidebarOpenRef.current !== sidebarOpen) {
      saveScrollPosition();
      prevSidebarOpenRef.current = sidebarOpen;
      // Restore after layout updates
      requestAnimationFrame(() => {
        restoreScrollPosition();
      });
    }

    // Save scroll position when mobile state changes
    if (prevIsMobileRef.current !== isMobile) {
      saveScrollPosition();
      prevIsMobileRef.current = isMobile;
      // Restore after layout updates
      requestAnimationFrame(() => {
        restoreScrollPosition();
      });
    }
  }, [sidebarOpen, isMobile]);

  // Handle window resize - only trigger on actual window resizes, not content height changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let prevWindowWidth = window.innerWidth;
    let prevWindowHeight = window.innerHeight;
    const THRESHOLD = 50; // Only restore scroll if window size changed by more than 50px

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      // Only restore scroll if window dimensions actually changed significantly
      const widthChanged = Math.abs(currentWidth - prevWindowWidth) > THRESHOLD;
      const heightChanged = Math.abs(currentHeight - prevWindowHeight) > THRESHOLD;
      
      if (widthChanged || heightChanged) {
        const currentScroll = container.scrollTop;
        scrollPositionRef.current = currentScroll;
        prevWindowWidth = currentWidth;
        prevWindowHeight = currentHeight;
        
        requestAnimationFrame(() => {
          if (container) {
            container.scrollTop = scrollPositionRef.current;
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex w-full dark text-foreground bg-background">
      <WikiSidebar />
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-auto flex flex-col custom-scrollbar" 
        id="main-scroll-container"
      >
        {/* Mobile sidebar trigger - always visible on mobile */}
        {isMobile && (
          <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border p-2 md:hidden">
            <SidebarTrigger className="h-10 w-10" />
          </div>
        )}
        <main className="relative flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}

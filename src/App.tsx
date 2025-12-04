
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { WikiProvider } from "@/contexts/wiki-context";
import { EasterEggProvider } from "@/contexts/easter-egg-context";
import { ParticleSettingsProvider } from "@/contexts/particle-settings-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import EntryPage from "./pages/EntryPage";
import SecretPage from "./pages/SecretPage";
import AlternateSecretPage from "./pages/AlternateSecretPage";
import NotFound from "./pages/NotFound";
import { ComparisonPage } from "./pages/ComparisonPage";
import { FusionPage } from "./pages/FusionPage";
import StatisticInfoPage from "./pages/StatisticInfoPage";
import WhatsNewPage from "./pages/WhatsNewPage";
import WorldMapPage from "./pages/WorldMapPage";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const prevPathnameRef = React.useRef(location.pathname);
  
  // Check if current or previous route is an entry page
  const isEntryPage = location.pathname.startsWith('/entry/');
  const prevIsEntryPage = prevPathnameRef.current.startsWith('/entry/');
  
  // Only use fade transitions if NOT navigating between entry pages
  const shouldFade = !isEntryPage && !prevIsEntryPage;
  
  React.useEffect(() => {
    prevPathnameRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ParticleSettingsProvider>
            <EasterEggProvider>
              <WikiProvider>
                <Layout>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={location.pathname}
                    initial={shouldFade ? { opacity: 0 } : false}
                    animate={shouldFade ? { opacity: 1 } : { opacity: 1 }}
                    exit={shouldFade ? { opacity: 0 } : false}
                    transition={shouldFade ? { duration: 0.25, ease: 'easeInOut' } : { duration: 0 }}
                  >
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/category/:categoryType" element={<CategoryPage />} />
                      <Route path="/category/:categoryType/:subcategory" element={<CategoryPage />} />
                      <Route path="/entry/:id" element={<EntryPage />} />
                      <Route path="/statistics" element={<StatisticInfoPage />} />
                      <Route path="/comparison" element={<ComparisonPage />} />
                      <Route path="/fusion" element={<FusionPage />} />
                      <Route path="/world" element={<WorldMapPage />} />
                      <Route path="/whats-new" element={<WhatsNewPage />} />
                      <Route path="/secret" element={<SecretPage />} />
                      <Route path="/secret-alternate" element={<AlternateSecretPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </motion.div>
                </AnimatePresence>
              </Layout>
            </WikiProvider>
          </EasterEggProvider>
          </ParticleSettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
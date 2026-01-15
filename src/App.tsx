
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { WikiProvider } from "@/contexts/wiki-context";
import { EasterEggProvider } from "@/contexts/easter-egg-context";
import { ParticleSettingsProvider } from "@/contexts/particle-settings-context";
import { PartProvider } from "@/contexts/part-context";
import { LockProvider, useLock } from "@/contexts/lock-context";
import { LockScreen } from "@/components/lock-screen";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import EntryPage from "./pages/EntryPage";
import SecretPage from "./pages/SecretPage";
import AlternateSecretPage from "./pages/AlternateSecretPage";
import SecretLPage from "./pages/SecretLPage";
import WhyBotherPage from "./pages/WhyBotherPage";
import OldFriendPage from "./pages/OldFriendPage";
import NotFound from "./pages/NotFound";
import { ComparisonPage } from "./pages/ComparisonPage";
import { TournamentPage } from "./pages/TournamentPage";
import StatisticInfoPage from "./pages/StatisticInfoPage";
import WhatsNewPage from "./pages/WhatsNewPage";
import WorldMapPage from "./pages/WorldMapPage";
import PlotTimelinePage from "./pages/PlotTimelinePage";
import HeightComparisonPage from "./pages/HeightComparisonPage";

const queryClient = new QueryClient();

const AppContent = () => {
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
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={shouldFade ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          exit={shouldFade ? { opacity: 0 } : undefined}
          transition={shouldFade ? { duration: 0.25, ease: 'easeInOut' } : { duration: 0 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryType" element={<CategoryPage />} />
            <Route path="/category/:categoryType/:subcategory" element={<CategoryPage />} />
            <Route path="/entry/:id" element={<EntryPage />} />
            <Route path="/statistics" element={<StatisticInfoPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/tournament" element={<TournamentPage />} />
            <Route path="/world" element={<WorldMapPage />} />
            <Route path="/whats-new" element={<WhatsNewPage />} />
            <Route path="/plot-timeline" element={<PlotTimelinePage />} />
            <Route path="/height-comparison" element={<HeightComparisonPage />} />
            <Route path="/secret" element={<SecretPage />} />
            <Route path="/secret-alternate" element={<AlternateSecretPage />} />
            <Route path="/secret-l" element={<SecretLPage />} />
            <Route path="/whybother" element={<WhyBotherPage />} />
            <Route path="/oldfriend" element={<OldFriendPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

const App = () => {
  const { isUnlocked, unlock } = useLock();

  if (!isUnlocked) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <LockScreen onUnlock={unlock} />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ParticleSettingsProvider>
            <PartProvider>
              <EasterEggProvider>
                <WikiProvider>
                  <AppContent />
                </WikiProvider>
              </EasterEggProvider>
            </PartProvider>
          </ParticleSettingsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default () => (
  <LockProvider>
    <App />
  </LockProvider>
);
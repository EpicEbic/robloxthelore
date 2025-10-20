
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { WikiProvider } from "@/contexts/wiki-context";
import { EasterEggProvider } from "@/contexts/easter-egg-context";
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

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <EasterEggProvider>
            <WikiProvider>
              <Layout>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/category/:categoryType" element={<CategoryPage />} />
                      <Route path="/category/:categoryType/:subcategory" element={<CategoryPage />} />
                      <Route path="/entry/:id" element={<EntryPage />} />
                      <Route path="/statistics" element={<StatisticInfoPage />} />
                      <Route path="/comparison" element={<ComparisonPage />} />
                      <Route path="/fusion" element={<FusionPage />} />
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
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
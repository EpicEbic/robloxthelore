
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { WikiProvider } from "@/contexts/wiki-context";
import { EasterEggProvider } from "@/contexts/easter-egg-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import { PageTransition } from "@/components/ui/page-transition";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <EasterEggProvider>
          <WikiProvider>
            <Layout>
              <PageTransition>
                <Routes>
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
              </PageTransition>
            </Layout>
          </WikiProvider>
        </EasterEggProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
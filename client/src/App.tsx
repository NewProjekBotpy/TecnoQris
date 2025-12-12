
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Preloader } from "@/components/Preloader";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import QrGenerator from "@/pages/qr-generator";
import Transactions from "@/pages/transactions";
import Analytics from "@/pages/analytics";
import SettingsPage from "@/pages/settings";
import Wallets from "@/pages/wallets";
import ApiDocsPage from "@/pages/api-docs";
import ApiKeysPage from "@/pages/api-keys";
import QrisDocsPage from "@/pages/qris-docs";
import TentangPage from "@/pages/tentang";
import BlogPage from "@/pages/blog";
import BlogDetailPage from "@/pages/blog-detail";
import KarirPage from "@/pages/karir";
import PrivasiPage from "@/pages/privasi";
import KetentuanPage from "@/pages/ketentuan";
import KeamananPage from "@/pages/keamanan";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/qr-generator" component={QrGenerator} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/wallets" component={Wallets} />
      <Route path="/api-docs" component={ApiDocsPage} />
      <Route path="/api-keys" component={ApiKeysPage} />
      <Route path="/qris-docs" component={QrisDocsPage} />
      <Route path="/tentang" component={TentangPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      <Route path="/karir" component={KarirPage} />
      <Route path="/privasi" component={PrivasiPage} />
      <Route path="/ketentuan" component={KetentuanPage} />
      <Route path="/keamanan" component={KeamananPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import Lands from "./pages/Lands";
import Commodities from "./pages/Commodities";
import TransactionsList from "./pages/TransactionsList";
import TransactionDetail from "./pages/TransactionDetail";
import NewTransaction from "./pages/NewTransaction";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/lands" element={<Lands />} />
              <Route path="/commodities" element={<Commodities />} />
              <Route path="/transactions" element={<TransactionsList />} />
              <Route path="/transactions/new" element={<NewTransaction />} />
              <Route path="/transactions/:id" element={<TransactionDetail />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

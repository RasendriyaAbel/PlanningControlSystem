import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ProductionPlanning from "./pages/ProductionPlanning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/production"
            element={
              <AppLayout>
                <ProductionPlanning />
              </AppLayout>
            }
          />
          <Route
            path="/inventory"
            element={
              <AppLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Manajemen Inventori
                  </h2>
                  <p className="text-gray-600">
                    Halaman inventori sedang dalam pengembangan
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/machines"
            element={
              <AppLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Monitoring Mesin
                  </h2>
                  <p className="text-gray-600">
                    Halaman monitoring mesin sedang dalam pengembangan
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <AppLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Laporan & Analisis
                  </h2>
                  <p className="text-gray-600">
                    Halaman laporan sedang dalam pengembangan
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/users"
            element={
              <AppLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Manajemen User
                  </h2>
                  <p className="text-gray-600">
                    Halaman manajemen user sedang dalam pengembangan
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AppLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Pengaturan
                  </h2>
                  <p className="text-gray-600">
                    Halaman pengaturan sedang dalam pengembangan
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <AppLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Notifikasi
                  </h2>
                  <p className="text-gray-600">
                    Halaman notifikasi sedang dalam pengembangan
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route
            path="/help"
            element={
              <AppLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Bantuan
                  </h2>
                  <p className="text-gray-600">
                    Halaman bantuan sedang dalam pengembangan
                  </p>
                </div>
              </AppLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

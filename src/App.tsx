import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Chatbot from "./pages/Chatbot";
import Advisor from "./pages/Advisor";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <TopBar />
              <main className="flex-1 p-6 bg-muted/30">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/advisor" element={<Advisor />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

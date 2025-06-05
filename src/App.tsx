/* This code snippet is a TypeScript React application that sets up various routes using React Router.
Here's a breakdown of what the code is doing: */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import Dashboard from "./pages/Dashboard";
import CompanySettings from "./pages/CompanySettings";
import Agents from "./pages/Agents";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route
                  path="/"
                  element={<Index />}
                />
                <Route
                  path="/properties"
                  element={<Properties />}
                />
                <Route
                  path="/property/:id"
                  element={<PropertyDetail />}
                />
                <Route
                  path="/agents"
                  element={<Agents />}
                />
                <Route
                  path="/about"
                  element={<About />}
                />
                <Route
                  path="/contact"
                  element={<Contact />}
                />
                <Route
                  path="/search"
                  element={<SearchResults />}
                />
                <Route
                  path="/auth"
                  element={<Auth />}
                />

                {/* Protected routes that require authentication */}
                <Route element={<ProtectedRoute requireAuth={true} />}>
                  <Route
                    path="/dashboard"
                    element={<Dashboard />}
                  />
                  <Route
                    path="/profile"
                    element={<Profile />}
                  />
                  <Route
                    path="/settings"
                    element={<Settings />}
                  />
                  <Route
                    path="/company"
                    element={<CompanySettings />}
                  />
                </Route>

                {/* Protected routes that require authentication and agent role */}
                <Route element={<ProtectedRoute requireAuth={true} />}>
                  <Route
                    path="/property/add"
                    element={<AddProperty />}
                  />
                  <Route
                    path="/property/edit/:id"
                    element={<EditProperty />}
                  />
                </Route>

                {/* Catch-all route */}
                <Route
                  path="*"
                  element={<NotFound />}
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

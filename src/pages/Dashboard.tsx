
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import TopListings from "@/components/dashboard/TopListings";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import MessageCenter from "@/components/dashboard/MessageCenter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { profile, isAgent, isAdmin } = useAuth();

  if (!profile) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Please log in to view the dashboard.</p>
        </div>
      </div>
    );
  }

  const getDashboardTitle = () => {
    if (isAdmin()) return "Admin Dashboard";
    if (isAgent()) return "Agent Dashboard";
    return "Buyer Dashboard";
  };

  const getDashboardDescription = () => {
    if (isAdmin()) return "Manage all properties, users, and platform analytics";
    if (isAgent()) return "Track your property listings and client interactions";
    return "Monitor your saved properties and search preferences";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{getDashboardTitle()}</h1>
          <p className="text-gray-600 mt-2">{getDashboardDescription()}</p>
        </div>

        {/* Main Dashboard Content */}
        <div className="space-y-8">
          {/* Stats Cards */}
          <DashboardStats userRole={profile.role} />

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DashboardCharts userRole={profile.role} />
            <TopListings userRole={profile.role} />
          </div>

          {/* Activity and Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivityFeed userRole={profile.role} />
            <MessageCenter userRole={profile.role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

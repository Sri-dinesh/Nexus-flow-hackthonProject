
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Home, Heart, Eye } from "lucide-react";

interface DashboardStatsProps {
  userRole: 'admin' | 'agent' | 'buyer';
}

const DashboardStats = ({ userRole }: DashboardStatsProps) => {
  const getStatsData = () => {
    if (userRole === 'admin') {
      return [
        {
          title: "Total Listings",
          value: "156",
          description: "+12% from last month",
          icon: Home,
          trend: "up"
        },
        {
          title: "Total Users",
          value: "1,234",
          description: "+8% from last month",
          icon: Users,
          trend: "up"
        },
        {
          title: "Average Price",
          value: "$2.1M",
          description: "+5% from last month",
          icon: TrendingUp,
          trend: "up"
        },
        {
          title: "Active Agents",
          value: "45",
          description: "+3 new this month",
          icon: Users,
          trend: "up"
        }
      ];
    } else if (userRole === 'agent') {
      return [
        {
          title: "My Listings",
          value: "8",
          description: "+2 this month",
          icon: Home,
          trend: "up"
        },
        {
          title: "Total Views",
          value: "2,847",
          description: "+15% from last week",
          icon: Eye,
          trend: "up"
        },
        {
          title: "Inquiries",
          value: "23",
          description: "+7 this week",
          icon: Users,
          trend: "up"
        },
        {
          title: "Avg. Price",
          value: "$1.2M",
          description: "Your listings",
          icon: TrendingUp,
          trend: "neutral"
        }
      ];
    } else {
      return [
        {
          title: "Saved Properties",
          value: "12",
          description: "+3 this week",
          icon: Heart,
          trend: "up"
        },
        {
          title: "Recent Views",
          value: "47",
          description: "Last 30 days",
          icon: Eye,
          trend: "neutral"
        },
        {
          title: "Price Range",
          value: "$800K-2M",
          description: "Your preferences",
          icon: TrendingUp,
          trend: "neutral"
        },
        {
          title: "Alerts",
          value: "5",
          description: "Active searches",
          icon: Users,
          trend: "neutral"
        }
      ];
    }
  };

  const stats = getStatsData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs flex items-center ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {stat.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
              {stat.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;

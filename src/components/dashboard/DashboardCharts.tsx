
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface DashboardChartsProps {
  userRole: 'admin' | 'agent' | 'buyer';
}

const DashboardCharts = ({ userRole }: DashboardChartsProps) => {
  const getChartData = () => {
    if (userRole === 'admin' || userRole === 'agent') {
      return [
        { month: 'Jan', listings: 45, views: 2400 },
        { month: 'Feb', listings: 52, views: 2800 },
        { month: 'Mar', listings: 48, views: 3200 },
        { month: 'Apr', listings: 61, views: 3800 },
        { month: 'May', listings: 55, views: 4200 },
        { month: 'Jun', listings: 67, views: 4800 }
      ];
    } else {
      return [
        { month: 'Jan', searches: 12, views: 45 },
        { month: 'Feb', searches: 18, views: 52 },
        { month: 'Mar', searches: 15, views: 38 },
        { month: 'Apr', searches: 22, views: 67 },
        { month: 'May', searches: 19, views: 58 },
        { month: 'Jun', searches: 25, views: 74 }
      ];
    }
  };

  const data = getChartData();

  const getChartTitle = () => {
    if (userRole === 'admin') return "Platform Statistics";
    if (userRole === 'agent') return "Your Performance";
    return "Your Activity";
  };

  const getChartDescription = () => {
    if (userRole === 'admin') return "Monthly platform overview";
    if (userRole === 'agent') return "Listings and views over time";
    return "Search activity and property views";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getChartTitle()}</CardTitle>
        <CardDescription>{getChartDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {userRole === 'buyer' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="searches" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="views" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="listings" fill="#8884d8" />
              <Bar dataKey="views" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardCharts;

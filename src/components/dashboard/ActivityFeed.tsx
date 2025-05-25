
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActivityFeedProps {
  userRole: 'admin' | 'agent' | 'buyer';
}

const ActivityFeed = ({ userRole }: ActivityFeedProps) => {
  const getActivityData = () => {
    if (userRole === 'admin') {
      return [
        {
          id: 1,
          action: "New property listed",
          description: "Modern Waterfront Villa in Miami",
          time: "2 hours ago",
          type: "listing"
        },
        {
          id: 2,
          action: "Agent registered",
          description: "Sarah Johnson joined the platform",
          time: "4 hours ago",
          type: "user"
        },
        {
          id: 3,
          action: "Property sold",
          description: "Hamptons Beachfront Estate",
          time: "1 day ago",
          type: "sale"
        },
        {
          id: 4,
          action: "New inquiry",
          description: "Interest in Downtown Seattle Loft",
          time: "2 days ago",
          type: "inquiry"
        }
      ];
    } else if (userRole === 'agent') {
      return [
        {
          id: 1,
          action: "Property viewed",
          description: "Your listing got 15 new views",
          time: "1 hour ago",
          type: "view"
        },
        {
          id: 2,
          action: "New inquiry",
          description: "Client interested in Hillside Craftsman",
          time: "3 hours ago",
          type: "inquiry"
        },
        {
          id: 3,
          action: "Price updated",
          description: "Charleston Historic Mansion",
          time: "1 day ago",
          type: "update"
        },
        {
          id: 4,
          action: "Showing scheduled",
          description: "Tomorrow at 2:00 PM",
          time: "2 days ago",
          type: "appointment"
        }
      ];
    } else {
      return [
        {
          id: 1,
          action: "New match found",
          description: "Properties matching your criteria",
          time: "30 minutes ago",
          type: "match"
        },
        {
          id: 2,
          action: "Price drop alert",
          description: "Scottsdale Golf Course Villa",
          time: "2 hours ago",
          type: "alert"
        },
        {
          id: 3,
          action: "Property saved",
          description: "Added to your favorites",
          time: "1 day ago",
          type: "save"
        },
        {
          id: 4,
          action: "Search updated",
          description: "Your Austin search criteria",
          time: "3 days ago",
          type: "search"
        }
      ];
    }
  };

  const activities = getActivityData();

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'sale': return 'default';
      case 'inquiry': return 'secondary';
      case 'alert': return 'destructive';
      case 'match': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
              <Badge variant={getBadgeVariant(activity.type)} className="text-xs">
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;


import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MessageCenterProps {
  userRole: 'admin' | 'agent' | 'buyer';
}

const MessageCenter = ({ userRole }: MessageCenterProps) => {
  const getMessagesData = () => {
    if (userRole === 'admin') {
      return [
        {
          id: 1,
          sender: "Sarah Johnson",
          message: "New property approval needed",
          time: "10 min ago",
          unread: true,
          type: "approval"
        },
        {
          id: 2,
          sender: "System",
          message: "Monthly report is ready",
          time: "1 hour ago",
          unread: true,
          type: "system"
        },
        {
          id: 3,
          sender: "Robert Chen",
          message: "Client inquiry assistance",
          time: "2 hours ago",
          unread: false,
          type: "support"
        },
        {
          id: 4,
          sender: "Lisa Washington",
          message: "Commission report question",
          time: "1 day ago",
          unread: false,
          type: "finance"
        }
      ];
    } else if (userRole === 'agent') {
      return [
        {
          id: 1,
          sender: "John Smith",
          message: "Interested in scheduling a tour",
          time: "15 min ago",
          unread: true,
          type: "inquiry"
        },
        {
          id: 2,
          sender: "Emily Davis",
          message: "Questions about financing options",
          time: "45 min ago",
          unread: true,
          type: "inquiry"
        },
        {
          id: 3,
          sender: "Mike Johnson",
          message: "Ready to make an offer",
          time: "2 hours ago",
          unread: false,
          type: "offer"
        },
        {
          id: 4,
          sender: "Admin",
          message: "Property listing approved",
          time: "5 hours ago",
          unread: false,
          type: "approval"
        }
      ];
    } else {
      return [
        {
          id: 1,
          sender: "Sarah Johnson",
          message: "Tour confirmation for tomorrow",
          time: "30 min ago",
          unread: true,
          type: "appointment"
        },
        {
          id: 2,
          sender: "Property Alert",
          message: "New listing matches your criteria",
          time: "2 hours ago",
          unread: true,
          type: "alert"
        },
        {
          id: 3,
          sender: "Robert Chen",
          message: "Thanks for your interest!",
          time: "1 day ago",
          unread: false,
          type: "response"
        },
        {
          id: 4,
          sender: "System",
          message: "Your search has been updated",
          time: "2 days ago",
          unread: false,
          type: "system"
        }
      ];
    }
  };

  const messages = getMessagesData();
  const unreadCount = messages.filter(m => m.unread).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            Messages
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Recent conversations</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary">
                  {message.sender.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                    {message.sender}
                  </p>
                  <p className="text-xs text-gray-400">
                    {message.time}
                  </p>
                </div>
                <p className={`text-sm ${message.unread ? 'text-gray-900' : 'text-gray-500'} truncate`}>
                  {message.message}
                </p>
              </div>
              {message.unread && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCenter;

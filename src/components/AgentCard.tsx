
import React from "react";
import { Agent } from "@/types/agent";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Mail, Phone } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

const AgentCard = ({ agent, onClick }: AgentCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex items-center">
          <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
          <span className="font-medium text-sm">{agent.rating}</span>
          <span className="text-muted-foreground text-xs ml-1">({agent.reviewCount})</span>
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
        <p className="text-muted-foreground mb-3">
          {agent.office.city}, {agent.office.state} • {agent.experience} years exp.
        </p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {agent.specialization.slice(0, 2).map((specialty, index) => (
            <Badge key={index} variant="secondary" className="font-normal text-xs">
              {specialty}
            </Badge>
          ))}
          {agent.specialization.length > 2 && (
            <Badge variant="outline" className="font-normal text-xs">
              +{agent.specialization.length - 2} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between text-sm mb-4">
          <div>
            <p className="font-medium">{agent.listingsCount}</p>
            <p className="text-muted-foreground">Active Listings</p>
          </div>
          <div>
            <p className="font-medium">{agent.soldCount}</p>
            <p className="text-muted-foreground">Properties Sold</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{agent.bio}</p>
      </CardContent>
      
      <CardFooter className="border-t p-4 bg-muted/20 flex flex-col space-y-2">
        <Button
          onClick={onClick}
          className="w-full"
          variant="default"
        >
          View Profile
        </Button>
        
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `mailto:${agent.email}`;
            }}
          >
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `tel:${agent.phone}`;
            }}
          >
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;

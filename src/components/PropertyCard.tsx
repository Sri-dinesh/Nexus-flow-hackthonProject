
import { Property } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer hover:scale-[1.02]" 
      onClick={onClick}
    >
      <div className="relative w-full h-[200px] overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary text-white">
          {property.type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-1 line-clamp-1">{property.title}</h3>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location.city}, {property.location.state}</span>
        </div>
        <p className="text-2xl font-semibold text-primary">{formatPrice(property.price)}</p>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex justify-between text-muted-foreground">
        <div className="flex items-center">
          <span className="font-semibold mr-1">{property.beds}</span> Beds
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-1">{property.baths}</span> Baths
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-1">{property.area.toLocaleString()}</span> sqft
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;

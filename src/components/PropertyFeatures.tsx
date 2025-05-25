
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <Badge 
            key={index} 
            variant="outline"
            className="flex items-center gap-1 px-3 py-2 text-sm"
          >
            <Check className="h-3.5 w-3.5 text-primary" />
            {feature}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;

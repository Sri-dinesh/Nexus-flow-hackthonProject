
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyFeatures from "@/components/PropertyFeatures";
import ContactAgentForm from "@/components/ContactAgentForm";
import PropertyManagement from "@/components/PropertyManagement";
import { Property } from "@/types/property";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Move, Calendar, CarFront } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the property with the matching ID
    const foundProperty = properties.find(p => p.id === id);
    
    // Simulate API fetch delay
    setTimeout(() => {
      setProperty(foundProperty || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <a href="/properties" className="text-primary hover:underline">
            Browse all properties
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Property Management */}
        <div className="mb-6">
          <PropertyManagement property={property} isDetail={true} />
        </div>
        
        {/* Property Title Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <Badge className="text-lg px-3 py-1">{property.type}</Badge>
          </div>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}
            </span>
          </div>
          <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />
            
            {/* Property Details */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Bed className="h-6 w-6 text-primary mb-2" />
                  <span className="font-semibold text-lg">{property.beds}</span>
                  <span className="text-sm text-muted-foreground">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Bath className="h-6 w-6 text-primary mb-2" />
                  <span className="font-semibold text-lg">{property.baths}</span>
                  <span className="text-sm text-muted-foreground">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Move className="h-6 w-6 text-primary mb-2" />
                  <span className="font-semibold text-lg">{property.area.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">Square Feet</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <span className="font-semibold text-lg">{property.year_built || "N/A"}</span>
                  <span className="text-sm text-muted-foreground">Year Built</span>
                </div>
                {property.garage_spaces !== undefined && (
                  <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                    <CarFront className="h-6 w-6 text-primary mb-2" />
                    <span className="font-semibold text-lg">{property.garage_spaces}</span>
                    <span className="text-sm text-muted-foreground">Garage Spaces</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              </div>
              
              {/* Features */}
              <PropertyFeatures features={property.features} />
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div>
            <ContactAgentForm 
              propertyId={property.id} 
              propertyTitle={property.title}
              agentName={property.agent?.name || "Agent"}
            />
            
            {/* Agent Info */}
            <div className="mt-6 p-6 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Listed By</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary">
                    {property.agent?.name.split(' ').map(name => name[0]).join('') || "A"}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{property.agent?.name || "Agent"}</p>
                  <p className="text-sm text-muted-foreground">{property.agent?.phone || "N/A"}</p>
                  <p className="text-sm text-muted-foreground">{property.agent?.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Same as in Index.tsx */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EstateNexus</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect property across the United States.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/properties" className="text-gray-400 hover:text-white">Properties</a></li>
                <li><a href="/agents" className="text-gray-400 hover:text-white">Agents</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Market Trends</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Buying Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Selling Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Contact</h4>
              <address className="text-gray-400 not-italic">
                123 Real Estate Blvd<br />
                New York, NY 10001<br />
                <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a><br />
                <a href="mailto:info@estatenexus.com" className="hover:text-white">info@estatenexus.com</a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EstateNexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetail;

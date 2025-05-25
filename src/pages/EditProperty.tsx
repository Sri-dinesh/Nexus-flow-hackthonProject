import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Property } from "@/types/property";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  
  // Property form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"House" | "Apartment" | "Condo" | "Townhouse" | "Villa">("House");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [garageSpaces, setGarageSpaces] = useState("");
  
  // Location fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  // Agent info
  const [agentName, setAgentName] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  
  // Features
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  
  // Images
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  
  useEffect(() => {
    // Find the property with matching ID
    const foundProperty = properties.find(p => p.id === id);
    
    if (foundProperty) {
      setProperty(foundProperty);
      
      // Set form values from property data
      setTitle(foundProperty.title);
      setType(foundProperty.type as "House" | "Apartment" | "Condo" | "Townhouse" | "Villa");
      setPrice(foundProperty.price.toString());
      setBeds(foundProperty.beds.toString());
      setBaths(foundProperty.baths.toString());
      setArea(foundProperty.area.toString());
      setDescription(foundProperty.description);
      
      if (foundProperty.year_built) {
        setYearBuilt(foundProperty.year_built.toString());
      }
      
      if (foundProperty.garage_spaces) {
        setGarageSpaces(foundProperty.garage_spaces.toString());
      }
      
      // Location
      setAddress(foundProperty.location.address);
      setCity(foundProperty.location.city);
      setState(foundProperty.location.state);
      setZipCode(foundProperty.location.zip);
      
      // Agent
      if (foundProperty.agent) {
        setAgentName(foundProperty.agent.name);
        setAgentPhone(foundProperty.agent.phone);
        setAgentEmail(foundProperty.agent.email);
      }
      
      // Features
      setFeatures([...foundProperty.features]);
      
      // Images
      setImages([...foundProperty.images]);
    } else {
      toast.error("Property not found");
      navigate("/properties");
    }
    
    setIsLoading(false);
  }, [id, navigate]);
  
  const addImage = () => {
    if (imageUrl && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl("");
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const addFeature = () => {
    if (featureInput && !features.includes(featureInput)) {
      setFeatures([...features, featureInput]);
      setFeatureInput("");
    }
  };
  
  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !type || !price || !beds || !baths || !area || !description || 
        !address || !city || !state || !zipCode || 
        !agentName || !agentPhone || !agentEmail || 
        images.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to update the property
      
      if (!property) {
        throw new Error("Property not found");
      }
      
      const updatedProperty: Property = {
        ...property,
        title,
        type,
        location: {
          address,
          city,
          state,
          zip: zipCode
        },
        price: parseFloat(price),
        beds: parseInt(beds),
        baths: parseFloat(baths),
        area: parseInt(area),
        description,
        features,
        images,
        agent: {
          id: property.agent?.id || "agent-1",
          name: agentName,
          phone: agentPhone,
          email: agentEmail,
          avatar: property.agent?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        }
      };
      
      if (yearBuilt) {
        updatedProperty.year_built = parseInt(yearBuilt);
      } else {
        delete updatedProperty.year_built;
      }
      
      if (garageSpaces) {
        updatedProperty.garage_spaces = parseInt(garageSpaces);
      } else {
        delete updatedProperty.garage_spaces;
      }
      
      // Update property in the array
      const propertyIndex = properties.findIndex(p => p.id === id);
      if (propertyIndex >= 0) {
        properties[propertyIndex] = updatedProperty;
      }
      
      toast.success("Property updated successfully!");
      navigate(`/property/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
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
            The property you're trying to edit doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/properties")}>
            View All Properties
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Edit Property</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern Waterfront Villa"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Property Type *</Label>
                  <Select value={type} onValueChange={(value: "House" | "Apartment" | "Condo" | "Townhouse" | "Villa") => setType(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 450000"
                    min="0"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="beds">Bedrooms *</Label>
                  <Input
                    id="beds"
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    placeholder="e.g. 3"
                    min="0"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="baths">Bathrooms *</Label>
                  <Input
                    id="baths"
                    type="number"
                    value={baths}
                    onChange={(e) => setBaths(e.target.value)}
                    placeholder="e.g. 2.5"
                    min="0"
                    step="0.5"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="area">Area (sq ft) *</Label>
                  <Input
                    id="area"
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 2000"
                    min="0"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    placeholder="e.g. 2010"
                    min="1800"
                    max={new Date().getFullYear()}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="garageSpaces">Garage Spaces</Label>
                  <Input
                    id="garageSpaces"
                    type="number"
                    value={garageSpaces}
                    onChange={(e) => setGarageSpaces(e.target.value)}
                    placeholder="e.g. 2"
                    min="0"
                    className="mt-1"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the property in detail..."
                    className="mt-1"
                    rows={5}
                  />
                </div>
              </div>
            </div>
            
            {/* Location Information */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 123 Main Street"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Miami"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Florida"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode">Zip Code *</Label>
                  <Input
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g. 33101"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            {/* Images */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Images</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addImage}>Add Image</Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Please add at least one image URL. For demo purposes, you can use URLs from Unsplash.
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img} 
                          alt={`Property image ${index + 1}`} 
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Features */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Swimming Pool"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addFeature}>Add Feature</Button>
                </div>
                
                {features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="bg-muted px-3 py-1 rounded-full flex items-center"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Agent Information */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Agent Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="agentName">Agent Name *</Label>
                  <Input
                    id="agentName"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="agentPhone">Agent Phone *</Label>
                  <Input
                    id="agentPhone"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    placeholder="e.g. (555) 123-4567"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="agentEmail">Agent Email *</Label>
                  <Input
                    id="agentEmail"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    placeholder="e.g. john.doe@example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/property/${id}`)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating Property..." : "Update Property"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;

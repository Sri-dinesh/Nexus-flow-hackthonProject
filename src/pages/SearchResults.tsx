
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { properties } from "@/data/properties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Map, SlidersHorizontal } from "lucide-react";
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Filters state
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [bedsMin, setBedsMin] = useState<string>("any");
  const [bathsMin, setBathsMin] = useState<string>("any");
  const [propertyType, setPropertyType] = useState<string>("all");
  
  // Find min and max prices in the data
  const minPrice = Math.min(...properties.map(p => p.price));
  const maxPrice = Math.max(...properties.map(p => p.price));
  
  useEffect(() => {
    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q')?.toLowerCase() || '';
    const typeParam = queryParams.get('type') || 'all';
    
    // Set initial filters based on URL params
    setPropertyType(typeParam);
    
    // Filter properties based on search query, type, and other filters
    filterProperties(searchQuery, typeParam);
  }, [location.search]);
  
  const filterProperties = (searchQuery: string, type: string) => {
    // Filter properties based on search query and type
    const results = properties.filter(property => {
      const matchesQuery = 
        property.title.toLowerCase().includes(searchQuery) ||
        property.location.city.toLowerCase().includes(searchQuery) ||
        property.location.state.toLowerCase().includes(searchQuery) ||
        property.location.address.toLowerCase().includes(searchQuery);
      
      const matchesType = type === 'all' || property.type === type;
      
      const matchesPriceRange = property.price >= priceRange[0] && property.price <= priceRange[1];
      
      const matchesBeds = bedsMin === 'any' || property.beds >= parseInt(bedsMin);
      
      const matchesBaths = bathsMin === 'any' || property.baths >= parseFloat(bathsMin);
      
      return matchesQuery && matchesType && matchesPriceRange && matchesBeds && matchesBaths;
    });
    
    setFilteredProperties(results);
    setLoading(false);
  };
  
  const applyFilters = () => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q')?.toLowerCase() || '';
    
    filterProperties(searchQuery, propertyType);
  };
  
  const resetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setBedsMin("any");
    setBathsMin("any");
    setPropertyType("all");
    
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q')?.toLowerCase() || '';
    
    filterProperties(searchQuery, "all");
  };
  
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    
    if (viewMode === "map") {
      // Scroll to property details when in map view
      const propertyElement = document.getElementById(`property-${property.id}`);
      if (propertyElement) {
        propertyElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to property details page when in list view
      navigate(`/property/${property.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-slate-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            Found {filteredProperties.length} properties matching your search
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Tabs 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as "list" | "map")}
              className="hidden md:flex"
            >
              <TabsList>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span>List View</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  <span>Map View</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="md:hidden">
              <Select
                value={viewMode}
                onValueChange={(value) => setViewMode(value as "list" | "map")}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="list" className="flex items-center gap-2">
                    <List className="h-4 w-4 mr-1" />
                    <span>List View</span>
                  </SelectItem>
                  <SelectItem value="map" className="flex items-center gap-2">
                    <Map className="h-4 w-4 mr-1" />
                    <span>Map View</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Search Filters</SheetTitle>
                <SheetDescription>
                  Refine your property search
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                {/* Property Type */}
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select
                    value={propertyType}
                    onValueChange={setPropertyType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price Range */}
                <div className="space-y-4">
                  <Label>Price Range</Label>
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={50000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Select
                    value={bedsMin}
                    onValueChange={setBedsMin}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Bathrooms */}
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Select
                    value={bathsMin}
                    onValueChange={setBathsMin}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="1.5">1.5+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-3 pt-4">
                  <Button onClick={applyFilters}>Apply Filters</Button>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <p>Loading results...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          viewMode === "list" ? (
            // List view
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onClick={() => handlePropertySelect(property)} 
                />
              ))}
            </div>
          ) : (
            // Map view
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <PropertyMap 
                  properties={filteredProperties}
                  onPropertySelect={handlePropertySelect}
                  className="sticky top-24"
                />
              </div>
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="space-y-4">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      id={`property-${property.id}`}
                      className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                        selectedProperty?.id === property.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                          <img 
                            src={property.images?.[0]} 
                            alt={property.title} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-1">{property.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {property.location.address}, {property.location.city}
                          </p>
                          <p className="font-bold mt-1">{formatPrice(property.price)}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {property.beds} bd | {property.baths} ba | {property.area} sqft
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/property/${property.id}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria
            </p>
            <Button onClick={() => window.location.href = '/properties'}>
              View All Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

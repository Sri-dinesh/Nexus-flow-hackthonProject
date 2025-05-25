import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyGrid from "@/components/PropertyGrid";
import PropertyMap from "@/components/PropertyMap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Property } from "@/types/property";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { Plus, Map } from "lucide-react";

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "all";
  const initialLocation = searchParams.get("location") || "";

  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState(initialType);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedsMin, setBedsMin] = useState("any");
  const [bathsMin, setBathsMin] = useState("any");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Find min and max prices in the data
  const minPrice = Math.min(...properties.map((p) => p.price));
  const maxPrice = Math.max(...properties.map((p) => p.price));

  useEffect(() => {
    // Simulate API loading delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Filter properties based on all criteria
      let result = [...properties];

      // Filter by search query (title)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter((p) => p.title.toLowerCase().includes(query));
      }

      // Filter by location (city or state)
      if (location) {
        const locationQuery = location.toLowerCase();
        result = result.filter(
          (p) =>
            p.location.city.toLowerCase().includes(locationQuery) ||
            p.location.state.toLowerCase().includes(locationQuery) ||
            p.location.address.toLowerCase().includes(locationQuery)
        );
      }

      // Filter by property type
      if (propertyType !== "all") {
        result = result.filter((p) => p.type === propertyType);
      }

      // Filter by price range
      result = result.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );

      // Filter by minimum beds
      if (bedsMin !== "any") {
        result = result.filter((p) => p.beds >= parseInt(bedsMin));
      }

      // Filter by minimum baths
      if (bathsMin !== "any") {
        result = result.filter((p) => p.baths >= parseFloat(bathsMin));
      }

      // Sort the results
      result = sortProperties(result, sortBy);

      setFilteredProperties(result);
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    location,
    propertyType,
    priceRange,
    bedsMin,
    bathsMin,
    sortBy,
  ]);

  const sortProperties = (props: Property[], sortOption: string) => {
    const sorted = [...props];

    switch (sortOption) {
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the URL query params
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    if (propertyType !== "all") params.set("type", propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPropertyType("all");
    setPriceRange([minPrice, maxPrice]);
    setBedsMin("any");
    setBathsMin("any");
    setSortBy("newest");
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    if (viewMode === "map") {
      // Optionally scroll to property details or show in sidebar
      navigate(`/property/${property.id}`);
    } else {
      navigate(`/property/${property.id}`);
    }
  };

  const handleAddProperty = () => {
    navigate("/property/add");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <div className="bg-slate-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
              <p className="text-muted-foreground">
                Find your dream home from our wide selection of properties
              </p>
            </div>
            <Button
              onClick={handleAddProperty}
              className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-6">Filter Properties</h2>

              <form
                onSubmit={handleSearch}
                className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Search
                  </label>
                  <Input
                    type="text"
                    placeholder="Property title, keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <Input
                    type="text"
                    placeholder="City, state, address..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Property Type
                  </label>
                  <Select
                    value={propertyType}
                    onValueChange={setPropertyType}>
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
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Price Range
                  </label>
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={50000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bedrooms
                  </label>
                  <Select
                    value={bedsMin}
                    onValueChange={setBedsMin}>
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
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bathrooms
                  </label>
                  <Select
                    value={bathsMin}
                    onValueChange={setBathsMin}>
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

                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit">Apply Filters</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Property Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <p className="text-muted-foreground">
                {filteredProperties.length} properties found
              </p>

              <div className="flex gap-4 items-center w-full sm:w-auto">
                {/* <Tabs
                  value={viewMode}
                  onValueChange={(value) =>
                    setViewMode(value as "grid" | "map")
                  }>
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="map">Map</TabsTrigger>
                  </TabsList>
                </Tabs> */}

                <Select
                  value={sortBy}
                  onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">
                      Price (Low to High)
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price (High to Low)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* <Tabs
              value={viewMode}
              className="w-full">
              <TabsContent value="grid">
                <PropertyGrid
                  properties={filteredProperties}
                  isLoading={isLoading}
                  onPropertyClick={handlePropertySelect}
                  itemsPerPage={6}
                />
              </TabsContent>
              <TabsContent value="map">
                <PropertyMap
                  properties={filteredProperties}
                  onPropertySelect={handlePropertySelect}
                  className="h-[600px]"
                />
              </TabsContent>
            </Tabs> */}
            <>
              {/* Map View - Always shown at the top */}
              <div className="mb-8">
                <PropertyMap
                  properties={filteredProperties}
                  onPropertySelect={handlePropertySelect}
                  className="h-[500px] w-full"
                />
              </div>

              {/* Property Grid Below the Map */}
              <PropertyGrid
                properties={filteredProperties}
                isLoading={isLoading}
                onPropertyClick={handlePropertySelect}
                itemsPerPage={6}
              />
            </>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EstateNexus</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect property across the
                United States.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/properties"
                    className="text-gray-400 hover:text-white">
                    Properties
                  </a>
                </li>
                <li>
                  <a
                    href="/agents"
                    className="text-gray-400 hover:text-white">
                    Agents
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Market Trends
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Buying Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white">
                    Selling Tips
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Contact</h4>
              <address className="text-gray-400 not-italic">
                123 Real Estate Blvd
                <br />
                New York, NY 10001
                <br />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white">
                  +1 (234) 567-890
                </a>
                <br />
                <a
                  href="mailto:info@estatenexus.com"
                  className="hover:text-white">
                  info@estatenexus.com
                </a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} EstateNexus. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Properties;

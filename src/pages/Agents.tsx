
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AgentCard from "@/components/AgentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from "@/types/agent";
import { agents } from "@/data/agents";
import { Search } from "lucide-react";

const Agents = () => {
  const navigate = useNavigate();
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [location, setLocation] = useState("all");
  const [sortBy, setSortBy] = useState("experience-desc");
  
  // Get unique specializations from agents
  const specializations = Array.from(
    new Set(agents.flatMap(agent => agent.specialization))
  ).sort();
  
  // Get unique locations (states) from agents
  const locations = Array.from(
    new Set(agents.map(agent => agent.office.state))
  ).sort();
  
  // Filter and sort agents when filters change
  useEffect(() => {
    let result = [...agents];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        agent => 
          agent.name.toLowerCase().includes(query) || 
          agent.office.city.toLowerCase().includes(query) ||
          agent.office.state.toLowerCase().includes(query) ||
          agent.specialization.some(spec => spec.toLowerCase().includes(query))
      );
    }
    
    // Filter by specialization
    if (specialization !== "all") {
      result = result.filter(agent => 
        agent.specialization.includes(specialization)
      );
    }
    
    // Filter by location (state)
    if (location !== "all") {
      result = result.filter(agent => 
        agent.office.state === location
      );
    }
    
    // Sort results
    switch (sortBy) {
      case "experience-desc":
        result.sort((a, b) => b.experience - a.experience);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "listings-desc":
        result.sort((a, b) => b.listingsCount - a.listingsCount);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    setFilteredAgents(result);
  }, [searchQuery, specialization, location, sortBy]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSpecialization("all");
    setLocation("all");
    setSortBy("experience-desc");
  };
  
  const handleAgentClick = (agentId: string) => {
    // For now, we'll just log - in a real app, we'd navigate to the agent's detail page
    console.log(`Viewing agent profile: ${agentId}`);
    alert("Agent profile functionality coming soon!");
    // navigate(`/agent/${agentId}`); // For future implementation
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-slate-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Our Real Estate Agents</h1>
          <p className="text-muted-foreground">
            Connect with our experienced real estate professionals
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              
              <Select
                value={specialization}
                onValueChange={setSpecialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={location}
                onValueChange={setLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="experience-desc">Most Experienced</SelectItem>
                  <SelectItem value="rating-desc">Highest Rated</SelectItem>
                  <SelectItem value="listings-desc">Most Listings</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
              <Button type="submit">Apply Filters</Button>
            </div>
          </form>
        </div>
        
        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            {filteredAgents.length} agents found
          </p>
          
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => handleAgentClick(agent.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No agents found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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

export default Agents;

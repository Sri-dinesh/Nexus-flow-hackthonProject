
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopListingsProps {
  userRole: 'admin' | 'agent' | 'buyer';
}

const TopListings = ({ userRole }: TopListingsProps) => {
  const getListingsData = () => {
    const mockListings = [
      {
        id: "1",
        title: "Modern Waterfront Villa",
        location: { city: "Miami", state: "FL" },
        price: 1250000,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
      },
      {
        id: "2", 
        title: "Historic Brownstone",
        location: { city: "Boston", state: "MA" },
        price: 2850000,
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
      },
      {
        id: "3",
        title: "Manhattan Penthouse", 
        location: { city: "New York", state: "NY" },
        price: 7950000,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
      },
      {
        id: "4",
        title: "Hillside Craftsman",
        location: { city: "Los Angeles", state: "CA" },
        price: 1895000,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
      }
    ];

    return mockListings.map(listing => ({
      ...listing,
      status: userRole === 'buyer' ? "Saved" : userRole === 'admin' ? "Featured" : "For Sale"
    }));
  };

  const listings = getListingsData();

  const getTitle = () => {
    if (userRole === 'buyer') return "Saved Properties";
    if (userRole === 'admin') return "Top Listings";
    return "Your Best Listings";
  };

  const getDescription = () => {
    if (userRole === 'buyer') return "Properties you've saved for later";
    return "Highest value properties";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="flex items-center space-x-4">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {listing.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {listing.location.city}, {listing.location.state}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(listing.price)}
                </p>
              </div>
              <Badge variant={userRole === 'buyer' ? 'secondary' : 'default'}>
                {listing.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopListings;

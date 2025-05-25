
import { Agent } from "@/types/agent";

export const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Jennifer Parker",
    email: "jennifer.parker@estatenexus.com",
    phone: "(555) 123-4567",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Jennifer is a top-performing real estate agent with over 15 years of experience in luxury properties across New York City. Her deep understanding of the market and commitment to client satisfaction has earned her numerous accolades.",
    specialization: ["Luxury Homes", "Waterfront Properties", "Investment Properties"],
    experience: 15,
    rating: 4.9,
    reviewCount: 87,
    listingsCount: 24,
    soldCount: 215,
    office: {
      name: "EstateNexus Manhattan",
      address: "123 Park Avenue",
      city: "New York",
      state: "NY"
    },
    social: {
      facebook: "jennifer.parker",
      twitter: "jparker_realty",
      instagram: "jennifer.luxuryrealty",
      linkedin: "jenniferparker"
    }
  },
  {
    id: "agent-002",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@estatenexus.com",
    phone: "(555) 234-5678",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "With a background in architecture and real estate development, Michael brings a unique perspective to his clients. He specializes in modern homes and urban properties throughout Los Angeles.",
    specialization: ["Modern Design", "Urban Properties", "New Developments"],
    experience: 8,
    rating: 4.7,
    reviewCount: 52,
    listingsCount: 18,
    soldCount: 93,
    office: {
      name: "EstateNexus Los Angeles",
      address: "456 Sunset Blvd",
      city: "Los Angeles",
      state: "CA"
    },
    social: {
      instagram: "michael.rodriguez.realty",
      linkedin: "michaelrodriguez"
    }
  },
  {
    id: "agent-003",
    name: "Sarah Johnson",
    email: "sarah.johnson@estatenexus.com",
    phone: "(555) 345-6789",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Sarah specializes in helping first-time homebuyers navigate the complex real estate market. Her patient approach and attention to detail have made her a favorite among young families looking for their dream home.",
    specialization: ["First-time Buyers", "Family Homes", "Suburban Properties"],
    experience: 6,
    rating: 4.8,
    reviewCount: 43,
    listingsCount: 15,
    soldCount: 67,
    office: {
      name: "EstateNexus Chicago",
      address: "789 Michigan Ave",
      city: "Chicago",
      state: "IL"
    },
    social: {
      facebook: "sarah.johnson.realty",
      instagram: "sarah.homes"
    }
  },
  {
    id: "agent-004",
    name: "David Kim",
    email: "david.kim@estatenexus.com",
    phone: "(555) 456-7890",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "David has built his reputation on integrity and market knowledge. With over 20 years in real estate, he specializes in high-end commercial properties and large-scale investments across the San Francisco Bay Area.",
    specialization: ["Commercial Real Estate", "Office Spaces", "Retail Properties"],
    experience: 20,
    rating: 4.9,
    reviewCount: 104,
    listingsCount: 12,
    soldCount: 245,
    office: {
      name: "EstateNexus San Francisco",
      address: "101 Market Street",
      city: "San Francisco",
      state: "CA"
    },
    social: {
      linkedin: "davidkim",
      twitter: "davidkim_realty"
    }
  },
  {
    id: "agent-005",
    name: "Amanda Walker",
    email: "amanda.walker@estatenexus.com",
    phone: "(555) 567-8901",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Amanda specializes in vacation properties and second homes in Florida. Her knowledge of the coastal market has helped countless clients find their perfect getaway.",
    specialization: ["Vacation Homes", "Beachfront Properties", "Retirement Communities"],
    experience: 9,
    rating: 4.6,
    reviewCount: 37,
    listingsCount: 22,
    soldCount: 78,
    office: {
      name: "EstateNexus Miami",
      address: "555 Ocean Drive",
      city: "Miami",
      state: "FL"
    },
    social: {
      instagram: "amanda.beachproperties",
      facebook: "amanda.walker.realty"
    }
  },
  {
    id: "agent-006",
    name: "Robert Chen",
    email: "robert.chen@estatenexus.com",
    phone: "(555) 678-9012",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Robert has a background in finance which gives him an edge when helping clients with investment properties. He specializes in multi-family units and rental properties in the greater Boston area.",
    specialization: ["Investment Properties", "Multi-family Units", "Property Management"],
    experience: 12,
    rating: 4.7,
    reviewCount: 61,
    listingsCount: 19,
    soldCount: 143,
    office: {
      name: "EstateNexus Boston",
      address: "222 Commonwealth Ave",
      city: "Boston",
      state: "MA"
    },
    social: {
      linkedin: "robertchen",
      twitter: "robert_investments"
    }
  }
];

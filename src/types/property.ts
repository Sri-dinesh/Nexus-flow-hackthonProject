
export interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  features: string[];
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    latitude?: number;
    longitude?: number;
  };
  agent?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  available: boolean;
  createdAt: string;
  year_built?: number;
  garage_spaces?: number;
}

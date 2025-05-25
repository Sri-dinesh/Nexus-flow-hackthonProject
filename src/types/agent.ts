
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  specialization: string[];
  experience: number; // years
  rating: number; // out of 5
  reviewCount: number;
  listingsCount: number;
  soldCount: number;
  office: {
    name: string;
    address: string;
    city: string;
    state: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

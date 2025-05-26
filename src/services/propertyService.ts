/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";

export type PropertyFormData = {
  title: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  description: string;
  features: string[];
  images: string[];
  yearBuilt?: number;
  garageSpaces?: number;
  agentId?: string;
  companyId?: string;
};

export const fetchProperties = async () => {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      agent:profiles!agent_id(full_name, email, phone, avatar_url),
      company:companies(name)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }

  const properties: Property[] = data.map((p) => ({
    id: p.id,
    title: p.title,
    type: p.type as any,
    location: {
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip_code,
    },
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
    description: p.description,
    features: p.features,
    images: p.images,
    available: p.available,
    year_built: p.year_built,
    garage_spaces: p.garage_spaces,
    agent: p.agent
      ? {
          id: p.agent_id,
          name: p.agent.full_name || "Agent",
          phone: p.agent.phone || "N/A",
          email: p.agent.email || "N/A",
          avatar:
            p.agent.avatar_url ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        }
      : {
          id: "agent-1",
          name: "Agent Name",
          phone: "(555) 123-4567",
          email: "agent@example.com",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        },
    createdAt: p.created_at,
  }));

  return properties;
};

export const fetchPropertyById = async (id: string) => {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      agent:profiles!agent_id(full_name, email, phone, avatar_url),
      company:companies(name)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching property ${id}:`, error);
    throw error;
  }

  const property: Property = {
    id: data.id,
    title: data.title,
    type: data.type as any,
    location: {
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip_code,
    },
    price: data.price,
    beds: data.beds,
    baths: data.baths,
    area: data.area,
    description: data.description,
    features: data.features,
    images: data.images,
    available: data.available,
    year_built: data.year_built,
    garage_spaces: data.garage_spaces,
    agent: data.agent
      ? {
          id: data.agent_id,
          name: data.agent.full_name || "Agent",
          phone: data.agent.phone || "N/A",
          email: data.agent.email || "N/A",
          avatar:
            data.agent.avatar_url ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        }
      : {
          id: "agent-1",
          name: "Agent Name",
          phone: "(555) 123-4567",
          email: "agent@example.com",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        },
    createdAt: data.created_at,
  };

  return property;
};

export const createProperty = async (propertyData: PropertyFormData) => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    throw new Error("User not authenticated");
  }

  // Get user's company if they have one
  const { data: profileData } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", userData.user.id)
    .single();

  const { data, error } = await supabase
    .from("properties")
    .insert([
      {
        title: propertyData.title,
        type: propertyData.type,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        zip_code: propertyData.zipCode,
        price: propertyData.price,
        beds: propertyData.beds,
        baths: propertyData.baths,
        area: propertyData.area,
        description: propertyData.description,
        features: propertyData.features,
        images: propertyData.images,
        year_built: propertyData.yearBuilt,
        garage_spaces: propertyData.garageSpaces,
        agent_id: userData.user.id,
        company_id: propertyData.companyId || profileData?.company_id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating property:", error);
    throw error;
  }

  return data;
};

export const updateProperty = async (
  id: string,
  propertyData: PropertyFormData
) => {
  const { data, error } = await supabase
    .from("properties")
    .update({
      title: propertyData.title,
      type: propertyData.type,
      address: propertyData.address,
      city: propertyData.city,
      state: propertyData.state,
      zip_code: propertyData.zipCode,
      price: propertyData.price,
      beds: propertyData.beds,
      baths: propertyData.baths,
      area: propertyData.area,
      description: propertyData.description,
      features: propertyData.features,
      images: propertyData.images,
      year_built: propertyData.yearBuilt,
      garage_spaces: propertyData.garageSpaces,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating property ${id}:`, error);
    throw error;
  }

  return data;
};

export const deleteProperty = async (id: string) => {
  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting property ${id}:`, error);
    throw error;
  }

  return true;
};

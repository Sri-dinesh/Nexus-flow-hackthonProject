/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type UserProfile = {
  id: string;
  email: string;
  role: "admin" | "agent" | "buyer";
  full_name?: string;
  avatar_url?: string;
  company_id?: string;
  phone?: string;
  bio?: string;
  linkedin_url?: string;
};

export type CompanyMembership = {
  id: string;
  company_id: string;
  role: "admin" | "manager" | "agent" | "employee";
  status: "pending" | "active" | "inactive";
  company?: {
    id: string;
    name: string;
    description?: string;
  };
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  companyMembership: CompanyMembership | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAgent: () => boolean;
  isAdmin: () => boolean;
  isCompanyAdmin: () => boolean;
  isCompanyManager: () => boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [companyMembership, setCompanyMembership] =
    useState<CompanyMembership | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Use setTimeout to avoid recursion issues
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      } else {
        setProfile(null);
        setCompanyMembership(null);
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfile(session.user.id);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw profileError;
      }

      setProfile(profileData as UserProfile);

      // Fetch company membership if user has a company
      if (profileData.company_id) {
        const { data: membershipData, error: membershipError } = await supabase
          .from("company_members")
          .select(
            `
            *,
            company:companies(id, name, description)
          `
          )
          .eq("user_id", userId)
          .eq("status", "active")
          .single();

        if (!membershipError && membershipData) {
          setCompanyMembership(membershipData as CompanyMembership);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Signed in successfully");
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      toast.success(
        "Signed up successfully! Please check your email for verification."
      );
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
      throw error;
    }
  };

  const isAgent = () => {
    return (
      profile?.role === "agent" || profile?.role === "admin" || isCompanyAgent()
    );
  };

  const isAdmin = () => {
    return profile?.role === "admin";
  };

  const isCompanyAdmin = () => {
    return companyMembership?.role === "admin";
  };

  const isCompanyManager = () => {
    return companyMembership?.role === "manager" || isCompanyAdmin();
  };

  const isCompanyAgent = () => {
    return companyMembership?.role === "agent" || isCompanyManager();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        companyMembership,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAgent,
        isAdmin,
        isCompanyAdmin,
        isCompanyManager,
        refreshProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


import { supabase } from '@/integrations/supabase/client';

export type CompanyFormData = {
  name: string;
  description?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  logoUrl?: string;
};

export type InvitationFormData = {
  email: string;
  role: 'admin' | 'manager' | 'agent' | 'employee';
};

export const createCompany = async (companyData: CompanyFormData) => {
  const { data, error } = await supabase
    .from('companies')
    .insert([
      {
        name: companyData.name,
        description: companyData.description,
        website: companyData.website,
        phone: companyData.phone,
        email: companyData.email,
        address: companyData.address,
        city: companyData.city,
        state: companyData.state,
        zip_code: companyData.zipCode,
        logo_url: companyData.logoUrl
      }
    ])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating company:', error);
    throw error;
  }
  
  return data;
};

export const fetchUserCompany = async () => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error('User not authenticated');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      company_id,
      company:companies(*)
    `)
    .eq('id', userData.user.id)
    .single();
  
  if (error) {
    console.error('Error fetching user company:', error);
    throw error;
  }
  
  return data.company;
};

export const fetchCompanyMembers = async (companyId: string) => {
  const { data, error } = await supabase
    .from('company_members')
    .select(`
      *,
      user:profiles(full_name, email, avatar_url)
    `)
    .eq('company_id', companyId)
    .eq('status', 'active');
  
  if (error) {
    console.error('Error fetching company members:', error);
    throw error;
  }
  
  return data;
};

export const inviteUser = async (companyId: string, invitationData: InvitationFormData) => {
  // Get current user for invited_by field
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error('User not authenticated');
  }

  // Generate invitation token
  const { data: tokenData, error: tokenError } = await supabase
    .rpc('generate_invitation_token');
  
  if (tokenError) {
    console.error('Error generating token:', tokenError);
    throw tokenError;
  }
  
  const token = tokenData;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days
  
  const { data, error } = await supabase
    .from('invitations')
    .insert({
      company_id: companyId,
      email: invitationData.email,
      role: invitationData.role,
      invited_by: userData.user.id,
      token: token,
      expires_at: expiresAt.toISOString()
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating invitation:', error);
    throw error;
  }
  
  return { ...data, token };
};

export const acceptInvitation = async (token: string) => {
  const { data, error } = await supabase
    .rpc('accept_invitation', { invitation_token: token });
  
  if (error) {
    console.error('Error accepting invitation:', error);
    throw error;
  }
  
  return data;
};

export const fetchPendingInvitations = async (companyId: string) => {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('company_id', companyId)
    .is('accepted_at', null)
    .gt('expires_at', new Date().toISOString());
  
  if (error) {
    console.error('Error fetching invitations:', error);
    throw error;
  }
  
  return data;
};

export const revokeInvitation = async (invitationId: string) => {
  const { error } = await supabase
    .from('invitations')
    .delete()
    .eq('id', invitationId);
  
  if (error) {
    console.error('Error revoking invitation:', error);
    throw error;
  }
  
  return true;
};

export const updateMemberRole = async (memberId: string, role: string) => {
  const { data, error } = await supabase
    .from('company_members')
    .update({ role })
    .eq('id', memberId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating member role:', error);
    throw error;
  }
  
  return data;
};

export const removeMember = async (memberId: string) => {
  const { error } = await supabase
    .from('company_members')
    .delete()
    .eq('id', memberId);
  
  if (error) {
    console.error('Error removing member:', error);
    throw error;
  }
  
  return true;
};

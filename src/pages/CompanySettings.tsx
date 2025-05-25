
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyRegistrationForm from '@/components/company/CompanyRegistrationForm';
import TeamManagement from '@/components/company/TeamManagement';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUserCompany } from '@/services/companyService';
import { Building2, Users, Settings } from 'lucide-react';

const CompanySettings = () => {
  const { user, profile, companyMembership, isCompanyAdmin } = useAuth();
  const [company, setCompany] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompany = async () => {
      if (profile?.company_id) {
        try {
          const companyData = await fetchUserCompany();
          setCompany(companyData);
        } catch (error) {
          console.error('Error loading company:', error);
        }
      }
      setIsLoading(false);
    };

    if (profile) {
      loadCompany();
    }
  }, [profile?.company_id]);

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Please log in to access company settings.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your company profile and team members
          </p>
        </div>

        {!company ? (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  No Company Found
                </CardTitle>
                <CardDescription>
                  You're not associated with any company yet. Register your company to get started.
                </CardDescription>
              </CardHeader>
            </Card>
            <CompanyRegistrationForm 
              onSuccess={() => window.location.reload()} 
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                      <CardDescription>Your company details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-medium">Name</p>
                        <p className="text-muted-foreground">{company.name}</p>
                      </div>
                      {company.description && (
                        <div>
                          <p className="font-medium">Description</p>
                          <p className="text-muted-foreground">{company.description}</p>
                        </div>
                      )}
                      {company.website && (
                        <div>
                          <p className="font-medium">Website</p>
                          <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {company.website}
                          </a>
                        </div>
                      )}
                      {company.email && (
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">{company.email}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Role</CardTitle>
                      <CardDescription>Your position in the company</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium capitalize">
                            {companyMembership?.role}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {companyMembership?.status === 'active' ? 'Active Member' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="team">
                <TeamManagement />
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Settings</CardTitle>
                    <CardDescription>
                      Manage company-wide settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isCompanyAdmin() ? (
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Company settings management will be available here.
                        </p>
                        {/* Additional company settings can be added here */}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Only company administrators can modify company settings.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySettings;

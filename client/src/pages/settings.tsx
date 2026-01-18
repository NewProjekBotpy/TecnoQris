
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Lock, User, CreditCard, Shield, Copy, Check, Eye, EyeOff, Key, BarChart3, BookOpen } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "wouter";
import type { ApiKey } from "@shared/schema";

function ApiKeyCard({ apiKey, onToggleStatus }: { apiKey: ApiKey; onToggleStatus: (id: string, isActive: number) => void }) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    toast.success("API key copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const maskedKey = apiKey.key.slice(0, 12) + "..." + apiKey.key.slice(-4);

  return (
    <div className="border rounded-xl p-4 bg-background" data-testid={`apikey-${apiKey.id}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold" data-testid={`text-apikey-name-${apiKey.id}`}>{apiKey.name}</h4>
            <Badge variant={apiKey.isActive ? "default" : "secondary"} className="text-xs">
              {apiKey.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1 truncate">
              {showKey ? apiKey.key : maskedKey}
            </code>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0"
              onClick={() => setShowKey(!showKey)}
              data-testid={`button-toggle-visibility-${apiKey.id}`}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0"
              onClick={copyKey}
              data-testid={`button-copy-apikey-${apiKey.id}`}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              <span>{(apiKey.requestCount || 0).toLocaleString()} requests</span>
            </div>
            <div>
              Created: {new Date(apiKey.createdAt).toLocaleDateString()}
            </div>
            {apiKey.lastUsed && (
              <div>
                Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch 
            checked={apiKey.isActive}
            onCheckedChange={() => onToggleStatus(apiKey.id, apiKey.isActive ? 0 : 1)}
            data-testid={`switch-status-${apiKey.id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: api.auth.getMe,
  });

  const { data: apiKeys = [] } = useQuery({
    queryKey: ["/api/api-keys"],
    queryFn: api.apiKeys.getAll,
  });

  const resetApiKeyMutation = useMutation({
    mutationFn: (mode: "sandbox" | "live") => api.apiKeys.resetKey(mode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/api-keys"] });
      toast.success("API key reset successfully!");
    },
    onError: () => {
      toast.error("Failed to reset API key");
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: number }) => 
      api.apiKeys.updateStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/api-keys"] });
      toast.success("API key status updated!");
    },
    onError: () => {
      toast.error("Failed to update API key status");
    },
  });
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold" data-testid="heading-settings">Settings</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your account preferences and security.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-secondary/50 w-full justify-start overflow-x-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-4 md:mt-6 space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6 pt-0 md:pt-0">
                <div className="flex items-center gap-4 md:gap-6">
                  <Avatar className="h-16 w-16 md:h-20 md:w-20">
                    <AvatarImage src={user?.avatar || undefined} />
                    <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" data-testid="button-change-avatar">Change Avatar</Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name} data-testid="input-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user?.email} data-testid="input-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user?.username} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue={user?.role} disabled />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 md:p-6 pt-0 md:pt-0">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4 md:mt-6 space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>Keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" />
                </div>
              </CardContent>
              <CardFooter className="p-4 md:p-6 pt-0 md:pt-0">
                <Button>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 pt-0 md:pt-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">2FA is currently disabled</p>
                    <p className="text-sm text-muted-foreground">Protect your account with an authenticator app.</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">Enable</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-4 md:mt-6">
             <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Choose what you want to be notified about.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                {[
                  "Transaction Alerts",
                  "Daily Summary",
                  "Security Alerts",
                  "Product Updates",
                  "Promotional Offers"
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label htmlFor={item} className="flex-1 cursor-pointer text-sm md:text-base">{item}</Label>
                    <Switch id={item} defaultChecked />
                  </div>
                ))}
              </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-4 md:mt-6 space-y-4 md:space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      API Keys
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Generate API keys to integrate QRIS payments into your application.
                    </CardDescription>
                  </div>
                  <Link href="/api-docs">
                    <Button variant="outline" size="sm" data-testid="button-view-docs">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View API Docs
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-4 md:p-6 pt-0 md:pt-0">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => resetApiKeyMutation.mutate("sandbox")} 
                    disabled={resetApiKeyMutation.isPending}
                    data-testid="button-reset-sandbox"
                  >
                    Reset Sandbox Key
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => resetApiKeyMutation.mutate("live")} 
                    disabled={resetApiKeyMutation.isPending}
                    data-testid="button-reset-live"
                  >
                    Reset Live Key
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {apiKeys.length > 0 ? (
                    apiKeys.map((key) => (
                      <ApiKeyCard key={key.id} apiKey={key} onToggleStatus={(id, isActive) => toggleStatusMutation.mutate({ id, isActive })} />
                    ))
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/30">
                      <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg mb-2">No API Keys Yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">API keys will be created when you register.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle>API Usage Summary</CardTitle>
                <CardDescription>Overview of your API usage across all keys</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{apiKeys.length}</p>
                    <p className="text-xs text-muted-foreground">Total Keys</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{apiKeys.filter(k => k.isActive).length}</p>
                    <p className="text-xs text-muted-foreground">Active Keys</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{apiKeys.reduce((sum, k) => sum + (k.requestCount || 0), 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Requests</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">
                      {apiKeys.some(k => k.lastUsed) 
                        ? new Date(Math.max(...apiKeys.filter(k => k.lastUsed).map(k => new Date(k.lastUsed!).getTime()))).toLocaleDateString()
                        : "Never"
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">Last Activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Key, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  BarChart3, 
  BookOpen, 
  Clock, 
  Activity,
  AlertTriangle,
  RefreshCw,
  TestTube,
  Zap,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "wouter";
import type { ApiKey } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ApiKeyCard({ 
  apiKey, 
  mode,
  onReset,
  isResetting,
  onToggleStatus,
}: { 
  apiKey: ApiKey | undefined;
  mode: "sandbox" | "live";
  onReset: () => void;
  isResetting: boolean;
  onToggleStatus: (id: string, isActive: number) => void;
}) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    toast.success("API key disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!apiKey) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">API Key Belum Tersedia</h3>
          <p className="text-sm text-muted-foreground">
            API key {mode === "sandbox" ? "Sandbox" : "Live"} akan dibuat secara otomatis saat registrasi.
          </p>
        </CardContent>
      </Card>
    );
  }

  const maskedKey = apiKey.key.slice(0, 12) + "••••••••••••" + apiKey.key.slice(-4);

  return (
    <Card className="border hover:border-primary/50 transition-colors" data-testid={`apikey-card-${mode}`}>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${apiKey.isActive === 1 ? (mode === "sandbox" ? 'bg-yellow-500/10' : 'bg-green-500/10') : 'bg-muted'}`}>
                {mode === "sandbox" ? (
                  <TestTube className={`h-5 w-5 ${apiKey.isActive === 1 ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                ) : (
                  <Zap className={`h-5 w-5 ${apiKey.isActive === 1 ? 'text-green-600' : 'text-muted-foreground'}`} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold" data-testid={`text-apikey-name-${mode}`}>
                    {mode === "sandbox" ? "Sandbox" : "Live"} Key
                  </h4>
                  <Badge 
                    variant={apiKey.isActive === 1 ? "default" : "secondary"} 
                    className={`text-xs ${apiKey.isActive === 1 ? (mode === "sandbox" ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-green-500/20 text-green-600 dark:text-green-400') : ''}`}
                  >
                    {apiKey.isActive === 1 ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Dibuat {new Date(apiKey.createdAt).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor={`status-switch-${mode}`} className="text-sm text-muted-foreground">Status</Label>
                <Switch 
                  id={`status-switch-${mode}`}
                  checked={apiKey.isActive === 1} 
                  onCheckedChange={() => onToggleStatus(apiKey.id, apiKey.isActive === 1 ? 0 : 1)}
                  data-testid={`switch-status-${mode}`}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
            <code className="text-sm font-mono flex-1 truncate" data-testid={`text-apikey-value-${mode}`}>
              {showKey ? apiKey.key : maskedKey}
            </code>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0"
              onClick={() => setShowKey(!showKey)}
              data-testid={`button-toggle-visibility-${mode}`}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 shrink-0"
              onClick={() => copyKey(apiKey.key)}
              data-testid={`button-copy-apikey-${mode}`}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Activity className="h-3 w-3" />
              </div>
              <p className="text-lg font-bold">{(apiKey.requestCount || 0).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Request</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Clock className="h-3 w-3" />
              </div>
              <p className="text-lg font-bold">
                {apiKey.lastUsed 
                  ? new Date(apiKey.lastUsed).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
                  : "-"
                }
              </p>
              <p className="text-xs text-muted-foreground">Terakhir Digunakan</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <BarChart3 className="h-3 w-3" />
              </div>
              <p className="text-lg font-bold">
                {apiKey.requestCount && apiKey.requestCount > 0 
                  ? Math.round((apiKey.requestCount || 0) / 30) 
                  : 0
                }
              </p>
              <p className="text-xs text-muted-foreground">Request/Hari</p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full" data-testid={`button-reset-apikey-${mode}`}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset {mode === "sandbox" ? "Sandbox" : "Live"} Key
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Reset {mode === "sandbox" ? "Sandbox" : "Live"} API Key?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <span className="block mb-2">
                      Tindakan ini akan mengganti API key {mode === "sandbox" ? "Sandbox" : "Live"} Anda dengan yang baru. API key lama tidak akan berfungsi lagi.
                    </span>
                    <span className="block text-yellow-600 dark:text-yellow-400 font-medium">
                      Pastikan Anda memperbarui API key di semua aplikasi yang menggunakannya.
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onReset} 
                    className="bg-primary"
                    disabled={isResetting}
                  >
                    {isResetting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Mereset...
                      </>
                    ) : (
                      "Ya, Reset API Key"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApiKeysPage() {
  const queryClient = useQueryClient();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetKey, setResetKey] = useState<string | null>(null);
  const [showResetKey, setShowResetKey] = useState(true);
  const [resetMode, setResetMode] = useState<"sandbox" | "live">("sandbox");

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ["/api/api-keys"],
    queryFn: api.apiKeys.getAll,
  });

  const sandboxKey = apiKeys?.find(k => k.mode === "sandbox");
  const liveKey = apiKeys?.find(k => k.mode === "live");

  const resetKeyMutation = useMutation({
    mutationFn: api.apiKeys.resetKey,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/api-keys"] });
      toast.success(`API key ${data.mode === "sandbox" ? "Sandbox" : "Live"} berhasil di-reset!`);
      setResetKey(data.key);
      setResetMode(data.mode as "sandbox" | "live");
      setIsResetDialogOpen(true);
    },
    onError: () => {
      toast.error("Gagal reset API key");
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: number }) => 
      api.apiKeys.updateStatus(id, isActive),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/api-keys"] });
      toast.success(`API key ${data.isActive === 1 ? 'diaktifkan' : 'dinonaktifkan'}!`);
    },
    onError: () => {
      toast.error("Gagal mengubah status API key");
    },
  });

  const handleResetKey = (mode: "sandbox" | "live") => {
    resetKeyMutation.mutate(mode);
  };

  const handleToggleStatus = (id: string, isActive: number) => {
    toggleStatusMutation.mutate({ id, isActive });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key disalin ke clipboard!");
  };

  const closeResetDialog = () => {
    setIsResetDialogOpen(false);
    setResetKey(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-3" data-testid="heading-api-keys">
              <Key className="h-7 w-7 text-primary" />
              API Keys
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Kelola API key untuk mengintegrasikan pembayaran QRIS ke aplikasi Anda.
            </p>
          </div>
          <Link href="/api-docs">
            <Button variant="outline" data-testid="button-view-docs">
              <BookOpen className="h-4 w-4 mr-2" />
              Dokumentasi API
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground mt-2">Memuat API keys...</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="sandbox" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="sandbox" className="flex items-center gap-2" data-testid="tab-sandbox">
                <TestTube className="h-4 w-4" />
                Sandbox
              </TabsTrigger>
              <TabsTrigger value="live" className="flex items-center gap-2" data-testid="tab-live">
                <Zap className="h-4 w-4" />
                Live
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sandbox">
              <div className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TestTube className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-700 dark:text-yellow-400">Mode Sandbox</h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">
                        Gunakan API key ini untuk testing dan development. Transaksi tidak akan diproses secara nyata.
                      </p>
                    </div>
                  </div>
                </div>
                <ApiKeyCard 
                  apiKey={sandboxKey}
                  mode="sandbox"
                  onReset={() => handleResetKey("sandbox")}
                  isResetting={resetKeyMutation.isPending}
                  onToggleStatus={handleToggleStatus}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="live">
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400">Mode Live</h4>
                      <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                        Gunakan API key ini untuk production. Transaksi akan diproses secara nyata.
                      </p>
                    </div>
                  </div>
                </div>
                <ApiKeyCard 
                  apiKey={liveKey}
                  mode="live"
                  onReset={() => handleResetKey("live")}
                  isResetting={resetKeyMutation.isPending}
                  onToggleStatus={handleToggleStatus}
                />
              </div>
            </TabsContent>
          </Tabs>
        )}

        <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                API Key {resetMode === "sandbox" ? "Sandbox" : "Live"} Berhasil Di-reset!
              </DialogTitle>
              <DialogDescription>
                <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  Simpan API key ini sekarang. Key tidak akan ditampilkan lagi secara lengkap.
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <Label className="text-xs text-muted-foreground">API Key Baru Anda</Label>
                <div className="flex items-center gap-2 mt-2">
                  <code className="text-sm font-mono flex-1 break-all">
                    {resetKey && (showResetKey ? resetKey : resetKey.slice(0, 12) + "••••••••••••" + resetKey.slice(-4))}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setShowResetKey(!showResetKey)}
                  >
                    {showResetKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button onClick={() => resetKey && copyKey(resetKey)} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Salin API Key
              </Button>
            </div>
            <DialogFooter className="mt-4">
              <Button onClick={closeResetDialog} className="w-full">
                Selesai
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Butuh Bantuan Integrasi?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lihat dokumentasi lengkap API untuk panduan integrasi pembayaran QRIS.
                  </p>
                </div>
              </div>
              <Link href="/api-docs">
                <Button data-testid="button-go-to-docs">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Buka Dokumentasi
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

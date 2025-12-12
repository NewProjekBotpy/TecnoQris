import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { ButtonSpinner } from "@/components/ui/spinner";
import { queryClient } from "@/lib/queryClient";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const pingCheck = await fetch('/api/ping', { 
        signal: AbortSignal.timeout(5000) 
      }).catch(() => null);
      
      if (!pingCheck || !pingCheck.ok) {
        toast({
          title: "Server Tidak Tersedia",
          description: "Server sedang cold start atau tidak dapat dijangkau. Tunggu 5 detik lalu coba lagi.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        const response = await api.auth.login({
          username: formData.username,
          password: formData.password,
        });
        const token = (response as any).token;
        if (token) {
          localStorage.setItem("auth_token", token);
        }
        queryClient.setQueryData(["/api/auth/me"], response);
        toast({
          title: "Login berhasil",
          description: "Selamat datang kembali!",
          variant: "success",
        });
      } else {
        const response = await api.auth.register({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email,
        });
        const token = (response as any).token;
        if (token) {
          localStorage.setItem("auth_token", token);
        }
        queryClient.setQueryData(["/api/auth/me"], response);
        toast({
          title: "Registrasi berhasil",
          description: "Akun Anda telah dibuat dengan data contoh.",
          variant: "success",
        });
      }
      
      setLocation("/dashboard");
    } catch (error: any) {
      
      let title = "Error";
      let description = "Terjadi kesalahan. Silakan coba lagi.";
      
      if (error?.name === 'AbortError' || error?.message?.includes('timeout') || error?.message?.includes('504') || error?.message?.includes('Request timeout')) {
        title = "Koneksi Timeout";
        description = "Server membutuhkan waktu terlalu lama untuk merespons. Coba lagi dalam beberapa saat.";
      } else if (error?.message?.includes('503') || error?.message?.includes('Service Unavailable')) {
        title = "Server Tidak Tersedia";
        description = "Server sedang sibuk atau tidak tersedia. Coba lagi dalam beberapa saat.";
      } else if (error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError')) {
        title = "Koneksi Gagal";
        description = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      } else {
        try {
          const errorText = error?.message || "";
          const jsonMatch = errorText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const errorData = JSON.parse(jsonMatch[0]);
            description = errorData.message || description;
            
            if (errorData.debug) {
              console.log("[Auth Debug]", errorData.debug);
              if (errorData.debug.steps) {
                console.log("[Auth Steps]", errorData.debug.steps.join('\n'));
              }
              if (errorData.debug.totalTime) {
                console.log("[Auth Time]", errorData.debug.totalTime + "ms");
              }
            }
          } else if (errorText.includes(":")) {
            const parts = errorText.split(":");
            if (parts.length > 1) {
              const statusCode = parts[0].trim();
              const messageText = parts.slice(1).join(":").trim();
              
              try {
                const parsed = JSON.parse(messageText);
                description = parsed.message || messageText;
                
                if (parsed.debug) {
                  console.log("[Auth Debug]", parsed.debug);
                }
              } catch {
                description = messageText || description;
              }
              
              if (statusCode === "400") {
                title = "Data Tidak Valid";
              } else if (statusCode === "401") {
                title = "Login Gagal";
              } else if (statusCode === "500") {
                title = "Kesalahan Server";
              } else if (statusCode === "504") {
                title = "Timeout";
                description = "Server membutuhkan waktu terlalu lama. Coba lagi.";
              }
            }
          }
        } catch {
          description = error?.message || description;
        }
      }
      
      toast({
        title,
        description,
        variant: "destructive",
      });
      
      console.error("[Auth Error]", {
        isLogin,
        error: error?.message,
        stack: error?.stack
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>

      <Card className="w-full max-w-md border-white/10 bg-slate-900/80 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-display text-white">
            {isLogin ? "Masuk ke TecnoQris" : "Daftar ke TecnoQris"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {isLogin 
              ? "Masukkan kredensial Anda untuk mengakses dashboard" 
              : "Buat akun baru untuk mulai menggunakan QRIS Payment Gateway"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">Nama Lengkap</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                    data-testid="input-email"
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                data-testid="input-username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 pr-10"
                  data-testid="input-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-6"
              disabled={isLoading}
              data-testid="button-submit"
            >
              {isLoading ? (
                <>
                  <ButtonSpinner className="mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  {isLogin ? "Masuk" : "Daftar"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300 px-2"
                onClick={() => setIsLogin(!isLogin)}
                data-testid="button-toggle-mode"
              >
                {isLogin ? "Daftar sekarang" : "Masuk"}
              </Button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-300 text-center">
                Saat mendaftar, akun Anda akan otomatis diisi dengan data transaksi contoh untuk demo.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

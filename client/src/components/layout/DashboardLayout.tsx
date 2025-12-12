import { Link, useLocation } from "wouter";
import { MENU_ITEMS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Bell, Search, Menu, LogOut, User, CreditCard, Settings, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { PageLoader } from "@/components/ui/spinner";
import { useState, useCallback, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";

const DEMO_NOTIFICATIONS = [
  {
    id: 1,
    type: "success",
    title: "Pembayaran Berhasil",
    message: "Transaksi Rp 150.000 dari Ahmad R. telah dikonfirmasi",
    time: "2 menit lalu",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "QR Code Baru Dibuat",
    message: "QRIS dinamis untuk invoice #INV-2024-001 telah aktif",
    time: "15 menit lalu",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Menunggu Verifikasi",
    message: "Dokumen KYC Anda sedang dalam proses review",
    time: "1 jam lalu",
    read: true,
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: api.auth.getMe,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  const handleProfileClick = useCallback(() => {
    toast({
      title: "Profile",
      description: "Profile page coming soon!",
    });
  }, [toast]);

  const handleBillingClick = useCallback(() => {
    toast({
      title: "Billing",
      description: "Billing page coming soon!",
    });
  }, [toast]);

  const handleSettingsClick = useCallback(() => {
    setLocation("/settings");
  }, [setLocation]);

  const handleLogout = useCallback(async () => {
    try {
      await api.auth.logout();
      queryClient.clear();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      setLocation("/");
    } catch (error) {
      setLocation("/");
    }
  }, [toast, setLocation]);

  const handleCloseMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const handleMarkAsRead = useCallback((id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifikasi",
      description: "Semua notifikasi telah ditandai sebagai dibaca",
    });
  }, [toast]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userInitials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 pt-12">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9 flex-shrink-0" />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-display font-bold text-gradient leading-tight">TecnoQris</h1>
            <p className="text-[10px] text-muted-foreground tracking-wider font-medium">PAYMENT GATEWAY</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={handleCloseMobile}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-150 group cursor-pointer",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-colors duration-150", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 mt-auto">
        <div className="glass-panel p-4 rounded-xl mb-4">
          <p className="text-xs text-muted-foreground mb-2">Available Balance</p>
          <p className="text-xl font-bold font-mono text-primary">Rp {(user.balance || 0).toLocaleString('id-ID')}</p>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
          data-testid="button-logout-sidebar"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="hidden lg:block w-64 border-r border-border bg-sidebar sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        <header className="h-14 md:h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="lg:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r border-border bg-sidebar" aria-describedby={undefined}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions, customers..." 
                className="pl-9 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary" data-testid="button-notifications">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                      <span className="sr-only">{unreadCount} notifikasi belum dibaca</span>
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h4 className="font-semibold text-sm">Notifikasi</h4>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-primary hover:text-primary/80 h-auto p-0"
                      onClick={handleMarkAllAsRead}
                      data-testid="button-mark-all-read"
                    >
                      Tandai semua dibaca
                    </Button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      Tidak ada notifikasi
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 cursor-pointer hover:bg-secondary/50 transition-colors",
                          !notification.read && "bg-primary/5"
                        )}
                        onClick={() => handleMarkAsRead(notification.id)}
                        data-testid={`notification-item-${notification.id}`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm font-medium", !notification.read && "text-foreground")}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 md:h-9 md:w-9 rounded-full">
                  <Avatar className="h-8 w-8 md:h-9 md:w-9 border border-border">
                    <AvatarImage src={user.avatar || undefined} alt={user.name} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleProfileClick}
                  className="cursor-pointer"
                  data-testid="dropdown-profile"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleBillingClick}
                  className="cursor-pointer"
                  data-testid="dropdown-billing"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleSettingsClick}
                  className="cursor-pointer"
                  data-testid="dropdown-settings"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer focus:text-destructive"
                  data-testid="dropdown-logout"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}

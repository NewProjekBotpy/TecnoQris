
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Wallet, Building2, MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Wallets() {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: api.auth.getMe,
  });

  const { data: wallets = [], isLoading } = useQuery({
    queryKey: ["/api/wallets"],
    queryFn: api.wallets.getAll,
  });

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold" data-testid="heading-wallets">Wallets & Cards</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your payment methods and settlement accounts.</p>
          </div>
          <Button className="w-full sm:w-auto" data-testid="button-add-method">
            <Plus className="mr-2 h-4 w-4" /> Add New Method
          </Button>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Primary Wallet Card - Gross Volume Style */}
          <div className="col-span-full lg:col-span-2 relative h-48 md:h-56 rounded-2xl bg-[#0A1628] p-6 md:p-8 text-white shadow-2xl overflow-hidden border border-slate-700/50">
            {/* Curved blue line at bottom */}
            <svg 
              className="absolute bottom-0 left-0 w-full h-16 md:h-20" 
              viewBox="0 0 400 80" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,60 Q100,20 200,40 T400,30" 
                fill="none" 
                stroke="url(#blueGradient)" 
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="relative h-full flex flex-col justify-center z-10">
              <p className="text-slate-400 font-medium mb-2 text-xs md:text-sm tracking-widest uppercase">Gross Volume</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight" data-testid="text-total-balance">
                Rp {totalBalance.toLocaleString('id-ID')}
              </h2>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="flex flex-col justify-center">
            <CardContent className="pt-6 space-y-3 md:space-y-4">
              <Button variant="outline" className="w-full h-11 md:h-12 justify-start">
                <div className="bg-primary/10 p-1.5 rounded mr-3">
                   <CreditCard className="h-4 w-4 text-primary" />
                </div>
                Top Up Balance
              </Button>
              <Button variant="outline" className="w-full h-11 md:h-12 justify-start">
                <div className="bg-green-500/10 p-1.5 rounded mr-3">
                   <Building2 className="h-4 w-4 text-green-500" />
                </div>
                Withdraw to Bank
              </Button>
              <Button variant="outline" className="w-full h-11 md:h-12 justify-start">
                <div className="bg-purple-500/10 p-1.5 rounded mr-3">
                   <Wallet className="h-4 w-4 text-purple-500" />
                </div>
                Transfer to User
              </Button>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-lg md:text-xl font-bold mt-6 md:mt-8 mb-3 md:mb-4">Linked Accounts</h3>
        <div className="grid gap-3 md:gap-4 md:grid-cols-3">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))
          ) : wallets.length > 0 ? (
            wallets.map((wallet) => (
              <Card key={wallet.id} className="group hover:border-primary/50 transition-all cursor-pointer" data-testid={`card-wallet-${wallet.id}`}>
                <CardContent className="p-4 md:pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg text-xs md:text-sm`}>
                      {wallet.type.substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm md:text-base" data-testid={`text-wallet-name-${wallet.id}`}>{wallet.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{wallet.accountNumber || 'No account'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full border-dashed border-2 p-8 text-center text-muted-foreground">
              <p>No wallets yet. Click "Add New Method" to create one.</p>
            </Card>
          )}
          
          <Card className="border-dashed hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-center min-h-[80px] md:min-h-[100px]">
             <div className="text-center text-muted-foreground">
               <Plus className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 md:mb-2 opacity-50" />
               <p className="text-xs md:text-sm font-medium">Link Bank Account</p>
             </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

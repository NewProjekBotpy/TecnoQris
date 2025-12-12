
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, DollarSign, Activity, ChevronDown, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [isTransactionsExpanded, setIsTransactionsExpanded] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'income' | 'expense'>('all');
  
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: api.auth.getMe,
  });

  const { data: transactions = [], isLoading: loadingTransactions } = useQuery({
    queryKey: ["/api/transactions"],
    queryFn: () => api.transactions.getAll(8),
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/stats"],
    queryFn: api.analytics.getStats,
  });

  const { data: wallets = [] } = useQuery({
    queryKey: ["/api/wallets"],
    queryFn: api.wallets.getAll,
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'success' && t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = transactions.length > 0 
    ? transactions.slice(0, 7).reverse().map((t, i) => ({
        name: format(new Date(t.createdAt), 'EEE'),
        total: t.amount
      }))
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6" role="main" aria-labelledby="dashboard-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 id="dashboard-heading" className="text-2xl md:text-3xl font-display font-bold" data-testid="heading-dashboard">Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground" data-testid="text-welcome" aria-live="polite">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none" data-testid="button-download">Download Report</Button>
            <Button className="flex-1 sm:flex-none" data-testid="button-withdraw">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Withdraw Funds
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatsCard 
            title="Total Revenue" 
            value={`Rp ${(totalRevenue / 1000000).toFixed(1)}M`}
            trend={stats ? `${stats.success} success` : '+0%'}
            icon={<DollarSign className="h-4 w-4 text-primary" />} 
            testId="stats-revenue"
          />
          <StatsCard 
            title="Transactions" 
            value={stats?.total.toString() || '0'}
            trend={stats ? `${stats.pending} pending` : '+0%'}
            icon={<Activity className="h-4 w-4 text-green-500" />} 
            testId="stats-transactions"
          />
          <StatsCard 
            title="Pending" 
            value={`Rp ${(pendingAmount / 1000000).toFixed(1)}M`}
            trend={stats?.pending ? `${stats.pending} orders` : 'None'}
            icon={<ArrowUpRight className="h-4 w-4 text-yellow-500" />} 
            testId="stats-pending"
          />
          <StatsCard 
            title="Active Wallets" 
            value={wallets.length.toString()}
            trend="Operational" 
            icon={<ArrowDownLeft className="h-4 w-4 text-purple-500" />} 
            testId="stats-wallets"
          />
        </div>

        {/* Collapsible Recent Transactions Preview */}
        <div role="region" aria-labelledby="preview-transactions-title">
          <div className="flex items-center justify-between mb-2">
            <h3 id="preview-transactions-title" className="text-sm font-medium text-muted-foreground">Recent Transactions</h3>
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {isTransactionsExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1 bg-secondary/30 rounded-md p-0.5"
                  >
                    <button
                      onClick={() => setTransactionFilter('all')}
                      className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                        transactionFilter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      data-testid="filter-all"
                    >
                      All
                    </button>
                    <button
                      onClick={() => setTransactionFilter('income')}
                      className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                        transactionFilter === 'income' ? 'bg-green-500 text-white' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      data-testid="filter-income"
                    >
                      Income
                    </button>
                    <button
                      onClick={() => setTransactionFilter('expense')}
                      className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                        transactionFilter === 'expense' ? 'bg-red-500 text-white' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      data-testid="filter-expense"
                    >
                      Expense
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsTransactionsExpanded(!isTransactionsExpanded)}
                className="h-6 w-6 flex items-center justify-center rounded hover:bg-secondary/50 transition-colors"
                data-testid="button-expand-transactions"
                aria-expanded={isTransactionsExpanded}
                aria-controls="transactions-list"
              >
                <motion.div
                  animate={{ rotate: isTransactionsExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </button>
            </div>
          </div>
          <div id="transactions-list">
            {loadingTransactions ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : transactions.length > 0 ? (
              <div className="relative">
                {/* Collapsed view - stacked cards */}
                {!isTransactionsExpanded && (
                  <div className="relative h-16">
                    {transactions.slice(0, 2).map((trx, index) => (
                      <div 
                        key={trx._id} 
                        className={`absolute w-full rounded-md p-2 border border-border/20 flex items-center transition-all duration-300 ${
                          index === 0 ? 'bg-[#060C18]' : 'bg-secondary/30'
                        }`}
                        style={{ 
                          top: index * 22,
                          zIndex: 2 - index,
                          opacity: index === 0 ? 1 : 0.6,
                          transform: `scale(${1 - index * 0.02})`
                        }}
                        data-testid={`preview-transaction-${trx._id}`}
                      >
                        <div className={`
                          h-6 w-6 rounded-full flex items-center justify-center border shrink-0
                          ${trx.type === 'income' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}
                        `}>
                          {trx.type === 'income' ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                        </div>
                        <div className="ml-2 overflow-hidden flex-1">
                          <p className="text-xs font-medium leading-none truncate">{trx.customer}</p>
                          <p className="text-[9px] text-muted-foreground truncate">{trx.method}</p>
                        </div>
                        <div className="ml-auto font-medium text-xs whitespace-nowrap">
                          <span className={trx.type === 'income' ? 'text-green-500' : 'text-foreground'}>
                            {trx.type === 'income' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Expanded view - all transactions with animation */}
                <AnimatePresence>
                  {isTransactionsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="space-y-2 overflow-hidden"
                    >
                      {transactions
                        .filter(trx => transactionFilter === 'all' || trx.type === transactionFilter)
                        .map((trx, index) => (
                        <motion.div 
                          key={trx._id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-secondary/30 rounded-md p-2 border border-border/20 flex items-center"
                          data-testid={`expanded-transaction-${trx._id}`}
                        >
                          <div className={`
                            h-6 w-6 rounded-full flex items-center justify-center border shrink-0
                            ${trx.type === 'income' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}
                          `}>
                            {trx.type === 'income' ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                          </div>
                          <div className="ml-2 overflow-hidden flex-1">
                            <p className="text-xs font-medium leading-none truncate">{trx.customer}</p>
                            <p className="text-[9px] text-muted-foreground truncate">{trx.method}</p>
                          </div>
                          <div className="ml-auto flex items-center gap-2">
                            <span className="text-[9px] text-muted-foreground" data-testid={`transaction-time-${trx._id}`}>
                              {new Date(trx.createdAt).toLocaleTimeString('id-ID', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                timeZone: 'Asia/Jakarta'
                              })} WIB
                            </span>
                            <span className={`font-medium text-xs whitespace-nowrap ${trx.type === 'income' ? 'text-green-500' : 'text-foreground'}`}>
                              {trx.type === 'income' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-3 text-xs">
                No transactions yet
              </div>
            )}
          </div>
        </div>

        <Card className="border-border/50 bg-secondary/20 backdrop-blur-sm" role="region" aria-labelledby="revenue-chart-title">
          <CardHeader className="p-4 md:p-6">
            <CardTitle id="revenue-chart-title" className="text-lg md:text-xl">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 md:pl-2 p-4 md:p-6 pt-0 md:pt-0">
            <div className="h-[200px] md:h-[300px] w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `Rp${value / 1000000}M`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{fill: '#1e293b'}}
                    />
                    <Bar 
                      dataKey="total" 
                      fill="currentColor" 
                      className="fill-primary" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No transaction data yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StatsCard({ title, value, trend, icon, testId }: { title: string, value: string, trend: string, icon: React.ReactNode, testId: string }) {
  return (
    <Card className="border-border/50 bg-secondary/20 backdrop-blur-sm" data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground truncate">
          {title}
        </CardTitle>
        <span aria-hidden="true">{icon}</span>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-lg md:text-2xl font-bold font-display" data-testid={`${testId}-value`}>{value}</div>
        <p className="text-[10px] md:text-xs text-muted-foreground mt-1 truncate" data-testid={`${testId}-trend`}>
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}

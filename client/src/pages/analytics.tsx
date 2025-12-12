
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { format, subDays } from "date-fns";
import { useState } from "react";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("7d");

  const { data: transactions = [] } = useQuery({
    queryKey: ["/api/transactions"],
    queryFn: () => api.transactions.getAll(),
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/stats"],
    queryFn: api.analytics.getStats,
  });

  const chartData = transactions
    .slice(0, 7)
    .reverse()
    .map((t) => ({
      name: format(new Date(t.createdAt), 'EEE'),
      total: t.amount,
    }));

  const methodCounts: { [key: string]: number } = {};
  transactions.forEach(t => {
    methodCounts[t.method] = (methodCounts[t.method] || 0) + 1;
  });

  const PIE_DATA = Object.entries(methodCounts).map(([name, value], index) => ({
    name,
    value,
    color: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][index % 5],
  }));
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold" data-testid="heading-analytics">Analytics</h1>
            <p className="text-sm md:text-base text-muted-foreground">Deep dive into your business performance.</p>
          </div>
          <Select defaultValue="7d" value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]" data-testid="select-daterange">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {/* Main Revenue Chart */}
          <Card className="md:col-span-2 border-border/50 bg-secondary/20 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Income vs Expenses over time</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
              <div className="h-[250px] md:h-[350px] w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${value/1000000}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                      itemStyle={{ color: '#fff' }}
                    />
                      <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods Distribution */}
          <Card className="border-border/50 bg-secondary/20 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Distribution of transaction types</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
              <div className="h-[250px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm mt-2 md:mt-4">
                {PIE_DATA.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products/Services (Mock) */}
          <Card className="border-border/50 bg-secondary/20 backdrop-blur-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle>Top Performance</CardTitle>
              <CardDescription>Best performing hours</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
               <div className="space-y-3 md:space-y-4">
                 {[
                   { label: "12:00 PM - 01:00 PM", value: "Rp 4.200.000", bar: "90%" },
                   { label: "06:00 PM - 07:00 PM", value: "Rp 3.800.000", bar: "75%" },
                   { label: "08:00 AM - 09:00 AM", value: "Rp 2.100.000", bar: "45%" },
                   { label: "03:00 PM - 04:00 PM", value: "Rp 1.500.000", bar: "30%" },
                 ].map((item, i) => (
                   <div key={i} className="space-y-1">
                     <div className="flex justify-between text-xs md:text-sm">
                       <span className="font-medium">{item.label}</span>
                       <span className="text-muted-foreground">{item.value}</span>
                     </div>
                     <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                       <div className="h-full bg-primary rounded-full" style={{ width: item.bar }} />
                     </div>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

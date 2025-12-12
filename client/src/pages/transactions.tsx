
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["/api/transactions"],
    queryFn: () => api.transactions.getAll(),
  });

  const filteredTransactions = transactions.filter(trx => 
    trx.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trx.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold" data-testid="heading-transactions">Transactions</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage and track your payment history.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <Button variant="outline" className="w-full sm:w-auto" data-testid="button-export">
               <Download className="mr-2 h-4 w-4" /> Export
             </Button>
          </div>
        </div>

        <Card className="bg-secondary/20 backdrop-blur-sm border-border/50">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>History</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search ID or Customer" 
                    className="pl-8 bg-background/50 h-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="input-search"
                  />
                </div>
                <Button variant="outline" size="icon" className="shrink-0 h-9 w-9" data-testid="button-filter">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 md:p-6 pt-0">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/50">
                      <TableHead className="w-[100px] text-xs md:text-sm">Transaction ID</TableHead>
                      <TableHead className="min-w-[120px] text-xs md:text-sm">Date & Time</TableHead>
                      <TableHead className="min-w-[120px] text-xs md:text-sm">Customer</TableHead>
                      <TableHead className="text-xs md:text-sm">Method</TableHead>
                      <TableHead className="text-xs md:text-sm">Amount</TableHead>
                      <TableHead className="text-xs md:text-sm">Status</TableHead>
                      <TableHead className="text-right text-xs md:text-sm">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((trx) => (
                        <TableRow key={trx._id} className="hover:bg-white/5 border-border/50 group" data-testid={`row-transaction-${trx._id}`}>
                          <TableCell className="font-mono text-[10px] md:text-xs text-muted-foreground whitespace-nowrap" data-testid={`text-trxid-${trx._id}`}>{trx.transactionId}</TableCell>
                          <TableCell className="text-xs md:text-sm whitespace-nowrap">{format(new Date(trx.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                          <TableCell className="font-medium text-xs md:text-sm whitespace-nowrap">{trx.customer}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal bg-secondary/50 text-[10px] md:text-xs whitespace-nowrap">
                              {trx.method}
                            </Badge>
                          </TableCell>
                          <TableCell className={`text-xs md:text-sm whitespace-nowrap font-medium ${trx.type === 'income' ? 'text-green-500' : 'text-foreground'}`}>
                            {trx.type === 'income' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={trx.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity" data-testid={`button-details-${trx._id}`}>
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    failed: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border whitespace-nowrap ${styles[status as keyof typeof styles]}`}>
      {label}
    </span>
  );
}

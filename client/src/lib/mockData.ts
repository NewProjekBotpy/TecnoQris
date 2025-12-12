
import { 
  LayoutDashboard, 
  CreditCard, 
  QrCode, 
  History, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Wallet,
  Bell,
  LogOut,
  Users,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  BookOpen,
  Key
} from "lucide-react";

export const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex@tecnoqris.com",
  role: "Merchant",
  balance: 12450000,
  avatar: "https://github.com/shadcn.png"
};

export const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: QrCode, label: "QR Generator", href: "/qr-generator" },
  { icon: History, label: "Transactions", href: "/transactions" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Wallet, label: "Wallets", href: "/wallets" },
  { icon: Key, label: "API Keys", href: "/api-keys" },
  { icon: BookOpen, label: "API Docs", href: "/api-docs" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const MOCK_TRANSACTIONS = [
  { id: "TRX-8821", type: "income", amount: 150000, status: "success", date: "2024-05-12 14:30", customer: "Budi Santoso", method: "QRIS" },
  { id: "TRX-8822", type: "income", amount: 25000, status: "success", date: "2024-05-12 14:35", customer: "Siti Aminah", method: "QRIS" },
  { id: "TRX-8823", type: "expense", amount: 500000, status: "pending", date: "2024-05-12 15:00", customer: "Vendor Payment", method: "Bank Transfer" },
  { id: "TRX-8824", type: "income", amount: 75000, status: "success", date: "2024-05-12 15:15", customer: "Rudi Hartono", method: "QRIS" },
  { id: "TRX-8825", type: "income", amount: 200000, status: "failed", date: "2024-05-12 15:30", customer: "Dewi Lestari", method: "E-Wallet" },
  { id: "TRX-8826", type: "income", amount: 350000, status: "success", date: "2024-05-12 16:00", customer: "Andi Pratama", method: "QRIS" },
  { id: "TRX-8827", type: "expense", amount: 125000, status: "success", date: "2024-05-12 16:30", customer: "Supplier ABC", method: "Bank Transfer" },
  { id: "TRX-8828", type: "income", amount: 450000, status: "success", date: "2024-05-12 17:00", customer: "Maya Sari", method: "E-Wallet" },
];

export const CHART_DATA = [
  { name: 'Mon', total: 1200000 },
  { name: 'Tue', total: 2100000 },
  { name: 'Wed', total: 1800000 },
  { name: 'Thu', total: 2400000 },
  { name: 'Fri', total: 3200000 },
  { name: 'Sat', total: 4500000 },
  { name: 'Sun', total: 3800000 },
];

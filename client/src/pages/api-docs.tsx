import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  Check, 
  Key, 
  Send, 
  Eye, 
  List, 
  Play, 
  Zap, 
  Shield, 
  Clock, 
  Webhook, 
  BookOpen, 
  Code2, 
  Terminal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  ExternalLink,
  BarChart3,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Link } from "wouter";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Kode disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full min-w-0 overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 shrink-0"
          onClick={handleCopy}
          data-testid={`copy-${language}`}
          title="Salin kode"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg bg-zinc-950">
        <pre className="text-zinc-100 p-4 pr-14 text-sm w-max min-w-full">
          <code className="block whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function EndpointCard({
  method,
  path,
  title,
  description,
  requestBody,
  responseExample,
  codeExamples,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  title: string;
  description: string;
  requestBody?: string;
  responseExample: string;
  codeExamples: { curl: string; javascript: string; python: string; php: string };
}) {
  const methodColors = {
    GET: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    POST: "bg-green-500/20 text-green-600 dark:text-green-400",
    PUT: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    DELETE: "bg-red-500/20 text-red-600 dark:text-red-400",
  };

  return (
    <Card className="mb-6 overflow-hidden" id={path.replace(/[/:]/g, '-')}>
      <CardHeader>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className={`font-mono ${methodColors[method]}`}>
            {method}
          </Badge>
          <code className="text-sm font-mono bg-muted px-2 py-1 rounded break-all">{path}</code>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 min-w-0">
        {requestBody && (
          <div>
            <h4 className="font-medium mb-2">Request Body</h4>
            <CodeBlock code={requestBody} language="json" />
          </div>
        )}
        
        <div>
          <h4 className="font-medium mb-2">Response Example</h4>
          <CodeBlock code={responseExample} language="json" />
        </div>

        <div className="min-w-0 overflow-hidden">
          <h4 className="font-medium mb-2">Contoh Kode</h4>
          <Tabs defaultValue="curl" className="w-full min-w-0">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="php">PHP</TabsTrigger>
            </TabsList>
            <TabsContent value="curl" className="mt-3">
              <CodeBlock code={codeExamples.curl} language="curl" />
            </TabsContent>
            <TabsContent value="javascript" className="mt-3">
              <CodeBlock code={codeExamples.javascript} language="javascript" />
            </TabsContent>
            <TabsContent value="python" className="mt-3">
              <CodeBlock code={codeExamples.python} language="python" />
            </TabsContent>
            <TabsContent value="php" className="mt-3">
              <CodeBlock code={codeExamples.php} language="php" />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApiDocsPage() {
  const { data: apiKeys = [] } = useQuery({
    queryKey: ["/api/api-keys"],
    queryFn: api.apiKeys.getAll,
  });

  const [copiedKey, setCopiedKey] = useState(false);
  const firstApiKey = apiKeys[0]?.key || "YOUR_API_KEY";
  const baseUrl = window.location.origin;

  const copyApiKey = () => {
    if (apiKeys[0]?.key) {
      navigator.clipboard.writeText(apiKeys[0].key);
      setCopiedKey(true);
      toast.success("API key disalin!");
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-3" data-testid="heading-api-docs">
              <BookOpen className="h-7 w-7 text-primary" />
              Dokumentasi API
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Panduan lengkap untuk mengintegrasikan QRIS payment gateway ke aplikasi Anda.
            </p>
          </div>
          <Link href="/api-keys">
            <Button data-testid="button-manage-keys">
              <Key className="h-4 w-4 mr-2" />
              Kelola API Keys
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Play className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Quick Start</p>
                <p className="text-xs text-muted-foreground">Mulai dalam 5 menit</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('authentication')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Key className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Authentication</p>
                <p className="text-xs text-muted-foreground">API Key setup</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('endpoints')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Code2 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Endpoints</p>
                <p className="text-xs text-muted-foreground">API reference</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('webhooks')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Webhook className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Webhooks</p>
                <p className="text-xs text-muted-foreground">Real-time updates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card id="quick-start" className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-green-500" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>
              Ikuti langkah-langkah berikut untuk mengintegrasikan QRIS payment dalam 5 menit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div className="flex-1">
                  <h4 className="font-semibold">Buat API Key</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Buka halaman <Link href="/api-keys" className="text-primary hover:underline">API Keys</Link> dan buat key baru untuk aplikasi Anda.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">Install SDK (Opsional)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Gunakan SDK resmi kami untuk integrasi yang lebih mudah, atau gunakan REST API secara langsung.
                  </p>
                  <div className="mt-2 space-y-2">
                    <CodeBlock code="npm install @tecnoqris/sdk" language="bash" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">Buat Payment Request</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Panggil endpoint create payment untuk mendapatkan QR code yang bisa di-scan pelanggan.
                  </p>
                  <div className="mt-2">
                    <CodeBlock code={`const response = await fetch("${baseUrl}/api/v1/payments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "${firstApiKey}"
  },
  body: JSON.stringify({
    external_id: "order-123",
    amount: 50000,
    description: "Pembayaran Order #123"
  })
});

const { data } = await response.json();
console.log(data.qr_string); // Tampilkan sebagai QR code`} language="javascript" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                <div className="flex-1">
                  <h4 className="font-semibold">Terima Notifikasi Pembayaran</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Setup webhook untuk menerima notifikasi real-time saat pembayaran berhasil.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="authentication" className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Authentication
            </CardTitle>
            <CardDescription>
              Semua request API memerlukan API key yang valid di header request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background rounded-lg p-4 border space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium">Header Name</span>
                <code className="text-sm bg-muted px-2 py-1 rounded font-mono w-fit">X-API-Key</code>
              </div>
              {apiKeys.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm font-medium">API Key Anda</span>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono break-all">
                      {firstApiKey.slice(0, 20)}...
                    </code>
                    <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={copyApiKey} data-testid="copy-api-key">
                      {copiedKey ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {apiKeys.length === 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    Anda belum memiliki API key
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Buat API key terlebih dahulu untuk mulai menggunakan API.
                  </p>
                  <Link href="/api-keys">
                    <Button size="sm" className="mt-3">
                      <Key className="h-4 w-4 mr-2" />
                      Buat API Key
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Contoh Request dengan Authentication</h4>
              <CodeBlock code={`curl -X GET "${baseUrl}/api/v1/payments" \\
  -H "X-API-Key: ${firstApiKey}"`} language="curl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Base URL & Versioning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Production</h4>
              <code className="text-sm bg-muted px-3 py-2 rounded block font-mono">
                {baseUrl}/api/v1
              </code>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" />
                API Versioning
              </h4>
              <p className="text-sm text-muted-foreground">
                API kami menggunakan versioning di URL. Versi saat ini adalah <code className="bg-background px-1 rounded">v1</code>. 
                Saat versi baru dirilis, versi lama akan tetap didukung selama minimal 12 bulan.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card id="rate-limits">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Rate Limits
            </CardTitle>
            <CardDescription>
              Batasan request untuk menjaga stabilitas layanan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Standard</span>
                  </div>
                  <p className="text-2xl font-bold">100</p>
                  <p className="text-xs text-muted-foreground">requests/menit</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Burst</span>
                  </div>
                  <p className="text-2xl font-bold">200</p>
                  <p className="text-xs text-muted-foreground">requests/menit (max)</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Reset</span>
                  </div>
                  <p className="text-2xl font-bold">60</p>
                  <p className="text-xs text-muted-foreground">detik</p>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Response Headers</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Setiap response akan menyertakan header berikut untuk monitoring rate limit:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 p-2 bg-background rounded">
                    <span className="font-mono">X-RateLimit-Limit</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">Batas maksimal request</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 p-2 bg-background rounded">
                    <span className="font-mono">X-RateLimit-Remaining</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">Sisa request tersedia</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 p-2 bg-background rounded">
                    <span className="font-mono">X-RateLimit-Reset</span>
                    <span className="text-muted-foreground text-xs sm:text-sm">Waktu reset (Unix timestamp)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div id="endpoints" className="space-y-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <List className="h-5 w-5" />
            API Endpoints
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Daftar lengkap endpoint yang tersedia untuk integrasi pembayaran.
          </p>
          
          <EndpointCard
            method="POST"
            path="/api/v1/payments"
            title="Create Payment"
            description="Buat request pembayaran QRIS baru. Mengembalikan QR code string yang bisa ditampilkan untuk pelanggan scan."
            requestBody={`{
  "external_id": "order-12345",
  "amount": 50000,
  "description": "Payment for Order #12345",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "expires_in_minutes": 30
}`}
            responseExample={`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "external_id": "order-12345",
    "amount": 50000,
    "description": "Payment for Order #12345",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "status": "pending",
    "qr_string": "00020101021226580016ID.CO.QRIS.WWW...",
    "expires_at": "2024-01-15T10:30:00.000Z",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}`}
            codeExamples={{
              curl: `curl -X POST "${baseUrl}/api/v1/payments" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${firstApiKey}" \\
  -d '{
    "external_id": "order-12345",
    "amount": 50000,
    "description": "Payment for Order #12345",
    "customer_name": "John Doe",
    "customer_email": "john@example.com"
  }'`,
              javascript: `const response = await fetch("${baseUrl}/api/v1/payments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "${firstApiKey}"
  },
  body: JSON.stringify({
    external_id: "order-12345",
    amount: 50000,
    description: "Payment for Order #12345",
    customer_name: "John Doe",
    customer_email: "john@example.com"
  })
});

const data = await response.json();
console.log(data);`,
              python: `import requests

response = requests.post(
    "${baseUrl}/api/v1/payments",
    headers={
        "Content-Type": "application/json",
        "X-API-Key": "${firstApiKey}"
    },
    json={
        "external_id": "order-12345",
        "amount": 50000,
        "description": "Payment for Order #12345",
        "customer_name": "John Doe",
        "customer_email": "john@example.com"
    }
)

print(response.json())`,
              php: `<?php
$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "${baseUrl}/api/v1/payments",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "X-API-Key: ${firstApiKey}"
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "external_id" => "order-12345",
        "amount" => 50000,
        "description" => "Payment for Order #12345",
        "customer_name" => "John Doe",
        "customer_email" => "john@example.com"
    ])
]);

$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response, true));`
            }}
          />

          <EndpointCard
            method="GET"
            path="/api/v1/payments"
            title="List Payments"
            description="Ambil daftar semua pembayaran. Mendukung filter berdasarkan status dan pagination."
            responseExample={`{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "external_id": "order-12345",
      "amount": 50000,
      "status": "paid",
      "created_at": "2024-01-15T10:00:00.000Z",
      "paid_at": "2024-01-15T10:05:00.000Z"
    }
  ],
  "meta": {
    "count": 1,
    "limit": 20,
    "offset": 0
  }
}`}
            codeExamples={{
              curl: `curl -X GET "${baseUrl}/api/v1/payments?limit=20&status=pending" \\
  -H "X-API-Key: ${firstApiKey}"`,
              javascript: `const response = await fetch("${baseUrl}/api/v1/payments?limit=20&status=pending", {
  method: "GET",
  headers: {
    "X-API-Key": "${firstApiKey}"
  }
});

const data = await response.json();
console.log(data);`,
              python: `import requests

response = requests.get(
    "${baseUrl}/api/v1/payments",
    headers={"X-API-Key": "${firstApiKey}"},
    params={"limit": 20, "status": "pending"}
)

print(response.json())`,
              php: `<?php
$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "${baseUrl}/api/v1/payments?limit=20&status=pending",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "X-API-Key: ${firstApiKey}"
    ]
]);

$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response, true));`
            }}
          />

          <EndpointCard
            method="GET"
            path="/api/v1/payments/:id"
            title="Get Payment Detail"
            description="Ambil detail pembayaran spesifik. Bisa menggunakan payment ID atau external_id Anda."
            responseExample={`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "external_id": "order-12345",
    "amount": 50000,
    "description": "Payment for Order #12345",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "status": "paid",
    "qr_string": "00020101021226580016ID.CO.QRIS.WWW...",
    "expires_at": "2024-01-15T10:30:00.000Z",
    "paid_at": "2024-01-15T10:05:00.000Z",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}`}
            codeExamples={{
              curl: `curl -X GET "${baseUrl}/api/v1/payments/order-12345" \\
  -H "X-API-Key: ${firstApiKey}"`,
              javascript: `const paymentId = "order-12345"; // atau gunakan payment ID

const response = await fetch(\`${baseUrl}/api/v1/payments/\${paymentId}\`, {
  method: "GET",
  headers: {
    "X-API-Key": "${firstApiKey}"
  }
});

const data = await response.json();
console.log(data);`,
              python: `import requests

payment_id = "order-12345"  # atau gunakan payment ID

response = requests.get(
    f"${baseUrl}/api/v1/payments/{payment_id}",
    headers={"X-API-Key": "${firstApiKey}"}
)

print(response.json())`,
              php: `<?php
$paymentId = "order-12345"; // atau gunakan payment ID

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "${baseUrl}/api/v1/payments/" . $paymentId,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "X-API-Key: ${firstApiKey}"
    ]
]);

$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response, true));`
            }}
          />

          <EndpointCard
            method="GET"
            path="/api/v1/payments/:id/status"
            title="Check Payment Status"
            description="Endpoint cepat untuk mengecek status pembayaran. Cocok untuk polling status."
            responseExample={`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "external_id": "order-12345",
    "status": "paid",
    "amount": 50000,
    "paid_at": "2024-01-15T10:05:00.000Z"
  }
}`}
            codeExamples={{
              curl: `curl -X GET "${baseUrl}/api/v1/payments/order-12345/status" \\
  -H "X-API-Key: ${firstApiKey}"`,
              javascript: `const paymentId = "order-12345";

const response = await fetch(\`${baseUrl}/api/v1/payments/\${paymentId}/status\`, {
  method: "GET",
  headers: {
    "X-API-Key": "${firstApiKey}"
  }
});

const data = await response.json();
console.log(data.data.status); // "pending", "paid", "expired", atau "cancelled"`,
              python: `import requests

payment_id = "order-12345"

response = requests.get(
    f"${baseUrl}/api/v1/payments/{payment_id}/status",
    headers={"X-API-Key": "${firstApiKey}"}
)

data = response.json()
print(data["data"]["status"])  # "pending", "paid", "expired", atau "cancelled"`,
              php: `<?php
$paymentId = "order-12345";

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "${baseUrl}/api/v1/payments/" . $paymentId . "/status",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "X-API-Key: ${firstApiKey}"
    ]
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
echo $data["data"]["status"]; // "pending", "paid", "expired", atau "cancelled"`
            }}
          />

          <EndpointCard
            method="POST"
            path="/api/v1/payments/:id/simulate"
            title="Simulate Payment (Testing)"
            description="Simulasikan perubahan status pembayaran untuk testing. Hanya bekerja pada pembayaran pending."
            requestBody={`{
  "status": "paid"  // Options: "paid", "expired", "cancelled"
}`}
            responseExample={`{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "external_id": "order-12345",
    "amount": 50000,
    "status": "paid",
    "paid_at": "2024-01-15T10:05:00.000Z"
  },
  "message": "Payment status updated to 'paid'"
}`}
            codeExamples={{
              curl: `curl -X POST "${baseUrl}/api/v1/payments/order-12345/simulate" \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${firstApiKey}" \\
  -d '{"status": "paid"}'`,
              javascript: `const paymentId = "order-12345";

const response = await fetch(\`${baseUrl}/api/v1/payments/\${paymentId}/simulate\`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "${firstApiKey}"
  },
  body: JSON.stringify({ status: "paid" })
});

const data = await response.json();
console.log(data);`,
              python: `import requests

payment_id = "order-12345"

response = requests.post(
    f"${baseUrl}/api/v1/payments/{payment_id}/simulate",
    headers={
        "Content-Type": "application/json",
        "X-API-Key": "${firstApiKey}"
    },
    json={"status": "paid"}
)

print(response.json())`,
              php: `<?php
$paymentId = "order-12345";

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => "${baseUrl}/api/v1/payments/" . $paymentId . "/simulate",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "X-API-Key: ${firstApiKey}"
    ],
    CURLOPT_POSTFIELDS => json_encode(["status" => "paid"])
]);

$response = curl_exec($ch);
curl_close($ch);

print_r(json_decode($response, true));`
            }}
          />
        </div>

        <Card id="webhooks" className="border-orange-500/20 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5 text-orange-500" />
              Webhooks
            </CardTitle>
            <CardDescription>
              Terima notifikasi real-time saat status pembayaran berubah.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-background rounded-lg border">
              <h4 className="font-medium mb-2">Webhook Events</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                  <Badge variant="outline" className="font-mono">payment.created</Badge>
                  <span className="text-sm text-muted-foreground">Pembayaran baru dibuat</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                  <Badge variant="outline" className="font-mono bg-green-500/10">payment.paid</Badge>
                  <span className="text-sm text-muted-foreground">Pembayaran berhasil</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                  <Badge variant="outline" className="font-mono">payment.expired</Badge>
                  <span className="text-sm text-muted-foreground">Pembayaran kadaluarsa</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                  <Badge variant="outline" className="font-mono">payment.cancelled</Badge>
                  <span className="text-sm text-muted-foreground">Pembayaran dibatalkan</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Webhook Payload Example</h4>
              <CodeBlock code={`{
  "event": "payment.paid",
  "timestamp": "2024-01-15T10:05:00.000Z",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "external_id": "order-12345",
    "amount": 50000,
    "status": "paid",
    "paid_at": "2024-01-15T10:05:00.000Z"
  },
  "signature": "sha256=abc123..."
}`} language="json" />
            </div>

            <div>
              <h4 className="font-medium mb-2">Verifikasi Signature</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Selalu verifikasi signature webhook untuk memastikan request berasal dari TecnoQris.
              </p>
              <CodeBlock code={`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = 'sha256=' + 
    crypto.createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Handler untuk webhook
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  
  if (!verifyWebhook(req.body, signature, WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  const { event, data } = req.body;
  
  switch (event) {
    case 'payment.paid':
      // Update order status di database Anda
      console.log('Payment successful:', data.external_id);
      break;
    // Handle events lainnya...
  }
  
  res.json({ received: true });
});`} language="javascript" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Codes</CardTitle>
            <CardDescription>Daftar kode error yang mungkin dikembalikan oleh API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { code: "MISSING_API_KEY", description: "Header X-API-Key tidak disertakan", status: "401" },
                { code: "INVALID_API_KEY", description: "API key yang diberikan tidak valid", status: "401" },
                { code: "INACTIVE_API_KEY", description: "API key sudah dinonaktifkan", status: "403" },
                { code: "RATE_LIMIT_EXCEEDED", description: "Terlalu banyak request, coba lagi nanti", status: "429" },
                { code: "VALIDATION_ERROR", description: "Validasi request body gagal", status: "400" },
                { code: "DUPLICATE_EXTERNAL_ID", description: "Pembayaran dengan external_id ini sudah ada", status: "409" },
                { code: "PAYMENT_NOT_FOUND", description: "Pembayaran tidak ditemukan", status: "404" },
                { code: "FORBIDDEN", description: "Anda tidak memiliki akses ke resource ini", status: "403" },
                { code: "INVALID_STATUS", description: "Tidak dapat melakukan aksi pada status saat ini", status: "400" },
                { code: "INTERNAL_ERROR", description: "Terjadi kesalahan internal pada server", status: "500" },
              ].map((error) => (
                <div key={error.code} className="flex items-start gap-4 p-3 border rounded-lg" data-testid={`error-${error.code}`}>
                  <Badge variant="outline" className={`shrink-0 ${
                    error.status.startsWith('4') ? 'border-yellow-500 text-yellow-600' : 
                    error.status.startsWith('5') ? 'border-red-500 text-red-600' : ''
                  }`}>
                    {error.status}
                  </Badge>
                  <div>
                    <code className="text-sm font-mono font-medium">{error.code}</code>
                    <p className="text-sm text-muted-foreground mt-1">{error.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status Values</CardTitle>
            <CardDescription>Nilai status yang mungkin untuk pembayaran</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { status: "pending", description: "Menunggu pembayaran dari pelanggan", color: "bg-yellow-500", icon: Clock },
                { status: "paid", description: "Pembayaran berhasil", color: "bg-green-500", icon: CheckCircle },
                { status: "expired", description: "Pembayaran kadaluarsa sebelum dibayar", color: "bg-gray-500", icon: Clock },
                { status: "cancelled", description: "Pembayaran dibatalkan", color: "bg-red-500", icon: XCircle },
              ].map((item) => (
                <div key={item.status} className="flex items-center gap-3 p-4 border rounded-lg" data-testid={`status-${item.status}`}>
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <code className="text-sm font-mono font-medium">{item.status}</code>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  <item.icon className={`h-5 w-5 ${
                    item.status === 'paid' ? 'text-green-500' : 
                    item.status === 'cancelled' ? 'text-red-500' : 'text-muted-foreground'
                  }`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Butuh Bantuan?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Hubungi tim teknis kami untuk bantuan integrasi atau pertanyaan lainnya.
                  </p>
                </div>
              </div>
              <Button variant="outline">
                Hubungi Support
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

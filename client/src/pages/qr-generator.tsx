
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Copy, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function QrGenerator() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const queryClient = useQueryClient();

  const { data: qrCodes = [] } = useQuery({
    queryKey: ["/api/qr-codes"],
    queryFn: api.qrCodes.getAll,
  });

  const createQrMutation = useMutation({
    mutationFn: api.qrCodes.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/qr-codes"] });
      toast.success("QR Code generated successfully!");
      setIsGenerated(true);
    },
    onError: () => {
      toast.error("Failed to generate QR code");
    },
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const qrData = `QRIS:${name}:${amount}:${Date.now()}`;
    createQrMutation.mutate({
      name,
      amount: parseInt(amount),
      description,
      qrData,
      isActive: 1,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold" data-testid="heading-qr">QR Generator</h1>
          <p className="text-sm md:text-base text-muted-foreground">Create dynamic QRIS codes for instant payments.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <Card className="h-fit">
            <CardHeader className="p-4 md:p-6">
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter the transaction details below.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">QR Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Store Payment" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-testid="input-qr-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (IDR)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">Rp</span>
                    <Input 
                      id="amount" 
                      placeholder="0" 
                      className="pl-9" 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      data-testid="input-qr-amount"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input 
                    id="description" 
                    placeholder="e.g. Invoice #1234" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    data-testid="input-qr-description"
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full h-11 text-base shadow-lg shadow-primary/20"
                    disabled={createQrMutation.isPending}
                    data-testid="button-generate-qr"
                  >
                    <QrCode className="mr-2 h-4 w-4" /> 
                    {createQrMutation.isPending ? 'Generating...' : 'Generate QR Code'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className={`border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-6 md:p-12 text-center min-h-[300px] md:min-h-[400px] ${isGenerated ? 'border-primary bg-primary/5' : 'border-border'}`}>
              
              {isGenerated ? (
                <div className="space-y-6 animate-in zoom-in-50 duration-500 w-full">
                  <div className="bg-white p-4 rounded-xl shadow-xl mx-auto w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Mock QR Code Visual */}
                    <div className="w-full h-full bg-black relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-2">
                        {[...Array(36)].map((_, i) => (
                          <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-0' : 'opacity-100'}`} />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-white p-2 rounded-lg">
                           <div className="bg-primary h-6 w-6 md:h-8 md:w-8 rounded flex items-center justify-center text-white font-bold text-xs md:text-base">Q</div>
                         </div>
                      </div>
                      {/* Corner markers */}
                      <div className="absolute top-2 left-2 w-8 h-8 md:w-12 md:h-12 border-4 border-white bg-black">
                        <div className="absolute inset-1.5 md:inset-2 bg-white" />
                      </div>
                      <div className="absolute top-2 right-2 w-8 h-8 md:w-12 md:h-12 border-4 border-white bg-black">
                         <div className="absolute inset-1.5 md:inset-2 bg-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 w-8 h-8 md:w-12 md:h-12 border-4 border-white bg-black">
                         <div className="absolute inset-1.5 md:inset-2 bg-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-display">Rp {parseInt(amount || "0").toLocaleString('id-ID')}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Scan to pay via QRIS</p>
                  </div>

                  <div className="flex gap-2 justify-center flex-wrap">
                    <Button variant="outline" size="sm" className="h-8 md:h-9 text-xs md:text-sm"><Copy className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Copy Link</Button>
                    <Button variant="outline" size="sm" className="h-8 md:h-9 text-xs md:text-sm"><Download className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Save</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9"><Share2 className="h-3 w-3 md:h-4 md:w-4" /></Button>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground space-y-4">
                  <div className="h-16 w-16 md:h-24 md:w-24 rounded-2xl bg-secondary mx-auto flex items-center justify-center">
                    <QrCode className="h-8 w-8 md:h-10 md:w-10 opacity-50" />
                  </div>
                  <p className="text-sm md:text-base">Enter payment details to generate a QR code</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

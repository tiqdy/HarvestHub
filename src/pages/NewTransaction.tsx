import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Check,
  ClipboardList,
  User,
  MapPin,
  Truck,
  Package,
  Calendar,
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  petaniData,
  lahanData,
  komoditasData,
  formatCurrency,
  formatDate,
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface CommodityItem {
  id: string;
  kodeKomoditas: string;
  berat: number;
}

const NewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  // Step 1: Transaction Info
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedPetani, setSelectedPetani] = useState('');
  const [selectedLahan, setSelectedLahan] = useState('');
  const [namaPengepul, setNamaPengepul] = useState('');

  // Step 2: Commodities
  const [commodities, setCommodities] = useState<CommodityItem[]>([
    { id: '1', kodeKomoditas: '', berat: 0 },
  ]);

  // Generate transaction number
  const transactionNo = `TRX-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;

  const addCommodity = () => {
    setCommodities([
      ...commodities,
      { id: String(Date.now()), kodeKomoditas: '', berat: 0 },
    ]);
  };

  const removeCommodity = (id: string) => {
    if (commodities.length > 1) {
      setCommodities(commodities.filter((c) => c.id !== id));
    }
  };

  const updateCommodity = (id: string, field: 'kodeKomoditas' | 'berat', value: string | number) => {
    setCommodities(
      commodities.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculateSubtotal = (kodeKomoditas: string, berat: number) => {
    const komoditas = komoditasData.find((k) => k.kodeKomoditas === kodeKomoditas);
    return komoditas ? berat * komoditas.hargaSatuan : 0;
  };

  const calculateTotal = () => {
    return commodities.reduce(
      (sum, c) => sum + calculateSubtotal(c.kodeKomoditas, c.berat),
      0
    );
  };

  const validateStep1 = () => {
    if (!transactionDate || !selectedPetani || !selectedLahan || !namaPengepul.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all transaction information fields',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const validCommodities = commodities.filter(
      (c) => c.kodeKomoditas && c.berat > 0
    );
    if (validCommodities.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please add at least one commodity with weight',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: 'Transaction Saved',
      description: `Transaction ${transactionNo} has been created successfully`,
    });
    navigate('/transactions');
  };

  const petani = petaniData.find((p) => p.kodePetani === selectedPetani);
  const lahan = lahanData.find((l) => l.kodeLahan === selectedLahan);

  return (
    <div>
      <PageHeader
        title="New Transaction"
        subtitle="Record a new harvest transaction"
        action={
          <Button variant="outline" onClick={() => navigate('/transactions')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </Button>
        }
      />

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <motion.div
              animate={{
                backgroundColor: step >= s ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                scale: step === s ? 1.1 : 1,
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= s ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </motion.div>
            {s < 3 && (
              <motion.div
                animate={{
                  backgroundColor: step > s ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                }}
                className="w-16 h-1 mx-2 rounded-full"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <p className="text-sm text-muted-foreground">
          Step {step} of 3:{' '}
          {step === 1 ? 'Transaction Info' : step === 2 ? 'Add Commodities' : 'Confirmation'}
        </p>
      </div>

      {/* Form Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-3xl mx-auto"
      >
        {/* Step 1: Transaction Info */}
        {step === 1 && (
          <div className="card-harvest p-8">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="w-6 h-6 text-primary" />
              <h2 className="font-display text-xl font-semibold">Transaction Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Transaction Number</Label>
                <Input value={transactionNo} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Auto-generated</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  className="input-harvest"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="petani">
                  <User className="w-4 h-4 inline mr-2" />
                  Farmer
                </Label>
                <Select value={selectedPetani} onValueChange={setSelectedPetani}>
                  <SelectTrigger className="input-harvest">
                    <SelectValue placeholder="Select farmer" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    {petaniData.map((p) => (
                      <SelectItem key={p.kodePetani} value={p.kodePetani}>
                        {p.namaPetani} ({p.kodePetani})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lahan">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Land Area
                </Label>
                <Select value={selectedLahan} onValueChange={setSelectedLahan}>
                  <SelectTrigger className="input-harvest">
                    <SelectValue placeholder="Select land area" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    {lahanData.map((l) => (
                      <SelectItem key={l.kodeLahan} value={l.kodeLahan}>
                        {l.kodeLahan} - {l.lokasiLahan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pengepul">
                  <Truck className="w-4 h-4 inline mr-2" />
                  Collector Name
                </Label>
                <Input
                  id="pengepul"
                  placeholder="Enter collector/buyer name"
                  value={namaPengepul}
                  onChange={(e) => setNamaPengepul(e.target.value)}
                  className="input-harvest"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Commodities */}
        {step === 2 && (
          <div className="card-harvest p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                <h2 className="font-display text-xl font-semibold">Add Commodities</h2>
              </div>
              <Button onClick={addCommodity} variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {commodities.map((commodity, index) => {
                  const subtotal = calculateSubtotal(commodity.kodeKomoditas, commodity.berat);
                  return (
                    <motion.div
                      key={commodity.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {index + 1}
                        </span>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Commodity</Label>
                            <Select
                              value={commodity.kodeKomoditas}
                              onValueChange={(v) => updateCommodity(commodity.id, 'kodeKomoditas', v)}
                            >
                              <SelectTrigger className="input-harvest">
                                <SelectValue placeholder="Select commodity" />
                              </SelectTrigger>
                              <SelectContent className="bg-popover border border-border">
                                {komoditasData.map((k) => (
                                  <SelectItem key={k.kodeKomoditas} value={k.kodeKomoditas}>
                                    {k.namaKomoditas} - {formatCurrency(k.hargaSatuan)}/kg
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Weight (kg)</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={commodity.berat || ''}
                              onChange={(e) =>
                                updateCommodity(
                                  commodity.id,
                                  'berat',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="input-harvest"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Subtotal</Label>
                            <div className="h-10 px-3 flex items-center rounded-lg bg-success/10 text-success font-semibold">
                              {formatCurrency(subtotal)}
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCommodity(commodity.id)}
                          disabled={commodities.length === 1}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-display font-bold text-primary">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="card-harvest p-8">
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-6 h-6 text-success" />
              <h2 className="font-display text-xl font-semibold">Confirm Transaction</h2>
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30">
                <div>
                  <p className="text-sm text-muted-foreground">Transaction No</p>
                  <p className="font-semibold">{transactionNo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{formatDate(transactionDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Farmer</p>
                  <p className="font-semibold">{petani?.namaPetani}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Land Area</p>
                  <p className="font-semibold">{lahan?.kodeLahan}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Collector</p>
                  <p className="font-semibold">{namaPengepul}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold mb-3">Commodities</h3>
                <div className="space-y-2">
                  {commodities
                    .filter((c) => c.kodeKomoditas && c.berat > 0)
                    .map((c) => {
                      const komoditas = komoditasData.find(
                        (k) => k.kodeKomoditas === c.kodeKomoditas
                      );
                      return (
                        <div
                          key={c.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                        >
                          <div>
                            <p className="font-medium">{komoditas?.namaKomoditas}</p>
                            <p className="text-sm text-muted-foreground">
                              {c.berat.toLocaleString()} kg × {formatCurrency(komoditas?.hargaSatuan || 0)}
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatCurrency(calculateSubtotal(c.kodeKomoditas, c.berat))}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Total */}
              <div className="p-4 rounded-xl bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Grand Total</span>
                  <span className="text-3xl font-display font-bold">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="max-w-3xl mx-auto mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {step < 3 ? (
          <Button onClick={handleNext} className="btn-harvest gap-2">
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="btn-harvest gap-2">
            <Check className="w-4 h-4" />
            Save Transaction
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewTransaction;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, MapPin, Truck, Package } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import {
  transaksiData,
  getPetaniByKode,
  getLahanByKode,
  getDetailsByTransaksi,
  getKomoditasByKode,
  formatDate,
  formatCurrency,
} from '@/data/mockData';

const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const transaction = transaksiData.find((t) => t.noTransaksi === id);

  if (!transaction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold mb-4">Transaction not found</h2>
        <Button onClick={() => navigate('/transactions')} variant="outline">
          Back to Transactions
        </Button>
      </div>
    );
  }

  const petani = getPetaniByKode(transaction.kodePetani);
  const lahan = getLahanByKode(transaction.kodeLahan);
  const details = getDetailsByTransaksi(transaction.noTransaksi);

  const items = details.map((d) => {
    const komoditas = getKomoditasByKode(d.kodeKomoditas);
    return {
      ...d,
      namaKomoditas: komoditas?.namaKomoditas || 'Unknown',
      hargaSatuan: komoditas?.hargaSatuan || 0,
      subtotal: d.berat * (komoditas?.hargaSatuan || 0),
    };
  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div>
      <PageHeader
        title={`Transaction ${transaction.noTransaksi}`}
        subtitle="Harvest transaction details"
        action={
          <Button
            variant="outline"
            onClick={() => navigate('/transactions')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        }
      />

      {/* Transaction Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-harvest p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Date</span>
          </div>
          <p className="font-semibold text-lg">{formatDate(transaction.tanggal)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-harvest p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Farmer</span>
          </div>
          <p className="font-semibold text-lg">{petani?.namaPetani || 'Unknown'}</p>
          <p className="text-sm text-muted-foreground">{petani?.alamatPetani}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-harvest p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">Land Area</span>
          </div>
          <p className="font-semibold text-lg">{lahan?.kodeLahan || 'Unknown'}</p>
          <p className="text-sm text-muted-foreground">{lahan?.lokasiLahan}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-harvest p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-5 h-5 text-secondary-foreground" />
            <span className="text-sm text-muted-foreground">Collector</span>
          </div>
          <p className="font-semibold text-lg">{transaction.namaPengepul}</p>
        </motion.div>
      </div>

      {/* Transaction Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-harvest overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-semibold">Transaction Items</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-harvest">
            <thead>
              <tr>
                <th>Commodity Code</th>
                <th>Commodity</th>
                <th className="text-right">Weight (kg)</th>
                <th className="text-right">Price/kg</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <motion.tr
                  key={item.kodeKomoditas}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="font-medium text-primary">{item.kodeKomoditas}</td>
                  <td>{item.namaKomoditas}</td>
                  <td className="text-right">{item.berat.toLocaleString()}</td>
                  <td className="text-right text-muted-foreground">
                    {formatCurrency(item.hargaSatuan)}
                  </td>
                  <td className="text-right font-semibold">{formatCurrency(item.subtotal)}</td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted/30">
                <td colSpan={4} className="text-right font-display font-semibold text-lg">
                  Total
                </td>
                <td className="text-right font-display font-bold text-xl text-primary">
                  {formatCurrency(total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionDetail;

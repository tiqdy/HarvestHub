import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Eye, FileText } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  transaksiData,
  getPetaniByKode,
  getLahanByKode,
  getDetailsByTransaksi,
  getKomoditasByKode,
  formatDate,
  formatCurrency,
} from '@/data/mockData';

interface TransactionSummary {
  noTransaksi: string;
  tanggal: string;
  namaPetani: string;
  kodeLahan: string;
  namaPengepul: string;
  itemCount: number;
  total: number;
}

const TransactionsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Build transaction summaries
  const transactions: TransactionSummary[] = transaksiData.map((t) => {
    const petani = getPetaniByKode(t.kodePetani);
    const details = getDetailsByTransaksi(t.noTransaksi);
    const total = details.reduce((sum, d) => {
      const komoditas = getKomoditasByKode(d.kodeKomoditas);
      return sum + (komoditas ? d.berat * komoditas.hargaSatuan : 0);
    }, 0);

    return {
      noTransaksi: t.noTransaksi,
      tanggal: t.tanggal,
      namaPetani: petani?.namaPetani || 'Unknown',
      kodeLahan: t.kodeLahan,
      namaPengepul: t.namaPengepul,
      itemCount: details.length,
      total,
    };
  });

  const filteredTransactions = transactions.filter(
    (t) =>
      t.noTransaksi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.namaPetani.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.namaPengepul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'noTransaksi',
      header: 'Transaction ID',
      render: (item: TransactionSummary) => (
        <span className="font-medium text-primary">{item.noTransaksi}</span>
      ),
    },
    {
      key: 'tanggal',
      header: 'Date',
      render: (item: TransactionSummary) => (
        <span className="text-muted-foreground">{formatDate(item.tanggal)}</span>
      ),
    },
    {
      key: 'namaPetani',
      header: 'Farmer',
      render: (item: TransactionSummary) => <span>{item.namaPetani}</span>,
    },
    {
      key: 'namaPengepul',
      header: 'Collector',
      render: (item: TransactionSummary) => (
        <span className="text-muted-foreground">{item.namaPengepul}</span>
      ),
    },
    {
      key: 'itemCount',
      header: 'Items',
      render: (item: TransactionSummary) => (
        <span className="badge-success">{item.itemCount} commodity</span>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (item: TransactionSummary) => (
        <span className="font-semibold">{formatCurrency(item.total)}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (item: TransactionSummary) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/transactions/${item.noTransaksi}`);
          }}
          className="text-muted-foreground hover:text-primary"
        >
          <Eye className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="View and manage harvest transactions"
        action={
          <Button
            onClick={() => navigate('/transactions/new')}
            className="btn-harvest gap-2"
          >
            <Plus className="w-4 h-4" />
            New Transaction
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-harvest p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-display font-bold">{transactions.length}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-harvest p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-display font-bold">
              {formatCurrency(transactions.reduce((s, t) => s + t.total, 0))}
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-harvest p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Value</p>
            <p className="text-2xl font-display font-bold">
              {formatCurrency(
                transactions.reduce((s, t) => s + t.total, 0) / transactions.length
              )}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-harvest"
          />
        </div>
      </motion.div>

      {/* Data Table */}
      <DataTable
        data={filteredTransactions}
        columns={columns}
        onRowClick={(item) => navigate(`/transactions/${item.noTransaksi}`)}
        emptyMessage="No transactions found."
      />
    </div>
  );
};

export default TransactionsList;

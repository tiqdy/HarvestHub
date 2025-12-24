import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
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
  komoditasData,
  getFullTransaksiReport,
  formatCurrency,
  formatDate,
  FullTransaksi,
} from '@/data/mockData';

const Reports: React.FC = () => {
  const fullReport = getFullTransaksiReport();

  // Filters
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedPetani, setSelectedPetani] = useState('all');
  const [selectedKomoditas, setSelectedKomoditas] = useState('all');

  const filteredData = useMemo(() => {
    return fullReport.filter((item) => {
      if (dateFrom && item.tanggal < dateFrom) return false;
      if (dateTo && item.tanggal > dateTo) return false;
      if (selectedPetani !== 'all' && item.namaPetani !== selectedPetani) return false;
      if (selectedKomoditas !== 'all' && item.namaKomoditas !== selectedKomoditas) return false;
      return true;
    });
  }, [fullReport, dateFrom, dateTo, selectedPetani, selectedKomoditas]);

  const totalRevenue = filteredData.reduce((sum, item) => sum + item.subtotal, 0);
  const totalWeight = filteredData.reduce((sum, item) => sum + item.berat, 0);

  const columns = [
    {
      key: 'noTransaksi',
      header: 'Transaction ID',
      render: (item: FullTransaksi) => (
        <span className="font-medium text-primary">{item.noTransaksi}</span>
      ),
    },
    {
      key: 'tanggal',
      header: 'Date',
      render: (item: FullTransaksi) => (
        <span className="text-muted-foreground">{formatDate(item.tanggal)}</span>
      ),
    },
    {
      key: 'namaPetani',
      header: 'Farmer',
    },
    {
      key: 'kodeLahan',
      header: 'Land',
      render: (item: FullTransaksi) => (
        <span className="text-muted-foreground">{item.kodeLahan}</span>
      ),
    },
    {
      key: 'namaKomoditas',
      header: 'Commodity',
      render: (item: FullTransaksi) => (
        <span className="badge-success">{item.namaKomoditas}</span>
      ),
    },
    {
      key: 'berat',
      header: 'Weight',
      className: 'text-right',
      render: (item: FullTransaksi) => <span>{item.berat.toLocaleString()} kg</span>,
    },
    {
      key: 'hargaSatuan',
      header: 'Price/kg',
      className: 'text-right',
      render: (item: FullTransaksi) => (
        <span className="text-muted-foreground">{formatCurrency(item.hargaSatuan)}</span>
      ),
    },
    {
      key: 'subtotal',
      header: 'Subtotal',
      className: 'text-right',
      render: (item: FullTransaksi) => (
        <span className="font-semibold">{formatCurrency(item.subtotal)}</span>
      ),
    },
  ];

  const handleClearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedPetani('all');
    setSelectedKomoditas('all');
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate and analyze harvest transaction reports"
        action={
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        }
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-harvest p-6 mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label>Date From</Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input-harvest"
            />
          </div>

          <div className="space-y-2">
            <Label>Date To</Label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input-harvest"
            />
          </div>

          <div className="space-y-2">
            <Label>Farmer</Label>
            <Select value={selectedPetani} onValueChange={setSelectedPetani}>
              <SelectTrigger className="input-harvest">
                <SelectValue placeholder="All farmers" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border">
                <SelectItem value="all">All Farmers</SelectItem>
                {petaniData.map((p) => (
                  <SelectItem key={p.kodePetani} value={p.namaPetani}>
                    {p.namaPetani}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Commodity</Label>
            <Select value={selectedKomoditas} onValueChange={setSelectedKomoditas}>
              <SelectTrigger className="input-harvest">
                <SelectValue placeholder="All commodities" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border">
                <SelectItem value="all">All Commodities</SelectItem>
                {komoditasData.map((k) => (
                  <SelectItem key={k.kodeKomoditas} value={k.namaKomoditas}>
                    {k.namaKomoditas}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>&nbsp;</Label>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-harvest p-5"
        >
          <p className="text-sm text-muted-foreground mb-1">Total Records</p>
          <p className="text-3xl font-display font-bold text-foreground">
            {filteredData.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-harvest p-5"
        >
          <p className="text-sm text-muted-foreground mb-1">Total Weight</p>
          <p className="text-3xl font-display font-bold text-foreground">
            {totalWeight.toLocaleString()} <span className="text-lg">kg</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-harvest p-5 bg-primary/5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-display font-bold text-primary">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        emptyMessage="No transactions match your filters."
      />

      {/* Footer Summary */}
      {filteredData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 rounded-xl bg-muted/50 border border-border"
        >
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredData.length} of {fullReport.length} records
            </p>
            <p className="font-display font-bold text-lg">
              Grand Total: <span className="text-primary">{formatCurrency(totalRevenue)}</span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Reports;

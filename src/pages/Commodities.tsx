import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit2, Trash2, Wheat } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import FormModal from '@/components/ui/FormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { komoditasData, Komoditas, formatCurrency } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Commodities: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [commodities, setCommodities] = useState<Komoditas[]>(komoditasData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommodity, setEditingCommodity] = useState<Komoditas | null>(null);
  const [formData, setFormData] = useState({ name: '', price: '' });

  const filteredCommodities = commodities.filter(
    (c) =>
      c.namaKomoditas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.kodeKomoditas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (commodity?: Komoditas) => {
    if (commodity) {
      setEditingCommodity(commodity);
      setFormData({ name: commodity.namaKomoditas, price: String(commodity.hargaSatuan) });
    } else {
      setEditingCommodity(null);
      setFormData({ name: '', price: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid price',
        variant: 'destructive',
      });
      return;
    }

    if (editingCommodity) {
      setCommodities(
        commodities.map((c) =>
          c.kodeKomoditas === editingCommodity.kodeKomoditas
            ? { ...c, namaKomoditas: formData.name, hargaSatuan: price }
            : c
        )
      );
      toast({
        title: 'Commodity Updated',
        description: `${formData.name} has been updated successfully`,
      });
    } else {
      const newKode = `K-0${commodities.length + 1}`;
      setCommodities([
        ...commodities,
        {
          kodeKomoditas: newKode,
          namaKomoditas: formData.name,
          hargaSatuan: price,
        },
      ]);
      toast({
        title: 'Commodity Added',
        description: `${formData.name} has been added successfully`,
      });
    }

    setIsModalOpen(false);
    setFormData({ name: '', price: '' });
    setEditingCommodity(null);
  };

  const handleDelete = (commodity: Komoditas) => {
    setCommodities(commodities.filter((c) => c.kodeKomoditas !== commodity.kodeKomoditas));
    toast({
      title: 'Commodity Deleted',
      description: `${commodity.namaKomoditas} has been removed`,
    });
  };

  const columns = [
    {
      key: 'kodeKomoditas',
      header: 'Code',
      render: (item: Komoditas) => (
        <span className="font-medium text-primary">{item.kodeKomoditas}</span>
      ),
    },
    {
      key: 'namaKomoditas',
      header: 'Commodity',
      render: (item: Komoditas) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <Wheat className="w-4 h-4 text-secondary-foreground" />
          </div>
          <span className="font-medium">{item.namaKomoditas}</span>
        </div>
      ),
    },
    {
      key: 'hargaSatuan',
      header: 'Price per kg',
      render: (item: Komoditas) => (
        <span className="font-semibold text-success">{formatCurrency(item.hargaSatuan)}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Komoditas) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(item);
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item);
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Commodities"
        subtitle="Manage agricultural commodities and pricing"
        action={
          <Button onClick={() => handleOpenModal()} className="btn-harvest gap-2">
            <Plus className="w-4 h-4" />
            Add Commodity
          </Button>
        }
      />

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search commodities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-harvest"
          />
        </div>
      </motion.div>

      {/* Data Table */}
      <DataTable
        data={filteredCommodities}
        columns={columns}
        emptyMessage="No commodities found. Add your first commodity to get started."
      />

      {/* Floating Add Button (Mobile) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleOpenModal()}
        className="floating-btn lg:hidden text-primary-foreground"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCommodity ? 'Edit Commodity' : 'Add New Commodity'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Commodity Name</Label>
            <Input
              id="name"
              placeholder="e.g., Padi Ciherang"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-harvest"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price per kg (IDR)</Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g., 5000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input-harvest"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 btn-harvest">
              {editingCommodity ? 'Update' : 'Add'} Commodity
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default Commodities;

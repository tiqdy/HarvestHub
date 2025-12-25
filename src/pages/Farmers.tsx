import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit2, Trash2, User } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import FormModal from '@/components/ui/FormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { petaniData, Petani } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Farmers: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [farmers, setFarmers] = useState<Petani[]>(petaniData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<Petani | null>(null);
  const [formData, setFormData] = useState({ name: '', address: '' });

  const filteredFarmers = farmers.filter(
    (f) =>
      f.namaPetani.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.alamatPetani.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.kodePetani.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (farmer?: Petani) => {
    if (farmer) {
      setEditingFarmer(farmer);
      setFormData({ name: farmer.namaPetani, address: farmer.alamatPetani });
    } else {
      setEditingFarmer(null);
      setFormData({ name: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.address.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Check for duplicate names (excluding current farmer when editing)
    const isDuplicate = farmers.some(
      (f) =>
        f.namaPetani.toLowerCase() === formData.name.toLowerCase() &&
        f.kodePetani !== editingFarmer?.kodePetani
    );

    if (isDuplicate) {
      toast({
        title: 'Duplicate Entry',
        description: 'A farmer with this name already exists',
        variant: 'destructive',
      });
      return;
    }

    if (editingFarmer) {
      setFarmers(
        farmers.map((f) =>
          f.kodePetani === editingFarmer.kodePetani
            ? { ...f, namaPetani: formData.name, alamatPetani: formData.address }
            : f
        )
      );
      toast({
        title: 'Farmer Updated',
        description: `${formData.name} has been updated successfully`,
      });
    } else {
      const newKode = `PTN-${String(farmers.length + 1).padStart(3, '0')}`;
      setFarmers([
        ...farmers,
        {
          kodePetani: newKode,
          namaPetani: formData.name,
          alamatPetani: formData.address,
        },
      ]);
      toast({
        title: 'Farmer Added',
        description: `${formData.name} has been added successfully`,
      });
    }

    setIsModalOpen(false);
    setFormData({ name: '', address: '' });
    setEditingFarmer(null);
  };

  const handleDelete = (farmer: Petani) => {
    setFarmers(farmers.filter((f) => f.kodePetani !== farmer.kodePetani));
    toast({
      title: 'Farmer Deleted',
      description: `${farmer.namaPetani} has been removed`,
    });
  };

  const columns = [
    {
      key: 'kodePetani',
      header: 'Farmer Code',
      render: (item: Petani) => (
        <span className="font-medium text-primary">{item.kodePetani}</span>
      ),
    },
    {
      key: 'namaPetani',
      header: 'Name',
      render: (item: Petani) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium">{item.namaPetani}</span>
        </div>
      ),
    },
    {
      key: 'alamatPetani',
      header: 'Address',
      render: (item: Petani) => (
        <span className="text-muted-foreground">{item.alamatPetani}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Petani) => (
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
        title="Farmers"
        subtitle="Manage registered farmers in your network"
        action={
          <Button onClick={() => handleOpenModal()} className="btn-harvest gap-2">
            <Plus className="w-4 h-4" />
            Add Farmer
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
            placeholder="Search farmers by name, code, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-harvest"
          />
        </div>
      </motion.div>

      {/* Data Table */}
      <DataTable
        data={filteredFarmers}
        columns={columns}
        emptyMessage="No farmers found. Add your first farmer to get started."
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
        title={editingFarmer ? 'Edit Farmer' : 'Add New Farmer'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Farmer Name</Label>
            <Input
              id="name"
              placeholder="Enter farmer name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-harvest"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
              {editingFarmer ? 'Update' : 'Add'} Farmer
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default Farmers;

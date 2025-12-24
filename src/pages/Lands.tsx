import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import FormModal from '@/components/ui/FormModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { lahanData, Lahan } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Lands: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [lands, setLands] = useState<Lahan[]>(lahanData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLand, setEditingLand] = useState<Lahan | null>(null);
  const [formData, setFormData] = useState({ code: '', location: '' });

  const filteredLands = lands.filter(
    (l) =>
      l.kodeLahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.lokasiLahan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (land?: Lahan) => {
    if (land) {
      setEditingLand(land);
      setFormData({ code: land.kodeLahan, location: land.lokasiLahan });
    } else {
      setEditingLand(null);
      setFormData({ code: '', location: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code.trim() || !formData.location.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Check for duplicate codes (excluding current land when editing)
    const isDuplicate = lands.some(
      (l) =>
        l.kodeLahan.toLowerCase() === formData.code.toLowerCase() &&
        l.kodeLahan !== editingLand?.kodeLahan
    );

    if (isDuplicate) {
      toast({
        title: 'Duplicate Entry',
        description: 'A land area with this code already exists',
        variant: 'destructive',
      });
      return;
    }

    if (editingLand) {
      setLands(
        lands.map((l) =>
          l.kodeLahan === editingLand.kodeLahan
            ? { kodeLahan: formData.code, lokasiLahan: formData.location }
            : l
        )
      );
      toast({
        title: 'Land Area Updated',
        description: `${formData.code} has been updated successfully`,
      });
    } else {
      setLands([
        ...lands,
        { kodeLahan: formData.code, lokasiLahan: formData.location },
      ]);
      toast({
        title: 'Land Area Added',
        description: `${formData.code} has been added successfully`,
      });
    }

    setIsModalOpen(false);
    setFormData({ code: '', location: '' });
    setEditingLand(null);
  };

  const handleDelete = (land: Lahan) => {
    setLands(lands.filter((l) => l.kodeLahan !== land.kodeLahan));
    toast({
      title: 'Land Area Deleted',
      description: `${land.kodeLahan} has been removed`,
    });
  };

  const columns = [
    {
      key: 'kodeLahan',
      header: 'Land Code',
      render: (item: Lahan) => (
        <span className="font-medium text-primary">{item.kodeLahan}</span>
      ),
    },
    {
      key: 'lokasiLahan',
      header: 'Location',
      render: (item: Lahan) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-accent" />
          </div>
          <span>{item.lokasiLahan}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (item: Lahan) => (
        <div className="flex items-center justify-end gap-2">
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
        title="Land Areas"
        subtitle="Manage agricultural land registrations"
        action={
          <Button onClick={() => handleOpenModal()} className="btn-harvest gap-2">
            <Plus className="w-4 h-4" />
            Add Land
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
            placeholder="Search by code or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-harvest"
          />
        </div>
      </motion.div>

      {/* Data Table */}
      <DataTable
        data={filteredLands}
        columns={columns}
        emptyMessage="No land areas found. Add your first land area to get started."
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
        title={editingLand ? 'Edit Land Area' : 'Add New Land Area'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Land Code</Label>
            <Input
              id="code"
              placeholder="e.g., LAH-K11"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="input-harvest"
              disabled={!!editingLand}
            />
            {editingLand && (
              <p className="text-xs text-muted-foreground">
                Land code cannot be changed after creation
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter location details"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              {editingLand ? 'Update' : 'Add'} Land
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default Lands;

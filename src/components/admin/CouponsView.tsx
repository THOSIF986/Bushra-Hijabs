import React, { useState } from 'react';
import { useApp } from '../../lib/AppContext';
import { Coupon } from '../../lib/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Trash2, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const CouponsView: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [form, setForm] = useState<Partial<Coupon>>({
    code: '',
    type: 'percentage',
    discount: 0,
    minAmount: 0,
    description: '',
    expiryDate: '',
    isActive: true,
    usageCount: 0
  });

  const handleSubmit = () => {
    if (!form.code || !form.discount || !form.expiryDate) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, form);
      toast.success('Coupon updated successfully');
    } else {
      const newCoupon: Coupon = {
        id: Date.now().toString(),
        code: form.code!.toUpperCase(),
        type: form.type!,
        discount: form.discount!,
        minAmount: form.minAmount || 0,
        description: form.description || '',
        expiryDate: form.expiryDate!,
        isActive: form.isActive !== false,
        usageCount: 0
      };
      addCoupon(newCoupon);
      toast.success('Coupon created successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setForm({
      code: '',
      type: 'percentage',
      discount: 0,
      minAmount: 0,
      description: '',
      expiryDate: '',
      isActive: true,
      usageCount: 0
    });
    setEditingCoupon(null);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setForm(coupon);
    setIsDialogOpen(true);
  };

  const handleDelete = (couponId: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      deleteCoupon(couponId);
      toast.success('Coupon deleted successfully');
    }
  };

  const handleToggleStatus = (coupon: Coupon) => {
    updateCoupon(coupon.id, { isActive: !coupon.isActive });
    toast.success(`Coupon ${coupon.isActive ? 'deactivated' : 'activated'}`);
  };

  const activeCoupons = coupons.filter(c => c.isActive).length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.usageCount, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Coupons</p>
                <p className="text-3xl text-gray-900 mt-1">{coupons.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Coupons</p>
                <p className="text-3xl text-gray-900 mt-1">{activeCoupons}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usage</p>
                <p className="text-3xl text-gray-900 mt-1">{totalUsage}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Coupon Management</CardTitle>
              <CardDescription>Create and manage discount coupons</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Coupon
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
                  <DialogDescription>
                    Fill in the details to {editingCoupon ? 'update' : 'create'} a coupon
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Coupon Code *</Label>
                    <Input
                      placeholder="e.g., SUMMER25"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Discount Type *</Label>
                      <Select 
                        value={form.type} 
                        onValueChange={(value: any) => setForm({ ...form, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Discount Value *</Label>
                      <Input
                        type="number"
                        placeholder={form.type === 'percentage' ? '10' : '100'}
                        value={form.discount || ''}
                        onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Minimum Order Amount</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 500"
                      value={form.minAmount || ''}
                      onChange={(e) => setForm({ ...form, minAmount: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="Brief description of the offer"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expiry Date *</Label>
                    <Input
                      type="date"
                      value={form.expiryDate}
                      onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select 
                      value={form.isActive ? 'active' : 'inactive'} 
                      onValueChange={(value) => setForm({ ...form, isActive: value === 'active' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSubmit} className="flex-1">
                      {editingCoupon ? 'Update' : 'Create'} Coupon
                    </Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div 
                key={coupon.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-gray-900 font-mono px-3 py-1 bg-gray-100 rounded">
                      {coupon.code}
                    </span>
                    <Badge className={coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant="outline">
                      {coupon.type === 'percentage' ? `${coupon.discount}%` : `₹${coupon.discount}`} OFF
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>Min: ₹{coupon.minAmount}</span>
                    <span>•</span>
                    <span>Used: {coupon.usageCount} times</span>
                    <span>•</span>
                    <span>Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(coupon)}
                  >
                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(coupon)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(coupon.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../lib/AppContext';
import { Product } from '../../lib/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

export const ProductsView: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: '',
    description: '',
    features: [''],
    images: [''],
    inStock: true,
    fabric: ''
  });

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.fabric) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
      toast.success('Product updated successfully!');
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productForm.name!,
        price: productForm.price!,
        category: productForm.category || productForm.fabric!,
        description: productForm.description || '',
        features: productForm.features?.filter(f => f.trim()) || [],
        images: productForm.images?.filter(i => i.trim()) || ['https://images.unsplash.com/photo-1707997089167-be6cd01ef6db'],
        inStock: productForm.inStock !== false,
        fabric: productForm.fabric!
      };
      addProduct(newProduct);
      toast.success('Product added successfully!');
    }

    handleCloseDialog();
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm(product);
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        price: 0,
        category: '',
        description: '',
        features: [''],
        images: [''],
        inStock: true,
        fabric: ''
      });
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: 0,
      category: '',
      description: '',
      features: [''],
      images: [''],
      inStock: true,
      fabric: ''
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      toast.success('Product deleted successfully!');
    }
  };

  const addFeatureField = () => {
    setProductForm({
      ...productForm,
      features: [...(productForm.features || []), '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(productForm.features || [])];
    newFeatures[index] = value;
    setProductForm({ ...productForm, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = (productForm.features || []).filter((_, i) => i !== index);
    setProductForm({ ...productForm, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl text-gray-900">Products Management</h1>
          <p className="text-gray-600 mt-1">Add, edit, or remove products from your catalog</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-pink-600 hover:bg-pink-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-2xl text-pink-600">₹{product.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleOpenDialog(product)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4 mr-1 text-red-600" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{product.fabric}</Badge>
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge className={product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              Fill in the product details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product Name *</Label>
                <Input
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label>Price (₹) *</Label>
                <Input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Fabric Type *</Label>
                <Select 
                  value={productForm.fabric} 
                  onValueChange={(value) => setProductForm({ ...productForm, fabric: value, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fabric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jersey">Jersey</SelectItem>
                    <SelectItem value="Chiffon">Chiffon</SelectItem>
                    <SelectItem value="Silk">Silk</SelectItem>
                    <SelectItem value="Georgette">Georgette</SelectItem>
                    <SelectItem value="Modal">Modal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Stock Status</Label>
                <Select 
                  value={productForm.inStock ? 'true' : 'false'} 
                  onValueChange={(value) => setProductForm({ ...productForm, inStock: value === 'true' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">In Stock</SelectItem>
                    <SelectItem value="false">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Features</Label>
                <Button type="button" size="sm" variant="outline" onClick={addFeatureField}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              {(productForm.features || []).map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  {(productForm.features?.length || 0) > 1 && (
                    <Button type="button" size="sm" variant="outline" onClick={() => removeFeature(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={productForm.images?.[0] || ''}
                onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                placeholder="https://..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleSaveProduct} className="bg-pink-600 hover:bg-pink-700">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

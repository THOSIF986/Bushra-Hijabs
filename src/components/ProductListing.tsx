import React, { useState, useMemo } from 'react';
import { useApp } from '../lib/AppContext';
import { Product } from '../lib/mockData';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

interface ProductListingProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const ProductListing: React.FC<ProductListingProps> = ({ onNavigate }) => {
  const { products, addToCart, addToWishlist, isInWishlist } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <button onClick={() => onNavigate('home')} className="hover:text-pink-600 transition-colors">
              HOME
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">SHOP</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl text-gray-900 mb-3 tracking-tight">Our Collection</h1>
          <p className="text-xl text-gray-600">
            Discover premium hijabs crafted with elegance and care
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-2">Filter by Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-2">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group border border-gray-100"
              onClick={() => onNavigate('product', product.id)}
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <Badge variant="secondary" className="text-lg">Out of Stock</Badge>
                  </div>
                )}
                <button
                  onClick={(e) => handleToggleWishlist(product, e)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md ${
                    isInWishlist(product.id) 
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50' 
                      : 'bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/50'
                  } transition-all duration-300`}
                >
                  <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <Badge variant="outline" className="mb-3 border-pink-200 text-pink-700">{product.fabric}</Badge>
                  <h3 className="text-lg text-gray-900 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl text-gray-900">₹{product.price}</span>
                </div>

                <Button
                  className="w-full bg-gray-900 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

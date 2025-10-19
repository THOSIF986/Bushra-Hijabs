import React from 'react';
import { useApp } from '../lib/AppContext';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface WishlistProps {
  onNavigate: (page: string, productId?: string) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ onNavigate }) => {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success('Added to cart');
    }
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl text-gray-900">Your wishlist is empty</h2>
          <p className="text-gray-600">Save your favorite hijabs for later!</p>
          <Button onClick={() => onNavigate('shop')}>Browse Collection</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <button onClick={() => onNavigate('home')} className="hover:text-gray-700">
              HOME
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 uppercase">Wishlist</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div 
                className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => onNavigate('product', product.id)}
              >
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary" className="text-lg">Out of Stock</Badge>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white text-gray-600 hover:bg-red-500 hover:text-white transition-colors shadow-md"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <Badge variant="outline" className="mb-2">{product.fabric}</Badge>
                  <h3 
                    className="text-lg text-gray-900 line-clamp-2 hover:text-pink-600 transition-colors cursor-pointer"
                    onClick={() => onNavigate('product', product.id)}
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl text-gray-900">₹{product.price}</span>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => onNavigate('shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

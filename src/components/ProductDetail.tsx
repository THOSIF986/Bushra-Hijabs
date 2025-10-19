import React, { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Product, checkPincodeServiceability } from '../lib/mockData';
import { Heart, ShoppingCart, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onNavigate }) => {
  const { products, addToCart, addToWishlist, isInWishlist } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'serviceable' | 'not-serviceable'>('idle');

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Product not found</h2>
          <Button onClick={() => onNavigate('shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  const handleToggleWishlist = () => {
    addToWishlist(product);
    toast.success('Added to wishlist');
  };

  const handleCheckPincode = () => {
    if (!pincode || pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

    const isServiceable = checkPincodeServiceability(pincode);
    setPincodeStatus(isServiceable ? 'serviceable' : 'not-serviceable');
  };

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
            <button onClick={() => onNavigate('shop')} className="hover:text-gray-700">
              SHOP
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-pink-500' : 'border-transparent'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{product.fabric}</Badge>
              <h1 className="text-3xl text-gray-900 mb-2">{product.name}</h1>
              {!product.inStock && (
                <Badge variant="destructive" className="mb-2">Out of Stock</Badge>
              )}
            </div>

            <div className="text-4xl text-gray-900">₹{product.price}</div>

            <div className="border-t border-b border-gray-200 py-4 space-y-2">
              <h3 className="text-lg text-gray-900">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg text-gray-900">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pincode Check */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <h3 className="text-lg text-gray-900">Check Delivery</h3>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setPincodeStatus('idle');
                  }}
                  maxLength={6}
                  className="flex-1"
                />
                <Button onClick={handleCheckPincode} variant="outline">
                  Check
                </Button>
              </div>
              {pincodeStatus === 'serviceable' && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Delivery available to this pincode</span>
                </div>
              )}
              {pincodeStatus === 'not-serviceable' && (
                <div className="flex items-center gap-2 text-red-600">
                  <X className="h-5 w-5" />
                  <span>Sorry, delivery not available to this pincode</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                    disabled={!product.inStock}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                    disabled={!product.inStock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant={isInWishlist(product.id) ? 'default' : 'outline'}
                  onClick={handleToggleWishlist}
                  className={isInWishlist(product.id) ? 'bg-pink-500 hover:bg-pink-600' : ''}
                >
                  <Heart 
                    className="h-5 w-5" 
                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

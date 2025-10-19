import React, { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CartProps {
  onNavigate: (page: string) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, applyCoupon, removeCoupon, appliedCoupon } = useApp();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    const success = applyCoupon(couponCode.toUpperCase());
    if (success) {
      toast.success('Coupon applied successfully!');
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.success('Coupon removed');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl text-gray-900">Your cart is empty</h2>
          <p className="text-gray-600">Add some beautiful hijabs to your cart!</p>
          <Button onClick={() => onNavigate('shop')}>Continue Shopping</Button>
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
            <button onClick={() => onNavigate('shop')} className="hover:text-gray-700">
              SHOP
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 uppercase">Cart</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900">Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="col-span-6 uppercase text-sm text-gray-600">Product Name</div>
              <div className="col-span-2 text-center uppercase text-sm text-gray-600">Unit Price</div>
              <div className="col-span-2 text-center uppercase text-sm text-gray-600">Quantity</div>
              <div className="col-span-2 text-center uppercase text-sm text-gray-600">Total</div>
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="grid md:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-6 flex gap-4 items-center">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 line-clamp-2">{item.product.name}</h3>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="md:col-span-2 text-center">
                    <span className="md:hidden text-sm text-gray-600">Unit Price: </span>
                    <span className="text-gray-900">₹{item.product.price}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center items-center gap-2">
                    <span className="md:hidden text-sm text-gray-600">Quantity: </span>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden text-sm text-gray-600">Total: </span>
                    <span className="text-gray-900">₹{item.product.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="md:hidden p-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Remove Button - Desktop */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="hidden md:block absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="outline" onClick={() => onNavigate('shop')}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700">
                Clear Shopping Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-4">
              <h2 className="text-xl text-gray-900">Order Summary</h2>

              {/* Coupon Code */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Have a coupon code?</label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                    <span className="text-green-700">{appliedCoupon}</span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button variant="outline" onClick={handleApplyCoupon}>
                      Apply Coupon
                    </Button>
                  </div>
                )}
              </div>

              {/* Subtotal */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">₹{subtotal}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={() => onNavigate('checkout')}>
                Proceed to Checkout
              </Button>

              <div className="text-xs text-gray-500 text-center">
                Shipping and taxes calculated at checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

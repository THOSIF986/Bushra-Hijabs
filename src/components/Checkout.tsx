import React, { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { Address, calculateShipping, calculatePrepaidDiscount } from '../lib/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const { cart, placeOrder, appliedCoupon } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'prepaid' | 'cod'>('prepaid');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [formData, setFormData] = useState<Address>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    mobile: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const prepaidDiscount = paymentMethod === 'prepaid' ? calculatePrepaidDiscount(subtotal) : 0;
  const shipping = calculateShipping(subtotal);
  const total = subtotal - prepaidDiscount + shipping;

  const handleInputChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName) {
      toast.error('Please enter your first and last name');
      return false;
    }
    if (!formData.address || !formData.city || !formData.state) {
      toast.error('Please fill in all address fields');
      return false;
    }
    if (!formData.pincode || formData.pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    if (!formData.mobile || formData.mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const order = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: 'customer@example.com', // In real app, get from user context
      mobile: formData.mobile,
      products: cart.map(item => ({
        product: item.product,
        quantity: item.quantity
      })),
      subtotal,
      discount: prepaidDiscount,
      shipping,
      total,
      paymentMethod,
      status: 'pending' as const,
      address: formData
    };

    placeOrder(order);
    toast.success('Order placed successfully!');
    onNavigate('profile'); // Navigate to profile to see order
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl text-gray-900">Your cart is empty</h2>
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
            <span className="text-gray-900 uppercase">Checkout</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Already a customer? <button className="text-pink-600 hover:underline">Click here to login</button></p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Billing & Shipping Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-2xl text-gray-900">Billing & Shipping</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="House number and street name"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment, suite, unit, etc. (optional)</Label>
              <Input
                id="apartment"
                value={formData.apartment}
                onChange={(e) => handleInputChange('apartment', e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-4">
              <h2 className="text-2xl text-gray-900">Your order</h2>

              {/* Products */}
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between uppercase text-sm text-gray-600">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 line-clamp-1">{item.product.name}</p>
                        <p className="text-gray-600">× {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-gray-900 flex-shrink-0">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal}</span>
                </div>

                {prepaidDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Auto discount on prepaid orders</span>
                    <span>-₹{prepaidDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `Shipping charge: ₹${shipping}`
                    )}
                  </span>
                </div>

                {subtotal < 798 && (
                  <p className="text-sm text-gray-600">
                    Add ₹{798 - subtotal} more to get free shipping!
                  </p>
                )}
              </div>

              <div className="flex justify-between text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-pink-600">₹{total}</span>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'prepaid' | 'cod')}>
                  <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded hover:bg-gray-50">
                    <RadioGroupItem value="prepaid" id="prepaid" />
                    <Label htmlFor="prepaid" className="flex-1 cursor-pointer">
                      <div className="text-gray-900">Pay using Debit Card, Credit Card, Net Banking, UPI or Credit Card EMI Options - PayU Payment Gateway</div>
                      {prepaidDiscount > 0 && (
                        <div className="text-sm text-green-600 mt-1">Save ₹{prepaidDiscount} with prepaid payment!</div>
                      )}
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="text-gray-900">Pay using Cash on Delivery</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  I'VE READ AND ACCEPT THE{' '}
                  <button className="text-pink-600 hover:underline">TERMS & CONDITIONS</button> AND{' '}
                  <button className="text-pink-600 hover:underline">RETURN & REFUND POLICY</button> *
                </Label>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePlaceOrder}
                disabled={!acceptedTerms}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

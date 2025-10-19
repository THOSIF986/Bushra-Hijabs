import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  CustomDesignRequest, 
  User, 
  Address,
  products as initialProducts,
  calculateShipping,
  calculatePrepaidDiscount
} from './mockData';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // User
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addAddress: (address: Address) => void;
  
  // Orders
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  
  // Custom Designs
  customDesigns: CustomDesignRequest[];
  submitCustomDesign: (request: Omit<CustomDesignRequest, 'id' | 'status' | 'date'>) => void;
  
  // Admin
  isAdmin: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateCustomDesignStatus: (requestId: string, status: CustomDesignRequest['status']) => void;
  
  // Products (for admin)
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  
  // Coupon
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customDesigns, setCustomDesigns] = useState<CustomDesignRequest[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');
    const savedOrders = localStorage.getItem('orders');
    const savedCustomDesigns = localStorage.getItem('customDesigns');
    const savedProducts = localStorage.getItem('products');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedCustomDesigns) setCustomDesigns(JSON.parse(savedCustomDesigns));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('customDesigns', JSON.stringify(customDesigns));
  }, [customDesigns]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Cart functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  // User functions
  const login = (email: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      mobile: '',
      addresses: [],
      language: 'English'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addAddress = (address: Address) => {
    if (user) {
      setUser({
        ...user,
        addresses: [...user.addresses, address]
      });
    }
  };

  // Order functions
  const placeOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now()}`,
      date: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  // Custom design functions
  const submitCustomDesign = (request: Omit<CustomDesignRequest, 'id' | 'status' | 'date'>) => {
    const newRequest: CustomDesignRequest = {
      ...request,
      id: `CD${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString()
    };
    setCustomDesigns(prev => [newRequest, ...prev]);
  };

  // Admin functions
  const adminLogin = (email: string, password: string) => {
    if (email === 'admin@bushrahijabs.com' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updateCustomDesignStatus = (requestId: string, status: CustomDesignRequest['status']) => {
    setCustomDesigns(prev =>
      prev.map(request =>
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  // Product functions (Admin)
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Coupon functions
  const applyCoupon = (code: string) => {
    // Simple validation - in real app, check against available coupons
    const validCoupons = ['WELCOME10', 'BUSHRA20', 'FIRST50'];
    if (validCoupons.includes(code)) {
      setAppliedCoupon(code);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateUserProfile,
    addAddress,
    orders,
    placeOrder,
    customDesigns,
    submitCustomDesign,
    isAdmin,
    adminLogin,
    adminLogout,
    updateOrderStatus,
    updateCustomDesignStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data for Bushra Hijabs e-commerce application

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  features: string[];
  images: string[];
  inStock: boolean;
  fabric: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  mobile: string;
  products: { product: Product; quantity: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'prepaid' | 'cod';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
  date: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  mobile: string;
}

export interface CustomDesignRequest {
  id: string;
  name: string;
  email: string;
  mobile: string;
  fabric: string;
  colorPattern: string;
  referenceImage?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  date: string;
}

export interface Coupon {
  code: string;
  discount: number;
  minAmount: number;
  description: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  mobile: string;
  addresses: Address[];
  language: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Dubai Stone Embroidery Luxury Hijab - Crimson Wine',
    price: 749,
    category: 'Jersey',
    description: 'Experience elegance with our Dubai Stone Embroidery Luxury Hijab in stunning Crimson Wine. This premium hijab features intricate stone embroidery work that adds a touch of glamour to your modest wardrobe.',
    features: [
      'Premium Jersey fabric',
      'Handcrafted stone embroidery',
      'Breathable and comfortable',
      'Easy to style',
      'Care: Hand wash in cold water'
    ],
    images: [
      'https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGlqYWIlMjBmYXNoaW9ufGVufDF8fHx8MTc2MDg4MTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1707997089167-be6cd01ef6db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlc3QlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYwODgxNzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    fabric: 'Jersey'
  },
  {
    id: '2',
    name: 'Silk Chiffon Premium Hijab - Midnight Black',
    price: 899,
    category: 'Chiffon',
    description: 'Our Silk Chiffon Premium Hijab in Midnight Black offers unparalleled sophistication. The lightweight, flowing fabric drapes beautifully while maintaining full coverage.',
    features: [
      'Premium silk chiffon fabric',
      'Lightweight and breathable',
      'Perfect drape',
      'Non-slip texture',
      'Care: Dry clean recommended'
    ],
    images: [
      'https://images.unsplash.com/photo-1744502672203-98316831f121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzaWxrJTIwZmFicmljfGVufDF8fHx8MTc2MDgxMTA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1712686422222-b2bdb134000f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGZhYnJpYyUyMHRleHR1cmV8ZW58MXx8fHwxNzYwODgxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    fabric: 'Chiffon'
  },
  {
    id: '3',
    name: 'Cotton Jersey Everyday Hijab - Pearl White',
    price: 499,
    category: 'Jersey',
    description: 'Perfect for daily wear, our Cotton Jersey Everyday Hijab in Pearl White combines comfort with style. The soft, stretchy fabric ensures all-day comfort.',
    features: [
      'Soft cotton jersey',
      'Stretchable fabric',
      'Breathable for all-day wear',
      'Machine washable',
      'Available in multiple colors'
    ],
    images: [
      'https://images.unsplash.com/photo-1707997089167-be6cd01ef6db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlc3QlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYwODgxNzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGlqYWIlMjBmYXNoaW9ufGVufDF8fHx8MTc2MDg4MTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    fabric: 'Jersey'
  },
  {
    id: '4',
    name: 'Premium Silk Hijab - Royal Blue',
    price: 1299,
    category: 'Silk',
    description: 'Indulge in luxury with our Premium Silk Hijab in Royal Blue. Made from 100% pure silk, this hijab offers a lustrous finish and exceptional comfort.',
    features: [
      '100% pure silk',
      'Luxurious sheen',
      'Temperature regulating',
      'Hypoallergenic',
      'Care: Hand wash only'
    ],
    images: [
      'https://images.unsplash.com/photo-1712686422222-b2bdb134000f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGZhYnJpYyUyMHRleHR1cmV8ZW58MXx8fHwxNzYwODgxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1744502672203-98316831f121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzaWxrJTIwZmFicmljfGVufDF8fHx8MTc2MDgxMTA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    fabric: 'Silk'
  },
  {
    id: '5',
    name: 'Floral Print Chiffon Hijab - Rose Pink',
    price: 649,
    category: 'Chiffon',
    description: 'Add a touch of femininity with our Floral Print Chiffon Hijab in Rose Pink. The delicate floral pattern and soft chiffon fabric make this a versatile choice.',
    features: [
      'Printed chiffon fabric',
      'Beautiful floral design',
      'Lightweight and airy',
      'Perfect for special occasions',
      'Care: Hand wash recommended'
    ],
    images: [
      'https://images.unsplash.com/photo-1707997089167-be6cd01ef6db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlc3QlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYwODgxNzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGlqYWIlMjBmYXNoaW9ufGVufDF8fHx8MTc2MDg4MTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    fabric: 'Chiffon'
  },
  {
    id: '6',
    name: 'Modal Jersey Hijab - Olive Green',
    price: 549,
    category: 'Jersey',
    description: 'Discover ultimate comfort with our Modal Jersey Hijab in Olive Green. The eco-friendly modal fabric is incredibly soft and perfect for everyday wear.',
    features: [
      'Sustainable modal fabric',
      'Ultra-soft texture',
      'Excellent breathability',
      'Wrinkle resistant',
      'Machine washable'
    ],
    images: [
      'https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGlqYWIlMjBmYXNoaW9ufGVufDF8fHx8MTc2MDg4MTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1712686422222-b2bdb134000f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGZhYnJpYyUyMHRleHR1cmV8ZW58MXx8fHwxNzYwODgxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    fabric: 'Jersey'
  },
  {
    id: '7',
    name: 'Georgette Hijab - Dusty Mauve',
    price: 799,
    category: 'Georgette',
    description: 'Elegant and versatile, our Georgette Hijab in Dusty Mauve offers a beautiful drape and texture. Perfect for both casual and formal occasions.',
    features: [
      'Premium georgette fabric',
      'Textured finish',
      'Great drape quality',
      'Non-slip surface',
      'Care: Hand wash recommended'
    ],
    images: [
      'https://images.unsplash.com/photo-1744502672203-98316831f121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzaWxrJTIwZmFicmljfGVufDF8fHx8MTc2MDgxMTA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1707997089167-be6cd01ef6db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlc3QlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYwODgxNzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: true,
    fabric: 'Georgette'
  },
  {
    id: '8',
    name: 'Instant Jersey Hijab - Navy Blue',
    price: 599,
    category: 'Jersey',
    description: 'Save time with our Instant Jersey Hijab in Navy Blue. Pre-stitched for convenience, this hijab offers comfort and style without the hassle.',
    features: [
      'Pre-stitched design',
      'Soft jersey fabric',
      'Quick and easy to wear',
      'Perfect fit every time',
      'Machine washable'
    ],
    images: [
      'https://images.unsplash.com/photo-1707997089167-be6cd01ef6db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlc3QlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYwODgxNzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwaGlqYWIlMjBmYXNoaW9ufGVufDF8fHx8MTc2MDg4MTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    inStock: false,
    fabric: 'Jersey'
  }
];

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    minAmount: 500,
    description: '10% off on orders above ₹500'
  },
  {
    code: 'BUSHRA20',
    discount: 20,
    minAmount: 1000,
    description: '20% off on orders above ₹1000'
  },
  {
    code: 'FIRST50',
    discount: 50,
    minAmount: 800,
    description: '₹50 off on first order above ₹800'
  }
];

// Serviceable pincodes (sample data for major Indian cities)
export const serviceablePincodes: string[] = [
  '110001', '110002', '110003', '110005', '110006', '110007', '110008', '110009', '110010', // Delhi
  '400001', '400002', '400003', '400004', '400005', '400051', '400052', '400053', // Mumbai
  '560001', '560002', '560003', '560004', '560005', '560025', '560034', '560037', // Bangalore
  '600001', '600002', '600003', '600004', '600005', '600028', '600032', '600040', // Chennai
  '700001', '700002', '700003', '700012', '700016', '700019', '700027', '700029', // Kolkata
  '500001', '500002', '500003', '500004', '500016', '500034', '500044', '500081', // Hyderabad
  '411001', '411002', '411003', '411004', '411005', '411006', '411007', '411008', // Pune
  '380001', '380002', '380004', '380005', '380006', '380007', '380009', '380013', // Ahmedabad
  '201301', '201303', '201304', '201305', '201306', '201307', '201308', '201309', // Noida
  '122001', '122002', '122003', '122004', '122015', '122016', '122017', '122018', // Gurgaon
];

export const checkPincodeServiceability = (pincode: string): boolean => {
  return serviceablePincodes.includes(pincode);
};

export const calculateShipping = (subtotal: number): number => {
  // Free shipping for orders above ₹798
  if (subtotal >= 798) {
    return 0;
  }
  return 50;
};

export const calculatePrepaidDiscount = (subtotal: number): number => {
  // 3% discount on prepaid orders
  return Math.round(subtotal * 0.03);
};

// Admin credentials
export const adminCredentials = {
  email: 'admin@bushrahijabs.com',
  password: 'admin123'
};

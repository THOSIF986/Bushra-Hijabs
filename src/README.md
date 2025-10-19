# Bushra Hijabs - E-Commerce Application

A full-featured e-commerce web application for selling premium hijabs, featuring both a customer-facing store and a secure admin panel.

## Features

### Customer-Facing Store

#### 🏠 Home Page
- Beautiful hero banner with "Elegance in Every Thread" tagline
- Feature highlights (Premium Quality, Free Shipping, Custom Design)
- Shop by fabric categories
- Call-to-action buttons for shopping and custom design

#### 🛍️ Product Browsing
- Product listing with category filters (Jersey, Chiffon, Silk, Georgette)
- Sort by price (low to high, high to low) and name
- Product cards with images, pricing, and "Add to Cart" functionality
- Wishlist feature with heart icon

#### 📦 Product Details
- Multiple product images with thumbnail gallery
- Detailed product description and features
- Pincode serviceability check for delivery
- Quantity selector
- Add to cart and wishlist options
- Stock status indicator

#### 🛒 Shopping Cart
- View all cart items with images
- Quantity adjustment (increase/decrease)
- Remove items individually or clear entire cart
- Coupon code application
- Real-time subtotal calculation
- Continue shopping and proceed to checkout options

#### 💳 Checkout Process
- Comprehensive billing and shipping form
- Order summary with product details
- Auto discount calculation for prepaid orders (3%)
- Shipping charge calculation (Free above ₹798, otherwise ₹50)
- Payment method selection:
  - Prepaid (Card/Net Banking/UPI)
  - Cash on Delivery (COD)
- Terms & Conditions acceptance
- Place order button

#### ✨ Custom Design Feature
- Request form for custom hijab designs
- Fields for personal information (name, email, mobile)
- Fabric preference selection
- Color/pattern description
- Optional reference image upload
- Information about the design process

#### ❤️ Wishlist
- Save favorite products for later
- Quick add to cart from wishlist
- Remove items from wishlist
- Navigate to product details

#### 👤 User Profile
- Login/logout functionality
- Profile management (name, email, mobile)
- Order history with status tracking
- Saved addresses
- Language selection (English, Hindi, Tamil, Telugu, Urdu)
- Notification center

### Admin Panel

#### 🔐 Secure Login
- Email and password authentication
- Demo credentials: admin@bushrahijabs.com / admin123

#### 📊 Dashboard
- Overview statistics:
  - Total Revenue
  - Pending Orders
  - Total Products
  - Custom Design Requests
- Quick access to all management sections

#### 📦 Product Management
- View all products
- Add new products (name, price, fabric, description, features)
- Edit existing products
- Delete products
- Stock status management

#### 🛍️ Order Management
- View all customer orders
- Order details (customer info, products, pricing, payment method)
- Update order status (Pending, Processing, Shipped, Delivered, Cancelled)
- Filter and track orders

#### 🎨 Custom Design Requests
- Review customer design requests
- View request details (fabric, color/pattern, reference image)
- Approve/reject requests
- Mark requests as completed

## Technical Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Notifications**: Sonner
- **Storage**: LocalStorage for persistence

## Key Features Implementation

### Payment Options
- ✅ Prepaid (Card/Net Banking/UPI) with 3% auto discount
- ✅ Cash on Delivery (COD)

### Shipping
- ✅ Available across India
- ✅ Free shipping on orders above ₹798
- ✅ ₹50 flat rate for orders below ₹798

### Pincode Serviceability
- ✅ Check delivery availability by pincode
- ✅ Coverage for major Indian cities

### Coupons
Available demo coupons:
- `WELCOME10` - 10% off on orders above ₹500
- `BUSHRA20` - 20% off on orders above ₹1000
- `FIRST50` - ₹50 off on first order above ₹800

## Product Categories

- Jersey Hijabs
- Chiffon Hijabs
- Silk Hijabs
- Georgette Hijabs

## Getting Started

1. Browse the collection on the home page
2. Use filters to find your perfect hijab
3. Check product details and pincode serviceability
4. Add items to cart or wishlist
5. Apply coupon codes for discounts
6. Complete checkout with your preferred payment method
7. Or request a custom design for a personalized hijab

### Admin Access

1. Navigate to `/admin` or click the admin link
2. Login with credentials: admin@bushrahijabs.com / admin123
3. Manage products, orders, and custom design requests

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop devices
- Tablets
- Mobile phones

## Data Persistence

All data (cart, wishlist, orders, user profile, products) is persisted in LocalStorage, ensuring your session data is maintained across browser refreshes.

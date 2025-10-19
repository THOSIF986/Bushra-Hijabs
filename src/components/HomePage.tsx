import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Play } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 4 Images */}
      <section className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 h-[70vh] lg:h-[80vh]">
          {/* Image 1 - Pink */}
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1643080337254-92836bbf86f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBwaW5rfGVufDF8fHx8MTc2MDg4NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Pink Hijab Collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Image 2 - Navy */}
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1668959901722-627e2277f28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBuYXZ5JTIwYmx1ZXxlbnwxfHx8fDE3NjA4ODQ3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Navy Hijab Collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Image 3 - Brown */}
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1609750955252-5eb0721ea3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBicm93bnxlbnwxfHx8fDE3NjA4ODQ3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Brown Hijab Collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Image 4 - Green */}
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1613611927458-3ddd4b0afdb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBncmVlbnxlbnwxfHx8fDE3NjA4ODQ3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Green Hijab Collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Center Overlay Card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-lg shadow-2xl p-8 lg:p-12 max-w-md lg:max-w-lg pointer-events-auto relative">
            {/* Small Logo/Brand in top right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-xs tracking-wider">LITTLE</span>
                <span className="text-xs tracking-wider">BLACK HIJAB</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="black"/>
              </svg>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-5xl lg:text-6xl tracking-tight text-gray-900">
                  LUXE
                </h2>
                <h2 className="text-5xl lg:text-6xl tracking-tight text-gray-900">
                  MODAL
                </h2>
                <h2 className="text-5xl lg:text-6xl tracking-tight text-gray-900">
                  HIJAB
                </h2>
              </div>

              <div className="flex items-center gap-2 text-sm tracking-wide text-gray-700">
                <Play className="w-4 h-4 fill-current" />
                <span>JUST IN, JUST RIGHT</span>
              </div>

              <Button
                onClick={() => onNavigate('shop')}
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-full tracking-widest"
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Collection Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl tracking-wider text-gray-900">
              THE COLLECTION
            </h2>
          </div>

          {/* Collection Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Jersey Hijabs',
                description: 'Soft, breathable, and perfect for everyday wear',
                image: 'https://images.unsplash.com/photo-1643080337254-92836bbf86f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBwaW5rfGVufDF8fHx8MTc2MDg4NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080'
              },
              {
                name: 'Chiffon Hijabs',
                description: 'Lightweight and elegant for special occasions',
                image: 'https://images.unsplash.com/photo-1668959901722-627e2277f28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBuYXZ5JTIwYmx1ZXxlbnwxfHx8fDE3NjA4ODQ3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
              },
              {
                name: 'Premium Collection',
                description: 'Luxurious fabrics for the discerning woman',
                image: 'https://images.unsplash.com/photo-1609750955252-5eb0721ea3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBicm93bnxlbnwxfHx8fDE3NjA4ODQ3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
              }
            ].map((collection) => (
              <div
                key={collection.name}
                onClick={() => onNavigate('shop')}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                  <ImageWithFallback
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl tracking-wide text-gray-900 mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-600">
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl tracking-wider text-gray-900 mb-4">
              NEW ARRIVALS
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our latest additions to the collection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { color: 'Blush Pink', price: '₹699', image: 'https://images.unsplash.com/photo-1643080337254-92836bbf86f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBwaW5rfGVufDF8fHx8MTc2MDg4NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
              { color: 'Navy Blue', price: '₹699', image: 'https://images.unsplash.com/photo-1668959901722-627e2277f28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBuYXZ5JTIwYmx1ZXxlbnwxfHx8fDE3NjA4ODQ3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
              { color: 'Caramel Brown', price: '₹699', image: 'https://images.unsplash.com/photo-1609750955252-5eb0721ea3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBicm93bnxlbnwxfHx8fDE3NjA4ODQ3NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
              { color: 'Sage Green', price: '₹699', image: 'https://images.unsplash.com/photo-1613611927458-3ddd4b0afdb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpamFiJTIwcG9ydHJhaXQlMjBncmVlbnxlbnwxfHx8fDE3NjA4ODQ3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' }
            ].map((product) => (
              <div
                key={product.color}
                onClick={() => onNavigate('shop')}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.color}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="tracking-wide text-gray-900 mb-2">
                    {product.color}
                  </h3>
                  <p className="text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('shop')}
              variant="outline"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 rounded-full tracking-widest"
            >
              VIEW ALL PRODUCTS
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl tracking-wider text-gray-900 mb-4">
              WHY BUSHRA HIJABS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl tracking-wide text-gray-900 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Made from the finest fabrics for ultimate comfort and style
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl tracking-wide text-gray-900 mb-3">
                Free Shipping
              </h3>
              <p className="text-gray-600">
                Free shipping on all orders above ₹798 across India
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl tracking-wide text-gray-900 mb-3">
                Cash On Delivery
              </h3>
              <p className="text-gray-600">
                Pay when you receive your order at your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl tracking-wider mb-6">
            CUSTOM DESIGN REQUEST
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Have a unique design in mind? We'll bring your vision to life
          </p>
          <Button
            onClick={() => onNavigate('custom-design')}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 rounded-full tracking-widest"
          >
            SUBMIT YOUR DESIGN
          </Button>
        </div>
      </section>
    </div>
  );
};

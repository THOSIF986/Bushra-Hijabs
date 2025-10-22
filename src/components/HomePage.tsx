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
      {/* Hero Section - Elegance in Every Thread */}
      <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.pexels.com/photos/9218626/pexels-photo-9218626.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Elegant woman in pastel beige hijab with natural lighting"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Elegance in Every
                </h2>
                <h2 className="text-5xl lg:text-7xl font-bold text-pink-600 leading-tight">
                  Thread
                </h2>
              </div>

              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl">
                Discover our curated collection of premium hijabs, crafted with the finest fabrics and attention to detail. From silk to chiffon, find your perfect style.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  onClick={() => onNavigate('shop')}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 rounded-md text-base font-medium"
                >
                  Shop Collection
                </Button>
                <Button
                  onClick={() => onNavigate('custom-design')}
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 rounded-md text-base font-medium bg-white/80"
                >
                  Design Your Own
                </Button>
              </div>
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

import { useState } from "react";
import Header from "@/components/Header";
import FilterSection from "@/components/FilterSection";
import ProductGrid from "@/components/ProductGrid";
import CartModal from "@/components/CartModal";
import { useCart } from "@/hooks/useCart";
import type { ProductFilters } from "@shared/schema";

export default function Home() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, getTotalItems } = useCart();

  const totalItems = getTotalItems();

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <Header 
        cartCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={(search) => handleFilterChange({ search })}
      />
      
      <FilterSection 
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900" 
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400')",
                 backgroundSize: "cover",
                 backgroundPosition: "center",
                 backgroundBlendMode: "overlay"
               }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
              <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
                Discover Amazing Products
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Shop the latest trends and find exactly what you're looking for with our curated collection of premium products.
              </p>
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        <ProductGrid filters={filters} />
      </main>

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopCraft</h3>
              <p className="text-gray-400 text-sm mb-4">Your trusted partner for quality products and exceptional shopping experience.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Electronics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Clothing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home & Garden</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sports</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Size Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Track Order</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ShopCraft. All rights reserved. Built with AI assistance for hackathon project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import type { Product, ProductFilters } from "@shared/schema";

interface ProductGridProps {
  filters: ProductFilters;
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["/api/products", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value.toString());
        }
      });
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json() as Promise<Product[]>;
    },
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          Featured Products
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-slate-400">
          <span>{isLoading ? "..." : products?.length || 0}</span>
          <span>products found</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-slate-700">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-3" />
                <Skeleton className="h-3 w-2/3 mb-3" />
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isLoading && products?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-slate-400">
            No products found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </section>
  );
}

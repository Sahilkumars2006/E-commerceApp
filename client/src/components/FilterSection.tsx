import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { ProductFilters } from "@shared/schema";

interface FilterSectionProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  onResetFilters: () => void;
}

export default function FilterSection({ filters, onFilterChange, onResetFilters }: FilterSectionProps) {
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || "");

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json() as Promise<string[]>;
    },
  });

  // Debounce price changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
      const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
      
      if (minPriceNum !== filters.minPrice || maxPriceNum !== filters.maxPrice) {
        onFilterChange({
          minPrice: minPriceNum,
          maxPrice: maxPriceNum,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, filters.minPrice, filters.maxPrice, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    onFilterChange({ category: category === "all" ? undefined : category });
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    onResetFilters();
  };

  return (
    <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="categoryFilter" className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Category:
            </Label>
            <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-40 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Price Range:
            </Label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-slate-400">$</span>
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
              />
              <span className="text-gray-500 dark:text-slate-400">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
              />
            </div>
          </div>

          {/* Reset Filters */}
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            Reset Filters
          </Button>
        </div>
      </div>
    </section>
  );
}

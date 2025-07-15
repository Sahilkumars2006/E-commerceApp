import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItemWithProduct, Product } from "@shared/schema";

export function useCart() {
  const queryClient = useQueryClient();
  
  // Local storage for cart persistence
  const [localCart, setLocalCart] = useState<CartItemWithProduct[]>(() => {
    const stored = localStorage.getItem("shopcraft-cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync local cart with localStorage
  useEffect(() => {
    localStorage.setItem("shopcraft-cart", JSON.stringify(localCart));
  }, [localCart]);

  // Server cart query (for future use)
  const { data: serverCart } = useQuery({
    queryKey: ["/api/cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      return response.json() as Promise<CartItemWithProduct[]>;
    },
    enabled: false, // Disable for now, using localStorage
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (data: { productId: number; quantity: number }) => {
      return apiRequest("POST", "/api/cart", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  // Update cart item mutation
  const updateCartMutation = useMutation({
    mutationFn: async (data: { id: number; quantity: number }) => {
      return apiRequest("PUT", `/api/cart/${data.id}`, { quantity: data.quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  // Local cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setLocalCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: Date.now(), // Temporary ID for local storage
          productId: product.id,
          quantity,
          userId: null,
          product
        }];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setLocalCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setLocalCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setLocalCart([]);
  };

  return {
    cart: localCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isLoading: addToCartMutation.isPending || updateCartMutation.isPending || removeFromCartMutation.isPending,
  };
}

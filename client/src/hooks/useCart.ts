import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItemWithProduct, Product } from "@shared/schema";
import { useAuth } from "./useAuth";

export function useCart() {
  const queryClient = useQueryClient();
  const { data: user } = useAuth();
  
  // Local storage for cart persistence (when not authenticated)
  const [localCart, setLocalCart] = useState<CartItemWithProduct[]>(() => {
    const stored = localStorage.getItem("shopcraft-cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync local cart with localStorage
  useEffect(() => {
    localStorage.setItem("shopcraft-cart", JSON.stringify(localCart));
  }, [localCart]);

  // Server cart query (for authenticated users)
  const { data: serverCart, isLoading: isServerCartLoading } = useQuery({
    queryKey: ["/api/cart", user?.id],
    queryFn: async () => {
      const response = await fetch(`/api/cart?userId=${user?.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      return response.json() as Promise<CartItemWithProduct[]>;
    },
    enabled: !!user, // Only fetch when user is authenticated
  });

  // Add to cart mutation (for authenticated users)
  const addToCartMutation = useMutation({
    mutationFn: async (data: { productId: number; quantity: number }) => {
      return apiRequest("/api/cart", "POST", { ...data, userId: user?.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", user?.id] });
    },
  });

  // Update cart item mutation (for authenticated users)
  const updateCartMutation = useMutation({
    mutationFn: async (data: { id: number; quantity: number }) => {
      return apiRequest(`/api/cart/${data.id}`, "PUT", { quantity: data.quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", user?.id] });
    },
  });

  // Remove from cart mutation (for authenticated users)
  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/cart/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", user?.id] });
    },
  });

  // Clear cart mutation (for authenticated users)
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`/api/cart?userId=${user?.id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", user?.id] });
    },
  });

  // Get current cart (server if authenticated, local if not)
  const currentCart = user ? (serverCart || []) : localCart;

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    if (user) {
      // Add to server cart for authenticated users
      addToCartMutation.mutate({ productId: product.id, quantity });
    } else {
      // Add to local cart for unauthenticated users
      setLocalCart(prev => {
        const existingItem = prev.find(item => item.product.id === product.id);
        
        if (existingItem) {
          return prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [
            ...prev,
            {
              id: Date.now(), // Temporary ID for local storage
              productId: product.id,
              quantity,
              userId: 0,
              product,
              addedAt: new Date(), // Ensure required property as Date
            } as CartItemWithProduct,
          ];
        }
      });
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    if (user) {
      updateCartMutation.mutate({ id, quantity });
    } else {
      setLocalCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    if (user) {
      removeFromCartMutation.mutate(id);
    } else {
      setLocalCart(prev => prev.filter(item => item.id !== id));
    }
  };

  const clearCart = () => {
    if (user) {
      clearCartMutation.mutate();
    } else {
      setLocalCart([]);
    }
  };

  const getTotalPrice = () => {
    return currentCart.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return currentCart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart: currentCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isLoading: isServerCartLoading || addToCartMutation.isPending || updateCartMutation.isPending || removeFromCartMutation.isPending,
    isAuthenticated: !!user,
  };
}

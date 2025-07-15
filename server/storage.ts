import { users, products, cartItems, type User, type InsertUser, type Product, type InsertProduct, type CartItem, type InsertCartItem } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(userId?: number): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId?: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with advanced noise cancellation and premium sound quality.",
        price: "299.99",
        originalPrice: "399.99",
        category: "electronics",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: true
      },
      {
        name: "Latest Smartphone",
        description: "Cutting-edge smartphone with advanced camera system and all-day battery life.",
        price: "899.99",
        category: "electronics",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: true
      },
      {
        name: "MacBook Pro 16\"",
        description: "Professional laptop with M2 chip, perfect for creative work and programming.",
        price: "2499.99",
        category: "electronics",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: true
      },
      {
        name: "Classic Watch",
        description: "Elegant timepiece with premium materials and precise movement.",
        price: "199.99",
        originalPrice: "299.99",
        category: "accessories",
        rating: "4.2",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: false
      },
      {
        name: "Professional Camera",
        description: "High-resolution camera with advanced features for professional photography.",
        price: "1299.99",
        category: "electronics",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: false
      },
      {
        name: "Gaming Keyboard",
        description: "Mechanical keyboard with RGB lighting and premium switches for gaming.",
        price: "149.99",
        category: "electronics",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: false
      },
      {
        name: "Ergonomic Chair",
        description: "Comfortable office chair with lumbar support and adjustable height.",
        price: "399.99",
        originalPrice: "499.99",
        category: "furniture",
        rating: "4.3",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: false
      },
      {
        name: "Wireless Speaker",
        description: "High-quality wireless speaker with excellent sound and long battery life.",
        price: "99.99",
        category: "electronics",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        inStock: true,
        featured: false
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      originalPrice: insertProduct.originalPrice ?? null,
      rating: insertProduct.rating ?? null,
      inStock: insertProduct.inStock ?? null,
      featured: insertProduct.featured ?? null
    };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(userId?: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => userId === undefined || item.userId === userId
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.productId === insertCartItem.productId && 
               item.userId === insertCartItem.userId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertCartItem.quantity ?? 1;
      return existingItem;
    } else {
      // Create new cart item
      const id = this.currentCartId++;
      const cartItem: CartItem = { 
        ...insertCartItem, 
        id,
        quantity: insertCartItem.quantity ?? 1,
        userId: insertCartItem.userId ?? null
      };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId?: number): Promise<boolean> {
    if (userId === undefined) {
      this.cartItems.clear();
      return true;
    }
    
    const itemsToRemove = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.userId === userId)
      .map(([id, _]) => id);
    
    itemsToRemove.forEach(id => this.cartItems.delete(id));
    return true;
  }
}

export const storage = new MemStorage();

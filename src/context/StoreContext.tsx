
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Order, OrderStatus, products as initialProducts, sampleOrders } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerInfo: CustomerInfo) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getProductById: (productId: string) => Product | undefined;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  const placeOrder = (customerInfo: CustomerInfo): string => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return "";
    }

    const newOrderId = `ORD-${orders.length + 1}`.padStart(7, '0');
    const now = new Date().toISOString();
    
    const newOrder: Order = {
      id: newOrderId,
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        pricePerUnit: item.product.price,
      })),
      customer: customerInfo,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      total: cartTotal,
    };

    setOrders(prev => [...prev, newOrder]);
    clearCart();
    
    toast({
      title: "Order placed successfully",
      description: `Your order #${newOrderId} has been placed`,
    });
    
    return newOrderId;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status, 
              updatedAt: new Date().toISOString() 
            } 
          : order
      )
    );
    
    toast({
      title: "Order updated",
      description: `Order #${orderId} status changed to ${status}`,
    });
  };

  const addProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
    };
    
    setProducts(prev => [...prev, newProduct]);
    
    toast({
      title: "Product added",
      description: `${product.name} has been added to catalog`,
    });
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => 
      prev.map(p => p.id === product.id ? product : p)
    );
    
    toast({
      title: "Product updated",
      description: `${product.name} has been updated`,
    });
  };

  const deleteProduct = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    if (!productToDelete) return;
    
    setProducts(prev => prev.filter(p => p.id !== productId));
    
    toast({
      title: "Product deleted",
      description: `${productToDelete.name} has been removed from catalog`,
    });
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        getOrderById,
        getProductById,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

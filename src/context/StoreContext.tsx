import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Order, OrderStatus, products as initialProducts, sampleOrders } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useOrders, useOrder, usePlaceOrder, useUpdateOrderStatus } from "@/hooks/useOrders";

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
  // DATA from Supabase (instead of local useState/mockdata)
  const { data: products = [], refetch: refetchProducts } = useProducts();
  const { data: orders = [], refetch: refetchOrders } = useOrders();

  // Cart remains local/client state
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Mutations from hooks
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const placeOrderMutation = usePlaceOrder();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  // Cart-related helper functions (same as before)
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

  // All product-related functions now use Supabase mutations
  const addProduct = (product: Product) => {
    addProductMutation.mutate(product);
    // toast will be triggered by useEffect on mutation success/fail (could move, for now keep as is)
    toast({
      title: "Product added",
      description: `${product.name} has been added to catalog`,
    });
  };

  const updateProduct = (product: Product) => {
    updateProductMutation.mutate(product);
    toast({
      title: "Product updated",
      description: `${product.name} has been updated`,
    });
  };

  const deleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
    toast({
      title: "Product deleted",
      description: `Product has been removed from catalog`,
    });
  };

  const getProductById = (productId: string) => products.find((p) => p.id === productId);

  // Order CRUD — all go to Supabase backend
  const placeOrder = (customerInfo: CustomerInfo): string => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return "";
    }

    // Build items array for backend
    const items = cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      pricePerUnit: item.product.price,
    }));
    let orderId = "";

    placeOrderMutation.mutate(
      { items, customer: customerInfo, total: cartTotal },
      {
        onSuccess: (id) => {
          clearCart();
          orderId = id as string;
          toast({
            title: "Order placed successfully",
            description: `Your order #${id} has been placed`,
          });
        },
      }
    );
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatusMutation.mutate({ orderId, status });
    toast({
      title: "Order updated",
      description: `Order #${orderId} status changed to ${status}`,
    });
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);

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

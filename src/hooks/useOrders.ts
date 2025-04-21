
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderStatus } from "@/lib/mockData";

/** Fetch all orders */
export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      // Fetch orders from Supabase
      const { data: orders, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      
      // Fetch all order items
      const { data: orderItems, error: itemsError } = await supabase.from("order_items").select("*");
      if (itemsError) throw itemsError;
      
      // Transform Supabase data to match our Order interface
      return (orders || []).map(order => ({
        id: order.id,
        items: (orderItems || [])
          .filter(item => item.order_id === order.id)
          .map(item => ({
            productId: item.product_id,
            quantity: item.quantity,
            pricePerUnit: Number(item.price_per_unit)
          })),
        customer: {
          name: order.customer_name,
          email: order.customer_email,
          phone: order.customer_phone,
          address: order.customer_address
        },
        status: order.status as OrderStatus,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        total: Number(order.total)
      }));
    },
  });
}

/** Fetch single order by id */
export function useOrder(orderId: string) {
  return useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      // Fetch order from Supabase
      const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).maybeSingle();
      if (error) throw error;
      if (!order) return null;
      
      // Fetch order items
      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);
      if (itemsError) throw itemsError;
      
      // Transform Supabase data to match our Order interface
      return {
        id: order.id,
        items: (orderItems || []).map(item => ({
          productId: item.product_id,
          quantity: item.quantity,
          pricePerUnit: Number(item.price_per_unit)
        })),
        customer: {
          name: order.customer_name,
          email: order.customer_email,
          phone: order.customer_phone,
          address: order.customer_address
        },
        status: order.status as OrderStatus,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        total: Number(order.total)
      };
    },
    enabled: !!orderId,
  });
}

/** Place a new order */
export function usePlaceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      items,
      customer,
      total,
    }: {
      items: { productId: string; quantity: number; pricePerUnit: number }[];
      customer: { name: string; email: string; phone: string; address: string };
      total: number;
    }) => {
      // Insert into orders table
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
          customer_address: customer.address,
          status: "pending",
          total,
        })
        .select()
        .single();
      if (orderErr) throw orderErr;

      // Insert all items into order_items table
      for (const item of items) {
        const { error: itemErr } = await supabase.from("order_items").insert({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
          price_per_unit: item.pricePerUnit,
        });
        if (itemErr) throw itemErr;
      }

      return order.id as string;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

/** Update order status */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

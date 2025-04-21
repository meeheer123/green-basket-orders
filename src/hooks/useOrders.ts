
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderStatus } from "@/lib/mockData";

/** Fetch all orders */
export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as Order[];
    },
  });
}

/** Fetch single order by id */
export function useOrder(orderId: string) {
  return useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).maybeSingle();
      if (error) throw error;
      return data as Order | null;
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

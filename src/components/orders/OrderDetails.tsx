
import React from "react";
import { Order, Product } from "@/lib/mockData";
import { useStore } from "@/context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { getProductById } = useStore();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-heading">Order #{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Customer Information</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Name:</span> {order.customer.name}</p>
              <p><span className="font-medium">Email:</span> {order.customer.email}</p>
              <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
              <p><span className="font-medium">Address:</span> {order.customer.address}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Order Status</h3>
            <p className="text-sm">
              {order.status === "pending" ? "Your order has been received and is awaiting processing." :
               order.status === "in-progress" ? "Your order is currently being processed and prepared for delivery." :
               order.status === "delivered" ? "Your order has been delivered successfully." : 
               "Status unknown"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date(order.updatedAt).toLocaleDateString()} at{" "}
              {new Date(order.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <h3 className="font-medium mb-3">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => {
            const product = getProductById(item.productId);
            return (
              <div key={item.productId} className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-gb-green-50 flex-shrink-0">
                  <img 
                    src={product?.image || "/placeholder.svg"} 
                    alt={product?.name || "Product"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{product?.name || `Product #${item.productId}`}</h4>
                  <div className="text-sm text-muted-foreground">
                    ${item.pricePerUnit.toFixed(2)} / {product?.unit || "unit"} × {item.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${(item.pricePerUnit * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

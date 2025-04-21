
import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { OrderDetails } from "./OrderDetails";

export const OrderTracker = () => {
  const { getOrderById } = useStore();
  const [orderId, setOrderId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<ReturnType<typeof getOrderById>>(undefined);
  const [isSearched, setIsSearched] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = getOrderById(orderId);
    setSearchedOrder(order);
    setIsSearched(true);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-heading font-medium mb-4">Track Your Order</h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <div className="flex gap-2">
                <Input
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. ORD-001"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-gb-green-500 hover:bg-gb-green-600"
                >
                  Track
                </Button>
              </div>
            </div>
          </form>
          
          {isSearched && (
            <div className="mt-8">
              {searchedOrder ? (
                <OrderDetails order={searchedOrder} />
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">Order Not Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find an order with the ID: {orderId}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Please check the order ID and try again.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

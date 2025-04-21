
import React, { useState } from "react";
import { OrderList } from "../orders/OrderList";
import { Order, OrderStatus } from "@/lib/mockData";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderDetails } from "../orders/OrderDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const OrderManagement = () => {
  const { orders, updateOrderStatus } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>("pending");
  
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const inProgressOrders = orders.filter((order) => order.status === "in-progress");
  const deliveredOrders = orders.filter((order) => order.status === "delivered");
  
  const selectedOrder = orders.find((order) => order.id === selectedOrderId);
  
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
  };
  
  const handleUpdateStatus = () => {
    if (selectedOrderId) {
      updateOrderStatus(selectedOrderId, newStatus);
      setIsUpdateDialogOpen(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-semibold">Order Management</h2>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({inProgressOrders.length})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({deliveredOrders.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <OrderList 
                orders={orders} 
                isAdmin 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <OrderList 
                orders={pendingOrders} 
                isAdmin 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <OrderList 
                orders={inProgressOrders} 
                isAdmin 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivered" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <OrderList 
                orders={deliveredOrders} 
                isAdmin 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedOrder && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-medium">
              Order Details
            </h3>
            <Button 
              className="bg-gb-green-500 hover:bg-gb-green-600"
              onClick={() => setIsUpdateDialogOpen(true)}
            >
              Update Status
            </Button>
          </div>
          <OrderDetails order={selectedOrder} />
        </div>
      )}
      
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">New Status</Label>
              <Select 
                value={newStatus} 
                onValueChange={(value) => setNewStatus(value as OrderStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsUpdateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-gb-green-500 hover:bg-gb-green-600"
              onClick={handleUpdateStatus}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, placeOrder } = useStore();
  const [customerInfo, setCustomerInfo] = useState<CustomerFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderId = placeOrder(customerInfo);
    if (orderId) {
      navigate(`/order/${orderId}`);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
        <Button onClick={() => navigate("/")} className="bg-gb-green-500 hover:bg-gb-green-600">
          Browse Products
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-heading font-medium mb-4">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                name="address"
                rows={3}
                value={customerInfo.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4 bg-gb-green-500 hover:bg-gb-green-600"
            >
              Place Order
            </Button>
          </form>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-heading font-medium mb-4">Order Summary</h2>
        <div className="bg-gb-green-50 rounded-lg p-4">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-start gap-3">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-white flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    ${item.product.price.toFixed(2)} / {item.product.unit} × {item.quantity}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

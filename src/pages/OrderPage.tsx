
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { OrderDetails } from "@/components/orders/OrderDetails";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";

const OrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useStore();
  
  const order = orderId ? getOrderById(orderId) : undefined;
  
  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-heading font-semibold mb-4">Order Not Found</h1>
          <p className="text-lg mb-8">
            We couldn't find an order with the ID: {orderId}
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-gb-green-500 hover:bg-gb-green-600"
          >
            Return to Shop
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-heading font-semibold mb-6">
            Order Details
          </h1>
          <OrderDetails order={order} />
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Thank you for your order! If you have any questions, please contact our customer support.
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="bg-gb-green-500 hover:bg-gb-green-600"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;

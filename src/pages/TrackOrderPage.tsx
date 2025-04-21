
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { OrderTracker } from "@/components/orders/OrderTracker";

const TrackOrderPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-semibold mb-2">
            Track Your Order
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your order ID below to check the current status of your order.
          </p>
        </div>
        
        <OrderTracker />
      </div>
    </Layout>
  );
};

export default TrackOrderPage;

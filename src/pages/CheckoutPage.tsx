
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

const CheckoutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-semibold mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default CheckoutPage;

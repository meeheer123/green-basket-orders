
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useStore } from "@/context/StoreContext";

const Index = () => {
  const { products } = useStore();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gb-green-700 mb-4">
            Fresh, Local Produce
          </h1>
          <p className="text-lg text-gb-green-900 max-w-2xl mx-auto">
            Browse our selection of farm-fresh fruits and vegetables, 
            available for bulk orders with delivery right to your doorstep.
          </p>
        </div>
        <ProductGrid products={products} />
      </div>
    </Layout>
  );
};

export default Index;

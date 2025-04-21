
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-semibold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="products">Product Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;

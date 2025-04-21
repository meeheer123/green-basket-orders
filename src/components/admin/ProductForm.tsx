
import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/lib/mockData";

interface ProductFormProps {
  initialProduct?: Product;
  onSave: () => void;
}

export const ProductForm = ({ initialProduct, onSave }: ProductFormProps) => {
  const { addProduct, updateProduct } = useStore();
  const [product, setProduct] = useState<Partial<Product>>(
    initialProduct || {
      name: "",
      price: 0,
      unit: "kg",
      category: "vegetable",
      description: "",
      image: "/placeholder.svg",
    }
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (initialProduct) {
      updateProduct(product as Product);
    } else {
      addProduct(product as Product);
    }
    
    onSave();
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={product.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={product.category} 
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetable">Vegetable</SelectItem>
              <SelectItem value="fruit">Fruit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={product.price || ""}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="unit">Unit</Label>
          <Select 
            value={product.unit} 
            onValueChange={(value) => handleSelectChange("unit", value)}
          >
            <SelectTrigger id="unit">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="lb">Pound (lb)</SelectItem>
              <SelectItem value="piece">Piece</SelectItem>
              <SelectItem value="bunch">Bunch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          value={product.description || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={product.image || ""}
          onChange={handleChange}
          placeholder="/placeholder.svg"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gb-green-500 hover:bg-gb-green-600">
          {initialProduct ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/mockData";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore();
  
  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-square overflow-hidden bg-gb-green-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-gb-green-100 text-gb-green-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
        <div className="mt-2 text-lg font-semibold text-gb-green-700">
          ${product.price.toFixed(2)} <span className="text-sm font-normal">/ {product.unit}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          className="w-full bg-gb-green-500 hover:bg-gb-green-600"
          onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

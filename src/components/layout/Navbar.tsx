
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/StoreContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  const { cart } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-gb-green-100 py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="bg-gb-green-500 text-white p-2 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </span>
          <h1 className="text-gb-green-700 font-heading text-xl md:text-2xl font-semibold">
            Green Basket
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gb-green-900 hover:text-gb-green-700 font-medium">
            Products
          </Link>
          <Link to="/track-order" className="text-gb-green-900 hover:text-gb-green-700 font-medium">
            Track Order
          </Link>
          <Link to="/admin" className="text-gb-green-900 hover:text-gb-green-700 font-medium">
            Admin
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-gb-green-500 text-white px-1.5 min-w-[20px] h-5 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <CartSidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-gb-green-500 text-white px-1.5 min-w-[20px] h-5 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <CartSidebar />
            </SheetContent>
          </Sheet>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gb-green-100 shadow-lg animate-fade-in">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              to="/" 
              className="text-gb-green-900 hover:text-gb-green-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/track-order" 
              className="text-gb-green-900 hover:text-gb-green-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Order
            </Link>
            <Link 
              to="/admin" 
              className="text-gb-green-900 hover:text-gb-green-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const CartSidebar = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useStore();

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-heading font-semibold mb-4">Your Cart</h3>
      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <ShoppingCart className="h-12 w-12 text-gb-green-300 mb-2" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <Link to="/">
            <Button variant="link" className="mt-2 text-gb-green-600">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-start py-3 border-b">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-gb-green-50 flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)} / {item.product.unit}
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
                      </Button>
                      <span className="mx-2 min-w-[24px] text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      >
                        <span className="sr-only">Increase quantity</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-red-500 hover:text-red-700 p-0"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between text-lg font-medium mb-4">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button className="w-full bg-gb-green-500 hover:bg-gb-green-600">
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

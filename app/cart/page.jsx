'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-12 text-center space-y-4">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Add some awesome comics to get started!
              </p>
              <Link href="/browse">
                <Button size="lg" className="font-bold">
                  Browse Comics
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <Link href={`/comic/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.coverImage || "/placeholder.svg"}
                          alt={item.title}
                          className="w-24 h-32 object-cover rounded-lg border-2 border-primary/30 hover:border-primary transition-colors"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/comic/${item.id}`} className="hover:text-primary transition-colors">
                          <h3 className="text-xl font-bold mb-1 line-clamp-1">{item.title}</h3>
                        </Link>
                        <p className="text-muted-foreground mb-4">{item.publisher}</p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-bold">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-accent font-medium">FREE</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{calculateTotal()}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout} 
                    size="lg" 
                    className="w-full text-lg font-bold"
                  >
                    Proceed to Checkout
                  </Button>

                  <Link href="/browse">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      Secure checkout with multiple payment options
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

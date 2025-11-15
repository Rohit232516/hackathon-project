'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ComicCard({ comic }) {
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const addToCart = async () => {
    setIsAdding(true);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item) => item.id === comic.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...comic, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Added to cart!",
      description: `${comic.title} has been added to your cart.`,
    });
    
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Card className="group overflow-hidden hover-comic-pop border-2 hover:border-primary/50 transition-all duration-300 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <Link href={`/comic/${comic.id}`}>
        <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted aspect-[3/4]">
          <img
            src={comic.coverImage || "/placeholder.svg"}
            alt={comic.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {comic.featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow-lg animate-neon">
              Featured
            </Badge>
          )}
          
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        </div>
      </Link>
      <CardContent className="p-4 space-y-2 relative z-10">
        <Link href={`/comic/${comic.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-bold text-lg line-clamp-1 text-balance">{comic.title}</h3>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Badge variant="outline" className="font-semibold">{comic.publisher}</Badge>
          <span>•</span>
          <span className="font-medium">{comic.genre}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">
          {comic.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2 relative z-10">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent animate-neon">
          ₹{comic.price}
        </span>
        <Button 
          onClick={addToCart} 
          size="sm" 
          className="font-bold gap-2 hover-glow relative overflow-hidden group/btn"
          disabled={isAdding}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          <ShoppingCart className="h-4 w-4 relative z-10" />
          <span className="relative z-10">{isAdding ? 'Adding...' : 'Add'}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

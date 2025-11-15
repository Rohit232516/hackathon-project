'use client';

import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Calendar, Tag, Users } from 'lucide-react';
import { useState } from 'react';


export default function ComicDetailClient({ initialComic }) {
  const [comic] = useState(initialComic);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!comic) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item) => item.id === comic.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...comic, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Added to cart!');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Comic Cover */}
          <div className="space-y-4">
            <div
              className={`relative overflow-hidden rounded-xl border-4 border-primary/50 transition-transform duration-300 ${
                isZoomed ? 'scale-110' : 'scale-100'
              }`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={comic.coverImage || '/placeholder.svg'}
                alt={comic.title}
                className="w-full h-auto object-cover"
              />
              {comic.featured && (
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-lg px-4 py-2">
                  FEATURED
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">Hover to zoom</p>
          </div>

          {/* Comic Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{comic.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-base px-3 py-1">
                  {comic.publisher}
                </Badge>
                <Badge variant="outline" className="text-base px-3 py-1">
                  {comic.genre}
                </Badge>
                <Badge variant="outline" className="text-base px-3 py-1">
                  {comic.character}
                </Badge>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-primary">₹{comic.price}</span>
                  <span className="text-muted-foreground">INR</span>
                </div>
                <Button onClick={addToCart} size="lg" className="w-full text-lg font-bold">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  ₹{comic.price} - Add to Cart
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{comic.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Creators</p>
                      <p className="font-medium">{comic.creators.join(', ')}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Release Date</p>
                      <p className="font-medium">
                        {new Date(comic.releaseDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Tag className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Publisher</p>
                      <p className="font-medium">{comic.publisher}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Tag className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Genre</p>
                      <p className="font-medium">{comic.genre}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Related Comics */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">More from {comic.publisher}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/** adjust import to access comicsData if you want related items client-side,
             * or pass related comics as prop from server to avoid importing on client. */}
          </div>
        </div>
      </div>
    </div>
  );
}
 
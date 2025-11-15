'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { comicsData } from '@/lib/comics-data';
import Link from 'next/link';

export function HeroCarousel() {
  const featuredComics = comicsData.filter(comic => comic.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 6000); // Increased interval to 6 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToSlide = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToPrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + featuredComics.length) % featuredComics.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % featuredComics.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const currentComic = featuredComics[currentIndex];

  return (
    <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-2xl shadow-2xl border border-border/50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 animate-bounce-slow">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-full shadow-lg">
                FEATURED RELEASE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {currentComic.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 text-pretty max-w-lg leading-relaxed">
              {currentComic.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/comic/${currentComic.id}`}>
                <Button size="lg" className="font-bold text-lg px-8 hover-glow bg-gradient-to-r from-primary to-secondary">
                  Read More
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="font-bold text-lg px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all">
                ₹{currentComic.price} - Add to Cart
              </Button>
            </div>
          </div>

          <div className="relative h-[350px] md:h-[450px] flex items-center justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur-2xl opacity-40 animate-pulse-slow" />
              <img
                src={currentComic.coverImage || "/placeholder.svg"}
                alt={currentComic.title}
                className="relative h-[350px] md:h-[450px] w-auto object-cover rounded-xl shadow-2xl border-4 border-white/20 backdrop-blur-sm"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-b from-background/50 to-transparent blur-xl" />
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-xl hover:bg-primary hover:text-primary-foreground transition-all z-20 h-12 w-12 rounded-full shadow-lg"
        onClick={goToPrevious}
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-xl hover:bg-primary hover:text-primary-foreground transition-all z-20 h-12 w-12 rounded-full shadow-lg"
        onClick={goToNext}
        disabled={isTransitioning}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {featuredComics.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-12 bg-gradient-to-r from-primary to-secondary shadow-lg' 
                : 'w-3 bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

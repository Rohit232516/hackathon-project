import { Navbar } from '@/components/navbar';
import { HeroCarousel } from '@/components/hero-carousel';
import { ComicCard } from '@/components/comic-card';
import { comicsData } from '@/lib/comics-data';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const newReleases = comicsData.slice(0, 4);
  const popularSeries = comicsData.filter(c => c.featured).slice(0, 3);
  const dcComics = comicsData.filter(c => c.publisher === 'DC').slice(0, 4);
  const marvelComics = comicsData.filter(c => c.publisher === 'Marvel').slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 animate-fade-in-up relative">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float-3d" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-parallax" style={{ animationDelay: '1s' }} />
        
        <HeroCarousel />
      </section>

      {/* New Releases Section */}
      <section className="container mx-auto px-4 py-12 animate-fade-in-up relative" style={{ animationDelay: '0.2s' }}>
        <div className="absolute -top-20 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-primary/10 animate-morph opacity-50" />
        
        <div className="flex items-center gap-3 mb-8 group relative z-10">
          <div className="p-2 bg-gradient-to-r from-primary to-blue-500 rounded-lg animate-neon">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent animate-burst">
            New Releases
          </h2>
          <Zap className="h-6 w-6 text-accent animate-glitch" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {newReleases.map((comic, index) => (
            <div key={comic.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-burst">
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Series Section */}
      <section className="relative py-16 my-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-blue-500/10 to-primary/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-3d" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-parallax" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-secondary to-blue-500 rounded-lg animate-neon">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
              Popular Series
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularSeries.map((comic, index) => (
              <div key={comic.id} style={{ animationDelay: `${index * 0.15}s` }} className="animate-fade-in-up">
                <ComicCard comic={comic} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publisher Spotlights Section */}
      <section className="container mx-auto px-4 py-12 relative">
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-accent/10 to-blue-500/10 animate-morph blur-2xl" style={{ animationDelay: '3s' }} />
        
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="p-2 bg-gradient-to-r from-accent to-blue-500 rounded-lg animate-neon">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
            Publisher Spotlights
          </h2>
        </div>
        
        {/* DC Comics */}
        <div className="mb-12 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 relative overflow-hidden group hover-depth">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-shimmer" />
          
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary flex items-center gap-2 relative z-10">
            <span className="w-2 h-8 bg-primary rounded-full animate-neon" />
            DC Comics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {dcComics.map((comic, index) => (
              <div key={comic.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-burst">
                <ComicCard comic={comic} />
              </div>
            ))}
          </div>
        </div>

        {/* Marvel Comics */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/20 relative overflow-hidden group hover-depth">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-secondary/20 animate-shimmer" style={{ animationDelay: '1s' }} />
          
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-secondary flex items-center gap-2 relative z-10">
            <span className="w-2 h-8 bg-secondary rounded-full animate-neon" />
            Marvel Comics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {marvelComics.map((comic, index) => (
              <div key={comic.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-burst">
                <ComicCard comic={comic} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-card via-card to-muted/50 border-t-2 border-primary/20 mt-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-blue-500 animate-shimmer" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float-3d" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl animate-parallax" />
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-2xl bg-gradient-to-r from-primary via-secondary to-blue-500 bg-clip-text text-transparent">
                ComicVerse Hub
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                Your ultimate destination for the latest comics and graphic novels. Join our community of comic enthusiasts!
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Shop</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">New Releases</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Best Sellers</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Publishers</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Genres</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-primary cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Shipping Info</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Returns</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Connect</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Discord</li>
                <li className="hover:text-primary cursor-pointer transition-colors">TikTok</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 ComicVerse Hub. All rights reserved. Made with ❤️ for comic lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

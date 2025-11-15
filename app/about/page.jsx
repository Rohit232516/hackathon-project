'use client';

import { Navbar } from '@/components/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Sparkles, ShoppingBag, Heart, Zap, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-balance">
              Welcome to <span className="text-primary">COMICVERSE</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              Your ultimate destination for digital comic books from the biggest publishers
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    COMICVERSE is dedicated to bringing the best comic book experience to fans worldwide. 
                    We curate an extensive collection from Marvel, DC, Image Comics, and more, making it 
                    easy for readers to discover, explore, and enjoy their favorite stories in one place.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Why Choose COMICVERSE?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <BookOpen className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Vast Collection</h3>
                      <p className="text-muted-foreground">
                        Access thousands of comics from Marvel, DC, Image, and independent publishers. 
                        From classic issues to the latest releases.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-cyan-500/10">
                      <Sparkles className="h-6 w-6 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
                      <p className="text-muted-foreground">
                        Our team handpicks featured comics and creates collections to help you discover 
                        hidden gems and trending series.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-indigo-500/10">
                      <ShoppingBag className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Easy Shopping</h3>
                      <p className="text-muted-foreground">
                        Simple browsing, filtering by publisher or genre, and secure checkout with 
                        multiple payment options including UPI and net banking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10">
                      <Zap className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Instant Access</h3>
                      <p className="text-muted-foreground">
                        Start reading immediately after purchase. No waiting, no shipping - just pure 
                        comic book enjoyment at your fingertips.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Publishers */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Featured Publishers</h2>
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="outline" className="text-lg px-6 py-3 font-bold">
                    Marvel Comics
                  </Badge>
                  <Badge variant="outline" className="text-lg px-6 py-3 font-bold">
                    DC Comics
                  </Badge>
                  <Badge variant="outline" className="text-lg px-6 py-3 font-bold">
                    Image Comics
                  </Badge>
                  <Badge variant="outline" className="text-lg px-6 py-3 font-bold">
                    And More
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-indigo-500/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <Globe className="h-16 w-16 mx-auto text-primary" />
              <h2 className="text-3xl font-bold">Join the COMICVERSE Community</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're a longtime collector or just starting your comic journey, 
                COMICVERSE is your gateway to endless stories, unforgettable characters, 
                and worlds beyond imagination.
              </p>
              <div className="pt-4">
                <a 
                  href="/browse" 
                  className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-bold transition-colors"
                >
                  Start Browsing Comics
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

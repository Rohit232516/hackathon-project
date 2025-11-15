'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { ComicCard } from '@/components/comic-card';
import { comicsData } from '@/lib/comics-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function BrowsePage() {
  const [selectedPublisher, setSelectedPublisher] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const publishers = ['all', ...Array.from(new Set(comicsData.map(c => c.publisher)))];
  const genres = ['all', ...Array.from(new Set(comicsData.map(c => c.genre)))];

  const filteredAndSortedComics = useMemo(() => {
    let filtered = [...comicsData];

    if (selectedPublisher !== 'all') {
      filtered = filtered.filter(c => c.publisher === selectedPublisher);
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(c => c.genre === selectedGenre);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'date':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [selectedPublisher, selectedGenre, sortBy]);

  const clearFilters = () => {
    setSelectedPublisher('all');
    setSelectedGenre('all');
    setSortBy('title');
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float-3d pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-full blur-3xl animate-parallax pointer-events-none" style={{ animationDelay: '2s' }} />
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-primary via-secondary to-blue-500 bg-clip-text text-transparent">
            Browse All Comics
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Explore our complete collection of comics and graphic novels
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 animate-scale-in relative overflow-hidden hover-depth">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-shimmer pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Filter & Sort</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Publisher</label>
              <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {publishers.map(pub => (
                    <SelectItem key={pub} value={pub}>
                      {pub === 'all' ? 'All Publishers' : pub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Genre</label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>
                      {genre === 'all' ? 'All Genres' : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low-High)</SelectItem>
                  <SelectItem value="price-high">Price (High-Low)</SelectItem>
                  <SelectItem value="date">Release Date (Newest)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-bold text-foreground animate-neon">{filteredAndSortedComics.length}</span> comics
          </p>
        </div>

        {/* Comics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedComics.map((comic, index) => (
            <div key={comic.id} style={{ animationDelay: `${index * 0.05}s` }} className="animate-burst">
              <ComicCard comic={comic} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedComics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No comics found matching your filters.</p>
            <Button onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

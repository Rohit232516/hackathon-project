// app/comic/[id]/page.jsx
import { notFound } from 'next/navigation';
import { comicsData } from '@/lib/comics-data';
import ComicDetailClient from './detailClient';

export async function generateStaticParams() {
  return comicsData.map((c) => ({ id: String(c.id) }));
}

export default function Page({ params }) {
  const id = String(params.id);
  const comic = comicsData.find((c) => String(c.id) === id);

  if (!comic) {
    notFound();
  }

  const relatedComics = comicsData
    .filter((c) => c.publisher === comic.publisher && String(c.id) !== id)
    .slice(0, 4);

  return <ComicDetailClient initialComic={comic} relatedComics={relatedComics} />;
}

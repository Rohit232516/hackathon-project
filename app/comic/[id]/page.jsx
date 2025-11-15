import { notFound } from 'next/navigation';
import { comicsData } from '@/lib/comics-data';
import ComicDetailClient from './detailClient';

export async function generateStaticParams() {
  // return an array like: [{ id: '1' }, { id: '2' }, ... ]
  return comicsData.map((c) => ({ id: String(c.id) }));
}

export default function Page({ params }) {
  const comic = comicsData.find((c) => String(c.id) === String(params.id));
  if (!comic) {
    notFound();
  }

  // pass the comic as initial data to the client component
  return <ComicDetailClient initialComic={comic} />;
}
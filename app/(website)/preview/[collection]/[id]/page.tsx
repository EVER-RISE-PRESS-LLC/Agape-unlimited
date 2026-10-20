import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { cms } from '@/lib/cms';
import { CMSDocument } from '@/components/cms/document';
import { LivePreview } from '@/components/cms/live-preview';
export const metadata = { title: 'Private preview', robots: { index: false, follow: false } };
export default async function Preview({ params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  if (!['pages', 'posts'].includes(collection) || !/^\d+$/.test(id)) notFound();
  const payload = await cms();
  const requestHeaders = await headers();
  const { user } = await payload.auth({ headers: requestHeaders });
  if (!user) redirect('/admin/login');
  const record = await payload.findByID({ collection: collection as 'pages' | 'posts', id: Number(id), draft: true, overrideAccess: false, user, depth: 2, disableErrors: true });
  if (!record) notFound();
  const host = requestHeaders.get('host') || 'localhost:3000';
  const protocol = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https';
  return <><LivePreview serverURL={`${protocol}://${host}`} /><CMSDocument record={record} post={collection === 'posts'} preview /></>;
}

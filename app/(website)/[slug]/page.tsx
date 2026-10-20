import { notFound, redirect } from 'next/navigation';
import { getPage, contentMetadata } from '@/lib/cms';
import { CMSDocument } from '@/components/cms/document';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const record = await getPage((await params).slug);
  if (!record) notFound();
  return contentMetadata(record);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug === 'home') redirect('/');
  const record = await getPage(slug);
  if (!record) notFound();
  return <CMSDocument record={record} />;
}

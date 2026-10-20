import { notFound } from 'next/navigation';
import { getPost, contentMetadata } from '@/lib/cms';
import { CMSDocument } from '@/components/cms/document';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const record = await getPost((await params).slug);
  if (!record) notFound();
  return contentMetadata(record, true);
}
export default async function Post({ params }: Props) {
  const record = await getPost((await params).slug);
  if (!record) notFound();
  return <CMSDocument record={record} post />;
}

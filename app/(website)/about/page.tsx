import OriginalPage, { metadata as originalMetadata } from '@/components/foundation-pages/about';
import { getPage, contentMetadata } from '@/lib/cms';
import { CMSDocument } from '@/components/cms/document';
export async function generateMetadata() {
  const record = await getPage('about');
  return record ? contentMetadata(record) : originalMetadata;
}
export default async function Page() {
  const record = await getPage('about');
  return record ? <CMSDocument record={record} /> : <OriginalPage />;
}

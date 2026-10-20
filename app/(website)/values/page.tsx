import OriginalPage, { metadata as originalMetadata } from '@/components/foundation-pages/values';
import { getPage, contentMetadata } from '@/lib/cms';
import { CMSDocument } from '@/components/cms/document';
export async function generateMetadata() {
  const record = await getPage('values');
  return record ? contentMetadata(record) : originalMetadata;
}
export default async function Page() {
  const record = await getPage('values');
  return record ? <CMSDocument record={record} /> : <OriginalPage />;
}

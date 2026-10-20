import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts } from '@/lib/cms';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Resources', 'Read articles and practical resources from Agape Unlimited Foundation.', '/resources');
export default async function Resources() {
  const posts = await getPosts();
  if (!posts.length) notFound();
  return <main id="main"><div className="page-intro section-shell"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-current="page">Resources</span></nav><h1>Resources</h1><p>Ideas, information, and practical ways to help.</p></div>
    <div className="section-shell cms-post-list">{posts.map((post) => <article key={post.id}><h2><Link href={`/resources/${post.slug}`}>{post.title}</Link></h2><p>{post.intro}</p><Link className="text-link" href={`/resources/${post.slug}`}>Read article<span className="sr-only">: {post.title}</span></Link></article>)}</div>
  </main>;
}

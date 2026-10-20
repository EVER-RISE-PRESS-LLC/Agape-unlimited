import Link from 'next/link';
import type { Page, Post } from '@/payload-types';
import { ContentBlocks } from './blocks';
import { StructuredData } from '@/components/structured-data';
import { ContactForm } from '@/components/contact-form';
import { contentPath } from '@/lib/cms';
import { canonicalUrl, organizationGraph } from '@/lib/seo';
import { site } from '@/lib/site';

export function CMSDocument({ record, post = false, preview = false }: { record: Page | Post; post?: boolean; preview?: boolean }) {
  const article = 'authorName' in record ? record : null;
  const url = canonicalUrl(contentPath(record, post));
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') }, ...(post ? [{ '@type': 'ListItem', position: 2, name: 'Resources', item: canonicalUrl('/resources') }] : []), { '@type': 'ListItem', position: post ? 3 : 2, name: record.title, item: url }];
  return <main id="main" className="cms-document">
    {preview && <div className="cms-preview-banner" role="status">Private preview — changes here may not be published yet. <Link href={`/admin/collections/${post ? 'posts' : 'pages'}/${record.id}`}>Return to editing</Link></div>}
    {!preview && <StructuredData data={post && article ? { '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: record.title, description: record.intro, author: { '@type': article.authorType || 'Person', name: article.authorName }, datePublished: record.publishedAt, dateModified: record.updatedAt, mainEntityOfPage: url, publisher: { '@id': `${canonicalUrl('/')}/#organization` }, citation: article.sources?.map((source) => source.url) },
      { '@type': 'BreadcrumbList', itemListElement: crumbs },
    ] } : record.slug === 'home' ? organizationGraph : { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs }} />}
    <div className="page-intro section-shell"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link>{post && <Link href="/resources">Resources</Link>}<span aria-current="page">{record.title}</span></nav>
      <h1>{record.title}</h1><div className="page-intro-copy"><p>{record.intro}</p></div>
      {article && <p className="cms-byline">By {article.authorName}{record.publishedAt && <> · {new Date(record.publishedAt).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</>}</p>}
    </div>
    <div className="section-shell cms-body"><ContentBlocks layout={record.layout || []} />
      {!post && record.slug === 'contact' && <section className="contact-form-panel"><h2>Send us a message.</h2><ContactForm /></section>}
      {!post && record.slug === 'donate' && <section className="cms-cta"><h2>Give with care.</h2>{site.donationUrl ? <a className="button" href={site.donationUrl}>Continue to donate</a> : <><p>Online giving is being set up.</p><Link href="/contact?topic=donation" className="button">Talk to us about giving</Link></>}</section>}
      {article?.sources?.length ? <section className="cms-sources"><h2>Sources and further reading</h2><ul>{article.sources.map((source) => <li key={source.id || source.url}><a href={source.url}>{source.title}</a></li>)}</ul></section> : null}
      {article?.relatedPosts?.some((related) => typeof related === 'object' && related._status === 'published') && <section className="cms-sources"><h2>Related articles</h2><ul>{article.relatedPosts.map((related) => typeof related === 'object' && related._status === 'published' && <li key={related.id}><Link href={`/resources/${related.slug}`}>{related.title}</Link></li>)}</ul></section>}
    </div>
  </main>;
}

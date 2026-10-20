import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { Page } from '@/payload-types';
import { Worksheet } from './worksheet';

export function ContentBlocks({ layout }: { layout: Page['layout'] }) {
  return <div className="cms-sections">{layout?.map((block, index) => {
    const key = block.id || index;
    switch (block.blockType) {
      case 'text': return <section className="cms-text prose" key={key}>{block.content && <RichText data={block.content} />}</section>;
      case 'image': {
        const media = typeof block.image === 'object' ? block.image : null;
        if (!media?.url) return null;
        if (media.mimeType === 'application/pdf') return <p key={key}><a href={media.url}>{block.caption || media.alt} (PDF)</a></p>;
        return <figure className="cms-image" key={key}><Image src={media.url} alt={media.alt} width={media.width || 1200} height={media.height || 800} unoptimized />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
      }
      case 'callToAction': return <section className="cms-cta" key={key}><h2>{block.heading}</h2>{block.text && <p>{block.text}</p>}<Link className="button" href={block.url}>{block.label}</Link></section>;
      case 'faq': return <section key={key}><h2>{block.heading}</h2><div className="faq-list">{(block.questions || []).map((item) => <details key={item.id || item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>;
      case 'worksheet': return <Worksheet key={key} heading={block.heading} instructions={block.instructions} fields={block.fields || []} />;
    }
  })}</div>;
}

'use client';
import { useId, useState } from 'react';
export function Worksheet({ heading, instructions, fields }: { heading: string; instructions: string; fields: { label: string; multiline?: boolean | null; id?: string | null }[] }) {
  const id = useId();
  const [values, setValues] = useState<Record<number, string>>({});
  return <section className="resource-worksheet" aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`}>{heading}</h2><p>{instructions}</p>
    <p className="worksheet-note">Your entries stay in this page and are not sent or saved. Print a paper or PDF copy before leaving.</p>
    <div className="worksheet-fields">{fields.map((field, index) => {
      const props = { id: `${id}-${index}`, value: values[index] || '', autoComplete: 'off', onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((current) => ({ ...current, [index]: event.target.value })) };
      return <div className="worksheet-field" key={field.id || index}><label htmlFor={props.id}>{field.label}</label>
        {field.multiline ? <textarea {...props} rows={4} /> : <input {...props} />}
        <div className="worksheet-print-value" aria-hidden="true">{values[index] || ' '}</div>
      </div>;
    })}</div>
    <button className="button worksheet-print-button" type="button" onClick={() => window.print()}>Print this page</button>
  </section>;
}

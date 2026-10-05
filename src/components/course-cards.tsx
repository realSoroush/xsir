import type { Course } from '@/lib/types';
import icons from '@/data/icons.json';
/** Keep the original badge's bold segment, without executing editable HTML. */
function Badge({ text }: { text: string }) {
 const match = /^(.*?)<b(?: dir="(ltr)")?>(.*?)<\/b>(.*)$/.exec(text);
 return match ? <>{match[1]}<b dir={match[2] as 'ltr' | undefined}>{match[3]}</b>{match[4]}</> : <>{text}</>;
}
export function SummaryCards({ courses }: { courses: Course[] }) {
 return courses.map(l => <article className="summary" key={l.id}>
  <div className="summary-art"><span className="course-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html: icons[l.art]}} /></span></div>
  <div className="summary-top"><span className="layer-pill">دوره {l.n}</span><span className="summary-label" dir="ltr">{l.en}</span></div>
  <h3>{l.title}</h3><p>{l.summary}</p><span className="summary-teacher">با {l.teacher}</span><a className="outline-button" href={`#layer-${l.id}`}>{l.more}</a>
 </article>);
}
export function LayerCards({ courses }: { courses: Course[] }) {
 return courses.map(l => <article className={`layer-row ${l.id === 2 ? 'reverse' : ''}`} id={`layer-${l.id}`} key={l.id}>
 <div className="track-node" aria-hidden="true">{['','۱','۲','۳'][l.id]}</div>
 <div className="portrait-panel"><img src={`/assets/${l.image}.webp`} alt={`${l.teacher} در استودیوی آموزش 2FX`} width="1258" height="800" loading="lazy" />
 <span className={`image-level ${l.id === 3 ? 'gold' : ''}`}>دوره {l.n}<span dir="ltr">{l.en}</span></span>
 <span className="float-badge b1"><Badge text={l.badge1} /></span><span className="float-badge b2"><i className="check-icon">✓</i>{l.badge2}</span>
 <div className="image-caption"><strong>{l.teacher}</strong><span>{l.role}</span></div></div>
 <div className="layer-copy"><span className="eyebrow">{l.tag}</span><h2>{l.title}</h2><p className="product-title">{l.product}</p><p>{l.description}</p>
 <div className="benefits">{l.benefits.map((b,i)=><span key={i}>{b}</span>)}</div><p className="teacher-proof">{l.proof}</p>
 <div className="activation"><span className="activation-label">شرط فعال‌سازی</span><strong>{l.condition}</strong><span className="activation-hint">{l.hint}</span></div>
 <button className={`button activate ${l.id === 3 ? 'gold-button' : ''}`} data-layer={l.id}>فعال‌سازی دوره {l.n}</button></div>
 </article>);
}

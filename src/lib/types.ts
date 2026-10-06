export interface Course {
 popup?: unknown;
 id: 1 | 2 | 3;
 n: string; en: string; teacher: string; role: string;
 image: 'pouria' | 'amir' | 'atrin'; art: 'learn' | 'live' | 'master';
 summary: string; more: string; tag: string; title: string; product: string;
 description: string; benefits: string[]; proof: string; condition: string;
 hint: string; badge1: string; badge2: string;
}
/** Narrow all remotely editable content; only original local assets are permitted. */
export function isCourse(value: unknown): value is Course {
 if (!value || typeof value !== 'object') return false;
 const c = value as Record<string, unknown>;
 const strings = ['n','en','teacher','role','summary','more','tag','title','product','description','proof','condition','hint','badge1','badge2'];
 return [1,2,3].includes(c.id as number) &&
 ['pouria','amir','atrin'].includes(c.image as string) &&
 ['learn','live','master'].includes(c.art as string) &&
 strings.every(k => typeof c[k] === 'string') &&
 Array.isArray(c.benefits) && c.benefits.every(b => typeof b === 'string');
}

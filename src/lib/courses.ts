import 'server-only';
import original from '@/data/courses.json';
import { isCourse, type Course } from './types';
import { createContentClient } from './supabase/server';
const defaults: Course[] = original.filter(isCourse);
export async function getCourses(): Promise<Course[]> {
 try {
  const client = createContentClient();
  if (!client) return defaults;
  const { data, error } = await client.from('xsir_courses').select('id, content').eq('published', true).order('id');
  const courses: Course[] = [];
  for (const row of data || []) {
   if (!isCourse(row.content) || row.content.id !== row.id) throw new Error('Invalid course content');
   courses.push(row.content);
  }
  if (error || courses.length !== 3 || new Set(courses.map(c => c.id)).size !== 3) throw new Error('Incomplete course content');
  return courses;
 } catch {
  console.warn('XSIR: remote content unavailable or invalid; using original content.');
  return defaults;
 }
}

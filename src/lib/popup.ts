import type { Course } from './types';

export interface CoursePopup {
 eyebrow: string;
 title: string;
 description: string;
 request_text: string;
 copy_label: string;
 button_label: string;
 button_url: string;
 note: string;
 close_label: string;
 copied_text: string;
 copy_error_text: string;
}

export function safeButtonUrl(value: string): string {
 try {
  const url = new URL(value);
  return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
 } catch { return ''; }
}

/** Plain text only. Partial JSON edits fall back field by field. */
export function resolvePopup(course: Course, hasSupport = false): CoursePopup {
 const result: CoursePopup = {
  eyebrow: 'طرح ویژه اکسیر',
  title: 'فعال‌سازی دوره {course_n}',
  description: 'متن درخواستت آماده است؛ برای بررسی شرایط و دریافت دسترسی، آن را برای پشتیبانی 2FX ارسال کن.',
  request_text: 'سلام، برای فعال‌سازی دوره {course_n} طرح اکسیر پیام می‌دهم.\nلطفاً برای {condition} و دریافت دسترسی این دوره راهنمایی‌ام کنید.',
  copy_label: 'کپی درخواست',
  button_label: 'ارسال در تلگرام',
  button_url: '',
  note: hasSupport ? 'پشتیبانی مراحل فعال‌سازی را با شما پیگیری می‌کند.' : 'در تلگرام، گفت‌وگوی پشتیبانی 2FX را برای ارسال انتخاب کن.',
  close_label: 'بستن',
  copied_text: 'درخواست کپی شد.',
  copy_error_text: 'متن انتخاب شد؛ آن را کپی کن.',
 };
 const remote = course.popup;
 if (remote && typeof remote === 'object' && !Array.isArray(remote)) {
  const fields = remote as Record<string, unknown>;
  for (const key of Object.keys(result) as (keyof CoursePopup)[]) {
   if (typeof fields[key] === 'string') result[key] = fields[key] as string;
  }
 }
 result.button_url = safeButtonUrl(result.button_url.trim());
 const tokens: Record<string, string> = {
  course_n: course.n, course_title: course.title, teacher: course.teacher, condition: course.condition,
 };
 for (const key of Object.keys(result) as (keyof CoursePopup)[]) {
  if (key !== 'button_url') result[key] = result[key].replace(
   /\{(course_n|course_title|teacher|condition)\}/g, (_, token: string) => tokens[token]
  );
 }
 return result;
}

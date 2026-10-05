import type { Course } from './types';
/** Original menu, activation dialog and progress behavior; cleanup supports React StrictMode. */
export function initializeLanding(courses: Course[]) {
 const controller = new AbortController();
 const { signal } = controller;
 const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
 const nav = document.querySelector<HTMLElement>('.mobile-nav')!;
 menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'بستن منو' : 'بازکردن منو');
 }, { signal });
 nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded','false');
 }, { signal }));
 const dialog = document.querySelector<HTMLDialogElement>('#activation-dialog')!;
 const preview = document.querySelector<HTMLElement>('#request-preview')!;
 const status = document.querySelector<HTMLElement>('.copy-status')!;
 let requestText = '';
 const configured = process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM_URL?.trim() || '';
 const supportUrl = /^https:\/\/t\.me\/[A-Za-z0-9_]{5,32}\/?$/.test(configured) ? configured : '';
 document.querySelectorAll<HTMLButtonElement>('.activate').forEach(button => button.addEventListener('click', () => {
  const l = courses.find(course => course.id === Number(button.dataset.layer));
  if (!l) return;
  document.querySelector<HTMLElement>('#activation-title')!.textContent = `فعال‌سازی دوره ${l.n}`;
  requestText = `سلام، برای فعال‌سازی دوره ${l.n} طرح اکسیر پیام می‌دهم.\nلطفاً برای ${l.condition} و دریافت دسترسی این دوره راهنمایی‌ام کنید.`;
  preview.textContent = requestText; status.textContent = '';
  document.querySelector<HTMLAnchorElement>('#telegram-link')!.href = supportUrl || `https://t.me/share/url?url=${encodeURIComponent(location.href.split('#')[0])}&text=${encodeURIComponent(requestText)}`;
  document.querySelector<HTMLElement>('.modal-note')!.textContent = supportUrl ? 'پشتیبانی مراحل فعال‌سازی را با شما پیگیری می‌کند.' : 'در تلگرام، گفت‌وگوی پشتیبانی 2FX را برای ارسال انتخاب کن.';
  dialog.showModal();
 }, { signal }));
 document.querySelector('#copy-request')!.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(requestText); status.textContent = 'درخواست کپی شد.'; }
  catch {
   const range = document.createRange(); range.selectNodeContents(preview);
   const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range);
   status.textContent = 'متن انتخاب شد؛ آن را کپی کن.';
  }
 }, { signal });
 dialog.querySelector('.close-modal')!.addEventListener('click', () => dialog.close(), { signal });
 dialog.addEventListener('click', e => {
  if (e.target === dialog) {
   const r = dialog.getBoundingClientRect();
   if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }
 }, { signal });
 const track = document.querySelector<HTMLElement>('.layer-track')!;
 const fill = document.querySelector<HTMLElement>('.track-fill')!;
 let frame = 0;
 const updateTrack = () => {
  const r = track.getBoundingClientRect();
  fill.style.height = `${Math.max(0,Math.min(1,(innerHeight * .55 - r.top) / r.height)) * 100}%`;
  frame = 0;
 };
 window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateTrack); }, { passive: true, signal });
 window.addEventListener('resize', updateTrack, { signal }); updateTrack();
 return () => { controller.abort(); cancelAnimationFrame(frame); };
}

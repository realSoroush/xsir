-- Additive and repeatable: preserves course content, RLS and existing popup edits.
begin;
alter table public.xsir_courses
 add column if not exists popup jsonb
 check (popup is null or jsonb_typeof(popup) = 'object');
comment on column public.xsir_courses.popup is
 'Per-course activation dialog plain-text content and HTTPS button URL. Empty URL preserves Telegram fallback.';
update public.xsir_courses
set popup = '{"eyebrow": "طرح ویژه اکسیر", "title": "فعال‌سازی دوره {course_n}", "description": "متن درخواستت آماده است؛ برای بررسی شرایط و دریافت دسترسی، آن را برای پشتیبانی 2FX ارسال کن.", "request_text": "سلام، برای فعال‌سازی دوره {course_n} طرح اکسیر پیام می‌دهم.\nلطفاً برای {condition} و دریافت دسترسی این دوره راهنمایی‌ام کنید.", "copy_label": "کپی درخواست", "button_label": "ارسال در تلگرام", "button_url": "", "note": "در تلگرام، گفت‌وگوی پشتیبانی 2FX را برای ارسال انتخاب کن.", "close_label": "بستن", "copied_text": "درخواست کپی شد.", "copy_error_text": "متن انتخاب شد؛ آن را کپی کن."}'::jsonb
where popup is null;
commit;

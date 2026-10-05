import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "طرح ویژه اکسیر | همکاری 2FX و XS",
 description: "سه سطح دسترسی به منتورینگ البروکس، چارت مستری طلا، باشگاه قهرمانان و مسترکلاس تجربهٔ آترین. طرح همکاری 2FX و XS.",
};
export const viewport: Viewport = { themeColor: "#101011" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="fa" dir="rtl"><body>{children}</body></html>;
}

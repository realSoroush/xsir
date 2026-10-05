import { Landing } from "@/components/landing";
import { getCourses } from "@/lib/courses";
export const revalidate = 60;
export default async function Page() { return <Landing courses={await getCourses()} />; }

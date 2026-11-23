import { MetadataRoute } from "next";
import { getCourses, getCourseLessons } from "@/lib/data/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hussein-ali-english.onrender.com";
  const courses = await getCourses({ publishedOnly: true });

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  for (const course of courses) {
    routes.push({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: new Date(course.updated_at || course.created_at),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const lessons = await getCourseLessons(course.id, { publishedOnly: true });
    for (const lesson of lessons) {
      routes.push({
        url: `${baseUrl}/courses/${course.slug}/${lesson.slug}`,
        lastModified: new Date(lesson.updated_at || lesson.created_at),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return routes;
}

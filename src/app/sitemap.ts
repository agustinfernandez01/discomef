import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://discomef.com.ar/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://discomef.com.ar/productos",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://discomef.com.ar/conocermas",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Agregá más si tenés más páginas
  ];
}

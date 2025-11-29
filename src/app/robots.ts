import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/private/"], // Example disallowed paths
        },
        sitemap: "https://opulenss.com/sitemap.xml",
    };
}

import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Opulenss Private Members Club",
        short_name: "Opulenss",
        description: "A private, invite-only members club.",
        start_url: "/",
        display: "standalone",
        background_color: "#022c22", // emerald-deep
        theme_color: "#d4af37", // gold
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}

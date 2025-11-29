"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAppRoute = pathname?.startsWith("/app");
    const isAdminRoute = pathname?.startsWith("/admin");
    const isTalentRoute = pathname?.startsWith("/t");

    useEffect(() => {
        if (isAppRoute || isAdminRoute || isTalentRoute) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [isAppRoute, isAdminRoute, isTalentRoute]);

    return <>{children}</>;
}

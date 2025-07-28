"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const useLenis = () => {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		// Initialize Lenis
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false,
		});

		lenisRef.current = lenis;

		// Animation frame function
		function raf(time: number) {
			if (lenisRef.current) {
				lenisRef.current.raf(time);
				requestAnimationFrame(raf);
			}
		}

		// Start the animation loop
		requestAnimationFrame(raf);

		// Cleanup function
		return () => {
			if (lenisRef.current) {
				lenisRef.current.destroy();
				lenisRef.current = null;
			}
		};
	}, []);
};

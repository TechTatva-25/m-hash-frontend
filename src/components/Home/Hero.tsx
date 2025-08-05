"use client";

import React from "react";
import { motion } from "framer-motion";
import Iridescence from "../ui/iridescence";
import GlassmorphicButton from "../ui/GlassmorphicButton";

const Hero = () => {
	return (
		<div className="relative h-screen w-full overflow-hidden">
			{/* Single iridescence instance that's always visible */}
			<div className="absolute inset-0 w-full h-full">
				<Iridescence speed={0.5} amplitude={0.15} mouseReact={false} />
			</div>

			{/* Theme-responsive overlay - automatically visible in dark mode only */}
			<div className="absolute inset-0 bg-black/70 z-[1] transition-opacity duration-300 dark-overlay"></div>

			<div className="absolute left-1/2 top-1/2 mt-10 z-20 -translate-x-1/2 -translate-y-1/2 transform text-center">
				<motion.h1
					className="m-0 text-[clamp(2.5rem,8vw,5rem)] font-extrabold text-[hsl(var(--foreground))] mb-4"
					style={{ fontFamily: "var(--font-playfair-display)", letterSpacing: "0.16em" }}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}>
					Manipal Hackathon
				</motion.h1>

				<motion.h2
					className="m-0 text-[clamp(1.5rem,5vw,3rem)] font-semibold text-[hsl(var(--foreground))] mb-8"
					style={{ fontFamily: "var(--font-playfair-display)" }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}>
					2025
				</motion.h2>

				{/* Using the new reusable GlassmorphicButton */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}>
					<GlassmorphicButton text="Know More" href="#timeline" size="lg" showArrow={true} />
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;

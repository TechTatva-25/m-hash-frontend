"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

const galleryItems = [
	// Row 1: 3 items (1+2+1 = 4, but we'll use 1+1+1)
	{
		image: "/assets/tm-1.jpg",
		className: "col-span-1",
		rowGroup: 1,
	},
	{
		image: "/assets/tm-2.jpg",
		className: "col-span-1",
		rowGroup: 1,
	},
	{
		image: "/assets/tm-3.jpg",
		className: "col-span-1",
		rowGroup: 1,
	},

	// Row 2: 2 items (each taking 1.5 columns worth of space)
	{
		image: "/assets/tm-4.jpg",
		className: "col-span-2",
		rowGroup: 2,
	},
	{
		image: "/assets/about/abt1.jpg",
		className: "col-span-1",
		rowGroup: 2,
	},

	// Row 3: 3 items
	{
		image: "/assets/about/abt2.jpg",
		className: "col-span-1",
		rowGroup: 3,
	},
	{
		image: "/assets/tm-1.jpg",
		className: "col-span-1",
		rowGroup: 3,
	},
	{
		image: "/assets/tm-2.jpg",
		className: "col-span-1",
		rowGroup: 3,
	},

	// Row 4: 2 items
	{
		image: "/assets/tm-3.jpg",
		className: "col-span-1",
		rowGroup: 4,
	},
	{
		image: "/assets/tm-4.jpg",
		className: "col-span-2",
		rowGroup: 4,
	},

	// Row 5: 3 items
	{
		image: "/assets/about/abt1.jpg",
		className: "col-span-1",
		rowGroup: 5,
	},
	{
		image: "/assets/about/abt2.jpg",
		className: "col-span-1",
		rowGroup: 5,
	},
	{
		image: "/assets/tm-1.jpg",
		className: "col-span-1",
		rowGroup: 5,
	},
];

export default function Gallery(): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div className="relative">
			<div className="container mx-auto px-4">
				{/* Heading with motion underlines */}
				<div className="text-center mb-16">
					<motion.div
						className="relative inline-block mb-8"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}>
						<h2
							className="text-4xl md:text-5xl font-bold relative"
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: isDark ? "rgba(200, 240, 200, 0.95)" : "#005050",
								textShadow: isDark
									? "0 2px 8px rgba(46, 204, 113, 0.2)"
									: "0 2px 8px rgba(16, 109, 32, 0.15)",
							}}>
							Gallery & Moments
						</h2>

						{/* Royal Green decorative lines */}
						<motion.div
							className="absolute -bottom-3 left-0 right-0 h-1 rounded-full"
							style={{
								background: isDark
									? "linear-gradient(to right, rgba(46, 204, 113, 0.8), rgba(34, 197, 94, 0.6), rgba(46, 204, 113, 0.8))"
									: "#005050",
							}}
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							viewport={{ once: true }}
						/>
						<motion.div
							className="absolute -bottom-5 left-0 w-4/5 h-[0.5px] rounded-full"
							style={{
								background: isDark
									? "linear-gradient(to right, rgba(46, 204, 113, 0.6), rgba(34, 197, 94, 0.4), rgba(46, 204, 113, 0.6))"
									: "linear-gradient(to right, rgba(16, 109, 32, 0.6), rgba(34, 139, 34, 0.4), rgba(16, 109, 32, 0.6))",
							}}
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1, width: "100%" }}
							transition={{ duration: 0.8, delay: 0.7 }}
							viewport={{ once: true }}
						/>
					</motion.div>

					<motion.p
						className="text-lg text-muted-foreground max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}
						style={{
							color: isDark ? "rgba(200, 240, 200, 0.8)" : "rgba(16, 109, 32, 0.8)",
						}}>
						Explore the vibrant moments and experiences that define our hackathon journey
					</motion.p>
				</div>

				{/* Bento Grid Gallery */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					viewport={{ once: true }}>
					{/* Custom Gallery Grid */}
					<div className="max-w-6xl mx-auto space-y-4">
						{/* Group items by row */}
						{[1, 2, 3, 4, 5].map((rowNum) => {
							const rowItems = galleryItems.filter((item) => item.rowGroup === rowNum);
							return (
								<div key={rowNum} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
									{rowItems.map((item, index) => (
										<motion.div
											key={`${rowNum}-${index}`}
											className={`${item.className} rounded-xl overflow-hidden relative group`}
											style={{
												background: isDark
													? "linear-gradient(135deg, rgba(0, 40, 25, 0.8) 0%, rgba(0, 50, 30, 0.6) 100%)"
													: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)",
												backdropFilter: "blur(16px)",
												boxShadow: isDark
													? `0 8px 25px rgba(0, 0, 0, 0.3), 
                             0 0 0 1px rgba(46, 204, 113, 0.3),
                             inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
													: `0 8px 25px rgba(16, 109, 32, 0.15), 
                             0 0 0 1px rgba(16, 109, 32, 0.2),
                             inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
												border: isDark
													? "1px solid rgba(46, 204, 113, 0.4)"
													: "1px solid rgba(16, 109, 32, 0.3)",
											}}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											whileHover={{ scale: 1.02 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											viewport={{ once: true, margin: "-20px" }}>
											<div className="relative w-full h-full overflow-hidden">
												<Image
													src={item.image}
													alt={`Gallery image ${rowNum}-${index + 1}`}
													fill
													className="object-cover transition-all duration-500 group-hover:scale-110"
													style={{
														filter: isDark
															? "brightness(0.9) contrast(1.1) saturate(1.2)"
															: "brightness(1.1) contrast(1.05) saturate(1.1)",
													}}
													priority={rowNum <= 2}
													placeholder="blur"
													blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
												/>
												{/* Overlay for better visual effect */}
												<div
													className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
													style={{
														background: isDark
															? "linear-gradient(45deg, rgba(0, 40, 25, 0.3) 0%, rgba(0, 50, 30, 0.2) 100%)"
															: "linear-gradient(45deg, rgba(16, 109, 32, 0.1) 0%, rgba(34, 139, 34, 0.05) 100%)",
													}}
												/>
											</div>
										</motion.div>
									))}
								</div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</div>
	);
}

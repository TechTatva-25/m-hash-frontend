"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Image from "next/image";

export default function About(): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div className="relative">
			{/* Royal Green Glassmorphic Background - Only in light mode */}
			{!isDark && (
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl bg-green-400/6 animate-pulse-slow"></div>
					<div
						className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-emerald-400/5 animate-pulse-slow"
						style={{ animationDelay: "3s" }}></div>
				</div>
			)}

			<div className="container mx-auto px-4 relative z-10">
				{/* Enhanced Royal Green Glassmorphic Card */}
				<motion.div
					className="group relative backdrop-blur-2xl border rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]"
					style={{
						background: isDark
							? "linear-gradient(to bottom right, rgba(15, 25, 15, 0.8), rgba(10, 26, 15, 0.9), rgba(8, 20, 12, 0.85))"
							: "linear-gradient(to bottom right, rgba(240, 255, 245, 0.8), rgba(220, 252, 231, 0.7), rgba(235, 255, 240, 0.6))",
						borderColor: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.25)",
						boxShadow: isDark
							? "0 32px 64px -12px rgba(46, 204, 113, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
							: "0 32px 64px -12px rgba(16, 109, 32, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
					}}
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}>
					{/* Royal green rim accent */}
					<div
						className="absolute inset-0 rounded-3xl border pointer-events-none"
						style={{
							borderColor: isDark ? "rgba(46, 204, 113, 0.2)" : "rgba(16, 109, 32, 0.2)",
						}}></div>

					{/* Enhanced Royal Green Light Beam Effect */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out">
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-200/8 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out blur-sm"></div>
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-green-200/12 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1800 ease-out delay-100"></div>
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-100/8 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1600 ease-out delay-200 blur-xs"></div>
					</div>

					{/* Enhanced inner glow with royal green highlights */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent rounded-3xl"></div>
					<div
						className={`absolute inset-0 rounded-3xl ${
							isDark
								? "bg-gradient-to-tl from-emerald-500/8 via-transparent to-green-500/5"
								: "bg-gradient-to-tl from-green-500/5 via-transparent to-emerald-500/3"
						}`}></div>
					<div
						className={`absolute inset-0 rounded-3xl ${
							isDark
								? "bg-gradient-to-br from-emerald-300/8 via-transparent to-green-400/5"
								: "bg-gradient-to-br from-green-300/5 via-transparent to-emerald-400/3"
						}`}></div>

					<div className="flex flex-col md:flex-row p-6 md:p-10 gap-10 relative z-10">
						{/* Left side - M-Hash Logo */}
						<div className="md:w-2/5 flex justify-center items-center">
							<div className="w-full h-full flex justify-center items-center relative">
								{/* Royal green accent behind logo */}
								<div
									className={`absolute inset-0 rounded-2xl blur-sm ${
										isDark
											? "bg-gradient-to-br from-emerald-100/8 to-green-100/5"
											: "bg-gradient-to-br from-green-100/10 to-emerald-100/5"
									}`}></div>

								{/* M-Hash Logo */}
								<motion.div
									className="relative z-10"
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.8, delay: 0.2 }}
									viewport={{ once: true }}>
									<div className="relative group">
										{/* Glow effect behind logo */}
										<div
											className={`absolute inset-0 rounded-2xl blur-lg transition-all duration-500 group-hover:blur-xl ${
												isDark
													? "bg-gradient-to-br from-emerald-400/20 to-green-400/10"
													: "bg-gradient-to-br from-green-400/15 to-emerald-400/8"
											}`}></div>

										{/* Logo container */}
										<div
											className="relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105"
											style={{
												background: isDark
													? "linear-gradient(to bottom right, rgba(15, 25, 15, 0.6), rgba(10, 26, 15, 0.8))"
													: "linear-gradient(to bottom right, rgba(240, 255, 245, 0.6), rgba(220, 252, 231, 0.8))",
												borderColor: isDark
													? "rgba(46, 204, 113, 0.2)"
													: "rgba(16, 109, 32, 0.2)",
											}}>
											<Image
												src="/M-Hash-Logo.png"
												alt="M-Hash Logo"
												width={280}
												height={280}
												className="w-full h-auto object-contain"
												priority
											/>
										</div>
									</div>
								</motion.div>
							</div>
						</div>

						{/* Right side - About text */}
						<div className="md:w-3/5">
							<div className="relative inline-block mb-8">
								{/* Royal Green title */}
								<motion.h2
									className="text-4xl md:text-5xl font-bold relative"
									style={{
										fontFamily: "var(--font-playfair-display)",
										color: isDark ? "rgba(200, 240, 200, 0.95)" : "#005050",
										textShadow: isDark
											? "0 2px 8px rgba(46, 204, 113, 0.2)"
											: "0 2px 8px rgba(16, 109, 32, 0.15)",
									}}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									viewport={{ once: true }}>
									About Us
								</motion.h2>

								{/* Royal Green decorative lines - heading width only */}
								<motion.div
									className="absolute -bottom-3 left-0 right-0 h-1 rounded-full"
									style={{
										background: isDark ? "rgba(46, 204, 113, 0.8)" : "rgba(16, 109, 32, 0.8)",
									}}
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									transition={{ duration: 0.8, delay: 0.5 }}
									viewport={{ once: true }}
								/>
								<motion.div
									className="absolute -bottom-5 left-0 w-4/5 h-[0.5px] rounded-full"
									style={{
										background: isDark ? "rgba(46, 204, 113, 0.6)" : "rgba(16, 109, 32, 0.6)",
									}}
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1, width: "100%" }}
									transition={{ duration: 0.8, delay: 0.7 }}
									viewport={{ once: true }}
								/>
							</div>

							<motion.div
								className="space-y-6 text-base leading-relaxed"
								style={{
									color: isDark ? "rgba(200, 220, 200, 0.9)" : "rgba(40, 60, 40, 0.95)",
								}}
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
								viewport={{ once: true }}>
								<p>
									Manipal Hackathon M#, is one of India's premier student hackathons, bringing
									together brilliant minds from across the nation to solve real-world challenges
									through innovative technology solutions.
								</p>

								<p>
									Our hackathon provides a platform for students to showcase their creativity,
									technical skills, and problem-solving abilities while working on projects that can
									make a meaningful impact on society.
								</p>

								<p>
									With a focus on collaboration, innovation, and excellence, M# continues to be a
									catalyst for technological advancement and a launching pad for the next generation
									of tech leaders.
								</p>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

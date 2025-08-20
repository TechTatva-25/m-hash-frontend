"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";

const ccMembers = [
	{
		name: "Tanishq Kochar",
		image: "/images/Tanishq.jpeg",
		bio: "I write code that works... eventually. Full-time backend dev, part-time debugger, and professional coffee-dependent organism.",
		instagram: "https://instagram.com/tanishqkochar/",
		linkedin: "https://linkedin.com/in/tanishq-kochar",
	},
	{
		name: "Lakshya Jain",
		image: "/images/lakshya.jpeg",
		bio: "Mostly found wrestling with APIs and pretending bugs are features. Backend is my playground — just don't ask me about CSS.",
		instagram: "https://www.instagram.com/lakshyajain428/",
		linkedin: "https://www.linkedin.com/in/lakshya-jain-490ab9211/",
	},
	{
		name: "Prasanna Bhat",
		image: "/images/prasanna.jpg",
		bio: "Turning pixels into pages and rage into React. If it looks good, I made it. If it breaks on IE... it's a feature.",
		instagram: "https://instagram.com/prasanna.bhatt_",
		linkedin: "https://www.linkedin.com/in/prasanna-bhat-b259ba285/",
	},
	{
		name: "Shubham Panda",
		image: "/images/shubham.jpg",
		bio: "I bring Figma to life and sometimes to tears. Animations? Done. Responsiveness? Always. Sanity? Eh, debatable.",
		instagram: "https://www.instagram.com/suvm._/",
		linkedin: "https://www.linkedin.com/in/shubham-panda-699538258/",
	},
	{
		name: "Ahmed Sahigara",
		image: "/images/ahmad.jpeg",
		bio: "Always down for some clean architecture and chaotic deadlines. I break things so I can fix them better — poetic, I know.",
		instagram: "https://www.instagram.com/ahmdzy.s",
		linkedin: "https://www.linkedin.com/in/ahmed-sahigara",
	},
	{
		name: "Pulkit Kumar",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Sanya",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Ruchita",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Manas",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Sharika",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Prakhar",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Riddhima",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Raghav",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
	{
		name: "Aneesha",
		image: "/images/Pulkit.jpeg",
		bio: "Can be found high (on code obviously) building agentic AI to take away your jobs and trying to get rid of that pesky padding under the navbar with broken css skills",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
];

const MeetTheTeam: React.FC = () => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	// Different green accents for each platform
	const instagramColors = {
		background: isDark ? "rgba(34, 197, 94, 0.1)" : "rgba(34, 139, 34, 0.1)",
		border: isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 139, 34, 0.2)",
		color: isDark ? "rgba(34, 197, 94, 0.8)" : "rgba(34, 139, 34, 0.8)",
		hoverBackground: isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 139, 34, 0.15)",
		hoverBorder: isDark ? "rgba(34, 197, 94, 0.5)" : "rgba(34, 139, 34, 0.3)",
		hoverColor: isDark ? "rgba(34, 197, 94, 1)" : "rgba(34, 139, 34, 1)",
	};

	const linkedinColors = {
		background: isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(5, 150, 105, 0.1)",
		border: isDark ? "rgba(16, 185, 129, 0.3)" : "rgba(5, 150, 105, 0.2)",
		color: isDark ? "rgba(16, 185, 129, 0.8)" : "rgba(5, 150, 105, 0.8)",
		hoverBackground: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.15)",
		hoverBorder: isDark ? "rgba(16, 185, 129, 0.5)" : "rgba(5, 150, 105, 0.3)",
		hoverColor: isDark ? "rgba(16, 185, 129, 1)" : "rgba(5, 150, 105, 1)",
	};

	return (
		<div className="relative mt-20">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
					style={{
						background: isDark ? "rgba(34,102,68,0.1)" : "rgba(72,187,120,0.1)",
					}}></div>
				<div
					className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
					style={{
						animationDelay: "2s",
						background: isDark ? "rgba(52,168,83,0.1)" : "rgba(134,239,172,0.1)",
					}}></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Section heading */}
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
							Meet the Team
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
				</div>

				{/* Team members grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}>
					{ccMembers.map((member) => (
						<motion.div
							key={member.name}
							variants={itemVariants}
							whileHover={{ scale: 1.02, y: -5 }}
							className="group relative rounded-2xl overflow-hidden"
							style={{
								background: isDark
									? "linear-gradient(135deg, rgba(0, 40, 25, 0.8) 0%, rgba(0, 50, 30, 0.6) 100%)"
									: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)",
								backdropFilter: "blur(16px)",
								boxShadow: isDark
									? `0 10px 30px rgba(0, 0, 0, 0.3), 
                                       0 0 0 1px rgba(46, 204, 113, 0.3),
                                       inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
									: `0 10px 30px rgba(16, 109, 32, 0.15), 
                                       0 0 0 1px rgba(16, 109, 32, 0.2),
                                       inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
								border: isDark
									? "1px solid rgba(46, 204, 113, 0.4)"
									: "1px solid rgba(16, 109, 32, 0.3)",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = isDark
									? "linear-gradient(135deg, rgba(0, 50, 30, 0.9) 0%, rgba(0, 60, 35, 0.7) 100%)"
									: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 255, 245, 0.85) 100%)";
								e.currentTarget.style.boxShadow = isDark
									? `0 15px 40px rgba(0, 0, 0, 0.4), 
                                       0 0 20px rgba(46, 204, 113, 0.2),
                                       0 0 0 1px rgba(46, 204, 113, 0.5),
                                       inset 0 1px 0 0 rgba(46, 204, 113, 0.1)`
									: `0 15px 40px rgba(16, 109, 32, 0.2), 
                                       0 0 20px rgba(16, 109, 32, 0.15),
                                       0 0 0 1px rgba(16, 109, 32, 0.3),
                                       inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = isDark
									? "linear-gradient(135deg, rgba(0, 40, 25, 0.8) 0%, rgba(0, 50, 30, 0.6) 100%)"
									: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)";
								e.currentTarget.style.boxShadow = isDark
									? `0 10px 30px rgba(0, 0, 0, 0.3), 
                                       0 0 0 1px rgba(46, 204, 113, 0.3),
                                       inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
									: `0 10px 30px rgba(16, 109, 32, 0.15), 
                                       0 0 0 1px rgba(16, 109, 32, 0.2),
                                       inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`;
							}}>
							{/* Card content */}
							<div className="p-6 text-center">
								{/* Avatar */}
								<div className="relative mb-6 mx-auto w-24 h-24">
									<div
										className="absolute inset-0 rounded-full"
										style={{
											background: isDark
												? "linear-gradient(135deg, rgba(46, 204, 113, 0.3), rgba(34, 197, 94, 0.2))"
												: "linear-gradient(135deg, rgba(16, 109, 32, 0.2), rgba(34, 139, 34, 0.15))",
											padding: "3px",
										}}>
										<img
											src={member.image}
											alt={member.name}
											className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
											style={{
												border: isDark
													? "2px solid rgba(46, 204, 113, 0.4)"
													: "2px solid rgba(16, 109, 32, 0.3)",
											}}
										/>
									</div>
								</div>

								{/* Name */}
								<h3
									className="text-xl font-bold mb-3 transition-colors duration-300"
									style={{
										fontFamily: "var(--font-playfair-display)",
										color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
									}}>
									{member.name}
								</h3>

								<p
									className="text-sm leading-relaxed mb-6"
									style={{
										color: isDark ? "rgba(200, 240, 200, 0.8)" : "rgba(16, 109, 32, 0.7)",
									}}>
									{member.bio}
								</p>

								{/* Social links with different green accents */}
								<div className="flex justify-center space-x-4">
									{/* Instagram - Emerald Green accent */}
									<motion.a
										href={member.instagram}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 rounded-full transition-all duration-300"
										style={{
											background: instagramColors.background,
											border: `1px solid ${instagramColors.border}`,
											color: instagramColors.color,
										}}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = instagramColors.hoverBackground;
											e.currentTarget.style.border = `1px solid ${instagramColors.hoverBorder}`;
											e.currentTarget.style.color = instagramColors.hoverColor;
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = instagramColors.background;
											e.currentTarget.style.border = `1px solid ${instagramColors.border}`;
											e.currentTarget.style.color = instagramColors.color;
										}}
										aria-label="Instagram">
										<FaInstagram className="w-5 h-5" />
									</motion.a>

									{/* LinkedIn - Teal Green accent */}
									<motion.a
										href={member.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 rounded-full transition-all duration-300"
										style={{
											background: linkedinColors.background,
											border: `1px solid ${linkedinColors.border}`,
											color: linkedinColors.color,
										}}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										onMouseEnter={(e) => {
											e.currentTarget.style.background = linkedinColors.hoverBackground;
											e.currentTarget.style.border = `1px solid ${linkedinColors.hoverBorder}`;
											e.currentTarget.style.color = linkedinColors.hoverColor;
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = linkedinColors.background;
											e.currentTarget.style.border = `1px solid ${linkedinColors.border}`;
											e.currentTarget.style.color = linkedinColors.color;
										}}
										aria-label="LinkedIn">
										<FaLinkedinIn className="w-5 h-5" />
									</motion.a>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default MeetTheTeam;

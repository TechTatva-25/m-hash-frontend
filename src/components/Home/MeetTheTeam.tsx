"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";
import "@/styles/meet-the-team.css";

const technicalCC = [
	{
		name: "Tanishq Kochar",
		image: "/images/Tanishq.jpeg",
		instagram: "https://instagram.com/tanishqkochar/",
		linkedin: "https://linkedin.com/in/tanishq-kochar",
	},
	{
		name: "Lakshya Jain",
		image: "/images/lakshya.jpeg",
		instagram: "https://www.instagram.com/lakshyajain428/",
		linkedin: "https://www.linkedin.com/in/lakshya-jain-490ab9211/",
	},
	{
		name: "Prasanna Bhat",
		image: "/images/prasanna.jpg",
		instagram: "https://instagram.com/prasanna.bhatt_",
		linkedin: "https://www.linkedin.com/in/prasanna-bhat-b259ba285/",
	},
	{
		name: "Shubham Panda",
		image: "/images/shubham.jpg",
		instagram: "https://www.instagram.com/suvm._/",
		linkedin: "https://www.linkedin.com/in/shubham-panda-699538258/",
	},
	{
		name: "Ahmed Sahigara",
		image: "/images/ahmad.jpeg",
		instagram: "https://www.instagram.com/ahmdzy.s",
		linkedin: "https://www.linkedin.com/in/ahmed-sahigara",
	},
	{
		name: "Pulkit Kumar",
		image: "/images/Pulkit.jpeg",
		instagram: "https://instagram.com/desihippe",
		linkedin: "https://linkedin.com/in/buddywhitman",
	},
];

const Conveners = [
	{
		name: "Dillon Almeida",
		image: "/images/dillon.jpg",
		instagram: "https://www.instagram.com/dillon92345/",
		linkedin: "https://www.linkedin.com/in/dillon-almeida-b57987310/",
	},
	{
		name: "Palak Agarwal",
		image: "/images/palak.jpg",
		instagram: "https://www.instagram.com/palakk0905/",
		linkedin: "https://www.linkedin.com/in/palakagarwal09/",
	},
];

const adminPrCC = [
	{
		name: "Sanya Srivatsava",
		image: "/images/sanya.jpeg",
		instagram: "",
		linkedin: "https://www.linkedin.com/in/sanya-srivastava-s",
	},
	{
		name: "Ruchita Roy",
		image: "/images/ruchita.jpeg",
		instagram: "https://www.instagram.com/ruchitaa_roy?igsh=MWJmcmZ0OWl0MGpnbQ%3D%3D&utm_source=qr",
		linkedin: "https://www.linkedin.com/in/ruchita-roy-a7aa38284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
	},
	{
		name: "Manas Gupta",
		image: "/images/manas.jpeg",
		instagram: "https://www.instagram.com/_its.manas?igsh=aXc1MXZ3MGlsMDFk&utm_source=qr",
		linkedin: "https://www.linkedin.com/in/meetmanas",
	},
	{
		name: "Sharika Misra",
		image: "/images/sharika.jpeg",
		instagram: "https://www.instagram.com/sharika._.02?igsh=dW93dnZ5NDlqdXJr",
		linkedin: "https://www.linkedin.com/in/sharika-misra-487781284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
	},
	{
		name: "Prakhar Bhagat",
		image: "/images/prakhar.jpeg",
		instagram: "https://www.linkedin.com/in/prakhar-bhagat?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
		linkedin: "https://www.instagram.com/prakharbhagatt?igsh=bHAwNm5rMnF0cjNk&utm_source=qr",
	},
];

const smghCC = [
	{
		name: "Riddhima Chauhan",
		image: "/images/riddhima.jpeg",
		instagram: "https://www.instagram.com/riddschauhan_/",
		linkedin: "https://www.linkedin.com/in/riddhima-chauhan-30a879281/",
	},
	{
		name: "Raghav Kedia",
		image: "/images/raghav.jpeg",
		instagram: "https://www.instagram.com/raghav.kedia/",
		linkedin: "www.linkedin.com/in/raghav-kedia-",
	},
	{
		name: "Aneesha Gupta",
		image: "/images/aneesha.jpeg",
		instagram: "",
		linkedin: "https://www.linkedin.com/in/aneesha-gupta-065b4b27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
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

	// Function to render a team section
	const renderTeamSection = (title: string, members: typeof technicalCC, delay: number = 0) => {
		// Determine the grid class based on number of members
		const getGridClass = (memberCount: number) => {
			if (memberCount === 1) return "team-grid-single";
			if (memberCount === 2) return "team-grid-double";
			return "team-grid";
		};

		return (
			<div className="mb-16">
				{/* Section Title */}
				<motion.div
					className="text-center mb-8"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay }}
					viewport={{ once: true }}>
					<h3
						className="text-2xl md:text-3xl font-bold mb-4"
						style={{
							fontFamily: "var(--font-playfair-display)",
							color: isDark ? "rgba(200, 240, 200, 0.9)" : "#005050",
							textShadow: isDark
								? "0 2px 8px rgba(46, 204, 113, 0.2)"
								: "0 2px 8px rgba(16, 109, 32, 0.15)",
						}}>
						{title}
					</h3>
					<motion.div
						className="w-24 h-1 mx-auto rounded-full"
						style={{
							background: isDark
								? "linear-gradient(to right, rgba(46, 204, 113, 0.8), rgba(34, 197, 94, 0.6))"
								: "#005050",
						}}
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						transition={{ duration: 0.6, delay: delay + 0.3 }}
						viewport={{ once: true }}
					/>
				</motion.div>

				{/* Team Grid */}
				<motion.div
					className={getGridClass(members.length)}
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}>
					{members.map((member) => (
					<motion.div
						key={member.name}
						variants={itemVariants}
						whileHover={{ scale: 1.02, y: -5 }}
						className="group relative rounded-2xl overflow-hidden team-card"
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
							<div className="relative mb-6 mx-auto w-32 h-32">
								<div
									className="absolute inset-0 rounded-full"
									style={{
										background: isDark
											? "linear-gradient(135deg, rgba(46, 204, 113, 0.3), rgba(34, 197, 94, 0.2))"
											: "linear-gradient(135deg, rgba(16, 109, 32, 0.2), rgba(34, 139, 34, 0.15))",
										padding: "4px",
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
								className="text-lg font-bold mb-4 transition-colors duration-300"
								style={{
									fontFamily: "var(--font-playfair-display)",
									color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
								}}>
								{member.name}
							</h3>

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
	);
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

				{/* Team sections */}
				<div className="max-w-7xl mx-auto">
					{/* Technical CC */}
					{renderTeamSection("Conveners",Conveners , 0)}
					{/* Technical CC */}
					{renderTeamSection("Technical Core Committee", technicalCC, 0)}
					
					{/* SMGH CC */}
					{renderTeamSection("Social Media & Graphics Core Committee", smghCC, 0.4)}
					{/* Admin/PR CC */}
					{renderTeamSection("Admin & PR Core Committee", adminPrCC, 0.2)}
					
				</div>
			</div>
		</div>
	);
};

export default MeetTheTeam;

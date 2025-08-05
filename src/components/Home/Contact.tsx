"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { useTheme } from "@/components/ThemeProvider";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ContactPerson {
	name: string;
	phone: string;
	role: string;
}

const contactPersons: ContactPerson[] = [
	{ name: "Sanya Srivastava", phone: "+91 97712 41498", role: "Core Committee" },
	{ name: "Tanishq Kochar", phone: "+91 70038 44493", role: "Core Committee" },
	{ name: "Manas Gupta", phone: "+91 80050 00015", role: "Core Committee" },
	{ name: "Dillon Almeida", phone: "+91 86686 33682", role: "MIT Student Council" },
	{ name: "Palak Agarwal", phone: "+91 93309 56584", role: "MIT Student Council" },
	{ name: "Arushi Ajmani", phone: "+91 90448 09190", role: "MIT Student Council" },
	{ name: "Sujal Kumar", phone: "+91 86516 93810", role: "MIT Student Council" },
];

const ContactFormSchema = z.object({
	email: z.string().email(),
	message: z.string().min(1, "Message is required"),
});

export default function ContactForm(): React.JSX.Element {
	const [disabled, setDisabled] = useState(false);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const form = useForm<z.infer<typeof ContactFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(ContactFormSchema),
	});

	const contactGroups = React.useMemo(() => {
		const groups: Record<string, ContactPerson[]> = {};
		contactPersons.forEach((person) => {
			if (groups[person.role]) {
				groups[person.role].push(person);
			} else {
				groups[person.role] = [person];
			}
		});
		return groups;
	}, [contactPersons]);

	const onSubmit = async (data: z.infer<typeof ContactFormSchema>): Promise<void> => {
		setDisabled(true);
		try {
			const response = await axios.post<{ message: string }>(getEndpoint(Endpoints.CONTACT), data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			toast.success(response.data.message);
			setTimeout((): void => window.location.reload(), 3000);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while submitting your query");
			}
			setDisabled(false);
		}
	};

	return (
		<section id="contact" className="pb-20 relative min-h-screen">
			<div className="container mx-auto px-4 relative z-10">
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
							Get In Touch
						</h2>

						{/* Royal Green decorative lines - heading width only */}
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
							whileInView={{ scaleX: 1 }}
							transition={{ duration: 0.8, delay: 0.7 }}
							viewport={{ once: true }}
						/>
					</motion.div>
					<motion.p
						className="text-lg text-muted-foreground max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}>
						Have questions or want to learn more about Manipal Hackathon? We're here to help!
					</motion.p>
				</div>

				<div className="max-w-5xl mx-auto">
					<motion.div
						className={`group relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl border border-white/30 dark:border-white/10 p-0 md:p-1 ${isDark ? "bg-gradient-to-br from-[#0a1a0f]/80 via-[#0f2715]/80 to-[#0d1f12]/90" : "bg-gradient-to-br from-white/60 via-green-50/40 to-white/10"}`}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						style={{
							boxShadow: `0 32px 64px -12px rgba(16,109,32,0.13), 0 1.5px 0 0 rgba(255,255,255,0.10)`,
						}}>
						{/* Sophisticated glassmorphic overlay and royal green glow */}
						<div
							className={`absolute inset-0 rounded-3xl pointer-events-none z-0 ${isDark ? "bg-gradient-to-br from-emerald-900/30 via-green-900/20 to-transparent" : "bg-gradient-to-br from-white/40 via-green-100/30 to-transparent"}`}></div>
						<div
							className={`absolute inset-0 rounded-3xl pointer-events-none z-0 ${isDark ? "bg-gradient-to-tl from-green-900/20 via-transparent to-emerald-900/20" : "bg-gradient-to-tl from-green-200/10 via-transparent to-emerald-200/10"}`}></div>
						<div className="absolute inset-0 rounded-3xl pointer-events-none z-0 backdrop-blur-2xl" />

						{/* Elegant border highlight */}
						<div className="absolute inset-0 rounded-3xl border border-white/20 dark:border-white/10 pointer-events-none z-10" />

						{/* Sophisticated corner accents with royal green */}
						<div
							className={`absolute top-4 right-4 w-8 h-8 rounded-full blur-xl z-10 ${isDark ? "bg-gradient-to-br from-emerald-800/30 to-green-900/20" : "bg-gradient-to-br from-green-300/20 to-emerald-400/10"}`}></div>
						<div
							className={`absolute bottom-4 left-4 w-6 h-6 rounded-full blur-xl z-10 ${isDark ? "bg-gradient-to-tl from-green-900/20 to-emerald-900/30" : "bg-gradient-to-tl from-emerald-400/15 to-green-300/20"}`}></div>

						<div className="flex flex-col lg:flex-row">
							{/* Contact Form */}
							<div className="lg:w-1/2 p-8 relative z-10 flex items-center justify-center">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									viewport={{ once: true }}
									className="w-full flex flex-col justify-center">
									<h3
										className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-[rgba(144,238,144,0.95)]" : "text-[rgba(16,109,32,0.9)]"}`}
										style={{ fontFamily: "var(--font-playfair-display)" }}>
										Send Us a Message
									</h3>

									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
											<FormField
												control={form.control}
												name="email"
												render={({ field }): React.JSX.Element => (
													<FormItem>
														<FormLabel className="text-foreground">
															Email
														</FormLabel>
														<FormControl>
															<div className="relative">
																<Input
																	{...field}
																	type="email"
																	placeholder="Enter your email"
																	className="pl-10 border-0 shadow-inner rounded-lg backdrop-blur-sm transition-all duration-300"
																	style={{
																		background: isDark 
																			? "rgba(0, 40, 25, 0.6)" 
																			: "rgba(255, 255, 255, 0.8)",
																		color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
																		border: isDark 
																			? "1px solid rgba(46, 204, 113, 0.3)" 
																			: "1px solid rgba(16, 109, 32, 0.3)",
																	}}
																	onFocus={(e) => {
																		e.target.style.boxShadow = isDark
																			? "0 0 15px rgba(46, 204, 113, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.1)"
																			: "0 0 15px rgba(16, 109, 32, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.05)";
																		e.target.style.border = isDark
																			? "1px solid rgba(46, 204, 113, 0.6)"
																			: "1px solid rgba(16, 109, 32, 0.5)";
																	}}
																	onBlur={(e) => {
																		e.target.style.boxShadow = "none";
																		e.target.style.border = isDark 
																			? "1px solid rgba(46, 204, 113, 0.3)" 
																			: "1px solid rgba(16, 109, 32, 0.3)";
																	}}
																/>
																<HiOutlineMail 
																	className="absolute left-3 top-3 transition-colors duration-300"
																	style={{
																		color: isDark ? "rgba(46, 204, 113, 0.7)" : "rgba(16, 109, 32, 0.7)",
																	}}
																/>
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="message"
												render={({ field }): React.JSX.Element => (
													<FormItem>
														<FormLabel className="text-foreground">
															Message
														</FormLabel>
														<FormControl>
															<Textarea
																{...field}
																placeholder="Enter your message"
																className="min-h-[150px] border-0 shadow-inner rounded-lg backdrop-blur-sm transition-all duration-300"
																style={{
																	background: isDark 
																		? "rgba(0, 40, 25, 0.6)" 
																		: "rgba(255, 255, 255, 0.8)",
																	color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
																	border: isDark 
																		? "1px solid rgba(46, 204, 113, 0.3)" 
																		: "1px solid rgba(16, 109, 32, 0.3)",
																}}
																onFocus={(e) => {
																	e.target.style.boxShadow = isDark
																		? "0 0 15px rgba(46, 204, 113, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.1)"
																		: "0 0 15px rgba(16, 109, 32, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.05)";
																	e.target.style.border = isDark
																		? "1px solid rgba(46, 204, 113, 0.6)"
																		: "1px solid rgba(16, 109, 32, 0.5)";
																}}
																onBlur={(e) => {
																	e.target.style.boxShadow = "none";
																	e.target.style.border = isDark 
																		? "1px solid rgba(46, 204, 113, 0.3)" 
																		: "1px solid rgba(16, 109, 32, 0.3)";
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Royal Green Glassmorphic Button */}
											<div className="mt-8 relative group">
												<button
													type="submit"
													disabled={disabled}
													className="group relative w-full inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-500 ease-out hover:scale-105 active:scale-95 rounded-lg"
													style={{
														background: isDark
															? "linear-gradient(135deg, rgba(0, 40, 25, 0.8) 0%, rgba(0, 50, 30, 0.9) 100%)"
															: "linear-gradient(135deg, rgba(16, 109, 32, 0.9) 0%, rgba(34, 139, 34, 0.8) 100%)",
														backdropFilter: "blur(16px)",
														boxShadow: isDark
															? `0 8px 25px rgba(0, 0, 0, 0.3), 
															   0 0 0 1px rgba(46, 204, 113, 0.4),
															   inset 0 1px 0 0 rgba(46, 204, 113, 0.1)`
															: `0 8px 25px rgba(16, 109, 32, 0.2), 
															   0 0 0 1px rgba(16, 109, 32, 0.3),
															   inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`,
														border: isDark
															? "1px solid rgba(46, 204, 113, 0.5)"
															: "1px solid rgba(16, 109, 32, 0.4)",
														color: isDark ? "rgba(200, 240, 200, 0.95)" : "white",
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.background = isDark
															? "linear-gradient(135deg, rgba(0, 50, 30, 0.9) 0%, rgba(0, 60, 35, 1) 100%)"
															: "linear-gradient(135deg, rgba(34, 139, 34, 0.95) 0%, rgba(46, 139, 87, 0.9) 100%)";
														e.currentTarget.style.boxShadow = isDark
															? `0 12px 35px rgba(0, 0, 0, 0.4), 
															   0 0 20px rgba(46, 204, 113, 0.3),
															   0 0 0 1px rgba(46, 204, 113, 0.6),
															   inset 0 1px 0 0 rgba(46, 204, 113, 0.15)`
															: `0 12px 35px rgba(16, 109, 32, 0.25), 
															   0 0 20px rgba(16, 109, 32, 0.2),
															   0 0 0 1px rgba(16, 109, 32, 0.4),
															   inset 0 1px 0 0 rgba(255, 255, 255, 0.3)`;
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.background = isDark
															? "linear-gradient(135deg, rgba(0, 40, 25, 0.8) 0%, rgba(0, 50, 30, 0.9) 100%)"
															: "linear-gradient(135deg, rgba(16, 109, 32, 0.9) 0%, rgba(34, 139, 34, 0.8) 100%)";
														e.currentTarget.style.boxShadow = isDark
															? `0 8px 25px rgba(0, 0, 0, 0.3), 
															   0 0 0 1px rgba(46, 204, 113, 0.4),
															   inset 0 1px 0 0 rgba(46, 204, 113, 0.1)`
															: `0 8px 25px rgba(16, 109, 32, 0.2), 
															   0 0 0 1px rgba(16, 109, 32, 0.3),
															   inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`;
													}}>

													{/* Button content */}
													<div className="relative z-10 flex items-center justify-center">
														{disabled ? (
															<HashLoader 
																color={isDark ? "rgba(200, 240, 200, 0.95)" : "#ffffff"} 
																size={20} 
															/>
														) : (
															<>
																<FiSend 
																	className="mr-2"
																	style={{
																		color: isDark ? "rgba(200, 240, 200, 0.95)" : "white",
																	}}
																/>
																<span
																	className="tracking-wider font-medium text-center cursor-pointer"
																	style={{
																		fontFamily: "var(--font-playfair-display)",
																		textShadow: isDark 
																			? "0 2px 8px rgba(0, 0, 0, 0.5)" 
																			: "0 2px 8px rgba(0, 0, 0, 0.3)",
																		color: isDark ? "rgba(200, 240, 200, 0.95)" : "white",
																	}}>
																	Send Message
																</span>
															</>
														)}
													</div>
												</button>
											</div>
										</form>
									</Form>
								</motion.div>
							</div>

							{/* Elegant Vertical Divider */}
							<div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-white/5 via-white/20 to-white/5 transform -translate-x-1/2">
								{/* Royal green glow effect */}
								<div className="absolute inset-0 blur-sm bg-gradient-to-b from-emerald-300/10 via-white/20 to-green-300/10"></div>
								{/* Accent dots */}
								<div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 blur-[1px]"></div>
								<div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 blur-[1px]"></div>
							</div>

							{/* Contact List */}
							<div className="lg:w-1/2 p-8 border-t lg:border-t-0 lg:border-l-0 relative z-10 flex items-center justify-center">
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									viewport={{ once: true }}
									className="w-full flex flex-col justify-center">
									<h3
										className="text-2xl font-bold mb-6 text-center"
										style={{ 
											fontFamily: "var(--font-playfair-display)",
											color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
										}}>
										Contact Persons
									</h3>

									<div className="space-y-8">
										{Object.entries(contactGroups).map(([role, contacts], index) => (
											<div key={index}>
												<h4
													className="text-xl font-medium mb-4 text-center"
													style={{
														color: isDark ? "rgba(200, 240, 200, 0.9)" : "rgba(16, 109, 32, 0.8)",
													}}>
													{role}
												</h4>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													{contacts.map((contact, idx) => (
														<motion.div
															key={idx}
															initial={{ opacity: 0, y: 10 }}
															whileInView={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.3, delay: 0.1 * idx }}
															viewport={{ once: true }}
															whileHover={{ scale: 1.03 }}
															className={`backdrop-blur-lg rounded-xl p-4 transition-all w-full ${contacts.length % 2 !== 0 && idx === contacts.length - 1 ? "md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto" : ""}`}
															style={{
																background: isDark 
																	? "rgba(0, 40, 25, 0.6)" 
																	: "rgba(255, 255, 255, 0.8)",
																border: isDark 
																	? "1px solid rgba(46, 204, 113, 0.3)" 
																	: "1px solid rgba(16, 109, 32, 0.2)",
																boxShadow: isDark
																	? "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(46, 204, 113, 0.2)"
																	: "0 10px 30px -10px rgba(16, 109, 32, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.4)",
															}}
															onMouseEnter={(e) => {
																e.currentTarget.style.background = isDark
																	? "rgba(0, 50, 30, 0.7)"
																	: "rgba(255, 255, 255, 0.9)";
																e.currentTarget.style.border = isDark
																	? "1px solid rgba(46, 204, 113, 0.5)"
																	: "1px solid rgba(16, 109, 32, 0.3)";
																e.currentTarget.style.boxShadow = isDark
																	? "0 15px 40px -10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(46, 204, 113, 0.2), inset 0 0 0 1px rgba(46, 204, 113, 0.3)"
																	: "0 15px 40px -10px rgba(16, 109, 32, 0.1), 0 0 20px rgba(16, 109, 32, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.6)";
															}}
															onMouseLeave={(e) => {
																e.currentTarget.style.background = isDark 
																	? "rgba(0, 40, 25, 0.6)" 
																	: "rgba(255, 255, 255, 0.8)";
																e.currentTarget.style.border = isDark 
																	? "1px solid rgba(46, 204, 113, 0.3)" 
																	: "1px solid rgba(16, 109, 32, 0.2)";
																e.currentTarget.style.boxShadow = isDark
																	? "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(46, 204, 113, 0.2)"
																	: "0 10px 30px -10px rgba(16, 109, 32, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.4)";
															}}>
															<p 
																className="font-bold mb-2"
																style={{
																	color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
																}}>
																{contact.name}
															</p>
															<Link
																href={`tel:${contact.phone}`}
																className="flex items-center transition-all duration-300"
																style={{
																	color: isDark ? "rgba(46, 204, 113, 0.8)" : "rgba(16, 109, 32, 0.8)",
																}}
																onMouseEnter={(e) => {
																	e.currentTarget.style.color = isDark ? "rgba(46, 204, 113, 1)" : "rgba(34, 139, 34, 1)";
																}}
																onMouseLeave={(e) => {
																	e.currentTarget.style.color = isDark ? "rgba(46, 204, 113, 0.8)" : "rgba(16, 109, 32, 0.8)";
																}}>
																<BsTelephone 
																	className="mr-2"
																	style={{
																		color: isDark ? "rgba(46, 204, 113, 0.7)" : "rgba(16, 109, 32, 0.7)",
																	}}
																/>
																{contact.phone}
															</Link>
														</motion.div>
													))}
												</div>
											</div>
										))}
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

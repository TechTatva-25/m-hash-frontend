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

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Squares from "../ui/square";

interface ContactPerson {
	name: string;
	phone: string;
	role: string;
}

const contactPersons: ContactPerson[] = [
	{ name: "Anshu Kantipudi", phone: "+91 98660 56570", role: "Core Committee" },
	{ name: "Dillon Almeida", phone: "+91 86686 33682", role: "Core Committee" },
	{ name: "Mustafa Haji", phone: "+91 97738 88772", role: "Core Committee" },
	{ name: "Nishtha Singh", phone: "+91 70134 93752", role: "MIT Student Council" },
	{ name: "Ananya Parashar", phone: "+91 74001 25968", role: "MIT Student Council" },
	{ name: "Dishita Mohan", phone: "+91 82406 72604", role: "MIT Student Council" },
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
							className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))]"
							style={{ fontFamily: "var(--font-playfair-display)" }}>
							Get In Touch
						</h2>
						<motion.div
							className="absolute -bottom-3 left-0 h-1 bg-[hsl(var(--foreground))] rounded-full"
							initial={{ width: 0 }}
							whileInView={{ width: "100%" }}
							transition={{ duration: 0.8, delay: 0.5 }}
							viewport={{ once: true }}
						/>
						<motion.div
							className="absolute -bottom-5 left-0 h-[0.5px] bg-[hsl(var(--foreground))]/60 rounded-full"
							initial={{ width: 0 }}
							whileInView={{ width: "80%" }}
							transition={{ duration: 0.8, delay: 0.7 }}
							viewport={{ once: true }}
						/>
					</motion.div>
					<motion.p
						className="text-lg text-[hsl(var(--foreground))] max-w-2xl mx-auto opacity-80"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.8 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}>
						Have questions or want to learn more about Manipal Hackathon? We're here to help!
					</motion.p>
				</div>

				<div className="max-w-5xl mx-auto">
					<motion.div
						className={`group relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl border border-white/30 dark:border-white/10 p-0 md:p-1 ${isDark ? 'bg-gradient-to-br from-[#1a102a]/80 via-[#23233a]/80 to-[#2a1a3a]/90' : 'bg-gradient-to-br from-white/60 via-purple-100/40 to-white/10'}`}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						style={{
							boxShadow: `0 32px 64px -12px rgba(103,80,164,0.13), 0 1.5px 0 0 rgba(255,255,255,0.10)`
						}}>
						{/* Glassmorphic overlay and glow */}
						<div className={`absolute inset-0 rounded-3xl pointer-events-none z-0 ${isDark ? 'bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-transparent' : 'bg-gradient-to-br from-white/40 via-purple-100/30 to-transparent'}`}></div>
						<div className={`absolute inset-0 rounded-3xl pointer-events-none z-0 ${isDark ? 'bg-gradient-to-tl from-blue-900/20 via-transparent to-purple-900/20' : 'bg-gradient-to-tl from-blue-200/10 via-transparent to-purple-200/10'}`}></div>
						<div className="absolute inset-0 rounded-3xl pointer-events-none z-0 backdrop-blur-2xl" />

						{/* Subtle border highlight */}
						<div className="absolute inset-0 rounded-3xl border border-white/20 dark:border-white/10 pointer-events-none z-10" />

						{/* Corner accents */}
						<div className={`absolute top-4 right-4 w-8 h-8 rounded-full blur-xl z-10 ${isDark ? 'bg-gradient-to-br from-purple-800/30 to-indigo-900/20' : 'bg-gradient-to-br from-indigo-300/20 to-purple-400/10'}`}></div>
						<div className={`absolute bottom-4 left-4 w-6 h-6 rounded-full blur-xl z-10 ${isDark ? 'bg-gradient-to-tl from-purple-900/20 to-indigo-900/30' : 'bg-gradient-to-tl from-purple-400/15 to-indigo-300/20'}`}></div>
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
										className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-[rgba(230,210,255,0.95)]" : "text-[rgba(103,80,164,0.9)]"}`}
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
														<FormLabel className="text-[hsl(var(--foreground))]">
															Email
														</FormLabel>
														<FormControl>
															<div className="relative">
																<Input
																	{...field}
																	type="email"
																	placeholder="Enter your email"
																	className="pl-10 bg-white/30 border-0 shadow-inner focus:ring-1 focus:ring-white/50 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-800 placeholder:text-gray-500/70 rounded-lg backdrop-blur-sm"
																/>
																<HiOutlineMail className="absolute left-3 top-3 text-gray-600" />
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
														<FormLabel className="text-[hsl(var(--foreground))]">
															Message
														</FormLabel>
														<FormControl>
															<Textarea
																{...field}
																placeholder="Enter your message"
																className="min-h-[150px] bg-white/30 border-0 shadow-inner focus:ring-1 focus:ring-white/50 focus:shadow-[0_0_10px_rgba(255,255,255,0.2)] text-gray-800 placeholder:text-gray-500/70 rounded-lg backdrop-blur-sm"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{/* Glassmorphic Button */}
											<div className="mt-8 relative group">
												<button
													type="submit"
													disabled={disabled}
													className="group relative w-full inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95">
													{/* Outer border ring */}
													<div className="absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-300 group-hover:border-white/40"></div>

													{/* Glow effect */}
													<div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

													{/* Enhanced glassmorphic background */}
													<div className="absolute inset-1 rounded-full bg-white/15 backdrop-blur-lg shadow-2xl transition-all duration-300 group-hover:bg-white/20"></div>

													{/* Inner highlight */}
													<div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-60"></div>

													{/* Button content */}
													<div className="relative z-10 flex items-center justify-center">
														{disabled ? (
															<HashLoader color="#ffffff" size={20} />
														) : (
															<>
																<FiSend className="mr-2" />
																<span
																	className="tracking-wider font-medium text-center cursor-pointer"
																	style={{
																		fontFamily: "var(--font-playfair-display)",
																		textShadow: "0 2px 8px rgba(0,0,0,0.5)",
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

							{/* Vertical Divider */}
							<div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-white/5 via-white/20 to-white/5 transform -translate-x-1/2">
								{/* Glow effect */}
								<div className="absolute inset-0 blur-sm bg-gradient-to-b from-indigo-300/10 via-white/20 to-purple-300/10"></div>
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
										className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-[rgba(230,210,255,0.95)]" : "text-[rgba(103,80,164,0.9)]"}`}
										style={{ fontFamily: "var(--font-playfair-display)" }}>
										Contact Persons
									</h3>

									<div className="space-y-8">
										{Object.entries(contactGroups).map(([role, contacts], index) => (
											<div key={index}>
												<h4 className={`text-xl font-medium mb-4 text-center ${isDark ? "text-[rgba(230,210,255,0.95)]" : "text-[rgba(103,80,164,0.9)]"}`}>{role}</h4>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													{contacts.map((contact, idx) => (
														<motion.div
															key={idx}
															initial={{ opacity: 0, y: 10 }}
															whileInView={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.3, delay: 0.1 * idx }}
															viewport={{ once: true }}
															whileHover={{ scale: 1.03 }}
															className={`backdrop-blur-lg bg-white/40 rounded-xl p-4 transition-all hover:bg-white/50 w-full ${contacts.length % 2 !== 0 && idx === contacts.length - 1 ? "md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto" : ""}`}
															style={{
																boxShadow:
																	"0 10px 30px -10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.4)",
															}}>
															<p className="font-bold text-gray-800">{contact.name}</p>
															<Link
																href={`tel:${contact.phone}`}
																className="flex items-center mt-2 text-indigo-600 hover:text-indigo-500 transition-colors">
																<BsTelephone className="mr-2" />
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

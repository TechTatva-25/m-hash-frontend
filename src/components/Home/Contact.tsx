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
		<section id="contact" className="py-20 relative min-h-screen">
			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-16">
					<motion.div
						className="relative inline-block mb-8"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<h2 
							className="text-4xl md:text-5xl font-bold text-[hsl(var(--foreground))]"
							style={{ fontFamily: "var(--font-playfair-display)" }}
						>
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
						viewport={{ once: true }}
					>
						Have questions or want to learn more about Manipal Hackathon? We're here to help!
					</motion.p>
				</div>
				
				<div className="max-w-5xl mx-auto">
					<motion.div
						className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						style={{
							boxShadow: `
								0 32px 64px -12px rgba(0, 0, 0, 0.15)
							`,
						}}>
						{/* Subtle accent border */}
						<div className="absolute inset-0 rounded-3xl pointer-events-none"></div>

						{/* Enhanced inner glow */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent rounded-3xl"></div>
						<div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>

						{/* Squares background - only behind the form */}
						<div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-30">
							<Squares 
								speed={0.5} 
								squareSize={40}
								direction="diagonal"
								borderColor="rgba(99, 102, 241, 0.15)"
								hoverFillColor="rgba(139, 92, 246, 0.1)"
							/>
						</div>
						
						{/* Subtle corner accents */}
						<div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-indigo-300/20 to-purple-400/10 rounded-full blur-sm"></div>
						<div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-tl from-purple-400/15 to-indigo-300/20 rounded-full blur-sm"></div>
						<div className="flex flex-col lg:flex-row">
							{/* Contact Form */}
							<div className="lg:w-1/2 p-8 relative z-10">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									viewport={{ once: true }}
									className="h-full"
								>
									<h3 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))]" style={{ fontFamily: "var(--font-playfair-display)" }}>Send Us a Message</h3>
									
									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
											<FormField
												control={form.control}
												name="email"
												render={({ field }): React.JSX.Element => (
													<FormItem>
														<FormLabel className="text-[hsl(var(--foreground))]">Email</FormLabel>
														<FormControl>
															<div className="relative">
																<Input
																	{...field}
																	type="email"
																	placeholder="Enter your email"
																	className="pl-10 bg-white/15 border-0 focus:ring-1 focus:ring-indigo-500 text-[hsl(var(--foreground))] placeholder:text-gray-500"
																/>
																<HiOutlineMail className="absolute left-3 top-3 text-muted-foreground" />
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
														<FormLabel className="text-[hsl(var(--foreground))]">Message</FormLabel>
														<FormControl>
															<Textarea 
																{...field} 
																placeholder="Enter your message" 
																className="min-h-[150px] bg-white/15 border-0 focus:ring-1 focus:ring-indigo-500 text-[hsl(var(--foreground))] placeholder:text-gray-500" 
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
													className="group relative w-full inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95"
												>
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
																	className="tracking-wider font-medium"
																	style={{
																		fontFamily: "var(--font-playfair-display)",
																		textShadow: "0 2px 8px rgba(0,0,0,0.5)",
																	}}
																>
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
							
							{/* Contact List */}
							<div className="lg:w-1/2 p-8 border-t lg:border-t-0 lg:border-l-0 relative z-10">
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									viewport={{ once: true }}
									className="h-full"
								>
									<h3 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))]" style={{ fontFamily: "var(--font-playfair-display)" }}>Contact Persons</h3>
									
									<div className="space-y-8">
										{Object.entries(contactGroups).map(([role, contacts], index) => (
											<div key={index}>
												<h4 className="text-xl font-medium mb-4 text-[hsl(var(--foreground))]">{role}</h4>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													{contacts.map((contact, idx) => (
														<motion.div
															key={idx}
															initial={{ opacity: 0, y: 10 }}
															whileInView={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.3, delay: 0.1 * idx }}
															viewport={{ once: true }}
															whileHover={{ scale: 1.03 }}
															className="backdrop-blur-lg bg-white/15 rounded-xl p-4 transition-all hover:bg-white/25 mx-auto w-full"
															style={{
																boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.05)"
															}}
														>
															<p className="font-bold text-[hsl(var(--foreground))]">{contact.name}</p>
															<Link 
																href={`tel:${contact.phone}`}
																className="flex items-center mt-2 text-indigo-500 hover:text-indigo-300 transition-colors"
															>
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

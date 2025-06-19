"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";

import { useSession } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, PasswordInput } from "../ui/input";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const loginFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8)
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
		),
});

export default function LoginForm(): React.JSX.Element {
	const router = useRouter();
	const session = useSession();
	const [disabled, setDisabled] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [buttonHover, setButtonHover] = useState(false);
	const form = useForm<z.infer<typeof loginFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(loginFormSchema),
	});

	React.useEffect(() => {
		if (session?.userId) {
			setDisabled(true);

			if (session.user?.role === "judge") {
				// router.push("/dashboard/judge");
				router.push("/dashboard/judgePresentation");
			} else if (session.user?.role === "admin") {
				router.push("/dashboard/admin");
			} else {
				router.push("/dashboard");
			}
		}
	}, [session]);

	const onSubmit = async (data: z.infer<typeof loginFormSchema>): Promise<void> => {
		setDisabled(true);
		try {
			const response = await axios.post<{ message: string }>(getEndpoint(Endpoints.LOGIN), data, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			toast.success(response.data.message);
			router.push("/dashboard");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while registering");
			}
			setDisabled(false);
		}
	};

	return (
		<Card className="w-full sm:w-[800px] backdrop-blur-xl bg-black/40 border-gray-500/20 shadow-lg">
			<div className="flex flex-col lg:flex-row">
				{/* Left side with logo and description */}
				<div className="lg:w-1/3 flex flex-col items-center justify-center p-6 border-r border-gray-500/20">
					<div className="relative h-24 w-24 overflow-hidden mb-6">
						<Image
							src="/M-Hash-Logo.png"
							alt="M-Hash Logo"
							fill
							style={{ objectFit: "contain" }}
							className="drop-shadow-lg"
						/>
					</div>
					<CardTitle className="text-2xl text-center text-white mb-4">Login to your account</CardTitle>
					<CardDescription className="text-center text-gray-300">
						Enter your credentials below to access your account
					</CardDescription>

					<div className="mt-8 hidden lg:block">
						<p className="text-center text-sm text-gray-400">
							Don't have an account?{" "}
							<Link
								href="/register"
								className="font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
								Sign up
							</Link>
						</p>
						<p className="mt-2 text-center text-sm text-gray-400">
							<Link
								href="/"
								className="font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
								Go Home
							</Link>
						</p>
					</div>
				</div>

				{/* Right side with form */}
				<div className="lg:w-2/3 p-6">
					<CardContent className="p-0">
						<Form {...form}>
							{}
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="email"
									render={({ field }): React.JSX.Element => (
										<FormItem>
											<div className="flex flex-col">
												<FormLabel className="text-gray-200">Email</FormLabel>
											</div>
											<FormControl>
												<Input
													{...field}
													type="email"
													placeholder="Enter your email"
													className="bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400"
												/>
											</FormControl>
											<div className="text-xs text-gray-400">
												{form.formState.errors.email && form.formState.errors.email.message}
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }): React.JSX.Element => (
										<FormItem className="mt-4">
											<div className="flex flex-row items-center justify-between">
												<FormLabel className="text-gray-200">Password</FormLabel>
												<ForgotPasswordDialog
													modalOpen={modalOpen}
													setModalOpen={setModalOpen}
												/>
											</div>
											<FormControl>
												<PasswordInput
													{...field}
													placeholder="Enter your password"
													className="bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400"
												/>
											</FormControl>
											{/* No validation messages for password */}
										</FormItem>
									)}
								/>

								{/* Enhanced Glassmorphic Button with Animation */}
								<div className="mt-6 relative overflow-hidden group">
									{/* Animated gradient background */}
									<div
										className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-80 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
										style={{
											backgroundSize: "200% 100%",
											animation: "gradient-shift 3s ease infinite",
										}}></div>

									{/* Glass overlay for frosted effect */}
									<div className="absolute inset-0 backdrop-blur-md bg-white/10 rounded-lg border border-white/30"></div>

									<Button
										type="submit"
										disabled={disabled}
										className="relative w-full bg-transparent border-0 text-white py-5 rounded-lg text-base font-medium shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]">
										{disabled ? (
											<HashLoader color="#ffffff" size={20} />
										) : (
											<>
												<span className="relative z-10 drop-shadow-sm mr-2">Sign In</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 inline-block transition-transform duration-500 ease-in-out group-hover:translate-x-0.5 relative z-10"
													viewBox="0 0 20 20"
													fill="currentColor">
													<path
														fillRule="evenodd"
														d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
												{/* Subtle inner glow */}
												<span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
											</>
										)}
									</Button>
								</div>

								{/* Mobile footer links */}
								<div className="mt-6 lg:hidden">
									<p className="text-center text-sm text-gray-400">
										Don't have an account?{" "}
										<Link
											href="/register"
											className="font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
											Sign up
										</Link>
									</p>
									<p className="mt-2 text-center text-sm text-gray-400">
										<Link
											href="/"
											className="font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
											Go Home
										</Link>
									</p>
								</div>
							</form>
						</Form>
					</CardContent>
				</div>
			</div>

			{/* Add gradient animation keyframes - smoother and more subtle */}
			<style jsx global>{`
				@keyframes gradient-animation {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}

				@keyframes gradient-shift {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
			`}</style>
		</Card>
	);
}

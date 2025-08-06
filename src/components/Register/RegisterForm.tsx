"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Check, ChevronsUpDown, Info, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";
import Turnstile from "react-turnstile";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { College } from "@/hooks/useCollege";
import { useSession } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/ui/spotlight-card";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, PasswordInput } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import OTPVerificationForm from "./OTPVerificationForm";

// Password validation schema remains the same but we'll handle the display differently
const registerFormSchema = z
	.object({
		email: z
			.string()
			.email()
			.refine((email) => !email.endsWith("manipal.edu"), {
				message: "Please do not use your college-provided email",
			}),
		username: z
			.string()
			.min(3)
			.max(200)
			.regex(/^[a-zA-Z0-9_ ]*$/, "Only alphanumeric characters, underscores and spaces are allowed"),
		password: z
			.string()
			.min(8)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			),
		confirmPassword: z.string(),
		college: z.string().min(1, "Please select a college"),
		collegeOther: z.string().min(5).optional(),
		mobile_number: z
			.string()
			.refine(isValidPhoneNumber, { message: "Invalid phone number; should be in format '+91 1234567890'" }),
		gender: z.enum(["Male", "Female", "Other"]),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match",
				path: ["confirmPassword"],
			});
		}
	})
	.superRefine(({ college, collegeOther }, ctx) => {
		if (college === "OTHER" && (!collegeOther || collegeOther.length < 5)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Please enter your college name",
				path: ["collegeOther"],
			});
		}
	});

export default function RegisterForm(): React.JSX.Element {
	const [colleges, setColleges] = useState<College[]>([]);
	const [loading, setLoading] = useState(true);
		const [disabled, setDisabled] = useState(false);
	const [collegeComboboxOpen, setCollegeComboboxOpen] = React.useState(false);
	const [collegeValue, setCollegeValue] = React.useState({ display: "", value: "" });
	const [collegeOther, setCollegeOther] = React.useState(false);
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [showOTPVerification, setShowOTPVerification] = useState(false);
	const [registrationEmail, setRegistrationEmail] = useState("");
	const [verificationSuccessful, setVerificationSuccessful] = useState(false);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

	const router = useRouter();

	// Check authentication state
	const session = useSession();

	useEffect(() => {
		// If session is loading, we can return early to avoid flickering
		if (session?.loading) return;

		// If user is already logged in, redirect to home
		if (session?.userId) {
			router.push("/");
		}
	}, [session, router]);

	// Fetch colleges directly in the component
	useEffect(() => {
		const fetchColleges = async () => {
			try {
				console.log("Attempting to fetch colleges from:", getEndpoint(Endpoints.GET_COLLEGES));
				const response = await axios.get(getEndpoint(Endpoints.GET_COLLEGES));
				if (Array.isArray(response.data)) {
					console.log("Colleges data received:", response.data);
					setColleges(response.data);
				} else {
					console.error("College data is not in expected format:", response.data);
					toast.error("Failed to load colleges. Invalid data format received.");
				}
				setLoading(false);
			} catch (error: any) {
				console.error("Error fetching colleges:", error);

				// Provide more specific error messages based on the error type
				if (error.code === "ERR_NETWORK") {
					toast.error(
						"Cannot connect to the backend server. Please ensure it's running on the correct port."
					);
				} else if (error.response?.status === 404) {
					toast.error("College endpoint not found. The backend API may be misconfigured.");
				} else {
					toast.error("Failed to load colleges. Please refresh the page.");
				}

				// Add dummy college data as a fallback
				const dummyColleges = [
					{ _id: "default", name: "Your College (Server Unavailable)", state: "UNKNOWN" },
					{ _id: "OTHER", name: "OTHER", state: "UNKNOWN" },
				];
				console.log("Using fallback college data:", dummyColleges);
				setColleges(dummyColleges);
				setLoading(false);
			}
		};

		fetchColleges();
	}, []);
	// Redirect to dashboard page if verification is successful
	useEffect(() => {
		if (verificationSuccessful) {
			toast.success("Account created and verified successfully! Redirecting to dashboard...");
			setTimeout(() => router.push("/dashboard"), 2000);
		}
	}, [verificationSuccessful, router]);

	// Define otherCollege after colleges are loaded
	const otherCollege: College = colleges.find((college) => college.name === "OTHER") || {
		_id: "OTHER",
		name: "OTHER",
		state: "UNKNOWN",
	};

	const form = useForm<z.infer<typeof registerFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			college: "",
			mobile_number: "",
			gender: undefined,
		},
	});

	const onSubmit = async (data: z.infer<typeof registerFormSchema>): Promise<void> => {
		setDisabled(true);
		try {
			if (!turnstileToken) {
				toast.error("Please complete the CAPTCHA.");
				setDisabled(false);
				return;
			}
			// Prepare the data to match backend requirements
			const payload = {
				email: data.email,
				username: data.username,
				password: data.password,
				college: data.college,
				collegeOther: data.college === otherCollege._id ? data.collegeOther : undefined,
				mobile_number: data.mobile_number,
				gender: data.gender,
				turnstileToken,
			};

			const response = await axios.post(getEndpoint(Endpoints.REGISTER), payload);
			setRegistrationEmail(data.email);
			setShowOTPVerification(true);
			toast.success(response.data.message);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while registering");
			}
		}
		setDisabled(false);
	};

	const handleVerificationSuccess = () => {
		setVerificationSuccessful(true);
	};

	const handleVerificationCancel = () => {
		setShowOTPVerification(false);
	};

	// Password requirements
	const passwordRequirements = [
		{ id: 1, text: "At least 8 characters" },
		{ id: 2, text: "At least one uppercase letter (A-Z)" },
		{ id: 3, text: "At least one lowercase letter (a-z)" },
		{ id: 4, text: "At least one number (0-9)" },
		{ id: 5, text: "At least one special character (!@#$...)" },
	];

	// Function to check if a specific password requirement is met
	const checkRequirement = (requirement: string, password: string): boolean => {
		if (!password) return false;
		switch (requirement) {
			case "At least 8 characters":
				return password.length >= 8;
			case "At least one uppercase letter (A-Z)":
				return /[A-Z]/.test(password);
			case "At least one lowercase letter (a-z)":
				return /[a-z]/.test(password);
			case "At least one number (0-9)":
				return /[0-9]/.test(password);
			case "At least one special character (!@#$...)":
				return /[^\da-zA-Z]/.test(password);
			default:
				return false;
		}
	};

	// If we're showing the OTP verification form, render that instead
	if (showOTPVerification) {
		return (
			<OTPVerificationForm
				email={registrationEmail}
				onVerificationSuccess={handleVerificationSuccess}
				onCancel={handleVerificationCancel}
			/>
		);
	}

	return (
		<Card className="w-full sm:w-[900px] backdrop-blur-xl bg-black/40 border-gray-500/20 shadow-lg !important">
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
					<CardTitle className="text-2xl text-center text-white mb-4">Create an account</CardTitle>
					<CardDescription className="text-center text-gray-300">
						Join the hackathon community and showcase your skills. Please do not use your college-provided
						email.
					</CardDescription>

					<div className="mt-8 hidden lg:block">
						<p className="text-center text-sm text-gray-400">
							Already have an account?{" "}
							<Link
								href="/login"
								className="font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
								Log in
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
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="email"
										render={({ field }): React.JSX.Element => (
											<FormItem>
												<div className="flex flex-col">
													<FormLabel className="text-gray-200">Email</FormLabel>
													<FormMessage className="text-xs text-gray-400" />
												</div>
												<FormControl>
													<Input
														{...field}
														type="email"
														placeholder="Enter your personal email"
														className="bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400 focus-visible:ring-gray-500/50"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="username"
										render={({ field }): React.JSX.Element => (
											<FormItem>
												<div className="flex flex-col">
													<FormLabel className="text-gray-200">Full Name</FormLabel>
													<FormMessage className="text-xs" />
												</div>
												<FormControl>
													<Input
														{...field}
														placeholder="Enter your name"
														className="bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="gender"
										render={({ field }): React.JSX.Element => (
											<FormItem>
												<div className="flex flex-col">
													<FormLabel className="text-gray-200">Gender</FormLabel>
													<FormMessage className="text-xs" />
												</div>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger
															className="h-10 backdrop-blur-md bg-black/30 border-gray-400/30 text-white shadow-sm
															hover:bg-white/10 transition-colors focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50">
															<SelectValue
																placeholder="Select your Gender"
																className="placeholder:text-gray-300"
															/>
														</SelectTrigger>
													</FormControl>
													<SelectContent className="backdrop-blur-xl bg-black/70 border border-gray-500/30 text-white shadow-lg animate-in fade-in-80 zoom-in-95">
														<SelectItem
															value="Male"
															className="focus:bg-white/10 hover:bg-white/20">
															Male
														</SelectItem>
														<SelectItem
															value="Female"
															className="focus:bg-white/10 hover:bg-white/20">
															Female
														</SelectItem>
														<SelectItem
															value="Other"
															className="focus:bg-white/10 hover:bg-white/20">
															Other
														</SelectItem>
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="mobile_number"
										render={({ field }): React.JSX.Element => (
											<FormItem>
												<div className="flex flex-col">
													<FormLabel className="text-gray-200">Phone Number</FormLabel>
													<FormMessage className="text-xs" />
												</div>
												<FormControl>
													<PhoneInput
														value={field.value}
														onChange={(value): void => {
															if (value) form.setValue("mobile_number", value);
														}}
														defaultCountry="IN"
														placeholder="Enter your phone number"
														className="backdrop-blur-md bg-black/30 border-gray-400/30 text-white shadow-sm hover:bg-black/20 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<div className="md:col-span-2">
										<FormField
											control={form.control}
											name="college"
											render={({ field }): React.JSX.Element => (
												<FormItem>
													<div className="flex flex-col">
														<FormLabel className="text-gray-200">College</FormLabel>
														<FormMessage className="text-xs" />
													</div>
													<Popover
														open={collegeComboboxOpen}
														onOpenChange={setCollegeComboboxOpen}>
														<PopoverTrigger asChild>
															<Button
																disabled={loading || !colleges.length}
																variant="outline"
																role="combobox"
																aria-expanded={collegeComboboxOpen}
																className="w-full justify-between font-normal h-10 backdrop-blur-md bg-black/30 border-gray-400/30 text-white
																hover:bg-white/10 transition-colors focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50">
																{loading ? (
																	<span className="text-gray-400">
																		Loading colleges...
																	</span>
																) : (
																	<span
																		className={`max-w-[320px] truncate ${
																			collegeValue.display
																				? "text-white"
																				: "text-gray-300"
																		}`}>
																		{collegeValue.display
																			? collegeValue.display
																			: "Select your College / University"}
																	</span>
																)}
																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
															</Button>
														</PopoverTrigger>
														<PopoverContent className="w-[--radix-popover-trigger-width] p-0 backdrop-blur-xl bg-black/70 border border-gray-500/30 text-white shadow-lg animate-in fade-in-80 zoom-in-95">
															<Command
																className="bg-transparent"
																filter={(value, search) =>
																	value.toLowerCase().includes(search.toLowerCase())
																		? 1
																		: 0
																}>
																<CommandInput
																	placeholder="Search for your college"
																	className="text-white placeholder:text-gray-300 bg-black/40 border-b border-gray-600/30 focus:ring-0 focus:outline-none"
																/>
																<CommandList className="w-full max-h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
																	<CommandEmpty className="py-3 text-center text-gray-300">
																		No college found
																	</CommandEmpty>
																	<CommandGroup className="p-1.5">
																		{colleges.map(
																			(college): React.ReactNode => (
																				<CommandItem
																					key={college._id}
																					value={college.name}
																					className="text-gray-200 hover:bg-gray-800"
																					onSelect={(currentValue): void => {
																						const selectedCollege =
																							colleges.find(
																								(college) =>
																									college.name.toLowerCase() ===
																									currentValue.toLowerCase()
																							) ?? otherCollege;

																						setCollegeOther(
																							selectedCollege.name ===
																								"OTHER"
																						);

																						setCollegeValue({
																							display:
																								selectedCollege.name,
																							value: selectedCollege._id,
																						});

																						form.setValue(
																							"college",
																							selectedCollege._id
																						);

																						setCollegeComboboxOpen(false);
																					}}>
																					<span className="mr-2 flex h-4 w-4 justify-start">
																						<Check
																							className={cn(
																								field.value ===
																									college._id
																									? "opacity-100"
																									: "opacity-0"
																							)}
																						/>
																					</span>
																					{college.name
																						.split(" ")
																						.map(
																							(word) =>
																								word
																									.charAt(0)
																									.toUpperCase() +
																								word
																									.slice(1)
																									.toLowerCase()
																						)
																						.join(" ")}
																				</CommandItem>
																			)
																		)}
																	</CommandGroup>
																</CommandList>
															</Command>
														</PopoverContent>
													</Popover>
												</FormItem>
											)}
										/>
									</div>
									{collegeOther && (
										<div className="md:col-span-2">
											<FormField
												control={form.control}
												name="collegeOther"
												render={({ field }): React.JSX.Element => (
													<FormItem>
														<div className="flex flex-col">
															<FormLabel className="text-gray-200">
																College Name
															</FormLabel>
															<FormMessage className="text-xs" />
														</div>
														<FormControl>
															<Input
																{...field}
																placeholder="Enter your college name"
																className="bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400"
															/>
														</FormControl>
													</FormItem>
												)}
											/>
										</div>
									)}
									{/* Password fields in a single grid cell with 2 columns - with proper alignment */}
									<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
										{/* Password field */}
										<FormField
											control={form.control}
											name="password"
											render={({ field }): React.JSX.Element => (
												<FormItem className="relative flex flex-col">
													<div className="flex items-center justify-between">
														<FormLabel className="text-gray-200">Password</FormLabel>

														<TooltipProvider>
															<Tooltip delayDuration={0}>
																<TooltipTrigger asChild>
																	<Button
																		variant="ghost"
																		size="icon"
																		className="h-5 w-5 rounded-full p-0 text-gray-400 hover:bg-transparent hover:text-gray-300">
																		<Info className="h-4 w-4" />
																		<span className="sr-only">
																			Password requirements
																		</span>
																	</Button>
																</TooltipTrigger>
																<TooltipContent
																	align="end"
																	className="w-[260px] p-0 bg-gray-900/95 border-gray-700">
																	<div className="p-3">
																		<p className="text-sm font-medium text-gray-300 mb-2">
																			Password Requirements:
																		</p>
																		<ul className="text-xs space-y-1 text-gray-400">
																			{passwordRequirements.map((req) => {
																				const isMet = checkRequirement(
																					req.text,
																					field.value
																				);
																				return (
																					<li
																						key={req.id}
																						className="flex items-center">
																						{isMet ? (
																							<Check className="mr-1.5 h-3.5 w-3.5 text-green-500" />
																						) : (
																							<X className="mr-1.5 h-3.5 w-3.5 text-red-500" />
																						)}
																						{req.text}
																					</li>
																				);
																			})}
																		</ul>
																	</div>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<FormControl>
														<PasswordInput
															{...field}
															placeholder="Enter your password"
															className="bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400"
															onFocus={() => setPasswordFocused(true)}
															onBlur={() => {
																setPasswordFocused(false);
																field.onBlur();
															}}
														/>
													</FormControl>

													{/* Only show non-matching error here, not the complex password requirements */}
													{form.formState.errors.password &&
														form.formState.errors.password.message !==
															"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" && (
															<p className="text-xs mt-1 text-red-500">
																{form.formState.errors.password.message as string}
															</p>
														)}

													{/* Show password hint popover when focused - positioned below the input */}
													{passwordFocused && (
														<div className="mt-2 p-3 bg-gray-900/95 border border-gray-700 rounded-md shadow-lg absolute z-10 left-0 top-full mt-1 w-[260px]">
															<p className="text-sm font-medium text-gray-300 mb-2">
																Password Requirements:
															</p>
															<ul className="text-xs space-y-1 text-gray-400">
																{passwordRequirements.map((req) => {
																	const isMet = checkRequirement(
																		req.text,
																		field.value
																	);
																	return (
																		<li key={req.id} className="flex items-center">
																			{isMet ? (
																				<Check className="mr-1.5 h-3.5 w-3.5 text-green-500" />
																			) : (
																				<X className="mr-1.5 h-3.5 w-3.5 text-red-500" />
																			)}
																			{req.text}
																		</li>
																	);
																})}
															</ul>
														</div>
													)}
												</FormItem>
											)}
										/>

										{/* Confirm Password field - fixed alignment */}
										<FormField
											control={form.control}
											name="confirmPassword"
											render={({ field }): React.JSX.Element => (
												<FormItem className="flex flex-col">
													<div className="flex items-center justify-between">
														<FormLabel className="text-gray-200">
															Confirm password
														</FormLabel>
														<div className="h-5 w-5"></div>{" "}
														{/* Empty div to match the info button's space */}
													</div>
													<FormControl>
														<PasswordInput
															{...field}
															placeholder="Confirm your password"
															className="bg-black/20 border-gray-500/30 text-white placeholder:text-gray-400"
														/>
													</FormControl>
													{form.formState.errors.confirmPassword && (
														<p className="text-xs mt-1 text-red-500">
															{form.formState.errors.confirmPassword.message as string}
														</p>
													)}
												</FormItem>
											)}
										/>
									</div>
								</div>
								{/* Cloudflare Turnstile CAPTCHA */}
								<div className="flex justify-center my-6">
									<Turnstile
										sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
										onVerify={(token) => setTurnstileToken(token)}
										className="rounded-md shadow-md"
										style={{ minWidth: 200 }}
									/>
								</div>

								{/* Enhanced Glassmorphic Button with SpotlightCard effect */}
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

									{/* Apply SpotlightCard directly to the Button */}
									<SpotlightCard
										className="bg-transparent border-0 rounded-lg p-0 w-full"
										spotlightColor="rgba(147, 51, 234, 0.3)">
										<Button
											type="submit"
											disabled={disabled}
											className={cn(
												"relative w-full bg-transparent border-0 text-white py-5 rounded-lg text-base font-medium",
												"shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]",
												"transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
											)}>
											{disabled ? (
												<HashLoader color="#ffffff" size={20} />
											) : (
												<>
													<span className="relative z-10 drop-shadow-sm">Next</span>
													{/* Subtle inner glow */}
													<span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
												</>
											)}
										</Button>
									</SpotlightCard>
								</div>

								{/* Mobile footer links */}
								<div className="mt-6 lg:hidden">
									<p className="text-center text-sm text-gray-400">
										Already have an account?{" "}
										<Link
											href="/login"
											className="font-semibold leading-6 text-gray-300 hover:text-white transition-colors">
											Log in
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

			{/* Combined animation keyframes and styles */}
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

				/* Prevent form validation from changing box color */
				.FormItem {
					color: inherit !important;
				}

				.FormMessage {
					color: #9ca3af !important; /* text-gray-400 */
				}

				/* Override any validation color changes */
				[data-valid],
				[data-invalid],
				[data-pending] {
					color: inherit !important;
				}
			`}</style>
		</Card>
	);
}

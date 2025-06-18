"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { College, useCollege } from "@/hooks/useCollege";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { cn } from "@/lib/utils";

import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, PasswordInput } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";

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
		college: z.string().min(5),
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
	});

export default function RegisterForm(): React.JSX.Element {
	const colleges = useCollege();
	const [disabled, setDisabled] = useState(false);
	const [collegeComboboxOpen, setCollegeComboboxOpen] = React.useState(false);
	const [collegeValue, setCollegeValue] = React.useState({ display: "", value: "" });
	const [collegeOther, setCollegeOther] = React.useState(false);

	const router = useRouter();

	const otherCollege: College = colleges.find((college) => college.name === "OTHER") ?? {
		_id: "default_id",
		name: "OTHER",
		state: "UNKNOWN",
	};

	const form = useForm<z.infer<typeof registerFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(registerFormSchema),
	});

	const onSubmit = async (data: z.infer<typeof registerFormSchema>): Promise<void> => {
		setDisabled(true);
		try {
			const response = await axios.post<{ message: string }>(getEndpoint(Endpoints.REGISTER), data);
			toast.success(`${response.data.message}, check your email to verify your account!`);
			setTimeout(() => router.push("/login"), 5000);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while registering");
			}
		}
		setDisabled(false);
	};

	return (
		<Card className="relative m-4 border-none shadow-md dark:shadow-none sm:mx-auto sm:w-[420px]">
			<BorderBeam size={400} duration={12} delay={9} />
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Create an account</CardTitle>
				<CardDescription className="font-bold">
					Please do not use your college-provided email (e.g., Outlook).
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4 pb-2">
				<Form {...form}>
					{}
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="email"
							render={({ field }): React.JSX.Element => (
								<FormItem>
									<div className="flex flex-col">
										<FormLabel>Email</FormLabel>
										<FormMessage className="text-xs" />
									</div>
									<FormControl>
										<Input {...field} type="email" placeholder="Enter your personal email" />
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
										<FormLabel>Full Name</FormLabel>
										<FormMessage className="text-xs" />
									</div>
									<FormControl>
										<Input {...field} placeholder="Enter your name" />
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
										<FormLabel>Gender</FormLabel>
										<FormMessage className="text-xs" />
									</div>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											{}
											<SelectTrigger className={`${field.value ? "" : "text-muted-foreground"}`}>
												<SelectValue placeholder="Select your Gender" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="Male">Male</SelectItem>
											<SelectItem value="Female">Female</SelectItem>
											<SelectItem value="Other">Other</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="mobile_number"
							render={(): React.JSX.Element => (
								<FormItem>
									<div className="flex flex-col">
										<FormLabel>Phone Number</FormLabel>
										<FormMessage className="text-xs" />
									</div>
									<FormControl>
										<PhoneInput
											onChange={(value): void => form.setValue("mobile_number", value)}
											name="mobile_number"
											defaultCountry={"IN"}
											placeholder="Enter your phone number"
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="college"
							render={({ field }): React.JSX.Element => (
								<FormItem>
									<div className="flex flex-col">
										<FormLabel>College</FormLabel>
										<FormMessage className="text-xs" />
									</div>
									<Popover open={collegeComboboxOpen} onOpenChange={setCollegeComboboxOpen}>
										<PopoverTrigger asChild>
											<Button
												disabled={!colleges.length}
												variant="outline"
												role="combobox"
												aria-expanded={collegeComboboxOpen}
												className="w-full justify-between font-normal">
												<span
													className={`max-w-[320px] truncate ${
														collegeValue.display ? "" : "text-muted-foreground"
													}`}>
													{collegeValue.display
														? collegeValue.display
														: "Select your College / University"}
												</span>
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[--radix-popover-trigger-width] p-0">
											<Command
												filter={(input, search): number =>
													input.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
												}>
												<CommandInput placeholder="Search" />
												<CommandList className="w-full">
													<CommandEmpty>No college selected</CommandEmpty>
													<CommandGroup>
														{colleges.map(
															(college): React.ReactNode => (
																<CommandItem
																	key={college._id}
																	value={college.name}
																	onSelect={(currentValue): void => {
																		const selectedCollege =
																			colleges.find(
																				(college) =>
																					college.name.toLocaleLowerCase() ===
																					currentValue
																			) ?? otherCollege;

																		setCollegeOther(
																			selectedCollege.name === otherCollege.name
																		);

																		setCollegeValue({
																			display: selectedCollege.name,
																			value: selectedCollege._id,
																		});

																		field.onChange(selectedCollege._id);

																		setCollegeComboboxOpen(false);
																	}}>
																	<span className="mr-2 flex h-4 w-4 justify-start">
																		<Check
																			className={cn(
																				collegeValue.value === college._id
																					? "opacity-100"
																					: "opacity-0"
																			)}
																		/>
																	</span>
																	{college.name
																		.split(" ")
																		.map(
																			(word) =>
																				word.charAt(0).toUpperCase() +
																				word.slice(1).toLowerCase()
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
						{collegeOther && (
							<FormField
								control={form.control}
								name="collegeOther"
								render={({ field }): React.JSX.Element => (
									<FormItem>
										<FormMessage className="text-xs" />
										<FormControl>
											<Input {...field} placeholder="Enter your college name" />
										</FormControl>
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name="password"
							render={({ field }): React.JSX.Element => (
								<FormItem>
									<div className="flex flex-col">
										<FormLabel>Password</FormLabel>
										<FormMessage className="text-xs" />
									</div>
									<FormControl>
										<PasswordInput {...field} placeholder="Enter your password" />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }): React.JSX.Element => (
								<FormItem>
									<div className="flex flex-col">
										<FormLabel>Confirm password</FormLabel>
										<FormMessage className="text-xs" />
									</div>
									<FormControl>
										<PasswordInput {...field} placeholder="Confirm your password" />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={disabled}
							className="w-full disabled:cursor-not-allowed disabled:opacity-70">
							{disabled ? <HashLoader color="#a457f7" size={20} /> : "Sign Up"}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="mt-2 flex flex-col items-center justify-center">
				<p className="text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Log in
					</Link>
				</p>
				<p className="mt-2 text-center text-sm text-muted-foreground">
					<Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Go Home
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}

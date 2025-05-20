"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { PasswordInput } from "../ui/input";

const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			),
		confirmPassword: z.string(),
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

export default function ResetPasswordPage(): React.JSX.Element {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		mode: "onChange",
		resolver: zodResolver(resetPasswordSchema),
	});

	const InvalidAlert = (): React.JSX.Element => {
		return (
			<>
				<Alert variant={"destructive"} className="mb-2 bg-background/25">
					<MdErrorOutline className="h-4 w-4" />
					<AlertTitle>No token provided</AlertTitle>
					<AlertDescription>
						This is an invalid token, please check your email for the correct link
					</AlertDescription>
				</Alert>
			</>
		);
	};

	const onSubmit = async (data: z.infer<typeof resetPasswordSchema>): Promise<void> => {
		setLoading(true);
		try {
			const res = await axios.post<{ message: string }>(getEndpoint(Endpoints.RESET_PASSWORD), {
				...data,
				token,
			});
			toast.success(res.data.message);
			router.push("/login");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while resetting the password");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="relative border-none shadow-md dark:shadow-none sm:mx-auto sm:w-[420px]">
			<BorderBeam size={250} duration={12} delay={9} />
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Reset Password</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				{token ? (
					<Form {...form}>
						{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
						<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="password"
								render={({ field }): React.JSX.Element => (
									<FormItem>
										<div className="flex flex-col">
											<FormLabel>New Password</FormLabel>
											<FormMessage className="text-xs">
												{form.formState.errors.password?.message}
											</FormMessage>
										</div>
										<FormControl>
											<PasswordInput {...field} placeholder="New Password" />
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
											<FormLabel>Confirm Password</FormLabel>
											<FormMessage className="text-xs">
												{form.formState.errors.confirmPassword?.message}
											</FormMessage>
										</div>
										<FormControl>
											<PasswordInput {...field} placeholder="Confirm Password" />
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={loading} className="w-full">
								{loading ? <HashLoader color="#a457f7" size={20} /> : "Update Password"}
							</Button>
						</form>
					</Form>
				) : (
					<InvalidAlert />
				)}
			</CardContent>
		</Card>
	);
}

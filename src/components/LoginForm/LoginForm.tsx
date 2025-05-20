"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";

import { useSession } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { BorderBeam } from "../ui/border-beam";
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
		<Card className="relative border-none shadow-md dark:shadow-none sm:mx-auto sm:w-[420px]">
			<BorderBeam size={400} duration={12} delay={9} />
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Login to your account</CardTitle>
				<CardDescription>Enter your email and password below to login</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4 pb-2">
				<Form {...form}>
					{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="email"
							render={({ field }): React.JSX.Element => (
								<FormItem>
									<div className="flex flex-col">
										<FormLabel>Email</FormLabel>
									</div>
									<FormControl>
										<Input {...field} type="email" placeholder="Enter your email" />
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }): React.JSX.Element => (
								<FormItem className="mt-4">
									<div className="flex flex-row items-center justify-between">
										<FormLabel>Password</FormLabel>
										<ForgotPasswordDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
									</div>
									<FormControl>
										<PasswordInput {...field} placeholder="Enter your password" />
									</FormControl>
									<FormMessage className="text-xs" />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={disabled} className="mt-6 w-full">
							{disabled ? <HashLoader color="#a457f7" size={20} /> : "Login"}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="mt-2 flex flex-col items-center justify-center">
				<p className="text-center text-sm text-muted-foreground">
					Don't have an account?{" "}
					<Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Sign up
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

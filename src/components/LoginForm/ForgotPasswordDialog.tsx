"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import { useTheme } from "@/components/ThemeProvider";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Endpoints, getEndpoint } from "@/lib/endpoints";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const resendEmailSchema = z.object({
	email: z.string().email(),
});

export default function ForgotPasswordDialog({
	modalOpen,
	setModalOpen,
}: {
	modalOpen: boolean;
	setModalOpen: (open: boolean) => void;
}): React.JSX.Element {
	const [disabled, setDisabled] = useState(false);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	const form = useForm<z.infer<typeof resendEmailSchema>>({
		mode: "onChange",
		resolver: zodResolver(resendEmailSchema),
	});

	const onSubmit = async (data: z.infer<typeof resendEmailSchema>): Promise<void> => {
		setDisabled(true);
		try {
			const response = await axios.post<{ message: string }>(getEndpoint(Endpoints.FORGOT_PASSWORD), data);
			toast.success(response.data.message);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
			} else {
				toast.error("An error occurred while resending the email");
			}
		}
		setModalOpen(false);
		setDisabled(false);
	};
	return (
		<AlertDialog open={modalOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant={"link"}
					className="h-auto p-0 text-[13px] text-blue-500"
					onClick={(): void => setModalOpen(true)}>
					Forgot password?
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent
				className="backdrop-blur-2xl border rounded-2xl shadow-2xl overflow-hidden"
				style={{
					background: isDark
						? "linear-gradient(to bottom right, rgba(15, 25, 15, 0.95), rgba(10, 26, 15, 0.98), rgba(8, 20, 12, 0.95))"
						: "linear-gradient(to bottom right, rgba(240, 255, 245, 0.95), rgba(220, 252, 231, 0.9), rgba(235, 255, 240, 0.92))",
					borderColor: isDark ? "rgba(46, 204, 113, 0.3)" : "rgba(16, 109, 32, 0.3)",
					boxShadow: isDark
						? "0 32px 64px -12px rgba(46, 204, 113, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)"
						: "0 32px 64px -12px rgba(16, 109, 32, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3)",
				}}>
				<AlertDialogHeader>
					<AlertDialogTitle
						style={{
							color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(40, 80, 40, 0.95)",
						}}>
						Forgot your password?
					</AlertDialogTitle>
					<AlertDialogDescription
						style={{
							color: isDark ? "rgba(200, 220, 200, 0.8)" : "rgba(60, 100, 60, 0.85)",
						}}>
						Enter your email below and we'll send you a link to reset your password
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-col items-center justify-center">
					<Form {...form}>
						{}
						<form className="w-full space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }): React.JSX.Element => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												type="email"
												placeholder="Enter your email"
												className="backdrop-blur-sm border transition-all duration-300"
												style={{
													background: isDark
														? "linear-gradient(135deg, rgba(15, 25, 15, 0.6), rgba(10, 26, 15, 0.8))"
														: "linear-gradient(135deg, rgba(240, 255, 245, 0.6), rgba(220, 252, 231, 0.8))",
													borderColor: isDark
														? "rgba(46, 204, 113, 0.3)"
														: "rgba(16, 109, 32, 0.3)",
													color: isDark
														? "rgba(200, 240, 200, 0.95)"
														: "rgba(40, 80, 40, 0.95)",
												}}
											/>
										</FormControl>
										<div className="flex flex-col">
											<FormMessage className="text-xs" />
										</div>
									</FormItem>
								)}
							/>
							<div className="flex flex-row space-x-4">
								<AlertDialogCancel
									className="w-full disabled:cursor-not-allowed backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02]"
									disabled={disabled}
									onClick={(): void => setModalOpen(false)}
									style={{
										background: isDark
											? "linear-gradient(135deg, rgba(60, 60, 60, 0.6), rgba(80, 80, 80, 0.8))"
											: "linear-gradient(135deg, rgba(200, 200, 200, 0.6), rgba(220, 220, 220, 0.8))",
										borderColor: isDark ? "rgba(120, 120, 120, 0.5)" : "rgba(160, 160, 160, 0.5)",
										color: isDark ? "rgba(220, 220, 220, 0.9)" : "rgba(60, 60, 60, 0.9)",
									}}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									type="submit"
									disabled={disabled}
									className="w-full disabled:cursor-not-allowed backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02]"
									style={{
										background: isDark
											? "linear-gradient(135deg, rgba(46, 204, 113, 0.8), rgba(16, 109, 32, 0.9))"
											: "linear-gradient(135deg, rgba(16, 109, 32, 0.8), rgba(46, 204, 113, 0.9))",
										borderColor: isDark ? "rgba(46, 204, 113, 0.5)" : "rgba(16, 109, 32, 0.5)",
										color: "rgba(255, 255, 255, 0.95)",
										boxShadow: isDark
											? "0 4px 12px rgba(46, 204, 113, 0.3)"
											: "0 4px 12px rgba(16, 109, 32, 0.3)",
									}}>
									Send email
								</AlertDialogAction>
							</div>
						</form>
					</Form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

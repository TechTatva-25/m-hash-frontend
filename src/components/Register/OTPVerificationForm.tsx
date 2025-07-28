"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import SpotlightCard from "@/components/ui/spotlight-card";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const otpFormSchema = z.object({
	otp: z
		.string()
		.min(4, "OTP must be 4 digits")
		.max(4, "OTP must be 4 digits")
		.refine((val) => /^\d{4}$/.test(val), "OTP must contain only digits"),
});

interface OTPVerificationFormProps {
	email: string;
	onVerificationSuccess: () => void;
	onCancel: () => void;
}

export default function OTPVerificationForm({
	email,
	onVerificationSuccess,
	onCancel,
}: OTPVerificationFormProps): React.JSX.Element {
	const [isLoading, setIsLoading] = useState(false);
	const [resendDisabled, setResendDisabled] = useState(false);
	const [timer, setTimer] = useState(0);

	const form = useForm<z.infer<typeof otpFormSchema>>({
		resolver: zodResolver(otpFormSchema),
		defaultValues: {
			otp: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof otpFormSchema>): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await axios.post(getEndpoint(Endpoints.VERIFY_EMAIL), {
				email,
				otp: data.otp,
			});

			toast.success(response.data.message);
			// If verification was successful and user was created
			if (response.data.verified) {
				onVerificationSuccess();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error((error as AxiosError<{ message: string }>).response?.data.message || "Verification failed");
			} else {
				toast.error("An error occurred during verification");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendOTP = async (): Promise<void> => {
		setResendDisabled(true);
		try {
			// Use the sendVerificationMail endpoint to resend OTP
			await axios.post(getEndpoint(Endpoints.SEND_VERIFICATION_EMAIL), {
				email,
			});
			toast.info("A new OTP has been sent to your email");

			// Start countdown timer (60 seconds)
			setTimer(60);
			const interval = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer <= 1) {
						clearInterval(interval);
						setResendDisabled(false);
						return 0;
					}
					return prevTimer - 1;
				});
			}, 1000);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(
					(error as AxiosError<{ message: string }>).response?.data.message || "Failed to resend OTP"
				);
			} else {
				toast.error("Failed to resend OTP");
			}
			setResendDisabled(false);
		}
	};

	return (
		<Card className="w-full sm:w-[450px] backdrop-blur-xl bg-black/40 border-gray-500/20 shadow-lg !important">
			<CardHeader className="space-y-3">
				<CardTitle className="text-2xl font-bold text-center text-white">Verify Your Email</CardTitle>
				<CardDescription className="text-center text-gray-300">
					We've sent a 4-digit verification code to <span className="font-medium text-white">{email}</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="otp"
							render={({ field }) => (
								<FormItem>
									<div className="flex flex-col">
										<FormLabel className="text-gray-200">Verification Code</FormLabel>
										<FormMessage className="text-xs text-gray-400" />
									</div>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter 4-digit code"
											className="bg-black/20 border-gray-500/30 text-white text-center text-lg tracking-widest placeholder:text-gray-400 placeholder:tracking-normal placeholder:text-base"
											maxLength={4}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-4">
							{/* Verify OTP Button */}
							<div className="relative overflow-hidden group">
								<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-80 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
								<div className="absolute inset-0 backdrop-blur-md bg-white/10 rounded-lg border border-white/30"></div>
								<SpotlightCard className="bg-transparent border-0 rounded-lg p-0 w-full">
									<Button
										type="submit"
										disabled={isLoading}
										className={cn(
											"relative w-full bg-transparent border-0 text-white py-5 rounded-lg text-base font-medium",
											"shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]",
											"transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
										)}>
										{isLoading ? (
											<HashLoader color="#ffffff" size={20} />
										) : (
											<span className="relative z-10 drop-shadow-sm">Verify Email</span>
										)}
									</Button>
								</SpotlightCard>
							</div>

							{/* Resend OTP button */}
							<Button
								type="button"
								variant="ghost"
								onClick={handleResendOTP}
								disabled={resendDisabled}
								className="text-gray-300 hover:text-white hover:bg-black/20">
								{timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
							</Button>

							{/* Cancel Button */}
							<Button
								type="button"
								variant="ghost"
								onClick={onCancel}
								className="text-gray-400 hover:text-white hover:bg-black/20">
								Go Back to Registration
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

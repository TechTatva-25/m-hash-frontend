"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

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
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Forgot your password?</AlertDialogTitle>
					<AlertDialogDescription>
						Enter your email below and we'll send you a link to reset your password
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-col items-center justify-center">
					<Form {...form}>
						{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
						<form className="w-full space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }): React.JSX.Element => (
									<FormItem>
										<FormControl>
											<Input {...field} type="email" placeholder="Enter your email" />
										</FormControl>
										<div className="flex flex-col">
											<FormMessage className="text-xs" />
										</div>
									</FormItem>
								)}
							/>
							<div className="flex flex-row space-x-4">
								<AlertDialogCancel
									className="w-full disabled:cursor-not-allowed"
									disabled={disabled}
									onClick={(): void => setModalOpen(false)}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									type="submit"
									disabled={disabled}
									className="w-full disabled:cursor-not-allowed">
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

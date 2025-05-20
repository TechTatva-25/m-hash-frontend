"use client";

import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResendEmailDialog from "@/components/VerifyEmail/ResendEmailDialog";
import { Endpoints, getEndpoint } from "@/lib/endpoints";

interface InvalidAlertProps {
	showErrorBox: boolean;
}

export default function VerifyEmailForm(): React.JSX.Element {
	const router = useRouter();
	const params = useSearchParams();
	const token = params.get("token");
	const [modalOpen, setModalOpen] = React.useState(false);
	const [verified, setVerified] = React.useState(false);
	const [valid, setValid] = React.useState(true);
	const [loading, setLoading] = React.useState(true);

	const InvalidAlert = ({ showErrorBox }: InvalidAlertProps): React.JSX.Element => {
		return (
			<>
				{showErrorBox && (
					<Alert variant={"destructive"} className="bg-background/25">
						<MdErrorOutline className="h-4 w-4" />
						<AlertTitle>Invalid token</AlertTitle>
						<AlertDescription>
							This is an invalid token, please check your email for the correct link
						</AlertDescription>
					</Alert>
				)}
				<ResendEmailDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />
			</>
		);
	};

	React.useEffect(() => {
		if (!token || verified) return;

		void axios
			.get<{ message: string }>(`${getEndpoint(Endpoints.VERIFY_EMAIL)}?token=${token}`)
			.then((response) => {
				setVerified(response.status === 200);
				toast.success(response.data.message);
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					setValid(false);
					toast.error((error as AxiosError<{ message: string }>).response?.data.message ?? error.message);
				} else {
					toast.error("Failed to verify email, something went wrong");
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [token]);

	if (!token) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dot-violet-500/[0.5] dark:bg-dot-white/[0.2]">
				<Card className="relative border-none shadow-md dark:shadow-none sm:mx-auto sm:w-[420px]">
					<BorderBeam size={250} duration={12} delay={9} />
					<CardHeader className="space-y-1">
						<CardTitle className="text-center text-2xl  tracking-tight">Email Verification</CardTitle>
					</CardHeader>
					<CardContent>
						<InvalidAlert showErrorBox={false} />
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<Card className="relative border-none shadow-md dark:shadow-none sm:mx-auto sm:w-[420px]">
			<BorderBeam size={200} duration={12} delay={9} />
			<CardHeader className="space-y-1">
				<CardTitle className="text-center text-2xl tracking-tight">
					{verified ? "Email verified" : loading ? "Verifying email" : "Email Verification"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{verified ? (
					<>
						<Alert variant={"success"}>
							<IoShieldCheckmarkSharp className="h-4 w-4" />
							<AlertTitle>Email verified</AlertTitle>
							<AlertDescription>Your email has been successfully verified</AlertDescription>
						</Alert>
						<Button
							className="mt-4 w-full"
							onClick={(): void => {
								router.push("/login");
							}}>
							Log in
						</Button>
					</>
				) : valid ? (
					<div className="flex flex-col items-center justify-center">
						<HashLoader className="my-2" color="#a457f7" size={50} />
					</div>
				) : (
					<InvalidAlert showErrorBox={true} />
				)}
			</CardContent>
		</Card>
	);
}

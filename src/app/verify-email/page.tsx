"use client";

import { Suspense } from "react";
import { HashLoader } from "react-spinners";

import VerifyEmailForm from "@/components/VerifyEmail/VerifyEmailForm";

export default function VerifyEmailPage(): React.JSX.Element {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dot-violet-500/[0.5] dark:bg-dot-white/[0.2]">
			<Suspense fallback={<HashLoader color="#a457f7" size={40} />}>
				<VerifyEmailForm />
			</Suspense>
		</div>
	);
}

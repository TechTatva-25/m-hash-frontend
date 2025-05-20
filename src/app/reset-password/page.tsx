import React, { Suspense } from "react";
import { HashLoader } from "react-spinners";

import ResetPassword from "@/components/ResetPassword/ResetPasswordForm";

export default function Login(): React.JSX.Element {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dot-violet-500/[0.5] dark:bg-dot-white/[0.2]">
			<Suspense fallback={<HashLoader color="#a457f7" size={40} />}>
				<ResetPassword />
			</Suspense>
		</div>
	);
}

import React from "react";

import RegisterForm from "@/components/Register/RegisterForm";

export default function Register(): React.JSX.Element {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dot-violet-500/[0.5] dark:bg-dot-white/[0.2]">
			<RegisterForm />
		</div>
	);
}

import React from "react";

import LoginForm from "@/components/LoginForm/LoginForm";

export default function Login(): React.JSX.Element {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dot-violet-500/[0.5] dark:bg-dot-white/[0.2]">
			<LoginForm />
		</div>
	);
}

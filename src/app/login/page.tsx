import React from "react";

import LoginForm from "@/components/LoginForm/LoginForm";

export default function Login(): React.JSX.Element {
	return (
		<div
			className="flex min-h-screen flex-col items-center justify-center overflow-hidden relative"
			style={{
				backgroundImage: "url('/images/hackathon-bg.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}>
			{/* Dark overlay for background */}
			<div className="absolute inset-0 bg-black/50"></div>
			<div className="relative z-10">
				<LoginForm />
			</div>
		</div>
	);
}

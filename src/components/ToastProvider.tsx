"use client";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/toastify.css";

import { useTheme } from "next-themes";
import { Bounce, ToastContainer } from "react-toastify";

export default function ToastProvider(): React.JSX.Element {
	const { resolvedTheme } = useTheme();

	return (
		<ToastContainer
			stacked
			position="top-right"
			autoClose={5000}
			newestOnTop={true}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			transition={Bounce}
			theme={resolvedTheme}
			className="custom-toast-container"
		/>
	);
}

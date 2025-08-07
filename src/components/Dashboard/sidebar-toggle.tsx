"use client";

import { ChevronLeft } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function SidebarToggle() {
	const [toggle, setToggle] = useState(true);

	// Manage toggle state locally
	const handleToggle = () => {
		const newState = !toggle;
		setToggle(newState);
		// Dispatch custom event for other components to listen to
		window.dispatchEvent(new CustomEvent("toggle-sidebar"));
	};
	return (
		<div className="invisible absolute -right-[16px] top-[50%] z-20 lg:visible">
			<button
				onClick={handleToggle}
				className="h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-lg transition-all duration-300 hover:opacity-90 active:scale-95"
				style={{
					background: "rgba(139, 92, 246, 0.15)",
					border: "1px solid rgba(255, 255, 255, 0.3)",
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
				}}>
				<ChevronLeft
					className={cn(
						"h-4 w-4 transition-transform duration-700 ease-in-out text-gray-800 dark:text-white",
						toggle ? "rotate-0" : "rotate-180"
					)}
				/>
			</button>
		</div>
	);
}

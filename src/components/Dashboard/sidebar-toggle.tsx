"use client";

import { ChevronLeft } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SidebarToggle(): React.JSX.Element {
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
			<Button
				onClick={handleToggle}
				className="h-8 w-8 rounded-full"
				variant="outline"
				size="icon"
			>
				<ChevronLeft
					className={cn(
						"h-4 w-4 transition-transform duration-700 ease-in-out",
						toggle ? "rotate-0" : "rotate-180"
					)}
				/>
			</Button>
		</div>
	);
}

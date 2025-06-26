"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { useTheme } from "@/components/ThemeProvider";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	
	return (
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				isDark 
					? "bg-[rgba(30,30,40,0.8)] text-[rgba(220,200,255,0.9)] border border-[rgba(103,80,164,0.3)]" 
					: "bg-[rgba(255,255,255,0.95)] text-[rgba(50,50,50,0.9)] border border-[rgba(132,95,220,0.3)]",
				className
			)}
			style={{
				backdropFilter: "blur(8px)",
				boxShadow: isDark
					? "0 2px 10px rgba(0,0,0,0.2)"
					: "0 2px 10px rgba(103,80,164,0.08)",
			}}
			{...props}
		/>
	);
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

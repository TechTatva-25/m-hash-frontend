import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React, { ReactElement } from "react";

import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("flex-col items-center justify-center", {
	variants: {
		show: {
			true: "flex",
			false: "hidden",
		},
	},
	defaultVariants: {
		show: true,
	},
});

const loaderVariants = cva("animate-spin", {
	variants: {
		size: {
			small: "size-6",
			medium: "size-8",
			large: "size-12",
		},
	},
	defaultVariants: {
		size: "medium",
	},
});

interface SpinnerContentProps extends VariantProps<typeof spinnerVariants>, VariantProps<typeof loaderVariants> {
	className?: string;
	children?: React.ReactNode;
}

export function Spinner({ size, show, children, className }: SpinnerContentProps): ReactElement {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	
	return (
		<span 
			className={spinnerVariants({ show })}
			style={{
				backdropFilter: "blur(8px)",
			}}>
			<Loader2 
				className={cn(loaderVariants({ size }), className)} 
				style={{
					color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}`,
					filter: `drop-shadow(0 0 8px ${isDark ? 'rgba(103, 80, 164, 0.4)' : 'rgba(132, 95, 220, 0.3)'})`
				}}
			/>
			{children && 
				<div 
					className="mt-2 text-center"
					style={{
						color: `${isDark ? 'rgba(220, 200, 255, 0.8)' : 'rgba(103, 80, 164, 0.8)'}`,
					}}
				>
					{children}
				</div>
			}
		</span>
	);
}
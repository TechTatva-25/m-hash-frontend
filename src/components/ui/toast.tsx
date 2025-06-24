"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import * as React from "react";
import { useTheme } from "@/components/ThemeProvider";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Viewport>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Viewport
		ref={ref}
		className={cn(
			"fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
			className
		)}
		{...props}
	/>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

interface ToastVariantProps {
	variant?: "default" | "destructive" | "success" | "warning" | "info";
}

const Toast = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & ToastVariantProps
>(({ className, variant = "default", ...props }, ref) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	// Get color values based on variant
	const getColorValues = () => {
		switch (variant) {
			case "destructive":
				return {
					border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
					accentTop: `${isDark ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.5)"}`,
					accentBottom: `${isDark ? "rgba(185, 28, 28, 0.2)" : "rgba(185, 28, 28, 0.4)"}`,
					text: `${isDark ? "rgba(248, 113, 113, 1)" : "rgba(220, 38, 38, 1)"}`,
					background: `${isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)"}`,
					gradient: `linear-gradient(135deg, ${isDark ? "rgba(239, 68, 68, 0.05)" : "rgba(239, 68, 68, 0.08)"}, ${isDark ? "rgba(185, 28, 28, 0.03)" : "rgba(185, 28, 28, 0.05)"})`,
				};
			case "success":
				return {
					border: `1px solid ${isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.2)"}`,
					accentTop: `${isDark ? "rgba(34, 197, 94, 0.3)" : "rgba(34, 197, 94, 0.5)"}`,
					accentBottom: `${isDark ? "rgba(21, 128, 61, 0.2)" : "rgba(21, 128, 61, 0.4)"}`,
					text: `${isDark ? "rgba(74, 222, 128, 1)" : "rgba(22, 163, 74, 1)"}`,
					background: `${isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)"}`,
					gradient: `linear-gradient(135deg, ${isDark ? "rgba(34, 197, 94, 0.05)" : "rgba(34, 197, 94, 0.08)"}, ${isDark ? "rgba(21, 128, 61, 0.03)" : "rgba(21, 128, 61, 0.05)"})`,
				};
			case "warning":
				return {
					border: `1px solid ${isDark ? "rgba(234, 179, 8, 0.2)" : "rgba(234, 179, 8, 0.2)"}`,
					accentTop: `${isDark ? "rgba(234, 179, 8, 0.3)" : "rgba(234, 179, 8, 0.5)"}`,
					accentBottom: `${isDark ? "rgba(161, 98, 7, 0.2)" : "rgba(161, 98, 7, 0.4)"}`,
					text: `${isDark ? "rgba(250, 204, 21, 1)" : "rgba(202, 138, 4, 1)"}`,
					background: `${isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)"}`,
					gradient: `linear-gradient(135deg, ${isDark ? "rgba(234, 179, 8, 0.05)" : "rgba(234, 179, 8, 0.08)"}, ${isDark ? "rgba(161, 98, 7, 0.03)" : "rgba(161, 98, 7, 0.05)"})`,
				};
			case "info":
				return {
					border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.2)"}`,
					accentTop: `${isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.5)"}`,
					accentBottom: `${isDark ? "rgba(29, 78, 216, 0.2)" : "rgba(29, 78, 216, 0.4)"}`,
					text: `${isDark ? "rgba(96, 165, 250, 1)" : "rgba(37, 99, 235, 1)"}`,
					background: `${isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)"}`,
					gradient: `linear-gradient(135deg, ${isDark ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.08)"}, ${isDark ? "rgba(29, 78, 216, 0.03)" : "rgba(29, 78, 216, 0.05)"})`,
				};
			default:
				return {
					border: `1px solid ${isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.2)"}`,
					accentTop: `${isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.5)"}`,
					accentBottom: `${isDark ? "rgba(79, 70, 229, 0.2)" : "rgba(79, 70, 229, 0.4)"}`,
					text: `${isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(15, 23, 42, 0.95)"}`,
					background: `${isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)"}`,
					gradient: `linear-gradient(135deg, ${isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(139, 92, 246, 0.08)"}, ${isDark ? "rgba(79, 70, 229, 0.03)" : "rgba(79, 70, 229, 0.05)"})`,
				};
		}
	};

	const colors = getColorValues();

	return (
		<ToastPrimitives.Root
			ref={ref}
			className={className}
			{...props}
			style={{
				position: "relative",
				display: "flex",
				width: "100%",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "1rem",
				overflow: "hidden",
				borderRadius: "0.75rem",
				padding: "1.25rem",
				paddingRight: "2rem",
				boxShadow: `0 4px 6px ${isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
				transition: "all 0.2s ease",
				backdropFilter: "blur(12px)",
				backgroundColor: colors.background,
				border: colors.border,
				color: colors.text,
				...(props.style as React.CSSProperties),
			}}>
			{/* Gradient overlay */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					background: colors.gradient,
					zIndex: -2,
				}}></div>

			{/* Accent edge */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					borderRadius: "0.75rem",
					overflow: "hidden",
					pointerEvents: "none",
					zIndex: -1,
				}}>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: "1px",
						background: `linear-gradient(to right, transparent, ${colors.accentTop}, transparent)`,
					}}></div>
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height: "1px",
						background: `linear-gradient(to right, transparent, ${colors.accentBottom}, transparent)`,
					}}></div>
			</div>

			{props.children}
		</ToastPrimitives.Root>
	);
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Action>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<ToastPrimitives.Action
			ref={ref}
			{...props}
			style={{
				display: "inline-flex",
				height: "2rem",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "0.375rem",
				border: `1px solid ${isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.2)"}`,
				backgroundColor: `${isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)"}`,
				paddingLeft: "0.75rem",
				paddingRight: "0.75rem",
				fontSize: "0.875rem",
				fontWeight: 500,
				color: `${isDark ? "rgba(216, 180, 254, 1)" : "rgba(139, 92, 246, 1)"}`,
				transition: "all 0.2s ease",
				...(props.style as React.CSSProperties),
			}}
			onMouseOver={(e) => {
				e.currentTarget.style.backgroundColor = `${isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.1)"}`;
				e.currentTarget.style.color = `${isDark ? "rgba(233, 213, 255, 1)" : "rgba(124, 58, 237, 1)"}`;
			}}
			onMouseOut={(e) => {
				e.currentTarget.style.backgroundColor = `${isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)"}`;
				e.currentTarget.style.color = `${isDark ? "rgba(216, 180, 254, 1)" : "rgba(139, 92, 246, 1)"}`;
			}}
			className={className}
		/>
	);
});
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Close>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<ToastPrimitives.Close
			ref={ref}
			toast-close=""
			{...props}
			style={{
				position: "absolute",
				right: "0.5rem",
				top: "0.5rem",
				borderRadius: "0.375rem",
				padding: "0.25rem",
				color: `${isDark ? "rgba(148, 163, 184, 0.5)" : "rgba(100, 116, 139, 0.5)"}`,
				opacity: 0,
				transition: "all 0.2s ease",
				...(props.style as React.CSSProperties),
			}}
			onMouseOver={(e) => {
				e.currentTarget.style.color = `${isDark ? "rgba(226, 232, 240, 1)" : "rgba(51, 65, 85, 1)"}`;
			}}
			onMouseOut={(e) => {
				e.currentTarget.style.color = `${isDark ? "rgba(148, 163, 184, 0.5)" : "rgba(100, 116, 139, 0.5)"}`;
			}}
			className={cn("group-hover:opacity-100 focus:opacity-100 focus:outline-none", className)}>
			<X className="h-4 w-4" />
		</ToastPrimitives.Close>
	);
});
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Title>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<ToastPrimitives.Title
			ref={ref}
			{...props}
			style={{
				fontSize: "0.875rem",
				fontWeight: 600,
				color: `${isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(15, 23, 42, 0.95)"}`,
				...(props.style as React.CSSProperties),
			}}
			className={className}
		/>
	);
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Description>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
	Toast,
	ToastAction,
	type ToastActionElement,
	ToastClose,
	ToastDescription,
	type ToastProps,
	ToastProvider,
	ToastTitle,
	ToastViewport,
};

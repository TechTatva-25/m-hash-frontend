"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";

interface ProgressBadgeProps {
	status: string;
}

const getStatusColor = (status: string, isDark: boolean): { background: string; text: string; border: string } => {
	switch (status) {
		case "QUALIFIED":
			return {
				background: isDark ? "rgba(21, 128, 61, 0.15)" : "rgba(21, 128, 61, 0.1)",
				text: isDark ? "rgb(134, 239, 172)" : "rgb(21, 128, 61)",
				border: isDark ? "rgba(134, 239, 172, 0.2)" : "rgba(21, 128, 61, 0.2)",
			};
		case "Submitted":
			return {
				background: isDark ? "rgba(202, 138, 4, 0.15)" : "rgba(202, 138, 4, 0.1)",
				text: isDark ? "rgb(253, 224, 71)" : "rgb(202, 138, 4)",
				border: isDark ? "rgba(253, 224, 71, 0.2)" : "rgba(202, 138, 4, 0.2)",
			};
		case "Not qualified":
			return {
				background: isDark ? "rgba(185, 28, 28, 0.15)" : "rgba(185, 28, 28, 0.1)",
				text: isDark ? "rgb(252, 165, 165)" : "rgb(185, 28, 28)",
				border: isDark ? "rgba(252, 165, 165, 0.2)" : "rgba(185, 28, 28, 0.2)",
			};
		default:
			return {
				background: isDark ? "rgba(107, 114, 128, 0.15)" : "rgba(107, 114, 128, 0.1)",
				text: isDark ? "rgb(209, 213, 219)" : "rgb(55, 65, 81)",
				border: isDark ? "rgba(209, 213, 219, 0.2)" : "rgba(107, 114, 128, 0.2)",
			};
	}
};

const ProgressBadge: React.FC<ProgressBadgeProps> = ({ status }) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const colors = getStatusColor(status, isDark);

	return (
		<span
			className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
			style={{
				background: colors.background,
				color: colors.text,
				border: `1px solid ${colors.border}`,
				boxShadow: `0 2px 6px ${isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
			}}>
			{status}
		</span>
	);
};

export default ProgressBadge;

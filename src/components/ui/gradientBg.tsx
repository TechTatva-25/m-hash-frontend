import React from "react";
import { useTheme } from "@/components/ThemeProvider";

interface GradientBgProps {
	children?: React.ReactNode;
	lightFrom?: string;
	lightVia?: string;
	lightTo?: string;
	darkFrom?: string;
	darkVia?: string;
	darkTo?: string;
}

const GradientBg: React.FC<GradientBgProps> = ({
	children,
	lightFrom = "#DFDFF5", // Light purple shade
	lightVia = "#F7F8FA", // Light whitish shade
	lightTo = "#8DA3E0", // Light blue shade
	darkFrom = "#1F2039", // Dark purple shade
	darkVia = "#2A2E50", // Mid-dark shade
	darkTo = "#151B33", // Dark blue shade
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div
			className="min-h-screen w-full transition-colors duration-500"
			style={{
				background: `linear-gradient(to bottom, ${
					isDark ? darkFrom : lightFrom
				}, ${isDark ? darkVia : lightVia}, ${isDark ? darkTo : lightTo})`,
			}}>
			{children}
		</div>
	);
};

export default GradientBg;

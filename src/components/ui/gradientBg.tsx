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
	lightFrom = "#F0FDF4", // Light green shade
	lightVia = "#F7F8FA", // Light whitish shade
	lightTo = "#DCFCE7", // Light green shade
	darkFrom = "#031004", // Near-black green
	darkVia = "#001200", // Very dark forest green
	darkTo = "#020602", // Deep evergreen
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

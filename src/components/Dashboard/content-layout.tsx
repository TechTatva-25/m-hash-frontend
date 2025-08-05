"use client";

import { useTheme } from "@/components/ThemeProvider";

import { Navbar } from "./navbar";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div className="min-h-screen w-full">
			<Navbar title={title} />
			<div
				className="min-h-[calc(100vh-64px)] w-full overflow-x-hidden px-4 sm:px-8 relative"
				style={{
					background: isDark
						? "linear-gradient(to bottom, rgba(10,26,15,1), rgba(15,25,15,1))"
						: "linear-gradient(to bottom, rgba(240,255,245,1), rgba(220,252,231,1))",
					backgroundAttachment: "fixed",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					minHeight: "100%",
				}}>
				{/* Subtle green gradient overlay */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: isDark
							? "linear-gradient(135deg, rgba(34,102,68,0.08), rgba(22,78,51,0.05))"
							: "linear-gradient(135deg, rgba(52,168,83,0.12), rgba(72,187,120,0.08))",
						backgroundAttachment: "fixed",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						minHeight: "100%",
					}}></div>

				<div className="relative pb-10 w-full">{children}</div>
			</div>
		</div>
	);
}

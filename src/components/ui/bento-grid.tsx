import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
	return (
		<div className={cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3", className)}>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	title,
	description,
	header,
	icon,
}: {
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	icon?: React.ReactNode;
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div
			className={cn(
				"group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]",
				className
			)}
			style={{
				background: isDark
					? "linear-gradient(135deg, rgba(0, 40, 25, 0.8) 0%, rgba(0, 50, 30, 0.6) 100%)"
					: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 255, 245, 0.7) 100%)",
				backdropFilter: "blur(16px)",
				boxShadow: isDark
					? `0 8px 25px rgba(0, 0, 0, 0.3), 
             0 0 0 1px rgba(46, 204, 113, 0.3),
             inset 0 1px 0 0 rgba(46, 204, 113, 0.05)`
					: `0 8px 25px rgba(16, 109, 32, 0.15), 
             0 0 0 1px rgba(16, 109, 32, 0.2),
             inset 0 1px 0 0 rgba(255, 255, 255, 0.8)`,
				border: isDark ? "1px solid rgba(46, 204, 113, 0.4)" : "1px solid rgba(16, 109, 32, 0.3)",
			}}>
			{header}
			<div className="transition duration-200 group-hover/bento:translate-x-2">
				{icon}
				<div
					className="mt-2 mb-2 font-sans font-bold"
					style={{
						color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(16, 109, 32, 0.9)",
					}}>
					{title}
				</div>
				<div
					className="font-sans text-xs font-normal"
					style={{
						color: isDark ? "rgba(200, 240, 200, 0.8)" : "rgba(16, 109, 32, 0.7)",
					}}>
					{description}
				</div>
			</div>
		</div>
	);
};

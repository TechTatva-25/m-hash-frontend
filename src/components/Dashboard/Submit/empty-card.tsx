import { ImageIcon } from "@radix-ui/react-icons";
import React from "react";

import { useTheme } from "@/components/ThemeProvider";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
	title: string;
	description?: string;
	action?: React.ReactNode;
	icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyCard({
	title,
	description,
	icon: Icon = ImageIcon,
	action,
	className,
	...props
}: EmptyCardProps): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<Card
			className={cn("flex w-full flex-col items-center justify-center space-y-6 p-16", className)}
			style={{
				background: `${isDark ? "rgba(30, 30, 40, 0.5)" : "rgba(255, 255, 255, 0.5)"}`,
				backdropFilter: "blur(10px)",
				border: `1px solid ${isDark ? "rgba(103, 80, 164, 0.3)" : "rgba(132, 95, 220, 0.3)"}`,
				boxShadow: `0 4px 24px ${isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(103, 80, 164, 0.1)"}`,
			}}
			{...props}>
			<div
				className="mr-4 shrink-0 rounded-full p-4"
				style={{
					border: `1px dashed ${isDark ? "rgba(103, 80, 164, 0.5)" : "rgba(132, 95, 220, 0.5)"}`,
					background: `${isDark ? "rgba(40, 40, 50, 0.3)" : "rgba(245, 245, 255, 0.3)"}`,
				}}>
				<Icon
					className={cn("size-8", isDark ? "text-[rgba(220,200,255,0.7)]" : "text-[rgba(103,80,164,0.7)]")}
					aria-hidden="true"
				/>
			</div>
			<div className="flex flex-col items-center gap-1.5 text-center">
				<CardTitle style={{ color: `${isDark ? "rgba(220, 200, 255, 0.9)" : "rgba(103, 80, 164, 0.9)"}` }}>
					{title}
				</CardTitle>
				{description ? (
					<CardDescription
						style={{ color: `${isDark ? "rgba(200, 180, 240, 0.7)" : "rgba(103, 80, 164, 0.7)"}` }}>
						{description}
					</CardDescription>
				) : null}
			</div>
			{action ? action : null}
		</Card>
	);
}

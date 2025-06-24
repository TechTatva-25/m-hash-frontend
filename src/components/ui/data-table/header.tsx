import { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, EyeOffIcon } from "lucide-react";
import { TiArrowUnsorted } from "react-icons/ti";
import React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	const getSortIcon = () => {
		if (column.getIsSorted() === "desc") {
			return (
				<ArrowDownIcon
					className="ml-2 h-4 w-4"
					style={{ color: isDark ? "rgba(139, 92, 246, 0.9)" : "rgba(139, 92, 246, 0.8)" }}
				/>
			);
		} else if (column.getIsSorted() === "asc") {
			return (
				<ArrowUpIcon
					className="ml-2 h-4 w-4"
					style={{ color: isDark ? "rgba(139, 92, 246, 0.9)" : "rgba(139, 92, 246, 0.8)" }}
				/>
			);
		} else {
			return (
				<TiArrowUnsorted
					className="ml-2 h-4 w-4"
					style={{ color: isDark ? "rgba(203, 213, 225, 0.8)" : "rgba(100, 116, 139, 0.8)" }}
				/>
			);
		}
	};

	return (
		<div className={cn("flex items-center justify-center space-x-2 text-center", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className={cn(
							"h-8 rounded-md transition-all duration-200",
							isDark ? "hover:bg-purple-500/10" : "hover:bg-purple-100/50"
						)}
						style={{
							background: column.getIsSorted()
								? isDark
									? "rgba(139, 92, 246, 0.1)"
									: "rgba(139, 92, 246, 0.08)"
								: "transparent",
							borderBottom: column.getIsSorted()
								? `2px solid ${isDark ? "rgba(139, 92, 246, 0.6)" : "rgba(139, 92, 246, 0.5)"}`
								: "none",
						}}>
						<span className={isDark ? "text-slate-200" : "text-slate-700"}>{title}</span>
						{getSortIcon()}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className={`overflow-hidden backdrop-blur-xl ${
						isDark
							? "bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/50"
							: "bg-gradient-to-br from-white/95 to-slate-50/95 border border-slate-200/50"
					}`}>
					<DropdownMenuItem
						onClick={(): void => column.toggleSorting(false)}
						className={`transition-all duration-200 ${
							isDark
								? "text-slate-200 hover:bg-purple-500/15 focus:bg-purple-500/15"
								: "text-slate-700 hover:bg-purple-100/60 focus:bg-purple-100/60"
						} rounded-md`}>
						<ArrowUpIcon
							className="mr-2 h-3.5 w-3.5"
							style={{
								color: isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 0.6)",
							}}
						/>
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={(): void => column.toggleSorting(true)}
						className={`transition-all duration-200 ${
							isDark
								? "text-slate-200 hover:bg-purple-500/15 focus:bg-purple-500/15"
								: "text-slate-700 hover:bg-purple-100/60 focus:bg-purple-100/60"
						} rounded-md`}>
						<ArrowDownIcon
							className="mr-2 h-3.5 w-3.5"
							style={{
								color: isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 0.6)",
							}}
						/>
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator className={isDark ? "bg-slate-700/50" : "bg-slate-200/70"} />
					<DropdownMenuItem
						onClick={(): void => column.toggleVisibility(false)}
						className={`transition-all duration-200 ${
							isDark
								? "text-slate-200 hover:bg-purple-500/15 focus:bg-purple-500/15"
								: "text-slate-700 hover:bg-purple-100/60 focus:bg-purple-100/60"
						} rounded-md`}>
						<EyeOffIcon
							className="mr-2 h-3.5 w-3.5"
							style={{
								color: isDark ? "rgba(203, 213, 225, 0.7)" : "rgba(100, 116, 139, 0.7)",
							}}
						/>
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import moment from "moment";
import React from "react";
import { IconType } from "react-icons";

import { useTheme } from "@/components/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { useCustomBreakpoint } from "@/hooks/customBreakpoint";
import { Stage } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

const timelineVariants = cva("grid", {
	variants: {
		positions: {
			center: "md:[&>li]:grid-cols-2",
		},
	},
	defaultVariants: {
		positions: "center",
	},
});

interface TimelineProps extends React.HTMLAttributes<HTMLUListElement>, VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
	({ children, className, positions, ...props }, ref) => {
		return (
			<ul className={cn(timelineVariants({ positions }), className)} ref={ref} {...props}>
				{children}
			</ul>
		);
	}
);
Timeline.displayName = "Timeline";

const timelineItemVariants = cva("grid items-center gap-x-2", {
	variants: {
		status: {
			default: "text-muted-foreground",
		},
	},
	defaultVariants: {
		status: "default",
	},
});

interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement>, VariantProps<typeof timelineItemVariants> {}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(({ className, status, ...props }, ref) => (
	<li className={cn(timelineItemVariants({ status }), className)} ref={ref} {...props} />
));
TimelineItem.displayName = "TimelineItem";

// const timelineStatusIconVariants = cva(
//     "relative col-start-2 col-end-3 row-start-1 row-end-1 flex size-6 items-center justify-center rounded-full border border-current",
//     {
//         variants: {
//             side: {
//                 right: "col-start-3 col-end-4",
//                 left: "col-start-1 col-end-2",
//             },
//             status: {
//                 default: "",
//             },
//         },
//         defaultVariants: {
//             side: "right",
//             status: "default",
//         },
//     }
// );

// interface TimelineStatusIconProps
//     extends React.HTMLAttributes<HTMLDivElement>,
//         VariantProps<typeof timelineStatusIconVariants> {
//     CustomIcon: IconType | LucideIcon;
//     bg_color: string;
// }

// const TimelineStatusIcon = React.forwardRef<HTMLDivElement, TimelineStatusIconProps>(
//     ({ className, side, status, CustomIcon, bg_color, ...props }, ref) => (
//         <div
//             role="status"
//             className={cn("timeline-dot", timelineStatusIconVariants({ side, status }), className)}
//             ref={ref}
//             {...props}>
//             <div className={cn("absolute h-10 w-10 rounded-full dark:opacity-25", bg_color)} />
//             <CustomIcon className="absolute z-10 h-4 w-4 text-white" />
//         </div>
//     )
// );
// TimelineStatusIcon.displayName = "TimelineStatusIcon";

interface TimelineStatusIconNewProps extends React.HTMLAttributes<HTMLDivElement> {
	stage: Stage;
	currentStage?: Stage;
	elapsedNotAttemptedStages: Stage[];
}

const TimelineStatusIconNew = React.forwardRef<HTMLDivElement, TimelineStatusIconNewProps>(
	({ stage, currentStage, elapsedNotAttemptedStages, ...props }, ref) => {
		const { theme } = useTheme();
		const isDark = theme === "dark";

		return (
			<div ref={ref} {...props}>
				{moment(stage.start_date).isBefore(new Date()) && moment(stage.end_date).isAfter(new Date()) ? (
					<Badge
						variant={"outline"}
						className="cursor-pointer py-1 pr-3 transition-opacity hover:opacity-90"
						style={{
							background: isDark
								? "linear-gradient(135deg, rgba(15, 25, 15, 0.8) 0%, rgba(10, 26, 15, 0.9) 100%)"
								: "linear-gradient(135deg, rgba(240, 255, 245, 0.8) 0%, rgba(220, 252, 231, 0.7) 100%)",
							backdropFilter: "blur(10px)",
							border: isDark ? "1px solid rgba(46, 204, 113, 0.5)" : "1px solid rgba(16, 109, 32, 0.5)",
							boxShadow: isDark
								? "0 4px 12px rgba(46, 204, 113, 0.2)"
								: "0 4px 12px rgba(16, 109, 32, 0.2)",
						}}>
						<div className="flex items-center space-x-2">
							<span className="relative flex h-3 w-3 items-center justify-center">
								<span
									className="absolute inline-flex h-2 w-2 animate-ping rounded-full opacity-75"
									style={{
										backgroundColor: isDark ? "rgba(46, 204, 113, 0.8)" : "rgba(16, 109, 32, 0.8)",
									}}></span>
								<span
									className="relative inline-flex h-2 w-2 rounded-full"
									style={{
										backgroundColor: isDark ? "rgba(46, 204, 113, 1)" : "rgba(16, 109, 32, 1)",
									}}></span>
							</span>
							<span
								className="text-xs"
								style={{
									color: isDark ? "rgba(46, 204, 113, 0.5)" : "rgba(40, 80, 40, 0.9)",
								}}>
								In Progress
							</span>
						</div>
					</Badge>
				) : null}
				{moment(stage.end_date).isBefore(new Date()) ? (
					<Badge
						variant={"outline"}
						className="cursor-pointer py-1 pr-3 transition-opacity hover:opacity-90"
						style={{
							background: isDark
								? "linear-gradient(135deg, rgba(15, 25, 15, 0.8) 0%, rgba(10, 26, 15, 0.9) 100%)"
								: "linear-gradient(135deg, rgba(240, 255, 245, 0.8) 0%, rgba(220, 252, 231, 0.7) 100%)",
							backdropFilter: "blur(10px)",
							border:
								stage._id === currentStage?._id
									? isDark
										? "1px solid rgba(220, 50, 50, 0.5)"
										: "1px solid rgba(200, 40, 40, 0.5)"
									: elapsedNotAttemptedStages.includes(stage)
										? isDark
											? "1px solid rgba(100, 100, 100, 0.5)"
											: "1px solid rgba(150, 150, 150, 0.5)"
										: isDark
											? "1px solid rgba(46, 204, 113, 0.5)"
											: "1px solid rgba(16, 109, 32, 0.5)",
							boxShadow:
								stage._id === currentStage?._id
									? isDark
										? "0 4px 12px rgba(220, 50, 50, 0.2)"
										: "0 4px 12px rgba(200, 40, 40, 0.2)"
									: elapsedNotAttemptedStages.includes(stage)
										? isDark
											? "0 4px 12px rgba(100, 100, 100, 0.2)"
											: "0 4px 12px rgba(150, 150, 150, 0.2)"
										: isDark
											? "0 4px 12px rgba(46, 204, 113, 0.2)"
											: "0 4px 12px rgba(16, 109, 32, 0.2)",
						}}>
						<div className="flex items-center space-x-2">
							{stage._id === currentStage?._id ? (
								<>
									<span className="relative flex h-3 w-3 items-center justify-center">
										<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75"></span>
										<span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
									</span>
									<span
										className="text-xs"
										style={{
											color: `${isDark ? "rgba(255, 200, 200, 0.9)" : "rgba(180, 30, 30, 0.9)"}`,
										}}>
										Not Qualified
									</span>
								</>
							) : elapsedNotAttemptedStages.includes(stage) ? (
								<>
									<span className="relative flex h-3 w-3 items-center justify-center">
										<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-slate-400 opacity-75"></span>
										<span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500"></span>
									</span>
									<span
										className="text-xs"
										style={{
											color: `${isDark ? "rgba(200, 200, 200, 0.9)" : "rgba(100, 100, 100, 0.9)"}`,
										}}>
										Elapsed
									</span>
								</>
							) : (
								<>
									<span className="relative flex h-3 w-3 items-center justify-center">
										<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
										<span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
									</span>
									<span
										className="text-xs"
										style={{
											color: `${isDark ? "rgba(200, 255, 200, 0.9)" : "rgba(0, 150, 50, 0.9)"}`,
										}}>
										Qualified
									</span>
								</>
							)}
						</div>
					</Badge>
				) : null}
				{moment(stage.start_date).isAfter(new Date()) ? (
					<Badge
						variant={"outline"}
						className="cursor-pointer py-1 pr-3 transition-opacity hover:opacity-90"
						style={{
							background: isDark
								? "linear-gradient(135deg, rgba(15, 25, 15, 0.8) 0%, rgba(10, 26, 15, 0.9) 100%)"
								: "linear-gradient(135deg, rgba(240, 255, 245, 0.8) 0%, rgba(220, 252, 231, 0.7) 100%)",
							backdropFilter: "blur(10px)",
							border: isDark ? "1px solid rgba(80, 120, 200, 0.5)" : "1px solid rgba(60, 100, 180, 0.5)",
							boxShadow: isDark
								? "0 4px 12px rgba(80, 120, 200, 0.2)"
								: "0 4px 12px rgba(60, 100, 180, 0.2)",
						}}>
						<div className="flex items-center space-x-2">
							<span className="relative flex h-3 w-3 items-center justify-center">
								<span
									className="absolute inline-flex h-2 w-2 animate-ping rounded-full opacity-75"
									style={{ backgroundColor: "rgba(80, 120, 200, 0.8)" }}></span>
								<span
									className="relative inline-flex h-2 w-2 rounded-full"
									style={{ backgroundColor: "rgba(80, 120, 200, 1)" }}></span>
							</span>
							<span
								className="text-xs"
								style={{
									color: isDark ? "rgba(180, 200, 255, 0.9)" : "rgba(50, 100, 200, 0.9)",
								}}>
								Upcoming
							</span>
						</div>
					</Badge>
				) : null}
			</div>
		);
	}
);
TimelineStatusIconNew.displayName = "TimelineStatusIconNew";

const timelineDotVariants = cva("relative row-start-1 row-end-1 flex size-6 items-center justify-center rounded-full", {
	variants: {
		status: {
			default: "",
		},
	},
	defaultVariants: {
		status: "default",
	},
});

interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelineDotVariants> {
	CustomIcon: IconType | LucideIcon;
	bg_color: string;
	side: string;
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
	({ className, status, CustomIcon, bg_color, side, ...props }, ref) => {
		const { theme } = useTheme();
		const isDark = theme === "dark";

		return (
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 3 }}>
				<div
					role="status"
					className={cn(
						`timeline-dot ${
							side === "right"
								? "col-start-2 col-end-3 -translate-x-[1.1rem]"
								: "col-start-1 col-end-2 ml-auto translate-x-[1.1rem]"
						}`,
						timelineDotVariants({ status }),
						className
					)}
					ref={ref}
					{...props}>
					<div
						className={cn("absolute h-8 w-8 rounded-full", bg_color)}
						style={{
							boxShadow: isDark ? `0 0 20px rgba(46, 204, 113, 0.7)` : `0 0 20px rgba(16, 109, 32, 0.5)`,
							opacity: 1,
						}}
					/>
					<CustomIcon
						className="absolute z-10 h-5 w-5"
						style={{
							color: isDark ? "rgba(200, 240, 200, 0.95)" : "rgba(240, 255, 245, 0.95)",
							filter: `drop-shadow(0 0 5px rgba(0, 0, 0, 0.7))`,
						}}
					/>
				</div>
			</motion.div>
		);
	}
);
TimelineDot.displayName = "TimelineDot";

const timelineContentVariants = cva("row-start-2 row-end-2 pb-8 text-muted-foreground", {
	variants: {
		side: {
			right: "col-start-3 col-end-4 mr-auto",
			left: "col-start-1 col-end-2 ml-auto",
		},
	},
	defaultVariants: {
		side: "right",
	},
});

interface TimelineContentProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof timelineContentVariants> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(({ className, side, ...props }, ref) => {
	const isAboveBreakpoint = useCustomBreakpoint(768);
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<motion.div
			className="col-span-2 md:col-span-1"
			initial={{ opacity: 0 }}
			whileInView={
				isAboveBreakpoint
					? { opacity: 1, x: [side === "left" ? -600 : 600, side === "left" ? 145 : 250] }
					: { opacity: 1 }
			}
			viewport={{ once: true }}
			transition={{ duration: 2 }}>
			<div
				className={cn(
					timelineContentVariants({ side }),
					"cursor-pointer transition-all hover:scale-[1.02]",
					className
				)}
				ref={ref}
				style={{
					transition: "transform 0.3s ease",
					boxShadow: isDark ? `0 8px 32px rgba(46, 204, 113, 0.1)` : `0 8px 32px rgba(16, 109, 32, 0.08)`,
				}}
				{...props}
			/>
		</motion.div>
	);
});
TimelineContent.displayName = "TimelineContent";

const timelineHeadingVariants = cva("row-start-1 row-end-1 line-clamp-1 max-w-full truncate pb-3", {
	variants: {
		side: {
			right: "col-start-3 col-end-4 mr-auto text-left",
			left: "col-start-1 col-end-2 ml-auto text-right",
		},
		variant: {
			primary: "text-base font-medium zinc-900 dark:text-white",
			secondary: "text-sm font-light text-muted-foreground",
		},
	},
	defaultVariants: {
		side: "right",
		variant: "primary",
	},
});

interface TimelineHeadingProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof timelineHeadingVariants> {}

const TimelineHeading = React.forwardRef<HTMLParagraphElement, TimelineHeadingProps>(
	({ className, side, variant, ...props }, ref) => (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 3 }}>
			<p
				role="heading"
				aria-level={variant === "primary" ? 2 : 3}
				className={cn(timelineHeadingVariants({ side, variant }), className)}
				ref={ref}
				{...props}
			/>
		</motion.div>
	)
);
TimelineHeading.displayName = "TimelineHeading";

interface TimelineLineProps extends React.HTMLAttributes<HTMLHRElement> {
	done?: boolean;
	postContent?: boolean;
}

const TimelineLine = React.forwardRef<HTMLHRElement, TimelineLineProps>(
	({ className, done = false, postContent = false, ...props }, ref) => {
		return (
			<motion.div
				className="col-span-2"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 3 }}>
				<hr
					role="separator"
					aria-orientation="vertical"
					className={cn(
						`col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex ${
							postContent ? "min-h-[300px]" : "min-h-[100px]"
						} w-[2.5px] rounded-full blur-[0.5px]`,
						done ? "bg-primary" : "bg-border",
						className
					)}
					ref={ref}
					{...props}
				/>
			</motion.div>
		);
	}
);
TimelineLine.displayName = "TimelineLine";

export { Timeline, TimelineContent, TimelineDot, TimelineHeading, TimelineItem, TimelineLine, TimelineStatusIconNew };

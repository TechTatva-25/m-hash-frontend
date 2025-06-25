// import { motion } from "framer-motion";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

import { useTheme } from "@/components/ThemeProvider";
import { getStages, Stage, useProgress } from "@/hooks/useProgress";
import { useSession } from "@/hooks/useSession";
import { stageItems } from "@/lib/stages";

import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineHeading,
	TimelineItem,
	TimelineLine,
	TimelineStatusIconNew,
} from "./timeline";

export default function ProgressTimeline(): React.JSX.Element {
	const progress = useProgress();
	const [stages, setStages] = React.useState<Stage[]>([]);
	const { theme } = useTheme();
	const isDark = theme === "dark";
	
	const currentStage = React.useMemo(() => {
		return stages.find((stage) => stage._id === progress.stage);
	}, [stages, progress.stage]);

	const elapsedNotAttemptedStages = stages.slice(
		stages.findIndex((stage) => stage._id === currentStage?._id),
		stages.findIndex((stage) => stage.active)
	);

	React.useEffect(() => {
		void getStages().then((stages) => {
			setStages(stages);
		});
	}, []);

	const router = useRouter();
	const session = useSession();

	React.useEffect(() => {
		if (session?.userId && session.user?.role === "judge") {
			router.push("/dashboard/judge");
		}
	}, [session]);

	return (
		<Timeline className="min-h-[calc(100vh-100px)]">
			{stages.map((stage, index) => {
				return (
					<TimelineItem key={stage._id}>
						{!(index === 0) ? (
							<TimelineLine 
								postContent={true} 
								className={stageItems[stage.stage].line_color.down}
								style={{
									boxShadow: `0 0 15px ${isDark ? 'rgba(103, 80, 164, 0.7)' : 'rgba(132, 95, 220, 0.5)'}`,
									opacity: 1
								}}
							/>
						) : (
							<></>
						)}
						{index % 2 !== 0 ? (
							<TimelineHeading 
								side="left" 
								className="mx-3 -translate-x-4 text-right text-3xl cursor-pointer transition-opacity hover:opacity-90"
								style={{ color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}` }}>
								{stage.name}
							</TimelineHeading>
						) : (
							<></>
						)}
						<TimelineDot
							CustomIcon={stageItems[stage.stage].icon}
							bg_color={stageItems[stage.stage].bg_color}
							className={`size-8 cursor-pointer hover:opacity-90 transition-opacity`}
							side={index % 2 === 0 ? "left" : "right"}
						/>
						{index % 2 === 0 ? (
							<TimelineHeading 
								side="right" 
								className="mx-3 translate-x-4 text-left text-3xl cursor-pointer transition-opacity hover:opacity-90"
								style={{ color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}` }}>
								{stage.name}
							</TimelineHeading>
						) : (
							<></>
						)}
						<TimelineLine 
							className={stageItems[stage.stage].line_color.up}
							style={{
								boxShadow: `0 0 15px ${isDark ? 'rgba(103, 80, 164, 0.7)' : 'rgba(132, 95, 220, 0.5)'}`,
								opacity: 1
							}}
						/>
						<TimelineContent
							className={`mt-2 grid max-w-96 grid-cols-8 gap-4 rounded-[2rem] px-4 py-4 ${
								index % 2 === 0 ? "text-start" : "text-end"
							}`}
							style={{
								background: `${isDark ? 'rgba(30, 30, 40, 0.5)' : 'rgba(255, 255, 255, 0.5)'}`,
								backdropFilter: "blur(10px)",
								border: `1px solid ${isDark ? 'rgba(103, 80, 164, 0.3)' : 'rgba(132, 95, 220, 0.3)'}`,
								boxShadow: `0 4px 24px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(103, 80, 164, 0.1)'}`
							}}
							side={index % 2 === 0 ? "left" : "right"}>
							{index % 2 !== 0 ? (
								<div className="col-span-3 flex flex-col items-center justify-center">
									<TimelineStatusIconNew
										stage={stage}
										currentStage={currentStage}
										elapsedNotAttemptedStages={elapsedNotAttemptedStages}
									/>
								</div>
							) : (
								<></>
							)}
							<div className="col-span-5 flex flex-col space-y-2">
								<TimelineHeading
									side={index % 2 === 0 ? "right" : "left"}
									className={`text-xl ${index % 2 === 0 ? "text-right" : "text-left"}`}
									style={{ color: `${isDark ? 'rgba(220, 200, 255, 0.9)' : 'rgba(103, 80, 164, 0.9)'}` }}>
									{"Team Status"}
								</TimelineHeading>
								<span
									className={`text-${
										index % 2 === 0 ? "right" : "left"
									} text-sm font-medium tracking-tight`}
									style={{ color: `${isDark ? 'rgba(210, 190, 240, 0.8)' : 'rgba(103, 80, 164, 0.8)'}` }}>
									{stage.description}
								</span>
								<span
									className={`flex items-center gap-14 ${
										index % 2 ? "justify-start" : "justify-end"
									} py-2 text-sm font-light tracking-tight`}
									style={{ color: `${isDark ? 'rgba(190, 170, 220, 0.7)' : 'rgba(103, 80, 164, 0.7)'}` }}>
									{moment(stage.start_date).isAfter(new Date())
										? moment(stage.start_date).fromNow()
										: null}
									{moment(stage.end_date).isBefore(new Date())
										? moment(stage.end_date).fromNow()
										: null}
									{moment(new Date()).isBetween(stage.start_date, stage.end_date)
										? `Ends ${moment(stage.end_date).fromNow()}`
										: null}
								</span>
							</div>
							{index % 2 === 0 ? (
								<div className="col-span-3 flex flex-col items-center justify-center">
									<TimelineStatusIconNew
										stage={stage}
										currentStage={currentStage}
										elapsedNotAttemptedStages={elapsedNotAttemptedStages}
									/>
								</div>
							) : (
								<></>
							)}
						</TimelineContent>
					</TimelineItem>
				);
			})}
		</Timeline>
	);
}

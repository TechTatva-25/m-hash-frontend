// import { motion } from "framer-motion";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

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
		<Timeline>
			{stages.map((stage, index) => {
				return (
					<TimelineItem key={stage._id}>
						{!(index === 0) ? (
							<TimelineLine postContent={true} className={stageItems[stage.stage].line_color.down} />
						) : (
							<></>
						)}
						{index % 2 !== 0 ? (
							<TimelineHeading side="left" className="mx-3 -translate-x-4 text-right text-3xl">
								{stage.name}
							</TimelineHeading>
						) : (
							<></>
						)}
						<TimelineDot
							CustomIcon={stageItems[stage.stage].icon}
							bg_color={stageItems[stage.stage].bg_color}
							className={`size-7 border-none`}
							side={index % 2 === 0 ? "left" : "right"}
						/>
						{index % 2 === 0 ? (
							<TimelineHeading side="right" className="mx-3 translate-x-4 text-left text-3xl">
								{stage.name}
							</TimelineHeading>
						) : (
							<></>
						)}
						<TimelineLine className={stageItems[stage.stage].line_color.up} />
						<TimelineContent
							className={`mt-2 grid max-w-96 grid-cols-8 gap-4 rounded-[2rem] bg-card px-4 py-4 ${
								index % 2 === 0 ? "text-start" : "text-end"
							}`}
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
									className={`text-xl ${index % 2 === 0 ? "text-right" : "text-left"}`}>
									{"Team Status"}
								</TimelineHeading>
								<span
									className={`text-${
										index % 2 === 0 ? "right" : "left"
									} text-sm font-medium tracking-tight`}>
									{stage.description}
								</span>
								<span
									className={`flex items-center gap-14 ${
										index % 2 ? "justify-start" : "justify-end"
									} py-2 text-sm font-light tracking-tight`}>
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

"use client";

import BoringAvatar from "boring-avatars";
import Image from "next/image";
import React from "react";

import { cn, generateColorPalette } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface AvatarCirclesProps {
	className?: string;
	numPeople?: number;
	avatarOptions: { name: string; url: string }[];
	boringAvatars?: boolean;
	isUser?: boolean; // New prop to distinguish between user and team avatars
}

const AvatarCircles = ({
	numPeople,
	className,
	avatarOptions,
	boringAvatars,
	isUser = false, // Default to team (marble variant)
}: AvatarCirclesProps): React.JSX.Element => {
	return (
		<div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
			{!boringAvatars &&
				avatarOptions.map(({ name, url }, index) => (
					<TooltipProvider key={index}>
						<Tooltip>
							<TooltipTrigger>
								<Image
									className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
									src={url}
									width={40}
									height={40}
									alt={`Avatar ${index + 1}`}
								/>
							</TooltipTrigger>
							<TooltipContent>{name}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			{boringAvatars &&
				avatarOptions.map(({ name, url }, index) => (
					<TooltipProvider key={index}>
						<Tooltip>
							<TooltipTrigger>
								<BoringAvatar
									size={40}
									variant={isUser ? "beam" : "marble"}
									colors={generateColorPalette(url)}
									name={name}
								/>
							</TooltipTrigger>
							<TooltipContent>{name}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			{numPeople !== 0 && (
				<a
					className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
					href="">
					+{numPeople}
				</a>
			)}
		</div>
	);
};

export default AvatarCircles;

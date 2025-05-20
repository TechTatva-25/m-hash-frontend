"use client";

import { ChevronLeft } from "lucide-react";
import { useRecoilState } from "recoil";

import { sidebarToggleState } from "@/atoms/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SidebarToggle(): React.JSX.Element {
	const [toggle, setToggle] = useRecoilState(sidebarToggleState);

	return (
		<div className="invisible absolute -right-[16px] top-[50%] z-20 lg:visible">
			<Button
				onClick={(): void => setToggle((prev) => !prev)}
				className="h-8 w-8 rounded-full"
				variant="outline"
				size="icon">
				<ChevronLeft
					className={cn(
						"h-4 w-4 transition-transform duration-700 ease-in-out",
						toggle ? "rotate-0" : "rotate-180"
					)}
				/>
			</Button>
		</div>
	);
}

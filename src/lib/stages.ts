import { LucideIcon, Trophy } from "lucide-react";
import { IconType } from "react-icons";
import { AiOutlineTeam } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuShield } from "react-icons/lu";
import { PiCertificate } from "react-icons/pi";

interface StageItem {
	icon: IconType | LucideIcon;
	bg_color: string;
	line_color: {
		up: string;
		down: string;
	};
}

export const stageItems: Record<string, StageItem> = {
	registration: {
		icon: AiOutlineTeam,
		bg_color: "bg-sky-500",
		line_color: {
			up: "bg-gradient-to-b from-sky-500 to-background",
			down: "bg-gradient-to-t from-sky-500 to-background",
		},
	},
	submission: {
		icon: IoDocumentTextOutline,
		bg_color: "bg-yellow-400",
		line_color: {
			up: "bg-gradient-to-b from-yellow-400 to-background",
			down: "bg-gradient-to-t from-yellow-400 to-background",
		},
	},
	qualifiers: {
		icon: PiCertificate,
		bg_color: "bg-violet-600",
		line_color: {
			up: "bg-gradient-to-b from-violet-600 to-background",
			down: "bg-gradient-to-t from-violet-600 to-background",
		},
	},
	finals: {
		icon: LuShield,
		bg_color: "bg-emerald-500",
		line_color: {
			up: "bg-gradient-to-b from-emerald-500 to-background",
			down: "bg-gradient-to-t from-emerald-500 to-background",
		},
	},
	results: {
		icon: Trophy,
		bg_color: "bg-rose-500",
		line_color: {
			up: "bg-gradient-to-b from-rose-500 to-background",
			down: "bg-gradient-to-t from-rose-500 to-background",
		},
	},
};

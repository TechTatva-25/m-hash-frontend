// import { Bookmark, LucideIcon, Tag, Users } from "lucide-react";
import { LucideIcon, Users } from "lucide-react";
import { IconType } from "react-icons";
// import { LuPenSquare } from "react-icons/lu";
// import { MdDriveFolderUpload } from "react-icons/md";
import { SiGitbook } from "react-icons/si";

interface Submenu {
	href: string;
	label: string;
	active: boolean;
}

interface Menu {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon | IconType;
	submenus: Submenu[];
}

interface Group {
	groupLabel: string;
	menus: Menu[];
}

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "Team",
			menus: [
				{
					href: "/dashboard",
					label: "Members",
					active: pathname === "/dashboard",
					icon: Users,
					submenus: [],
				},
				{
					href: "/dashboard/rules",
					label: "Rules",
					active: pathname.includes("/dashboard/rules"),
					icon: SiGitbook,
					submenus: [],
				},
			],
		},
	];
}

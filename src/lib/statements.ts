import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { AiOutlineStock } from "react-icons/ai";
import { BiSolidLeaf } from "react-icons/bi";
import { GiHealthNormal } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";

export interface Statement {
	id: number;
	name: string;
	type: string;
	description: string;
	icon: LucideIcon | IconType;
}

export const statements: Statement[] = [
	{
		id: 1,
		name: "Mental Health",
		type: "Health",
		description: "Create a solution that helps people to improve their mental health.",
		icon: GiHealthNormal,
	},
	{
		id: 2,
		name: "Education",
		type: "Education",
		description: "Create a solution that helps students to learn better.",
		icon: MdEditNote,
	},
	{
		id: 3,
		name: "Environment",
		type: "Environment",
		description: "Create a solution that helps to save the environment.",
		icon: BiSolidLeaf,
	},
	{
		id: 4,
		name: "Finance",
		type: "Finance",
		description: "Create a solution that helps people to manage their finances.",
		icon: AiOutlineStock,
	},
	{
		id: 5,
		name: "Agriculture",
		type: "Agriculture",
		description: "Create a solution that helps farmers to improve their productivity.",
		icon: PiPlantLight,
	},
	{
		id: 6,
		name: "Health",
		type: "Health",
		description: "Create a solution that helps people to improve their health.",
		icon: GiHealthNormal,
	},
	{
		id: 7,
		name: "Education",
		type: "Education",
		description: "Create a solution that helps students to learn better.",
		icon: MdEditNote,
	},
	{
		id: 8,
		name: "Environment",
		type: "Environment",
		description: "Create a solution that helps to save the environment.",
		icon: BiSolidLeaf,
	},
	{
		id: 9,
		name: "Finance",
		type: "Finance",
		description: "Create a solution that helps people to manage their finances.",
		icon: AiOutlineStock,
	},
	{
		id: 10,
		name: "Agriculture",
		type: "Agriculture",
		description: "Create a solution that helps farmers to improve their productivity.",
		icon: PiPlantLight,
	},
	{
		id: 11,
		name: "Health",
		type: "Health",
		description: "Create a solution that helps people to improve their health.",
		icon: GiHealthNormal,
	},
	{
		id: 12,
		name: "Education",
		type: "Education",
		description: "Create a solution that helps students to learn better.",
		icon: MdEditNote,
	},
	{
		id: 13,
		name: "Environment",
		type: "Environment",
		description: "Create a solution that helps to save the environment.",
		icon: BiSolidLeaf,
	},
	{
		id: 14,
		name: "Finance",
		type: "Finance",
		description: "Create a solution that helps people to manage their finances.",
		icon: AiOutlineStock,
	},
	{
		id: 15,
		name: "Agriculture",
		type: "Agriculture",
		description: "Create a solution that helps farmers to improve their productivity.",
		icon: PiPlantLight,
	},
	{
		id: 16,
		name: "Health",
		type: "Health",
		description: "Create a solution that helps people to improve their health.",
		icon: GiHealthNormal,
	},
];

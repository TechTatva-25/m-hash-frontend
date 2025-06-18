import axios from "axios";
import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";
import { AiOutlineStock } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import { SlGameController } from "react-icons/sl";

import { Endpoints, getEndpoint } from "@/lib/endpoints";

export interface Problem {
	_id: string;
	title: string;
	description: string;
	thumbnail: string;
	type: string;
	sdg_id: number;
	sdg_title: string;
	features: string[];
	createdAt: Date;
	updatedAt: Date;
	icon: IconType | LucideIcon;
}

export const sdgIconMap: Record<number, IconType> = {
	3: GiHealthNormal,
	4: MdEditNote,
	8: AiOutlineStock,
	9: SlGameController,
};

export const sdgColorMap: Record<number, string> = {
	3: "bg-emerald-500",
	4: "bg-sky-500",
	8: "bg-amber-500",
	9: "bg-violet-500",
};

export const getProblems = async (): Promise<Problem[]> => {
	try {
		const response = await axios.get<Problem[]>(getEndpoint(Endpoints.GET_PROBLEMS), {});

		const problems = response.data.map((problem) => ({
			...problem,
			icon: sdgIconMap[problem.sdg_id],
		}));

		return problems;
	} catch (error) {
		return [];
	}
};

export const getProblem = async (problemId: string): Promise<Problem> => {
	const response = await axios.get<Problem>(getEndpoint(Endpoints.GET_PROBLEM), {
		params: {
			problem_id: problemId,
		},
	});

	const problem = {
		...response.data,
		icon: sdgIconMap[response.data.sdg_id],
	};

	return problem;
};

export const useProblems = (
	problems: Problem[],
	setProblems: React.Dispatch<React.SetStateAction<Problem[]>>
): Problem[] => {
	React.useEffect(() => {
		void getProblems().then((problems) => {
			setProblems(problems);
		});
	}, []);

	return problems;
};

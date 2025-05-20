"use client";

import { Loader2, Trash } from "lucide-react"; // Import Trash icon
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { assignProblemToJudge } from "@/hooks/assignProblemToJudge";
import { deAssignProblemToJudge } from "@/hooks/deAssignProblem"; // Import deAssign hook
import { getProblems, Problem } from "@/hooks/useProblem";

import { fetchJudges, Judge } from "../../../hooks/getJudges";
import Modal from "../judge/modal";

const JudgeTable = (): React.JSX.Element => {
	// State for holding judges and problems data
	const [judges, setJudges] = useState<Judge[]>([]);
	const [problems, setProblems] = useState<Problem[]>([]);
	const [loadingJudges, setLoadingJudges] = useState(true);
	const [loadingProblems, setLoadingProblems] = useState(true);
	const [selectedProblems, setSelectedProblems] = useState<string[]>([]); // Array of selected problems

	// State for modal controls
	const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
	const [isAssignedProblemsModalOpen, setIsAssignedProblemsModalOpen] = useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Confirmation modal state
	const [currentJudge, setCurrentJudge] = useState<Judge>();
	const [problemToDelete, setProblemToDelete] = useState<string | null>(null); // State to track problem for deletion

	useEffect(() => {
		// Fetch judges
		const getJudges = async (): Promise<void> => {
			setLoadingJudges(true);
			const data = await fetchJudges();
			if (data) {
				setJudges(data);
			} else {
				toast.error("Failed to load judges data.");
			}
			setLoadingJudges(false);
		};
		void getJudges();

		// Fetch problem statements
		const getProblem = async (): Promise<void> => {
			setLoadingProblems(true);
			const data = await getProblems();
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (data) {
				setProblems(data);
			} else {
				toast.error("Failed to load problem statements.");
			}
			setLoadingProblems(false);
		};
		void getProblem();
	}, []);

	const handleAssignProblem = async (judgeId: string): Promise<void> => {
		if (selectedProblems.length === 0) {
			toast.error("Please select at least one problem statement.");
			return;
		}

		try {
			// Pass a clean array of selected problem IDs
			const response = await assignProblemToJudge(judgeId, selectedProblems);

			if (response) {
				toast.success("Problem(s) assigned successfully!");
				setSelectedProblems([]); // Reset the selected problems after successful assignment
				setIsAssignModalOpen(false); // Close modal after successful assignment
			}
		} catch (error) {
			toast.error("Failed to assign problems.");
		}
	};

	const handleProblemSelection = (problemId: string): void => {
		setSelectedProblems((prevSelected) => {
			if (prevSelected.includes(problemId)) {
				return prevSelected.filter((id) => id !== problemId); // Unselect
			} else {
				return [...prevSelected, problemId]; // Select
			}
		});
	};

	const handleDeleteProblem = async (): Promise<void> => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!currentJudge || !problemToDelete) return;

		const success = await deAssignProblemToJudge(currentJudge._id, problemToDelete);
		if (success) {
			setIsConfirmModalOpen(false);
			setProblemToDelete(null);
		}
	};

	if (loadingJudges || loadingProblems) {
		return (
			<div className="flex h-[80vh] w-full items-center justify-center self-center">
				<Loader2 className="animate-spin text-gray-300" />
			</div>
		);
	}

	return (
		<div>
			<Table className="border-2">
				<TableCaption>A list of judges and their details.</TableCaption>
				<TableHeader className="hover:bg-transparent">
					<TableRow>
						<TableHead className="w-[200px]">Name</TableHead>
						{/* <TableHead>Gender</TableHead> */}
						<TableHead>Problem Statements</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{judges.length > 0 ? (
						judges.map((judge) => {
							return (
								<TableRow key={judge._id} className="hover:bg-transparent">
									<TableCell className="font-medium">{judge.username}</TableCell>
									{/* <TableCell>{judge.gender}</TableCell> */}
									<TableCell>
										<button
											onClick={(): void => {
												setCurrentJudge(judge);
												setIsAssignedProblemsModalOpen(true);
											}}
											className="mr-2 rounded bg-gray-900 px-4 py-2 text-green-500 hover:bg-gray-700">
											View
										</button>
									</TableCell>
									<TableCell>
										<button
											onClick={(): void => {
												setCurrentJudge(judge);
												setIsAssignModalOpen(true);
											}}
											className="rounded bg-gray-900 px-4 py-2 text-blue-500 hover:bg-gray-700">
											Assign Problems
										</button>
									</TableCell>
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={4} className="text-center">
								No judges available.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Modal
				isOpen={isAssignedProblemsModalOpen}
				onClose={(): void => setIsAssignedProblemsModalOpen(false)}
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				title={`Assigned Problems for ${currentJudge?.username}`}>
				{(currentJudge?.problem_statement.length ?? 0) > 0 ? (
					<ul>
						{problems
							.filter((problem) => currentJudge?.problem_statement.includes(problem._id))
							.map((problem) => (
								<li key={problem._id} className="my-3 flex justify-between rounded-xl bg-gray-800 p-5">
									{problem.title}
									<button
										onClick={(): void => {
											setProblemToDelete(problem._id);
											setIsConfirmModalOpen(true);
											setIsAssignedProblemsModalOpen(false);
										}}
										className="text-red-600 hover:text-red-800">
										<Trash />
									</button>
								</li>
							))}
					</ul>
				) : (
					<p>No problems assigned.</p>
				)}
			</Modal>

			{/* Assign Problems Modal */}
			<Modal
				isOpen={isAssignModalOpen}
				onClose={(): void => setIsAssignModalOpen(false)}
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				title={`Assign Problems to ${currentJudge?.username}`}>
				<div className="flex flex-col text-white">
					{problems
						.filter((problem) => !currentJudge?.problem_statement.includes(problem._id))
						.map((problem) => (
							<label
								key={problem._id}
								className="my-3 flex justify-start gap-3 rounded-xl bg-gray-800 p-5">
								<input
									type="checkbox"
									checked={selectedProblems.includes(problem._id)}
									onChange={(): void => handleProblemSelection(problem._id)}
									className="mr-2"
								/>
								{problem.title}
							</label>
						))}
				</div>
				<button
					// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type
					onClick={() => currentJudge && handleAssignProblem(currentJudge._id)}
					className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
					Assign
				</button>
			</Modal>

			{/* Confirmation Modal for De-assigning */}
			<Modal
				isOpen={isConfirmModalOpen}
				onClose={(): void => setIsConfirmModalOpen(false)}
				title="Confirm Removal">
				<p>Are you sure you want to remove this problem assignment?</p>
				{/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
				<button onClick={handleDeleteProblem} className="mt-4 rounded bg-red-500 px-4 py-2 text-white">
					Yes, Remove
				</button>
			</Modal>
		</div>
	);
};

export default JudgeTable;

"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Endpoints } from "@/lib/endpoints";

interface Ticket {
	_id: string;
	email: string;
	resolved: boolean;
	message: string;
	createdAt: Date;
}

interface ApiError {
	message: string;
}

export function TicketsTable(): JSX.Element {
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState<string | null>(null);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

	const fetchTickets = async (): Promise<void> => {
		try {
			setLoading(true);
			const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

			const response = await fetch(`${apiUrl}/${Endpoints.TICKETS}`, {
				credentials: "include",
			});
			if (!response.ok) {
				const errorData: ApiError = await response.json();
				throw new Error(errorData.message || "Failed to fetch tickets");
			}

			const data: Ticket[] = await response.json();

			setTickets(data ?? []);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	// Update ticket status
	const updateTicketStatus = async (ticketId: string, currentStatus: boolean): Promise<void> => {
		try {
			setUpdating(ticketId);
			const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
			const response = await fetch(`${apiUrl}/${Endpoints.UPDATE}?ticket_id=${ticketId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ resolved: !currentStatus }),
				credentials: "include",
			});
			if (!response.ok) {
				const errorData: ApiError = await response.json();
				throw new Error(errorData.message || "Failed to update ticket status");
			}

			const updatedTicket: Ticket = await response.json();
			setTickets((prevTickets) =>
				prevTickets.map((ticket) => (ticket._id === updatedTicket._id ? updatedTicket : ticket))
			);
			toast.success("Ticket status updated successfully!");
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setUpdating(null);
		}
	};

	const openModal = (ticket: Ticket): void => {
		setSelectedTicket(ticket);
		setIsModalOpen(true);
	};

	const closeModal = (): void => {
		setIsModalOpen(false);
		setSelectedTicket(null);
	};

	useEffect(() => {
		void fetchTickets();
	}, []);

	return (
		<div className="my-7 flex w-full flex-col items-center justify-start py-4">
			<p className="mb-7 self-start text-2xl font-semibold">Tickets</p>
			<Table className="rounded-xl border-2 shadow-lg">
				<TableHeader>
					<TableRow>
						<TableHead>Timestamp</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Status</TableHead>
						<TableHead></TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell colSpan={4}>
								<div className="flex items-center justify-center">
									<BeatLoader color="#a457f7" size={12} />
								</div>
							</TableCell>
						</TableRow>
					) : tickets.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center">
								No tickets found
							</TableCell>
						</TableRow>
					) : (
						tickets.map((ticket) => (
							<TableRow key={ticket._id} className="transition-colors hover:bg-inherit">
								<TableCell>
									{ticket.createdAt.toString().split("T")[0]}{" "}
									{ticket.createdAt.toString().split("T")[1].split(".")[0]}
								</TableCell>
								<TableCell>{ticket.email}</TableCell>
								<TableCell>
									<span
										className={`rounded-lg px-2 py-1 text-sm font-normal ${
											ticket.resolved
												? "bg-green-700 text-white dark:bg-green-900/50 dark:text-green-500"
												: "bg-red-700 text-white dark:bg-red-900/50 dark:text-red-500"
										}`}>
										{ticket.resolved ? "Resolved" : "Not Resolved"}
									</span>
								</TableCell>
								<TableCell>
									<button
										onClick={(): void => openModal(ticket)}
										className="w-[7rem] rounded-md bg-gray-900 px-4 py-2 font-semibold text-gray-300 hover:bg-blue-600">
										View
									</button>
								</TableCell>
								<TableCell>
									<button
										onClick={() => updateTicketStatus(ticket._id, ticket.resolved)}
										className={
											"w-[10rem] rounded-md bg-gray-900 px-4 py-2 font-semibold text-gray-300 transition-all hover:bg-blue-600"
										}
										disabled={updating === ticket._id}>
										{updating === ticket._id ? <BeatLoader color="#ffffff" size={8} /> : "Toggle"}
									</button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{/* Modal for showing ticket message */}
			<Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-zinc-900 p-6 shadow-lg backdrop-blur-xl">
						{selectedTicket && (
							<>
								<Dialog.Title className="font-normal text-gray-400">
									Ticket from {selectedTicket.email}
								</Dialog.Title>
								<Dialog.Description className="my-4 text-white">
									{selectedTicket.message}
								</Dialog.Description>
								<button
									className="mt-4 w-full rounded-md bg-red-900 px-4 py-2 text-white hover:bg-blue-500"
									onClick={closeModal}>
									Close
								</button>
							</>
						)}
					</Dialog.Panel>
				</div>
			</Dialog>
		</div>
	);
}

"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Send, Mail, Eye, CheckCircle, XCircle, Clock, MessageSquare, RefreshCw } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Endpoints } from "@/lib/endpoints";
import { createEmailTemplate } from "@/lib/emailTemplate";

interface Ticket {
	_id: string;
	userId: string;
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
	const [sendingReply, setSendingReply] = useState<string | null>(null);
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
	const [replyMessage, setReplyMessage] = useState("");
	const [isDark, setIsDark] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<"all" | "open" | "resolved">("all");
	const [sortBy, setSortBy] = useState<"date" | "status" | "email">("date");

	// Check dark mode
	useEffect(() => {
		const checkDarkMode = () => {
			setIsDark(document.documentElement.classList.contains("dark"));
		};

		checkDarkMode();
		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

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
			setFilteredTickets(data ?? []);
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

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
			setFilteredTickets((prevTickets) =>
				prevTickets.map((ticket) => (ticket._id === updatedTicket._id ? updatedTicket : ticket))
			);
			toast.success("Ticket status updated successfully!");
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setUpdating(null);
		}
	};

	const sendReply = async (): Promise<void> => {
		if (!selectedTicket || !replyMessage.trim()) {
			toast.error("Please enter a reply message");
			return;
		}

		try {
			setSendingReply(selectedTicket._id);
			const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
			const endpoint = `${apiUrl}${Endpoints.SEND_ADMIN_MESSAGE}`;

			// Create the complete HTML email template
			const htmlTemplate = createEmailTemplate(replyMessage);

			console.log("Making request to:", endpoint);
			console.log("Request payload:", {
				mailId: selectedTicket.email,
				message: htmlTemplate, // Send HTML template as the message
			});

			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					mailId: selectedTicket.email,
					message: htmlTemplate, // Backend will use this HTML directly in emailHtml()
				}),
				credentials: "include",
			});

			console.log("Response status:", response.status);
			console.log("Response headers:", Object.fromEntries(response.headers.entries()));

			if (!response.ok) {
				let errorMessage = "Failed to send reply";

				// Check if response is JSON before trying to parse it
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					try {
						const errorData: ApiError = await response.json();
						errorMessage = errorData.message || errorMessage;
					} catch {
						// If JSON parsing fails, use default message
						errorMessage = `Server error: ${response.status} ${response.statusText}`;
					}
				} else {
					// Not JSON response, likely HTML error page
					errorMessage = `Server error: ${response.status} ${response.statusText}`;
				}

				throw new Error(errorMessage);
			}

			// Check if successful response is JSON before parsing
			const contentType = response.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				// Parse JSON response if it exists
				const result = await response.json();
				console.log("Response:", result);
			} else {
				// Response is likely plain text (like "Message sent successfully.")
				const textResult = await response.text();
				console.log("Text response:", textResult);
			}

			toast.success("Reply sent successfully!");
			setReplyMessage("");
			setIsReplyModalOpen(false);

			// Auto-mark ticket as resolved after sending reply
			await updateTicketStatus(selectedTicket._id, selectedTicket.resolved);
		} catch (error) {
			console.error("Send reply error:", error);

			// Handle different types of errors
			if (error instanceof TypeError && error.message.includes("fetch")) {
				toast.error("Network error: Unable to connect to server. Please check your connection.");
			} else if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An unexpected error occurred while sending the reply.");
			}
		} finally {
			setSendingReply(null);
		}
	};

	const openViewModal = (ticket: Ticket): void => {
		setSelectedTicket(ticket);
		setIsViewModalOpen(true);
	};

	const openReplyModal = (ticket: Ticket): void => {
		setSelectedTicket(ticket);
		setIsReplyModalOpen(true);
	};

	const closeModals = (): void => {
		setIsViewModalOpen(false);
		setIsReplyModalOpen(false);
		setSelectedTicket(null);
		setReplyMessage("");
	};

	const formatDate = (date: Date): string => {
		return new Date(date).toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	useEffect(() => {
		void fetchTickets();
	}, []);

	useEffect(() => {
		let filtered = tickets;

		// Filter by status
		if (statusFilter === "open") {
			filtered = filtered.filter((ticket) => !ticket.resolved);
		} else if (statusFilter === "resolved") {
			filtered = filtered.filter((ticket) => ticket.resolved);
		}

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(ticket) =>
					ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
					ticket.message.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Sort tickets
		filtered = filtered.sort((a, b) => {
			if (sortBy === "date") {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			} else if (sortBy === "status") {
				return a.resolved === b.resolved ? 0 : a.resolved ? 1 : -1;
			} else if (sortBy === "email") {
				return a.email.localeCompare(b.email);
			}
			return 0;
		});

		setFilteredTickets(filtered);
	}, [tickets, searchTerm, statusFilter, sortBy]);

	return (
		<div className="my-7 flex w-full flex-col items-center justify-start py-4">
			<div className="mb-8 flex items-center justify-between w-full">
				<div className="flex items-center space-x-3">
					<MessageSquare className={`h-8 w-8 ${isDark ? "text-green-400" : "text-green-600"}`} />
					<h1 className="text-3xl font-bold royal-green-text">Support Tickets</h1>
				</div>
				<Badge variant="secondary" className="text-sm px-3 py-1 glass-button">
					{tickets.length} Total Tickets
				</Badge>
			</div>

			<Card className="w-full ticket-glass-card">
				<CardContent className="p-0">
					<div className="p-4 border-b border-green-200/20 flex items-center justify-between">
						<div className="flex space-x-4">
							<Select
								value={statusFilter}
								onValueChange={(value) => setStatusFilter(value as "all" | "open" | "resolved")}>
								<SelectTrigger className="w-[150px] glass-royal-green">
									<SelectValue placeholder="All Statuses" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Statuses</SelectItem>
									<SelectItem value="open">Open</SelectItem>
									<SelectItem value="resolved">Resolved</SelectItem>
								</SelectContent>
							</Select>

							<Select
								value={sortBy}
								onValueChange={(value) => setSortBy(value as "date" | "status" | "email")}>
								<SelectTrigger className="w-[150px] glass-royal-green">
									<SelectValue placeholder="Sort By" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="date">Date</SelectItem>
									<SelectItem value="status">Status</SelectItem>
									<SelectItem value="email">Email</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="flex items-center space-x-2">
							<Input
								placeholder="Search tickets..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="h-10 glass-royal-green"
							/>
							<Button
								variant="outline"
								className="h-10 glass-button"
								onClick={() => {
									setSearchTerm("");
									setStatusFilter("all");
									setSortBy("date");
								}}>
								<RefreshCw className="h-4 w-4 mr-2" />
								Reset Filters
							</Button>
						</div>
					</div>

					<Table>
						<TableHeader>
							<TableRow className="border-b border-green-200/20">
								<TableHead className="text-left font-semibold">
									<div className="flex items-center space-x-2">
										<Clock className="h-4 w-4" />
										<span>Timestamp</span>
									</div>
								</TableHead>
								<TableHead className="text-left font-semibold">
									<div className="flex items-center space-x-2">
										<Mail className="h-4 w-4" />
										<span>Email</span>
									</div>
								</TableHead>
								<TableHead className="text-left font-semibold">Status</TableHead>
								<TableHead className="text-center font-semibold">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={4} className="text-center py-8">
										<div className="flex items-center justify-center space-x-2">
											<BeatLoader color={isDark ? "#4ade80" : "#16a34a"} size={12} />
											<span className="text-sm text-muted-foreground">Loading tickets...</span>
										</div>
									</TableCell>
								</TableRow>
							) : filteredTickets.length === 0 ? (
								<TableRow>
									<TableCell colSpan={4} className="text-center py-8">
										<div className="text-muted-foreground">
											<MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
											<p>No tickets found</p>
										</div>
									</TableCell>
								</TableRow>
							) : (
								filteredTickets.map((ticket) => (
									<TableRow
										key={ticket._id}
										className="ticket-row-hover border-b border-green-100/20">
										<TableCell className="font-mono text-sm">
											{formatDate(ticket.createdAt)}
										</TableCell>
										<TableCell className="font-medium">{ticket.email}</TableCell>
										<TableCell>
											<Badge
												variant={ticket.resolved ? "default" : "destructive"}
												className={`${
													ticket.resolved
														? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
														: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
												} border-0 glass-button`}>
												{ticket.resolved ? (
													<>
														<CheckCircle className="h-3 w-3 mr-1" />
														Resolved
													</>
												) : (
													<>
														<XCircle className="h-3 w-3 mr-1" />
														Open
													</>
												)}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center justify-center space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => openViewModal(ticket)}
													className="h-8 px-3 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50 glass-button">
													<Eye className="h-3 w-3 mr-1" />
													View
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => openReplyModal(ticket)}
													className="h-8 px-3 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/50 glass-button royal-green-glow">
													<Send className="h-3 w-3 mr-1" />
													Reply
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => updateTicketStatus(ticket._id, ticket.resolved)}
													disabled={updating === ticket._id}
													className="h-8 px-3 glass-button">
													{updating === ticket._id ? (
														<BeatLoader color="currentColor" size={8} />
													) : (
														<>
															{ticket.resolved ? (
																<XCircle className="h-3 w-3 mr-1" />
															) : (
																<CheckCircle className="h-3 w-3 mr-1" />
															)}
															{ticket.resolved ? "Reopen" : "Resolve"}
														</>
													)}
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* View Ticket Modal */}
			<Transition appear show={isViewModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModals}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ticket-glass-modal">
									{selectedTicket && (
										<>
											<Dialog.Title className="text-lg font-medium leading-6 mb-4 flex items-center space-x-2">
												<Mail
													className={`h-5 w-5 ${isDark ? "text-green-400" : "text-green-600"}`}
												/>
												<span>Ticket Details</span>
											</Dialog.Title>

											<div className="space-y-4">
												<div className="grid grid-cols-2 gap-4">
													<div className="glass-royal-green p-3 rounded-lg">
														<label className="text-sm font-medium text-muted-foreground">
															From
														</label>
														<p className="font-medium">{selectedTicket.email}</p>
													</div>
													<div className="glass-royal-green p-3 rounded-lg">
														<label className="text-sm font-medium text-muted-foreground">
															Date
														</label>
														<p className="font-medium">
															{formatDate(selectedTicket.createdAt)}
														</p>
													</div>
												</div>

												<div>
													<label className="text-sm font-medium text-muted-foreground">
														Message
													</label>
													<div className="mt-2 p-4 rounded-lg glass-royal-green">
														<p className="whitespace-pre-wrap">{selectedTicket.message}</p>
													</div>
												</div>
											</div>

											<div className="mt-6 flex justify-end space-x-3">
												<Button
													variant="outline"
													onClick={closeModals}
													className="glass-button">
													Close
												</Button>
												<Button
													onClick={() => {
														closeModals();
														openReplyModal(selectedTicket);
													}}
													className="bg-green-600 hover:bg-green-700 text-white glass-button royal-green-glow">
													<Send className="h-4 w-4 mr-2" />
													Reply
												</Button>
											</div>
										</>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Reply Modal */}
			<Transition appear show={isReplyModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModals}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ticket-glass-modal">
									{selectedTicket && (
										<>
											<Dialog.Title className="text-lg font-medium leading-6 mb-6 flex items-center space-x-2">
												<Send
													className={`h-5 w-5 ${isDark ? "text-green-400" : "text-green-600"}`}
												/>
												<span className="royal-green-text">
													Reply to {selectedTicket.email}
												</span>
											</Dialog.Title>

											<div className="space-y-6">
												{/* Original Message */}
												<div>
													<label className="text-sm font-medium text-muted-foreground">
														Original Message
													</label>
													<div className="mt-2 p-4 rounded-lg glass-royal-green">
														<p className="text-sm whitespace-pre-wrap">
															{selectedTicket.message}
														</p>
													</div>
												</div>

												{/* Reply Message */}
												<div>
													<label className="text-sm font-medium text-muted-foreground">
														Your Reply
													</label>
													<Textarea
														value={replyMessage}
														onChange={(e) => setReplyMessage(e.target.value)}
														placeholder="Type your reply here..."
														className="mt-2 min-h-[150px] resize-none glass-royal-green neon-scroll"
														style={{
															background: isDark
																? "var(--ticket-modal-bg-dark)"
																: "var(--ticket-modal-bg-light)",
															border: `1px solid ${isDark ? "var(--ticket-border-dark)" : "var(--ticket-border-light)"}`,
														}}
													/>
												</div>
											</div>

											<div className="mt-6 flex justify-end space-x-3">
												<Button
													variant="outline"
													onClick={closeModals}
													className="glass-button">
													Cancel
												</Button>
												<Button
													onClick={sendReply}
													disabled={
														!replyMessage.trim() || sendingReply === selectedTicket._id
													}
													className="bg-green-600 hover:bg-green-700 text-white min-w-[100px] glass-button royal-green-glow">
													{sendingReply === selectedTicket._id ? (
														<BeatLoader color="white" size={8} />
													) : (
														<>
															<Send className="h-4 w-4 mr-2" />
															Send Reply
														</>
													)}
												</Button>
											</div>
										</>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

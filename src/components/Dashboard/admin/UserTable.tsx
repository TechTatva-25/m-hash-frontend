import { ColumnDef, Table } from "@tanstack/react-table";
import axios, { AxiosError } from "axios";
import BoringAvatar from "boring-avatars";
import debounce from "lodash.debounce";
import { UserCheck, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import { Modal, ModalBody, ModalHeader } from "@/components/Dashboard/admin/modal";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/header";
import DataTable from "@/components/ui/data-table/table";
import { Input } from "@/components/ui/input";
import { User } from "@/hooks/useSession";
import { Endpoints, getEndpoint } from "@/lib/endpoints";
import { generateColorPalette } from "@/lib/utils";

interface UserFetchParams {
	offset: number;
	search: string;
	limit: number;
}

interface UserWithActions extends User {
	actions: string;
}

const columns: ColumnDef<UserWithActions>[] = [
	{
		accessorKey: "username",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
		cell: ({ row }) => (
			<div className="flex items-center justify-center gap-2">
				<div className="flex w-[80%] items-center justify-start gap-3">
					<BoringAvatar
						size={40}
						name={row.original.username}
						variant="beam"
						colors={generateColorPalette(row.original._id)}
					/>
					{row.original.username}
				</div>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => <DataTableColumnHeader column={column} title="College" />,
		cell: ({ row }) => <div>{row.original.collegeOther}</div>,
	},
	{
		accessorKey: "email",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
		cell: ({ row }) => {
			const { theme } = useTheme();
			const isDark = theme === "dark";
			return (
				<div>
					<a 
						href={`mailto:${row.original.email}`} 
						style={{ 
							color: `${isDark ? 'rgba(168, 85, 247, 0.9)' : 'rgba(139, 92, 246, 1)'}`,
							transition: 'all 0.2s ease'
						}}
						onMouseOver={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(192, 132, 252, 0.9)' : 'rgba(168, 85, 247, 1)'}`}
						onMouseOut={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(168, 85, 247, 0.9)' : 'rgba(139, 92, 246, 1)'}`}
					>
						{row.original.email}
					</a>
				</div>
			);
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Mobile" />,
		cell: ({ row }) => {
			const { theme } = useTheme();
			const isDark = theme === "dark";
			return (
				<div>
					<a 
						href={`tel:${row.original.mobile_number}`}
						style={{ 
							color: `${isDark ? 'rgba(168, 85, 247, 0.9)' : 'rgba(139, 92, 246, 1)'}`,
							transition: 'all 0.2s ease'
						}}
						onMouseOver={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(192, 132, 252, 0.9)' : 'rgba(168, 85, 247, 1)'}`}
						onMouseOut={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(168, 85, 247, 0.9)' : 'rgba(139, 92, 246, 1)'}`}
					>
						{row.original.mobile_number}
					</a>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
		cell: ({ row }) => <div>{row.original.role}</div>,
	},
	// {
	//  accessorKey: "createdAt",
	//  header: ({ column }) => <DataTableColumnHeader column={column} title="Joined At" />,
	//  cell: ({ row }) => <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>,
	// },
	{
		accessorKey: "actions",
		header: "",
		cell: ({ row }): React.JSX.Element => {
			const [isModalOpen, setIsModalOpen] = useState(false);
			const { theme } = useTheme();
			const isDark = theme === "dark";

			const handleMakeJudge = async (userId: string): Promise<void> => {
				try {
					const response = await axios.post<{ message: string }>(
						getEndpoint(Endpoints.MAKE_JUDGE),
						{ userId },
						{ withCredentials: true }
					);
					toast.success(response.data.message);
				} catch (error) {
					toast.error((error as AxiosError<{ message: string }>).response?.data.message);
				}
			};

			const handleOpenModal = (): void => {
				setIsModalOpen(true);
			};
			const handleCloseModal = (): void => {
				setIsModalOpen(false);
			};
			const handlejudge = (): Promise<void> => handleMakeJudge(row.original._id);

			return (
				<>
					<Button 
						onClick={handleOpenModal} 
						variant="ghost" 
						style={{
							marginTop: '0.5rem',
							borderRadius: '0.75rem',
							backdropFilter: 'blur(8px)',
							transition: 'all 0.2s ease',
							backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.7)'}`,
							color: `${isDark ? 'rgba(203, 213, 225, 1)' : 'rgba(51, 65, 85, 1)'}`,
						}}
						onMouseOver={(e) => {
							e.currentTarget.style.backgroundColor = `${isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.2)'}`;
							e.currentTarget.style.color = `${isDark ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'}`;
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.backgroundColor = `${isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.7)'}`;
							e.currentTarget.style.color = `${isDark ? 'rgba(203, 213, 225, 1)' : 'rgba(51, 65, 85, 1)'}`;
						}}
					>
						<FaEllipsisVertical />
					</Button>
					{isModalOpen && (
						<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
							<ModalHeader>
								<div className="flex w-[100%] items-center justify-between">
									<span style={{
										fontWeight: 600,
										fontSize: '1.125rem',
										color: `${isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(30, 41, 59, 1)'}`
									}}>
										{row.original.username}
									</span>
									<button
										onClick={handleCloseModal}
										style={{
											borderRadius: '9999px',
											padding: '0.375rem',
											cursor: 'pointer',
											transition: 'all 0.2s ease',
											backgroundColor: `${isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`,
											color: `${isDark ? 'rgba(248, 113, 113, 1)' : 'rgba(239, 68, 68, 1)'}`
										}}
										onMouseOver={(e) => {
											e.currentTarget.style.backgroundColor = `${isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`;
											e.currentTarget.style.color = `${isDark ? 'rgba(252, 165, 165, 1)' : 'rgba(248, 113, 113, 1)'}`;
										}}
										onMouseOut={(e) => {
											e.currentTarget.style.backgroundColor = `${isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`;
											e.currentTarget.style.color = `${isDark ? 'rgba(248, 113, 113, 1)' : 'rgba(239, 68, 68, 1)'}`;
										}}
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							</ModalHeader>
							<ModalBody>
								<div className="flex w-[100%] items-center justify-start gap-5">
									<Button
										onClick={handlejudge}
										style={{
											backdropFilter: 'blur(8px)',
											transition: 'all 0.2s ease',
											cursor: 'pointer',
											backgroundColor: `${isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.2)'}`,
											color: `${isDark ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'}`,
											border: `1px solid ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`
										}}
										onMouseOver={(e) => {
											e.currentTarget.style.backgroundColor = `${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`;
											e.currentTarget.style.color = `${isDark ? 'rgba(216, 180, 254, 1)' : 'rgba(168, 85, 247, 1)'}`;
										}}
										onMouseOut={(e) => {
											e.currentTarget.style.backgroundColor = `${isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.2)'}`;
											e.currentTarget.style.color = `${isDark ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'}`;
										}}
									>
										<UserCheck className="h-5 w-5 mr-2" /> Make Judge
									</Button>
								</div>
								<div style={{
									marginTop: '1rem',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'flex-start',
									gap: '1.25rem',
									borderRadius: '0.75rem',
									padding: '1rem',
									backdropFilter: 'blur(8px)',
									border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.7)' : 'rgba(226, 232, 240, 0.7)'}`,
									backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.4)'}`,
								}}>
									<span className="font-medium text-foreground">
										<span style={{
											color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
										}}>Name:</span> {row.original.username}
									</span>
									<span className="font-medium text-foreground">
										<span style={{
											color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
										}}>College: </span>
										{row.original.collegeOther}
									</span>
									<span className="font-medium text-foreground">
										<span style={{
											color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
										}}>Email: </span>{" "}
										<a 
											href={`mailto:${row.original.email}`} 
											style={{ 
												transition: 'all 0.2s ease',
												color: `${isDark ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'}`
											}}
											onMouseOver={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(216, 180, 254, 1)' : 'rgba(168, 85, 247, 1)'}`}
											onMouseOut={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'}`}
										>
											{row.original.email}
										</a>
									</span>
									<span className="font-medium text-foreground">
										<span style={{
											color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
										}}>Mobile: </span>{" "}
										<a 
											href={`tel:${row.original.mobile_number}`} 
											style={{ 
												transition: 'all 0.2s ease',
												color: `${isDark ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'}`
											}}
											onMouseOver={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(216, 180, 254, 1)' : 'rgba(168, 85, 247, 1)'}`}
											onMouseOut={(e) => e.currentTarget.style.color = `${isDark ? 'rgba(192, 132, 252, 1)' : 'rgba(139, 92, 246, 1)'}`}
										>
											{row.original.mobile_number}
										</a>
									</span>
									<span className="font-medium text-foreground">
										<span style={{
											color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
										}}>Gender: </span>
										{row.original.gender}
									</span>
									<span className="font-medium text-foreground">
										<span style={{
											color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
										}}>Role: </span> {row.original.role}
									</span>
									<span className="font-medium text-foreground">
										<span style={{
											color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
										}}>Joined At: </span>{" "}
										{new Date(row.original.createdAt).toLocaleDateString()}
									</span>
								</div>
							</ModalBody>
						</Modal>
					)}
				</>
			);
		},
	},
];

const UsersTable: React.FC = () => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const [fetchProps, setFetchProps] = useState<UserFetchParams>({
		offset: 0,
		search: "",
		limit: 3000,
	});
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<UserWithActions[]>([]);
	const [, setTable] = useState<Table<UserWithActions> | undefined>(undefined);

	const fetchUsers = async (reset = false): Promise<void> => {
		try {
			setLoading(true);
			const response = await axios.get<{
				users: User[];
				offset: number;
				hasMore: boolean;
				limit: number;
				total: number;
			}>(getEndpoint(Endpoints.LIST_USERS), {
				withCredentials: true,
				params: {
					username: fetchProps.search,
					limit: fetchProps.limit,
					offset: reset ? 0 : fetchProps.offset,
				},
			});
			const usersWithActions = response.data.users.map((user) => ({ ...user, actions: "" }));
			reset ? setUsers(usersWithActions) : setUsers((prev) => [...prev, ...usersWithActions]);
			setFetchProps({ ...fetchProps, offset: response.data.offset + response.data.limit });
		} catch (error) {
			const e = error as AxiosError<{ message: string }>;
			toast.error(e.response?.data.message);
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetchUsers = useCallback(
		debounce(async () => {
			setUsers([]);
			await fetchUsers(true);
		}, 500),
		[fetchProps.search]
	);

	useEffect(() => {
		if (loading) return;
		void debouncedFetchUsers();
		return (): void => {
			debouncedFetchUsers.cancel();
		};
	}, [fetchProps.search, debouncedFetchUsers]);

	return (
		<div className="relative">
			{/* Glass panel container */}
			<div style={{
				padding: '1.5rem',
				borderRadius: '0.75rem',
				overflow: 'hidden',
				backgroundColor: `${isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.7)'}`,
				backdropFilter: 'blur(12px)',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
				border: `1px solid ${isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(226, 232, 240, 0.7)'}`
			}}>
				{/* Purple gradient overlay */}
				<div className="absolute inset-0 pointer-events-none" style={{
					background: `${isDark ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))' : 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.05))'}`
				}}></div>
				
				{/* Accent edge */}
				<div className="absolute inset-0 rounded-xl overflow-hidden">
					<div className="absolute top-0 left-0 right-0 h-[1px]" style={{
						background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.5)'}, transparent)`
					}}></div>
					<div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
						background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.4)'}, transparent)`
					}}></div>
				</div>
				
				<div className="relative flex w-[100%] items-end justify-between mb-6">
					<div>
						<p style={{
							fontSize: '1.5rem',
							fontWeight: 600,
							fontFamily: "var(--font-playfair-display)",
							color: `${isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(30, 41, 59, 1)'}`
						}}>Users</p>
					</div>
					<Input
						placeholder="Enter name"
						value={fetchProps.search}
						onChange={(e): void => setFetchProps({ ...fetchProps, search: e.target.value, offset: 0 })}
						style={{
							width: '20%',
							minWidth: '10rem',
							backdropFilter: 'blur(8px)',
							border: `1px solid ${isDark ? 'rgba(51, 65, 85, 1)' : 'rgba(226, 232, 240, 1)'}`,
							backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.5)'}`,
							color: `${isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(15, 23, 42, 1)'}`,
						}}
					/>
				</div>
				<div className="relative">
					<div style={{
						border: `1px solid ${isDark ? 'rgba(51, 65, 85, 1)' : 'rgba(226, 232, 240, 1)'}`,
						backgroundColor: `${isDark ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.4)'}`,
						backdropFilter: 'blur(8px)'
					}}>
						<DataTable
							columns={columns}
							data={users}
							setTable={setTable}
							pagination
							classNames="overflow-auto"
						/>
					</div>
					{loading && (
						<div style={{
							margin: '1.5rem 0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '0.75rem',
							padding: '1rem',
							backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.4)'}`,
							border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
							backdropFilter: 'blur(8px)'
						}}>
							<BeatLoader color="#a457f7" size={12} />
						</div>
					)}
					{!loading && users.length === 0 && (
						<div style={{
							margin: '1.5rem 0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '0.75rem',
							padding: '1rem',
							backgroundColor: `${isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.4)'}`,
							border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)'}`,
							backdropFilter: 'blur(8px)',
							color: `${isDark ? 'rgba(148, 163, 184, 1)' : 'rgba(100, 116, 139, 1)'}`
						}}>
							<p>No users found</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UsersTable;

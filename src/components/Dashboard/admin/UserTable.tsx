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
						variant="marble"
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
		cell: ({ row }) => (
			<div>
				<a href={`mailto:${row.original.email}`}>{row.original.email}</a>
			</div>
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Mobile" />,
		cell: ({ row }) => (
			<div>
				<a href={`tel:${row.original.mobile_number}`}>{row.original.mobile_number}</a>
			</div>
		),
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
					<Button onClick={handleOpenModal} variant="ghost" className="mt-2">
						<FaEllipsisVertical />
					</Button>
					{isModalOpen && (
						<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
							<ModalHeader>
								<div className="flex w-[100%] items-center justify-between">
									{row.original.username}{" "}
									<button
										onClick={handleCloseModal}
										className="text-red-500 hover:bg-none hover:text-white">
										<X />
									</button>
								</div>
							</ModalHeader>
							<ModalBody>
								<div className="flex w-[100%] items-center justify-start gap-5">
									<Button
										// eslint-disable-next-line @typescript-eslint/no-misused-promises
										onClick={handlejudge}
										className="bg-gray-700 text-yellow-500 hover:text-primary">
										<UserCheck />
									</Button>
								</div>
								<div className="mt-4 flex flex-col items-start justify-start gap-5 rounded-xl border-2 border-gray-700 bg-[#0B1739] p-4">
									<span className="font-semibold text-white">
										<span className="text-gray-300">Name:</span> {row.original.username}
									</span>
									<span className="font-semibold  text-white">
										<span className="text-gray-300">College: </span>
										{row.original.collegeOther}
									</span>
									<span className="font-semibold  text-white">
										<span className="text-gray-300">Email: </span>{" "}
										<a href={`mailto:${row.original.email}`}>{row.original.email}</a>
									</span>
									<span className="font-semibold  text-white">
										<span className="text-gray-300">Mobile: </span>{" "}
										<a href={`tel:${row.original.mobile_number}`}>{row.original.mobile_number}</a>
									</span>
									<span className="font-semibold  text-white">
										<span className="text-gray-300">Gender: </span>
										{row.original.gender}
									</span>
									<span className="font-semibold  text-white">
										<span className="text-gray-300">Role: </span> {row.original.role}
									</span>
									<span className="font-semibold  text-white">
										<span className="text-gray-300">Joined At: </span>{" "}
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
		<>
			<div className="flex w-[100%] items-end justify-between">
				<div>
					<p className="text-2xl font-semibold">Users</p>
				</div>
				<Input
					placeholder="Enter name"
					value={fetchProps.search}
					onChange={(e): void => setFetchProps({ ...fetchProps, search: e.target.value, offset: 0 })}
					className="w-[20%] min-w-[10rem] text-black dark:bg-[#27264E] dark:text-white"
				/>
			</div>
			<div className="mt-4">
				<DataTable
					columns={columns}
					data={users}
					setTable={setTable}
					pagination
					classNames="border-2 overflow-auto"
				/>
				{loading && (
					<div className="my-10 flex items-center justify-center text-center">
						<BeatLoader color="#a457f7" size={12} />
					</div>
				)}
				{!loading && users.length === 0 && (
					<div className="my-10 flex items-center justify-center text-center">
						<p>No users found</p>
					</div>
				)}
			</div>
		</>
	);
};

export default UsersTable;

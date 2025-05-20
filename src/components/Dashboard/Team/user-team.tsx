"use client";

import { ColumnDef, Table } from "@tanstack/react-table";
import BoringAvatar from "boring-avatars";
import React from "react";

import { User } from "@/hooks/useSession";
import { Team } from "@/hooks/useTeam";
import { generateColorPalette } from "@/lib/utils";

import DataTable from "../../ui/data-table/table";

export default function UserTeam({ team }: { team: Team }): React.ReactElement {
	const [, setUserTable] = React.useState<Table<User>>();
	const columns = React.useMemo<ColumnDef<User>[]>(
		() => [
			{
				header: () => <span className="flex items-center justify-center text-center">Name</span>,
				accessorKey: "name",
				cell: ({ row }: { row: { original: User } }): React.ReactNode => {
					const user = row.original;
					return (
						<div className="flex items-center">
							<div className="flex h-12 w-12 items-center justify-center">
								<BoringAvatar
									size={40}
									name={user.username}
									variant="marble"
									colors={generateColorPalette(user._id)}
								/>
							</div>
							<span className="ml-2">{user.username}</span>
						</div>
					);
				},
			},
			{
				header: () => <span className="flex items-center justify-center text-center">Email</span>,
				accessorKey: "email",
			},
			{
				header: () => <span className="flex items-center justify-center text-center">Mobile Number</span>,
				accessorKey: "mobile_number",
			},
			{
				header: () => <span className="flex items-center justify-center text-center">College</span>,
				accessorKey: "collegeOther",
			},
		],
		[]
	);

	return <DataTable columns={columns} data={team.members} pagination={false} setTable={setUserTable} />;
}

"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	Table as TanstackTable,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

import { DataTablePagination } from "./pagination";

export default function DataTable<TableProps>({
	columns,
	data,
	setTable,
	classNames,
	pagination,
	pageSize,
}: {
	columns: ColumnDef<TableProps>[];
	data: TableProps[];
	setTable: React.Dispatch<React.SetStateAction<TanstackTable<TableProps> | undefined>>;
	classNames?: string;
	pagination?: boolean;
	pageSize?: number;
}): React.JSX.Element {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const table = useReactTable<TableProps>({
		columns,
		data,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	React.useEffect(() => {
		setTable(table);
	}, [table, setTable]);

	// Create custom styles for the glassmorphic aesthetic
	const tableStyles = {
		container: {
			background: isDark 
				? 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.6))'
				: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(241, 245, 249, 0.9))',
			boxShadow: `0 8px 32px 0 ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(31, 38, 135, 0.07)'}`,
			backdropFilter: 'blur(8px)',
			WebkitBackdropFilter: 'blur(8px)',
			border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.6)'}`,
			borderRadius: '10px',
			overflow: 'hidden'
		},
		headerRow: {
			background: isDark 
				? 'linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.05))'
				: 'linear-gradient(to right, rgba(139, 92, 246, 0.15), rgba(79, 70, 229, 0.1))',
			borderBottom: `1px solid ${isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
		},
		row: (isSelected: boolean) => ({
			background: isSelected 
				? (isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)')
				: 'transparent',
			borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
			transition: 'all 0.2s ease',
		}),
		rowHover: {
			background: isDark 
				? 'rgba(139, 92, 246, 0.08)'
				: 'rgba(139, 92, 246, 0.05)',
		},
		noResults: {
			color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 0.8)',
			fontStyle: 'italic',
		}
	};

	return (
		<div 
			className={cn("w-full rounded-xl", classNames)}
			style={tableStyles.container}
		>
			{pagination && <DataTablePagination table={table} pageSize={pageSize} />}
			<Table>
				{/* Accent line at the top */}
				<div className="absolute top-0 left-0 right-0 h-[1px]" style={{
					background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.5)'}, transparent)`
				}}></div>
				
				{/* Accent line at the bottom */}
				<div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
					background: `linear-gradient(to right, transparent, ${isDark ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.4)'}, transparent)`
				}}></div>
				
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow 
							key={headerGroup.id} 
							style={tableStyles.headerRow}
							className="border-0"
						>
							{headerGroup.headers.map((header, headerIndex) => {
								return (
									<TableHead 
										key={`${headerGroup.id}_${header.id}_${headerIndex}`}
										className={cn(
											"h-11 px-4 text-sm font-semibold",
											isDark ? "text-slate-200" : "text-slate-700"
										)}
									>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow 
								key={row.id} 
								data-state={row.getIsSelected() && "selected"}
								style={tableStyles.row(row.getIsSelected())}
								className="group transition-all hover:bg-transparent"
							>
								{row.getVisibleCells().map((cell, cellIndex) => (
									<TableCell 
										className={cn(
											"text-center",
											isDark ? "text-slate-300" : "text-slate-700",
											"transition-all group-hover:bg-transparent"
										)} 
										key={`${row.id}_${cell.id}_${cellIndex}`}
										style={{
											background: 'transparent',
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell 
								colSpan={columns.length} 
								className="h-24 text-center"
								style={tableStyles.noResults}
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

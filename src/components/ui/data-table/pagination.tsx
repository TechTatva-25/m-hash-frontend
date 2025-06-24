import { Table } from "@tanstack/react-table";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon as DoubleArrowLeftIcon,
	ChevronsRightIcon as DoubleArrowRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/ThemeProvider";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	pageSize?: number;
}

export function DataTablePagination<TData>({ table, pageSize }: DataTablePaginationProps<TData>): React.JSX.Element {
	if (pageSize && table.getState().pagination.pageSize !== pageSize) {
		table.setPageSize(Number(pageSize));
	}

	const { theme } = useTheme();
	const isDark = theme === "dark";

	// Custom button styles for glassmorphic effect
	const buttonStyle = {
		background: isDark 
			? 'rgba(139, 92, 246, 0.1)'
			: 'rgba(139, 92, 246, 0.05)',
		border: `1px solid ${isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}`,
		color: isDark ? 'white' : '#1e293b',
		backdropFilter: 'blur(4px)',
		WebkitBackdropFilter: 'blur(4px)',
	};

	const buttonDisabledStyle = {
		background: isDark
			? 'rgba(100, 116, 139, 0.1)'
			: 'rgba(148, 163, 184, 0.05)',
		border: `1px solid ${isDark ? 'rgba(100, 116, 139, 0.2)' : 'rgba(148, 163, 184, 0.15)'}`,
		color: isDark ? 'rgba(148, 163, 184, 0.5)' : 'rgba(100, 116, 139, 0.6)',
	};

	return (
		<div className="flex w-full flex-row items-center justify-center p-3 sm:justify-between sm:px-4">
			<div className={`hidden text-sm sm:flex ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
				{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} rows
				selected.
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center sm:space-x-2">
					<p className={`hidden text-sm font-medium sm:block ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
						Rows per page
					</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value): void => {
							table.setPageSize(Number(value));
						}}>
						<SelectTrigger 
							aria-label={"pageSize"} 
							className={`h-8 w-[70px] ${
								isDark 
									? 'bg-slate-800/40 border-slate-700 text-white' 
									: 'bg-white/50 border-slate-200 text-slate-900'
							} backdrop-blur-sm`}
						>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent 
							side="top"
							className={`${
								isDark 
									? 'bg-slate-800/90 border-slate-700 text-white' 
									: 'bg-white/90 border-slate-200 text-slate-900'
							} backdrop-blur-md`}
						>
							{[5, 10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className={`flex items-center justify-center text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'} sm:w-[100px]`}>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={(): void => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
						style={table.getCanPreviousPage() ? buttonStyle : buttonDisabledStyle}>
						<span className="sr-only">Go to first page</span>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={(): void => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						style={table.getCanPreviousPage() ? buttonStyle : buttonDisabledStyle}>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={(): void => table.nextPage()}
						disabled={!table.getCanNextPage()}
						style={table.getCanNextPage() ? buttonStyle : buttonDisabledStyle}>
						<span className="sr-only">Go to next page</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={(): void => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
						style={table.getCanNextPage() ? buttonStyle : buttonDisabledStyle}>
						<span className="sr-only">Go to last page</span>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

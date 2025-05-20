// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToCSV = (filename: string, data: any[], columns: string[]): void => {
	const csvContent =
		columns.join(",") +
		"\n" +
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
		data.map((row) => columns.map((col) => (row[col] ? `"${row[col]}"` : "")).join(",")).join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.setAttribute("download", `${filename}.csv`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

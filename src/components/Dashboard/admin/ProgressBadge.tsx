import React from "react";

interface ProgressBadgeProps {
	status: string;
}

const getStatusColor = (status: string): string => {
	switch (status) {
		case "QUALIFIED":
			return "bg-green-900 text-green-500";
		case "Submitted":
			return "bg-yellow-900 text-yellow-500";
		case "Not qualified":
			return "bg-red-900 text-red-400";
		default:
			return "bg-gray-500";
	}
};

const ProgressBadge: React.FC<ProgressBadgeProps> = ({ status }) => {
	return <span className={`rounded px-2 py-1 text-white ${getStatusColor(status)}`}>{status}</span>;
};

export default ProgressBadge;

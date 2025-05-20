import React from "react";

import { cn } from "@/lib/utils"; // Assume cn is a utility function for handling classnames

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	classNames?: string; // Allow for custom class names
}

export const Modal: React.FC<ModalProps> = ({ isOpen, children, classNames }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-50 backdrop-blur-sm">
			<div
				className={cn(
					"relative flex w-full min-w-fit max-w-md flex-col items-start justify-start rounded-2xl bg-card bg-zinc-900 p-4 shadow-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl",
					classNames // Add custom classNames here
				)}>
				{children}
			</div>
		</div>
	);
};

export const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="flex w-full items-center justify-between text-xl font-semibold text-white">{children}</div>
);

export const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="mx-auto my-5 w-[90%]">{children}</div>
);

export const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="w-full">{children}</div>
);

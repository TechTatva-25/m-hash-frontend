import { XIcon } from "lucide-react";
import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps): React.JSX.Element => {
	if (!isOpen) return <div></div>;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop:blur-xl">
			<div className="h-[40vh] overflow-y-scroll rounded border-2 border-gray-600 bg-gray-900 p-4 backdrop:blur-xl">
				<div className="mb-4 flex items-center justify-between gap-[20vw]">
					<h2 className="text-lg font-bold text-gray-500">{title}</h2>
					<button onClick={onClose} className="text-red-500">
						<XIcon size={24} />
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;

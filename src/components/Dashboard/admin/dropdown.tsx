import React, { useState } from "react";

interface Member {
	_id: string;
	username: string;
	mobile_number: string;
}

interface DropdownProps {
	members: Member[];
}

const Dropdown: React.FC<DropdownProps> = ({ members }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(!isOpen);

	return (
		<div className="relative">
			<button onClick={toggleDropdown} className="w-full rounded-lg bg-gray-700 px-4 py-2 text-left">
				Members
			</button>
			{isOpen && (
				<div className="absolute left-0 mt-2 w-full rounded-md border-2 border-gray-700 bg-[#0B1739] shadow-lg">
					{members.map((member) => (
						<div
							key={member._id}
							className="mb-2 flex w-full flex-col items-start justify-start gap-2 rounded-2xl p-4 text-white">
							<span>{member.username}</span>
							<span className="text-xs text-gray-400">{member.mobile_number}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Dropdown;

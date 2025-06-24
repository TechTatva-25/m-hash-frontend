import React from "react";

import { useTheme } from "@/components/ThemeProvider";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	classNames?: string; // Allow for custom class names
}

export const Modal: React.FC<ModalProps> = ({ isOpen, children, classNames }) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	if (!isOpen) return null;

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 50,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflow: "auto",
				backgroundColor: `${isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)"}`,
				backdropFilter: "blur(8px)",
			}}>
			<div
				className={classNames}
				style={{
					position: "relative",
					display: "flex",
					width: "100%",
					minWidth: "fit-content",
					maxWidth: "32rem",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "flex-start",
					borderRadius: "0.75rem",
					padding: "1.25rem",
					boxShadow: `0 8px 32px ${isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
					backgroundColor: `${isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.7)"}`,
					backdropFilter: "blur(12px)",
					border: `1px solid ${isDark ? "rgba(51, 65, 85, 0.7)" : "rgba(226, 232, 240, 0.7)"}`,
					overflow: "hidden",
				}}>
				{/* Purple gradient overlay */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						pointerEvents: "none",
						background: `${isDark ? "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(79, 70, 229, 0.03))" : "linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(79, 70, 229, 0.05))"}`,
					}}></div>

				{/* Accent edges */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						borderRadius: "0.75rem",
						overflow: "hidden",
						pointerEvents: "none",
					}}>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: "1px",
							background: `linear-gradient(to right, transparent, ${isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.5)"}, transparent)`,
						}}></div>
					<div
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							height: "1px",
							background: `linear-gradient(to right, transparent, ${isDark ? "rgba(79, 70, 229, 0.2)" : "rgba(79, 70, 229, 0.4)"}, transparent)`,
						}}></div>
				</div>

				<div style={{ position: "relative", width: "100%", zIndex: 10 }}>{children}</div>
			</div>
		</div>
	);
};

export const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				alignItems: "center",
				justifyContent: "space-between",
				fontSize: "1.25rem",
				fontWeight: 600,
				color: `${isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(15, 23, 42, 0.95)"}`,
				borderBottom: `1px solid ${isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.2)"}`,
				paddingBottom: "0.75rem",
				marginBottom: "0.75rem",
			}}>
			{children}
		</div>
	);
};

export const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div
			style={{
				margin: "0.75rem auto",
				width: "95%",
				position: "relative",
			}}>
			{children}
		</div>
	);
};

export const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div
			style={{
				width: "100%",
				borderTop: `1px solid ${isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.2)"}`,
				paddingTop: "0.75rem",
				marginTop: "0.75rem",
			}}>
			{children}
		</div>
	);
};

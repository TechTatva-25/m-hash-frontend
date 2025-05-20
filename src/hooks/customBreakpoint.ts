import { useEffect, useState } from "react";

export const useCustomBreakpoint = (pixels: number): boolean => {
	const [isAbove, setIsAbove] = useState<boolean>(window.innerWidth >= pixels);

	useEffect(() => {
		function handleResize(): void {
			setIsAbove(window.innerWidth >= pixels);
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [pixels]);

	return isAbove;
};

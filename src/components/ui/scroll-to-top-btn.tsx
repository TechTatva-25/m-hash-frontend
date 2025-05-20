"use client";

import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const ScrollToTopButton: React.FC = () => {
	const [visible, setVisible] = useState(false);

	const smoothScrollToTop = (): void => {
		let currentScroll = window.scrollY;
		const scrollStep = -Math.ceil(currentScroll / 30);

		const scrollInterval = setInterval(() => {
			if (currentScroll > 0) {
				window.scrollBy(0, scrollStep);
				currentScroll += scrollStep;
			} else {
				clearInterval(scrollInterval);
			}
		}, 15);
	};

	const handleScroll = (): void => {
		const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
		const currentScroll = window.scrollY;

		if (currentScroll >= totalHeight * 0.7) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{visible && (
				<Button
					variant="secondary"
					className="fixed bottom-4 right-4 h-10 w-10 p-3 md:bottom-6 md:right-8"
					title="Scroll to top button"
					onClick={smoothScrollToTop}>
					<FaAngleUp className="h-12 w-12" />
				</Button>
			)}
		</>
	);
};

export default ScrollToTopButton;

"use client";

import { useTheme } from "next-themes";
import React from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

import { Button } from "../ui/button";

export default function ThemeToggleButton(): React.JSX.Element {
	const { resolvedTheme, setTheme } = useTheme();
	return (
		<Button
			aria-label="Toggle Dark Mode"
			type="button"
			className="flex h-[38px] w-[38px] items-center rounded p-0 md:justify-center"
			onClick={(): void => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
			{resolvedTheme === "dark" ? <RiSunFill size={16} /> : <RiMoonClearFill size={16} />}
		</Button>
	);
}

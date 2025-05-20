"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { RecoilRoot } from "recoil";

import ToastProvider from "./ToastProvider";

export default function AppProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<RecoilRoot>
			<ThemeProvider attribute={"class"}>
				{children}
				<ToastProvider />
			</ThemeProvider>
		</RecoilRoot>
	);
}

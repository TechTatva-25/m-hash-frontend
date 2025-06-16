"use client";

import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RecoilRoot } from "recoil";

import ToastProvider from "./ToastProvider";

export default function AppProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<RecoilRoot>
			<ThemeProvider defaultTheme="light" storageKey="mhash-theme">
				{children}
				<ToastProvider />
			</ThemeProvider>
		</RecoilRoot>
	);
}

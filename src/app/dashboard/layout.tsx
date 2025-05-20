import React from "react";

import DashboardLayout from "@/components/Dashboard/dashboard-layout";

export default function DemoLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return <DashboardLayout>{children}</DashboardLayout>;
}

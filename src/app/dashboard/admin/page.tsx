"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import TeamsTable from "@/components/Dashboard/admin/TeamTable";
import UsersTable from "@/components/Dashboard/admin/UserTable";
import { ContentLayout } from "@/components/Dashboard/content-layout";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSession } from "@/hooks/useSession";

const Admin = (): React.JSX.Element => {
	const router = useRouter();
	const session = useSession();

	useEffect(() => {
		if (session?.loading) return;
		if (!session?.userId) {
			router.push("/login");
		}
		if (!(session?.user?.role === "admin")) {
			router.push("/dashboard");
		}
	}, [session]);

	return (
		<ContentLayout title="Admin">
			<div className="w-[100%] py-5">
				<Breadcrumb>
					<BreadcrumbList className="text-[15px]">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Dashboard</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Admin</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="my-10">
				<div className="rounded-md">
					<TeamsTable />
				</div>
				<div className="mt-10" />
				<div className="rounded-md">
					<UsersTable />
				</div>
			</div>
		</ContentLayout>
	);
};

export default Admin;

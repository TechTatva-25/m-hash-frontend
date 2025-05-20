"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegFilePdf } from "react-icons/fa6";

import { ContentLayout } from "@/components/Dashboard/content-layout";
import MarkdownArticle from "@/components/Dashboard/Rules/markdown-article";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/useSession";
import { RULES_MARKDOWN } from "@/lib/rules";

export const downloadRules = (): void => {
	const url = "/rules.pdf";
	window.open(url, "_blank");
};

export default function RulesPage(): React.JSX.Element {
	const router = useRouter();
	const session = useSession();

	React.useEffect(() => {
		if (session?.loading) return;
		if (!session?.userId) {
			router.push("/login");
		}
	}, [session]);

	return (
		<ContentLayout title="Dashboard">
			<section className="flex flex-1 flex-col py-4 sm:py-8">
				<Breadcrumb>
					<BreadcrumbList className="text-[15px]">
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/dashboard">Dashboard</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator slash />
						<BreadcrumbItem>
							<BreadcrumbPage className="font-semibold">Rules</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{session?.loading && (
					<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="flex flex-col space-y-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton key={index} style={{ height: Math.random() * 200 + 200 }} />
							))}
						</div>
						<div className="flex flex-col space-y-4">
							{Array.from({ length: 3 }).map((_, index) => (
								<Skeleton key={index} style={{ height: Math.random() * 200 + 200 }} />
							))}
						</div>
					</div>
				)}
				{!session?.loading && <MarkdownArticle content={RULES_MARKDOWN} />}
				<div className="py-6"></div>
				<Button
					variant="default"
					className="fixed bottom-6 right-8 h-12 w-12 p-3"
					onClick={downloadRules}
					title="Download Rules">
					<FaRegFilePdf className="h-10 w-10" />
				</Button>
			</section>
		</ContentLayout>
	);
}

import { Navbar } from "./navbar";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps): React.JSX.Element {
	return (
		<div>
			<Navbar title={title} />
			<div className="h-[calc(100vh-64px)] overflow-auto overflow-x-hidden bg-background px-4 sm:px-8">
				{children}
			</div>
		</div>
	);
}

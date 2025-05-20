import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";

interface NavbarProps {
	title: string;
}

export function Navbar({ title }: NavbarProps): React.JSX.Element {
	return (
		<header className="sticky top-0 z-10 w-full shadow backdrop-blur supports-[backdrop-filter]:bg-secondary/25 dark:shadow-none">
			<div className="flex h-16 items-center px-4 dark:border-b dark:border-secondary/75 sm:px-6">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<SheetMenu />
					<h1 className="text-xl font-bold">{title}</h1>
				</div>
				<div className="flex flex-1 items-center justify-end space-x-6">
					<UserNav />
				</div>
			</div>
		</header>
	);
}

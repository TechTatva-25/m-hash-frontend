import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Menu } from "./menu";

export function SheetMenu(): React.JSX.Element {
	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon">
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent
				className="flex h-full flex-col px-3 backdrop-blur-md dark:supports-[backdrop-filter]:bg-secondary/30 sm:w-72"
				side="left">
				<SheetHeader>
					<Button className="flex items-center justify-center pb-2 pt-1" variant="link" asChild>
						<Link href="/dashboard" className="flex items-center gap-2">
							<Image src="/M-Hash-Logo.png" alt="Manipal Hackathon Logo" width={60} height={60} />
							{/* <h1 className="text-lg font-bold">Hackathon</h1> */}
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}

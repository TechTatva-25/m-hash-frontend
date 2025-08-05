import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer(): React.JSX.Element {
	return (
		<footer className="mt-auto w-full p-4 bg-background text-foreground backdrop-blur-md border-border">
			<hr className="mb-6 border-t border-muted-foreground opacity-30" />
			<div className="container mx-auto px-6 relative">
				{/* Meet the Team button on the right */}
				<Link
					href="/meet-the-team"
					className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-medium px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-200"
				>
					Meet the Team
				</Link>

				{/* Centered social icons */}
				<div className="flex justify-center gap-6">
					<a
						href="https://www.facebook.com/MITtechtatva/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200"
					>
						<FaFacebookF />
					</a>
					<a
						href="https://x.com/mittechtatva"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200"
					>
						<FaXTwitter />
					</a>
					<a
						href="https://www.instagram.com/techtatvamit/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200"
					>
						<FaInstagram />
					</a>
					<a
						href="https://www.linkedin.com/company/mittechtatva"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200"
					>
						<FaLinkedinIn />
					</a>
				</div>

				<p className="text-muted-foreground text-xs text-center mt-6">
					&copy; 2025 All rights reserved by Manipal Hackathon
				</p>
			</div>
		</footer>
	);
}


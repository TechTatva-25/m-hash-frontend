import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer(): React.JSX.Element {
	return (
		<footer className="mt-auto w-full p-4 bg-background text-foreground backdrop-blur-md border-border">
			<hr className="mb-6 border-t border-muted-foreground opacity-30" />

			<div className="container mx-auto px-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
				{/* Social Icons */}
				<div className="flex justify-center gap-6">
					<a
						href="https://www.facebook.com/MITtechtatva/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200">
						<FaFacebookF />
					</a>
					<a
						href="https://x.com/mittechtatva"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200">
						<FaXTwitter />
					</a>
					<a
						href="https://www.instagram.com/techtatvamit/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200">
						<FaInstagram />
					</a>
					<a
						href="https://www.linkedin.com/company/mittechtatva"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl text-muted-foreground hover:text-primary transition-colors duration-200">
						<FaLinkedinIn />
					</a>
				</div>

				{/* Meet the Team Button */}
				<Link
					href="/meet-the-team"
					className="text-sm font-medium px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-200">
					Meet the Team
				</Link>
			</div>

			<p className="text-muted-foreground text-xs text-center mt-6">
				&copy; 2025 All rights reserved by Manipal Hackathon
			</p>
		</footer>
	);
}

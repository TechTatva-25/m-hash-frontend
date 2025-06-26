import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer(): React.JSX.Element {
	return (
		<footer
			className="mt-auto w-full p-4 text-primary backdrop-blur-md dark:text-primary-foreground"
			style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
			<hr className="mb-6 border-t border-muted-foreground opacity-30" />
			<div className="container mx-auto px-6">
				<div className="flex flex-col items-center justify-between gap-2">
					<div className="mb-6 flex space-x-6 md:mb-0">
						<a
							href="https://www.facebook.com/MITtechtatva/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xl text-muted-foreground hover:text-primary dark:hover:text-primary-foreground">
							<FaFacebookF />
						</a>
						<a
							href="https://x.com/mittechtatva"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xl text-muted-foreground hover:text-primary dark:hover:text-primary-foreground">
							<FaXTwitter />
						</a>
						<a
							href="https://www.instagram.com/techtatvamit/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xl text-muted-foreground hover:text-primary dark:hover:text-primary-foreground">
							<FaInstagram />
						</a>
						<a
							href="https://www.linkedin.com/company/mittechtatva"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xl text-muted-foreground hover:text-primary dark:hover:text-primary-foreground">
							<FaLinkedinIn />
						</a>
					</div>
					<p className="text-muted-foreground">&copy; 2025 All rights reserved by Manipal Hackathon</p>
				</div>
			</div>
		</footer>
	);
}

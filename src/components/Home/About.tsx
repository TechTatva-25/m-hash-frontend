import Image from "next/image";

export default function About(): React.JSX.Element {
	return (
		<div className="flex flex-col items-center justify-center p-2 md:flex-row md:p-8">
			<div className="flex flex-col justify-start p-4 md:w-2/3">
				<h2 className="my-3 text-3xl font-bold">About Us</h2>
				<p className="text-[hsl(var(--foreground))]">
					Get ready to dive into the future at Manipal Hackathon 2024! With the theme "Pioneering Paradigms",
					this flagship event of TechTatva 2024 is where creativity and innovation come to the forefront.
				</p>
				<p className="mt-4 text-[hsl(var(--foreground))]">
					Join us in 36 thrilling hours of coding where you will compete with brilliant minds, tackle
					challenges, and transform groundbreaking ideas to reality. This isn’t just about coding — it’s about
					pushing boundaries, exploring new possibilities, and setting the trends others will follow. Whether
					you're a seasoned pro or an enthusiastic amateur, M#’24 is your stage to shine. Let’s pioneer the
					future together.
				</p>
			</div>
			<div className="flex items-center justify-center p-4 md:w-1/3">
				<Image
					src={"/about-us.png"}
					alt="Description of the image"
					width={600}
					height={400}
					className="rounded-lg object-cover"
				/>
			</div>
		</div>
	);
}

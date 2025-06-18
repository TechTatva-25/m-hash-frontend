import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function hslToHex(h: number, s: number, l: number): string {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number): string => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0"); // convert to Hex and pad with zero
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateColorPalette(str: string): string[] {
	const numColors = 5;
	const goldenRatioConjugate = 0.618033988749895;
	let hue =
		(parseInt(
			str
				.split("")
				.map((char) => char.charCodeAt(0))
				.join(""),
			10
		) %
			360) /
		360;

	const colors = [];
	for (let i = 0; i < numColors; i++) {
		hue += goldenRatioConjugate;
		hue %= 1;
		colors.push(hslToHex(hue * 360, 65, 65)); // using 65% saturation and 65% lightness
	}
	return colors;
}

export function formatBytes(
	bytes: number,
	opts: {
		decimals?: number;
		sizeType?: "accurate" | "normal";
	} = {}
): string {
	const { decimals = 0, sizeType = "normal" } = opts;

	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
	if (bytes === 0) return "0 Byte";
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
		sizeType === "accurate" ? (accurateSizes[i] ?? "Bytest") : (sizes[i] ?? "Bytes")
	}`;
}

import "@/styles/github-markdown.css";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "@/components/ThemeProvider";

export default function MarkdownArticle({ content }: { content: string }): React.JSX.Element {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return (
		<div
			className="markdown-body !bg-transparent px-4 py-4 text-justify md:px-8 md:py-8"
			style={{
				listStyle: "initial !important",
				fontFamily: "'Inter', sans-serif",
				lineHeight: 1.7,
				color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)",
			}}>
			<Markdown
				rehypePlugins={[remarkGfm]}
				components={{
					h1: ({ node, ...props }) => (
						<h1
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: isDark ? "rgba(139, 92, 246, 0.9)" : "rgba(79, 70, 229, 0.9)",
							}}
							{...props}
						/>
					),
					h2: ({ node, ...props }) => (
						<h2
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: isDark ? "rgba(139, 92, 246, 0.9)" : "rgba(79, 70, 229, 0.9)",
							}}
							{...props}
						/>
					),
					h3: ({ node, ...props }) => (
						<h3
							style={{
								fontFamily: "var(--font-playfair-display)",
								color: isDark ? "rgba(139, 92, 246, 0.8)" : "rgba(79, 70, 229, 0.8)",
							}}
							{...props}
						/>
					),
					a: ({ node, ...props }) => (
						<a
							style={{
								color: isDark ? "#a78bfa" : "#7c3aed",
								textDecoration: "none",
								borderBottom: "1px dotted",
							}}
							{...props}
						/>
					),
					p: ({ node, ...props }) => (
						<p
							style={{ color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)" }}
							{...props}
						/>
					),
					li: ({ node, ...props }) => (
						<li
							style={{ color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)" }}
							{...props}
						/>
					),
					ul: ({ node, ...props }) => (
						<ul
							style={{ color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)" }}
							{...props}
						/>
					),
					ol: ({ node, ...props }) => (
						<ol
							style={{ color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)" }}
							{...props}
						/>
					),
					blockquote: ({ node, ...props }) => (
						<blockquote
							style={{
								borderLeftColor: isDark ? "rgba(139, 92, 246, 0.5)" : "rgba(79, 70, 229, 0.5)",
								color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)",
							}}
							{...props}
						/>
					),
					code: ({ node, ...props }) => (
						<code
							style={{
								backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.8)",
								color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.9)",
							}}
							{...props}
						/>
					),
				}}>
				{content}
			</Markdown>
		</div>
	);
}

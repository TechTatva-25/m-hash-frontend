import "@/styles/github-markdown.css";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownArticle({ content }: { content: string }): React.JSX.Element {
	return (
		<div
			className="markdown-body !bg-background px-8 py-8 text-justify !text-black dark:!text-white md:px-12 md:py-16"
			style={{ listStyle: "initial !important" }}>
			<Markdown rehypePlugins={[remarkGfm]}>{content}</Markdown>
		</div>
	);
}

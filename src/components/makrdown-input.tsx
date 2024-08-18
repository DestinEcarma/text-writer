import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface MarkdownInputProps {
	wpm: number;
	isSimulating: boolean;
	setIsSimulating: React.Dispatch<React.SetStateAction<boolean>>;
}

const MarkdownInput: React.FC<MarkdownInputProps> = ({ wpm, isSimulating, setIsSimulating }) => {
	const [inputText, setInputText] = useState("");
	const [markdown, setMarkdown] = useState("");

	useEffect(() => {
		if (!isSimulating) return;

		setMarkdown("");

		let index = 0;

		const delay = 60000 / (wpm * 5);

		const interval = setInterval(() => {
			if (index < inputText.length) {
				setMarkdown(inputText.slice(0, index));

				if (wpm <= 150) {
					const keyPress = new Audio("./assets/audios/key-press.mp3");

					keyPress.volume = 0.25;
					keyPress.play();
				}

				index++;
			} else {
				setIsSimulating(false);
				clearInterval(interval);
			}
		}, delay);

		return () => {
			clearInterval(interval);
		};
	}, [isSimulating, inputText, wpm, setMarkdown, setIsSimulating]);

	const textareaAttributes: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
		placeholder: 'Type something and press the "Simulate" button.',
		className: "bg-default resize-none",
		onChange: (e) => {
			setIsSimulating(false);
			setInputText(e.target.value);
		},
	};

	const markdownAttributes = {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [rehypeRaw, rehypeKatex, rehypeSlug, rehypeSanitize],
		className: "font-mono [&>*]:mb-4",
	};

	return (
		<>
			<div className="grid w-full grid-cols-2 gap-2 border-b border-b-primary">
				<h2 className="text-xl font-bold">Markdown</h2>
				<h2 className="text-xl font-bold">Preview</h2>
			</div>
			<div className="grid w-full flex-grow basis-0 grid-cols-2 gap-2 overflow-scroll">
				<textarea {...textareaAttributes} />
				<div className="markdown w-full">
					<Markdown {...markdownAttributes}>{isSimulating ? markdown : inputText}</Markdown>
				</div>
			</div>
		</>
	);
};

export default MarkdownInput;

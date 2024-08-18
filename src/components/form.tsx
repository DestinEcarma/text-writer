import MarkdownInput from "./makrdown-input";
import React, { useState } from "react";

const Form: React.FC = () => {
	const [wpm, setWpm] = useState(100);
	const [isSimulating, setIsSimulating] = useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSimulating((prev) => !prev);
	};

	const labelAttributes: React.LabelHTMLAttributes<HTMLLabelElement> = {
		htmlFor: "wpm",
		className:
			"cursor-pointer bg-primary p-2 text-secondary group-hover:bg-secondary group-hover:text-primary group-has-[input:focus]:bg-secondary group-has-[input:focus]:text-primary",
	};

	const inputAttributes: React.InputHTMLAttributes<HTMLInputElement> = {
		id: "wpm",
		type: "number",
		className: "group bg-transparent p-2",
		value: wpm,
		required: true,
		onChange: (e) => {
			setIsSimulating(false);
			setWpm(Math.min(Math.max(parseFloat(e.target.value), 1), 1000));
		},
	};

	const buttonAttributes: React.ButtonHTMLAttributes<HTMLButtonElement> = {
		type: "submit",
		className: "w-fit rounded-md bg-secondary px-4 py-2 font-bold text-secondary dark:text-primary",
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-grow flex-col gap-4 overflow-hidden p-4">
			<div className="group flex w-fit overflow-hidden rounded-md border border-secondary font-bold ring-primary transition has-[input:focus]:border-primary has-[input:focus]:ring">
				<label {...labelAttributes}>WPM</label>
				<input {...inputAttributes} />
			</div>
			<MarkdownInput {...{ wpm, isSimulating, setIsSimulating }} />
			<button {...buttonAttributes}>Simulate</button>
		</form>
	);
};

export default Form;

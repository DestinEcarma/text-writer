import Form from "@components/form";
import ThemeSelector from "@components/theme-selector";
import React from "react";

const App: React.FC = () => {
	return (
		<div className="flex h-dvh flex-col">
			<div className="flex justify-between border-b border-b-primary py-4">
				<h1 className="text-2xl font-bold">Text Writer</h1>
				<ThemeSelector />
			</div>
			<Form />
		</div>
	);
};

export default App;

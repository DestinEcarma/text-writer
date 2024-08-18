import React, { useEffect, useState } from "react";

const ThemeSelector: React.FC = () => {
	const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

	useEffect(() => {
		switch (theme) {
			case "dark":
				document.body.className = "dark";
				break;
			case "light":
				document.body.className = "light";
				break;
			case "system":
				if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
					document.body.className = "dark";
				} else {
					document.body.className = "light";
				}

				break;
			default:
				document.body.className = "light";
		}
	}, [theme]);

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value);

		localStorage.setItem("theme", e.target.value);
	};

	return (
		<select value={theme} onChange={handleThemeChange} className="bg-default">
			<option value="system">System</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	);
};

export default ThemeSelector;

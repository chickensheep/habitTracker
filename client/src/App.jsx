import { useState } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { Outlet } from "react-router-dom";

const App = () => {
	const [sort, setSort] = useState("nothing");

	return (
		<>
			<NavigationBar />
			<Outlet context={{ sort, setSort }} />
		</>
	);
};

export { App };

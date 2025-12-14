import { App } from "./App";
import { Calander } from "./components/Calander";
import { Habit } from "./components/Habit";
import { HabitList } from "./components/HabitList";
import { HabitCard } from "./components/HabitCard";
import { HabitAdd } from "./components/HabitAdd";
import { Stats } from "./components/Stats";

const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Calander /> },
			{
				path: "Habit",
				element: <Habit />,
				children: [
					{ index: true, element: <HabitList /> },
					{ path: "HabitCard", element: <HabitCard /> },
					{ path: "HabitAdd", element: <HabitAdd /> },
				],
			},
			{ path: "Stats", element: <Stats /> },
		],
	},
];

export { routes };

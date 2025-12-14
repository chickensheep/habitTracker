import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Habit = () => {
	const [selectedHabitCard, setSelectedHabitCard] = useState("test");
	const [dropDownId, setDropDownId] = useState(null);

	const { sort, setSort } = useOutletContext();

	return (
		<Outlet
			context={{
				selectedHabitCard,
				setSelectedHabitCard,
				dropDownId,
				setDropDownId,
				sort,
				setSort,
			}}
		/>
	);
};
export { Habit };

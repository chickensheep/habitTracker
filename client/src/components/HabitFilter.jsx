import "../styles/HabitFilter.css";

import { useOutletContext } from "react-router-dom";

const HabitFilter = (props) => {
	const {
		selectedHabitCard,
		setSelectedHabitCard,
		dropDownId,
		setDropDownId,
		sort,
		setSort,
	} = useOutletContext();

	const isOpen = dropDownId == "filter";

	const toggle = () => {
		if (isOpen) {
			setDropDownId(null);
		} else {
			setDropDownId("filter");
		}
	};

	return (
		<>
			<div className="filterContainer">
				<div className="filterButton" onClick={toggle}>
					Filter{" "}
					<div className={`filterArrow ${isOpen ? "filterOpen" : ""}`}>^</div>
				</div>
				<div className="filterDropDownContainer">
					<div className={`filterDropDown ${isOpen ? "filterOpen" : ""}`}>
						<div className="">
							<input type="checkbox" /> <label htmlFor="">Good habits</label>
						</div>
						<div className="">
							<input type="checkbox" /> <label htmlFor="">Bad habits</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export { HabitFilter };

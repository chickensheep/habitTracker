import "../styles/HabitSort.css";

import { useOutletContext } from "react-router-dom";

const HabitSort = (props) => {
	const {
		selectedHabitCard,
		setSelectedHabitCard,
		dropDownId,
		setDropDownId,
		sort,
		setSort,
	} = useOutletContext();

	const isOpen = dropDownId == "sort";

	const toggle = () => {
		if (isOpen) {
			setDropDownId(null);
		} else {
			setDropDownId("sort");
		}
	};

	const sortChange = (e) => {
		let sortSelect = e.target.value;

		if (sortSelect == "PointsHigh") {
			let temp = [...props.displayHabitList];
			temp.sort((a, b) => b.points - a.points);
			props.setDisplayHabitlist(temp);
		} else if (sortSelect == "PointsLow") {
			let temp = [...props.displayHabitList];
			temp.sort((a, b) => a.points - b.points);
			props.setDisplayHabitlist(temp);
		} else if (sortSelect == "NameA") {
			let temp = [...props.displayHabitList];
			temp.sort((a, b) => a.habit.localeCompare(b.habit));
			props.setDisplayHabitlist(temp);
		} else if (sortSelect == "NameZ") {
			let temp = [...props.displayHabitList];
			temp.sort((a, b) => b.habit.localeCompare(a.habit));
			props.setDisplayHabitlist(temp);
		}

		setSort(sortSelect);
	};

	return (
		<>
			<div className="sortContainer">
				<div className="sortButton" onClick={toggle}>
					Sort by{" "}
					<div className={`sortArrow ${isOpen ? "sortOpen" : ""}`}>^</div>
				</div>
				<div className="sortDropDownContainer">
					<div className={`sortDropDown ${isOpen ? "sortOpen" : ""}`}>
						<div className="pointsHighDiv">
							<input
								type="radio"
								id="pointsHigh"
								name="sort"
								value="PointsHigh"
								onChange={(e) => {
									sortChange(e);
								}}
								checked={sort == "PointsHigh"}
							/>
							<label htmlFor="pointsHigh">Points (highest to lowest)</label>
						</div>
						<div className="pointsLowDiv">
							<input
								type="radio"
								id="pointsLow"
								name="sort"
								value="PointsLow"
								onChange={(e) => {
									sortChange(e);
								}}
								checked={sort == "PointsLow"}
							/>
							<label htmlFor="pointsLow">Points (lowest to highest)</label>
						</div>
						<div className="nameADiv">
							<input
								type="radio"
								id="nameA"
								name="sort"
								value="NameA"
								onChange={(e) => {
									sortChange(e);
								}}
								checked={sort == "NameA"}
							/>
							<label htmlFor="nameA">Name (A to Z)</label>
						</div>
						<div className="nameZDiv">
							<input
								type="radio"
								id="nameZ"
								name="sort"
								value="NameZ"
								onChange={(e) => {
									sortChange(e);
								}}
								checked={sort == "NameZ"}
							/>
							<label htmlFor="nameZ">Name (Z to A)</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export { HabitSort };

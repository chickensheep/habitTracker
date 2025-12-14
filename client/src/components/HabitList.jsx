import { Outlet, Link } from "react-router-dom";
import "../styles/HabitList.css";
import { Loading } from "../assets/Loading";

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { HabitListDropDown } from "./HabitListDropDown";
import { HabitFilter } from "./HabitFilter";
import { HabitSort } from "./HabitSort";

function HabitList() {
	const {
		selectedHabitCard,
		setSelectedHabitCard,
		dropDownId,
		setDropDownId,
		sort,
		setSort,
	} = useOutletContext();

	const [habitList, setHabitList] = useState([]);
	const [displayHabitList, setDisplayHabitlist] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function loadHabits() {
			setLoading(true);
			const res = await fetch("http://localhost:3000/habits");
			const data = await res.json();
			setHabitList(data);

			setLoading(false);

			if (sort == "PointsHigh") {
				let temp = [...data];
				temp.sort((a, b) => b.points - a.points);
				setDisplayHabitlist(temp);
			} else if (sort == "PointsLow") {
				let temp = [...data];
				temp.sort((a, b) => a.points - b.points);
				setDisplayHabitlist(temp);
			} else if (sort == "NameA") {
				let temp = [...data];
				temp.sort((a, b) => a.habit.localeCompare(b.habit));
				setDisplayHabitlist(temp);
			} else if (sort == "NameZ") {
				let temp = [...data];
				temp.sort((a, b) => b.habit.localeCompare(a.habit));
				setDisplayHabitlist(temp);
			} else {
				setDisplayHabitlist(data);
			}
		}

		loadHabits();

		setDropDownId(null);
	}, []);

	return (
		<>
			<div className="habitContainer">
				<div className="habitHEADER">
					<div className="habitHeader">Habits</div>
					<Link to="HabitAdd">
						<div className="addHabitButton">+ Habit</div>
					</Link>
				</div>
				<div className="habitFilterAndSort">
					<HabitFilter />
					<HabitSort
						displayHabitList={displayHabitList}
						setDisplayHabitlist={setDisplayHabitlist}
					/>
				</div>

				{loading && (
					<div className="loadingDiv2">
						<Loading />
					</div>
				)}

				<div className="habitCards">
					{displayHabitList.map((habit) => (
						<div
							className={`habitCard ${habit.points > 0 ? "good" : "bad"}`}
							onClick={() => {
								setSelectedHabitCard(habit);
							}}
							key={habit}
						>
							<div>
								<div
									className={`habitTop ${habit.points > 0 ? "good" : "bad"}`}
								>
									<div className="habitTitle">{habit.habit}</div>
									<HabitListDropDown
										habit={habit}
										setHabitList={setHabitList}
										setDisplayHabitlist={setDisplayHabitlist}
									/>
								</div>
								<div className="habitBottom">
									<div className="habitCategory">{habit.category}</div>
									<div className="habitPoints">{habit.points}</div>
									<div className="habitFrequency">{habit.frequency}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export { HabitList };

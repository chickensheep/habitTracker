import "../styles/CalanderHabit.css";
import { Loading } from "../assets/Loading.jsx";

import { useEffect, useState } from "react";

const CalanderHabit = (props) => {
	const [habits, setHabits] = useState([]);
	const [loading, setLoading] = useState(false);
	const [reflection, setReflection] = useState("");
	const [totalPoints, setTotalPoints] = useState(0);
	const [goodHabits, setGoodHabits] = useState(0);
	const [badHabits, setBadHabits] = useState(0);

	const loadCalanderHabit = async () => {
		setLoading(true);
		const res = await fetch(
			"https://habittracker-server-iupw.onrender.com/calander/habit",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					date: props.displayDate,
					month: props.displayMonth,
					year: props.displayYear,
				}),
			}
		);

		const {
			completed,
			newHabits,
			reflection,
			totalPoints,
			goodHabits,
			badHabits,
		} = await res.json();

		for (let i = 0; i < newHabits.length; i++) {
			newHabits[i].done = completed.includes(newHabits[i].habitid);
		}
		newHabits.sort((a, b) => a.done - b.done);

		setLoading(false);
		setHabits(newHabits);
		setReflection(reflection);
		setTotalPoints(totalPoints);
		setGoodHabits(goodHabits);
		setBadHabits(badHabits);
	};

	useEffect(() => {
		loadCalanderHabit();
	}, [props.displayDate, props.displayMonth, props.displayYear]);

	const handleDoneChange = async (e, habitid, points) => {
		setLoading(true);
		const done = e.target.checked;

		await fetch(
			"https://habittracker-server-iupw.onrender.com/calander/habit/done",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					date: props.displayDate,
					month: props.displayMonth,
					year: props.displayYear,
					done: done,
					id: habitid,
					points: points,
				}),
			}
		);

		loadCalanderHabit();
	};

	const reflectionChange = (e) => {
		const bla = e.target.value;
		setReflection(bla);
	};

	const updateReflection = async () => {
		const res = await fetch(
			"https://habittracker-server-iupw.onrender.com/calander/habit/reflection",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					date: props.displayDate,
					month: props.displayMonth,
					year: props.displayYear,
					reflection: reflection,
				}),
			}
		);
	};

	return (
		<>
			<div className="calanderHabitContainer">
				<hr />
				<div className="calanderHabitHeader">
					Habits on {props.displayDate}-{props.displayMonth}-{props.displayYear}
				</div>

				{loading && (
					<div className="loadingDiv">
						<Loading />
					</div>
				)}

				<div className={`${loading ? "getOut" : ""}`}>
					<table className="habitsTable">
						<thead>
							<tr>
								<th className="habitTableHeader">Habit</th>
								<th className="habitTableHeader">Category</th>
								<th className="habitTableHeader">Points</th>
								<th className="habitTableHeader">Frequency</th>
								<th className="habitTableHeader">Done</th>
							</tr>
						</thead>
						<tbody>
							{habits.map((habit, index) => (
								<tr className={`${index % 2 == 0 ? "even" : "odd"}`}>
									<td className="habitTableBody">{habit.habit}</td>
									<td className="habitTableBody">{habit.category}</td>
									<td className="habitTableBody">{habit.points}</td>
									<td className="habitTableBody">{habit.frequency}</td>
									<td className="habitTableBody">
										<input
											type="checkbox"
											checked={habit.done}
											onChange={(e) => {
												handleDoneChange(e, habit.habitid, habit.points);
											}}
											className="doneCheckbox"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="reflectionHeader">Reflection</div>
					<textarea
						name=""
						className="reflectionTextArea"
						onChange={(e) => {
							reflectionChange(e);
						}}
						onBlur={() => {
							updateReflection();
						}}
						onKeyDown={(e) => {
							if (e.key == "Enter") {
								updateReflection();
							}
						}}
						value={reflection}
					></textarea>

					<div className="summaryHeader">Summary</div>
					<div className="summaryTableContainer">
						<table className="summaryTable">
							<thead>
								<tr>
									<th className="summaryTableHead">Total Points</th>
									<th className="summaryTableHead">Good Habits</th>
									<th className="summaryTableHead">Bad Habits</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="summaryTableBody">{totalPoints}</td>
									<td className="summaryTableBody">{goodHabits}</td>
									<td className="summaryTableBody">{badHabits}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export { CalanderHabit };

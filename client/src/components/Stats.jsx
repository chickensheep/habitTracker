import "../styles/Stats.css";

import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Loading } from "../assets/Loading";

const Stats = () => {
	const today = new Date();
	const nowDate = today.getDate();
	const nowMonth = today.getMonth() + 1;
	const nowYear = today.getFullYear();

	const [displayMonth, setDisplayMonth] = useState(nowMonth);
	const [displayYear, setDisplayYear] = useState(nowYear);

	const [date, setDate] = useState([]);
	const [totalPoints, setTotalPoints] = useState([]);
	const [badHabits, setBadHabits] = useState([]);
	const [goodHabits, setGoodHabits] = useState([]);

	const [loading, setLoading] = useState(false);
	const [group, setGroup] = useState("groupDay");

	const [totalPointsColour, setTotalPointsColour] = useState("blue");
	const [goodHabitsColour, setGoodHabitsColour] = useState("green");
	const [badHabitsColour, setBadHabitsColour] = useState("red");

	const displayMonthName = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const prevMonth = () => {
		setDisplayMonth((displayMonth) => {
			if (displayMonth - 1 == 0) {
				setDisplayYear((displayYear) => displayYear - 1);
				return 12;
			} else {
				return displayMonth - 1;
			}
		});
	};

	const nextMonth = () => {
		setDisplayMonth((displayMonth) => {
			if (displayMonth + 1 == 13) {
				setDisplayYear((displayYear) => displayYear + 1);
				return 1;
			} else {
				return displayMonth + 1;
			}
		});
	};

	const prevYear = () => {
		setDisplayYear((prev) => prev - 1);
	};

	const nextYear = () => {
		setDisplayYear((prev) => prev + 1);
	};

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			const res = await fetch(
				"https://habittracker-server-iupw.onrender.com/stats",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						month: displayMonth,
						year: displayYear,
					}),
				}
			);

			const {
				date,
				totalPoints,
				goodHabits,
				badHabits,
				month,
				monthTotalPoints,
				monthGoodHabits,
				monthBadHabits,
			} = await res.json();

			setLoading(false);
			if (group == "groupDay") {
				setDate(date);
				setTotalPoints(totalPoints);
				setGoodHabits(goodHabits);
				setBadHabits(badHabits);
			} else {
				setDate(month);
				setTotalPoints(monthTotalPoints);
				setGoodHabits(monthGoodHabits);
				setBadHabits(monthBadHabits);
			}
		};

		load();
	}, [displayMonth, displayYear, group]);

	const handleGroupChange = (e) => {
		setGroup(e.target.value);
	};

	return (
		<>
			<div className="statsContainer">
				<div className="statsHeader">Stats</div>
				<div className="bla">
					<div className="displayMonthHeader">
						<div
							className="statsPrevButton"
							onClick={() => {
								if (group == "groupDay") {
									prevMonth();
								} else {
									prevYear();
								}
							}}
						>
							&lt;
						</div>
						{group == "groupDay" && (
							<div>{displayMonthName[displayMonth - 1]}</div>
						)}{" "}
						{displayYear}
						<div
							className="statsNextButton"
							onClick={() => {
								if (group == "groupDay") {
									nextMonth();
								} else {
									nextYear();
								}
							}}
						>
							>
						</div>
					</div>
				</div>
				<div className="statsGroupBiggerContainer">
					<div className="statsGroupContainer">
						<div>Group by:</div>
						<input
							type="radio"
							name="statsGroup"
							id="statsGroupDay"
							value="groupDay"
							onChange={handleGroupChange}
							checked={group == "groupDay"}
						/>
						<label htmlFor="statsGroupDay">Day</label>
						<input
							type="radio"
							name="statsGroup"
							id="statsGroupMonth"
							value="groupMonth"
							onChange={handleGroupChange}
							checked={group == "groupMonth"}
						/>
						<label htmlFor="statsGroupMonth">Month</label>
					</div>
				</div>
				<div className="colourBigger">
					<div className="colour">
						<div>
							<input
								type="color"
								id="totalPointsColour"
								onChange={(e) => {
									setTotalPointsColour(e.target.value);
								}}
								value={totalPointsColour}
							/>{" "}
							<label htmlFor="totalPointsColour">Total Points</label>
						</div>
						<div>
							<input
								type="color"
								id="goodHabitsColour"
								onChange={(e) => {
									setGoodHabitsColour(e.target.value);
								}}
								value={goodHabitsColour}
							/>{" "}
							<label htmlFor="goodHabitsColour">Good Habits</label>
						</div>
						<div>
							<input
								type="color"
								id="badHabitsColour"
								onChange={(e) => {
									setBadHabitsColour(e.target.value);
								}}
								value={badHabitsColour}
							/>{" "}
							<label htmlFor="badHabitsColour">Bad Points</label>
						</div>
					</div>
				</div>
				{loading && (
					<div className="statsLoadingBiggerDiv">
						<div className="statsLoadingDiv">
							<Loading />
						</div>
					</div>
				)}
				{!loading && (
					<Line
						data={{
							labels: date,
							datasets: [
								{
									label: "Total Points",
									data: totalPoints,
									borderColor: totalPointsColour,
									backgroundColor: totalPointsColour,
								},
								{
									label: "Good Habits",
									data: goodHabits,
									borderColor: goodHabitsColour,
									backgroundColor: goodHabitsColour,
								},
								{
									label: "Bad Habits",
									data: badHabits,
									borderColor: badHabitsColour,
									backgroundColor: badHabitsColour,
								},
							],
						}}
					/>
				)}
			</div>
		</>
	);
};

export { Stats };

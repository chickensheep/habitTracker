import "../styles/HabitAdd.css";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const HabitAdd = () => {
	const navigate = useNavigate();

	const [habitAdd, setHabitAdd] = useState();
	const [categoryAdd, setCategoryAdd] = useState("Study");
	const [pointsAdd, setPointsAdd] = useState();
	const [frequencyAdd, setFrequencyAdd] = useState("Daily");

	const [habitValid, setHabitValid] = useState();
	const [pointsValid, setPointsValid] = useState();
	const [isDisabled, setIsDisabled] = useState(true);

	const handleSubmitAdd = async (e) => {
		e.preventDefault();

		await fetch("https://habittracker-server-iupw.onrender.com/habits/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				habit: habitAdd,
				category: categoryAdd,
				points: pointsAdd,
				frequency: frequencyAdd,
			}),
		});

		navigate("/Habit");
	};

	const handleHabitChange = (e) => {
		if (e.target.value == "") {
			setHabitValid(0);
		} else {
			setHabitAdd(e.target.value);
			setHabitValid(1);
		}
	};

	const handlePointChange = (e) => {
		if (e.target.value == 0 || e.target.value % 1 != 0) {
			setPointsValid(0);
		} else {
			setPointsAdd(e.target.value);
			setPointsValid(1);
		}
	};

	useEffect(() => {
		if (habitValid * pointsValid == 1) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [habitValid, pointsValid]);

	return (
		<>
			<div className="habitAddContainer">
				<div className="habitAddHeader">Adding habit...</div>
				<form onSubmit={handleSubmitAdd} className="habitAddForm">
					<div className="habitAdd">
						<label htmlFor="habitAddInput">Habit: </label>
						<input
							type="text"
							id="habitAddInput"
							onChange={(e) => {
								handleHabitChange(e);
							}}
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									e.preventDefault();
								}
							}}
						/>
					</div>

					<div className="categoryAdd">
						<label htmlFor="categoryAddSelect">Category: </label>
						<select
							id="categoryAddSelect"
							onChange={(e) => {
								setCategoryAdd(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									e.preventDefault();
								}
							}}
						>
							<option value="Study">Study</option>
							<option value="Work">Work</option>
							<option value="Health">Health</option>
							<option value="Hygiene">Hygiene</option>
							<option value="Finance">Finance</option>
							<option value="Social">Social</option>
							<option value="Digital">Digital</option>
							<option value="Hobbies">Hobbies</option>
							<option value="Others">Others</option>
						</select>
					</div>

					<div className="pointsAdd">
						<label htmlFor="pointsAddInput">Points: </label>
						<input
							type="number"
							id="pointsAddInput"
							onChange={(e) => {
								handlePointChange(e);
							}}
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									e.preventDefault();
								}
							}}
						/>
					</div>

					<div className="frequencyAdd">
						<label htmlFor="frequencyAddSelect">Frequency: </label>
						<select
							id="frequencyAddSelect"
							onChange={(e) => {
								setFrequencyAdd(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									e.preventDefault();
								}
							}}
						>
							<option value="Daily">Daily</option>
							<option value="Weekly">Weekly</option>
							<option value="Monthly">Monthly</option>
						</select>
					</div>

					<div className="habitAddBottom">
						<Link to="/Habit">
							<button>Cancel</button>
						</Link>
						<input
							type="submit"
							value="Confirm"
							className="habitAddSubmit"
							disabled={isDisabled}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export { HabitAdd };

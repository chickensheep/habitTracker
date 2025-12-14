import { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import "../styles/HabitCard.css";

const HabitCard = () => {
	const { selectedHabitCard, setSelectedHabitCard } = useOutletContext();

	const [habitEdit, setHabitEdit] = useState(selectedHabitCard.habit);
	const [categoryEdit, setCategoryEdit] = useState(selectedHabitCard.category);
	const [pointsEdit, setPointsEdit] = useState(selectedHabitCard.points);
	const [frequencyEdit, setFrequencyEdit] = useState(
		selectedHabitCard.frequency
	);

	const pointsOriginal = selectedHabitCard.points;

	const [isDisabled, setIsDisabled] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await fetch("https://habittracker-server-iupw.onrender.com/habits/edit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				habitid: selectedHabitCard.habitid,
				habit: habitEdit,
				category: categoryEdit,
				points: pointsEdit,
				frequency: frequencyEdit,
				pointsOriginal: pointsOriginal,
			}),
		});

		navigate("/Habit");
	};

	const handlePointChange = (e) => {
		const value = e.target.value;

		if (value == 0 || value % 1 != 0) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
			setPointsEdit(value);
		}
	};

	return (
		<>
			<div className="habitCardContainer">
				<div className="habitCardHeader">
					Editing "{selectedHabitCard.habit}"...
				</div>
				<form onSubmit={handleSubmit} className="habitEditForm">
					<div className="habitEdit">
						<label htmlFor="habitEditInput">Habit: </label>
						<input
							type="text"
							defaultValue={selectedHabitCard.habit}
							id="habitEditInput"
							onChange={(e) => {
								setHabitEdit(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									e.preventDefault();
								}
							}}
						/>
					</div>

					<div className="categoryEdit">
						<label htmlFor="categoryEditSelect">Category: </label>
						<select
							defaultValue={selectedHabitCard.category}
							id="categoryEditSelect"
							onChange={(e) => {
								setCategoryEdit(e.target.value);
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

					<div className="pointsEdit">
						<label htmlFor="pointsEditInput">Points: </label>
						<input
							type="number"
							defaultValue={selectedHabitCard.points}
							id="pointsEditInput"
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

					<div className="frequencyEdit">
						<label htmlFor="frequencyEditSelect">Frequency: </label>
						<select
							id="frequencyEditSelect"
							defaultValue={selectedHabitCard.frequency}
							onChange={(e) => {
								setFrequencyEdit(e.target.value);
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
					<div className="habitCardBottom">
						<Link to="/Habit">
							<button>Cancel</button>
						</Link>

						<input
							type="submit"
							value="Confirm"
							className="habitEditSubmit"
							disabled={isDisabled}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export { HabitCard };

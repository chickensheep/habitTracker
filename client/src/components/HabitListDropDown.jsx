import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/HabitListDropDown.css";
import { useOutletContext, useNavigate } from "react-router-dom";

const HabitListDropDown = (props) => {
	const {
		selectedHabitCard,
		setSelectedHabitCard,
		dropDownId,
		setDropDownId,
		sort,
		setSort,
	} = useOutletContext();

	const isOpen = dropDownId == props.habit.habitid;

	const toggle = () => {
		if (isOpen) {
			setDropDownId(null);
		} else {
			setDropDownId(props.habit.habitid);
		}
	};

	const dialogRef = useRef();

	const showdDeleteDialog = () => {
		dialogRef.current.showModal();
	};

	const cancelDeleteDialog = () => {
		dialogRef.current.close();
	};

	const navigate = useNavigate();

	const confirmDeleteDialog = async () => {
		await fetch("https://habittracker-server-iupw.onrender.com/habits/delete", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				habitid: props.habit.habitid,
				points: props.habit.points,
			}),
		});

		dialogRef.current.close();

		async function loadHabits() {
			const res = await fetch(
				"https://habittracker-server-iupw.onrender.com/habits"
			);
			const data = await res.json();
			props.setHabitList(data);

			if (sort == "PointsHigh") {
				let temp = [...data];
				temp.sort((a, b) => b.points - a.points);
				props.setDisplayHabitlist(temp);
			} else if (sort == "PointsLow") {
				let temp = [...data];
				temp.sort((a, b) => a.points - b.points);
				props.setDisplayHabitlist(temp);
			} else if (sort == "NameA") {
				let temp = [...data];
				temp.sort((a, b) => a.habit.localeCompare(b.habit));
				props.setDisplayHabitlist(temp);
			} else if (sort == "NameZ") {
				let temp = [...data];
				temp.sort((a, b) => b.habit.localeCompare(a.habit));
				props.setDisplayHabitlist(temp);
			} else {
				props.setDisplayHabitlist(data);
			}
		}

		loadHabits();
	};

	return (
		<>
			<div className="dropDownContainer">
				<div
					onClick={() => {
						toggle();
					}}
					className={`dropDownButton ${isOpen ? "open" : ""}`}
				>
					⋮
				</div>
				{
					<div className={`dropDown ${isOpen ? "open" : ""}`}>
						<Link to="HabitCard" onClick={setSelectedHabitCard(props.habit)}>
							<div className="editButton">Edit</div>
						</Link>
						<div onClick={showdDeleteDialog} className="deleteButton">
							Delete
						</div>
					</div>
				}
			</div>
			<dialog className="deleteDialog" ref={dialogRef}>
				Are you sure you want to delete <b>"{props.habit.habit}"</b>
				<div className="deleteButtons">
					<button onClick={cancelDeleteDialog}>Cancel</button>
					<button onClick={confirmDeleteDialog}>Confirm</button>
				</div>
			</dialog>
		</>
	);
};

export { HabitListDropDown };

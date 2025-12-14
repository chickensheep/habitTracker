import { useState, useEffect, useRef } from "react";
import "../styles/Calander.css";

import { CalanderHabit } from "./CalanderHabit";

function Calander() {
	// get todays date

	const today = new Date();
	const nowDate = today.getDate();
	const nowMonth = today.getMonth() + 1;
	const nowYear = today.getFullYear();
	const nowDay = today.getDay();

	// get display month and year

	const [displayMonth, setDisplayMonth] = useState(nowMonth);
	const [displayYear, setDisplayYear] = useState(nowYear);
	const [displayDate, setDisplayDate] = useState(nowDate);

	// get number of days

	const getNumberOfDays = () => {
		const days = new Date(displayYear, displayMonth, 0).getDate();

		return days;
	};

	const numberOfDays = getNumberOfDays();

	// get first day

	const getFirstDay = () => {
		let firstDay = new Date(displayYear, displayMonth - 1, 1).getDay();

		if (firstDay == 0) {
			firstDay = 7;
		}

		return firstDay;
	};

	const firstDay = getFirstDay();

	//create dateArray

	const createDateArray = (firstDay, numberOfDays) => {
		let dateArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

		for (let i = 0; i < firstDay - 1; i++) {
			dateArray.push(null);
		}

		for (let i = 0; i < numberOfDays; i++) {
			dateArray.push(i + 1);
		}

		return dateArray;
	};

	let dateArray = createDateArray(firstDay, numberOfDays);

	// change displayMonth

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

	// get displayMonthName

	let displayMonthName;

	if (displayMonth == 1) {
		displayMonthName = "January";
	} else if (displayMonth == 2) {
		displayMonthName = "February";
	} else if (displayMonth == 3) {
		displayMonthName = "March";
	} else if (displayMonth == 4) {
		displayMonthName = "April";
	} else if (displayMonth == 5) {
		displayMonthName = "May";
	} else if (displayMonth == 6) {
		displayMonthName = "June";
	} else if (displayMonth == 7) {
		displayMonthName = "July";
	} else if (displayMonth == 8) {
		displayMonthName = "August";
	} else if (displayMonth == 9) {
		displayMonthName = "September";
	} else if (displayMonth == 10) {
		displayMonthName = "October";
	} else if (displayMonth == 11) {
		displayMonthName = "November";
	} else if (displayMonth == 12) {
		displayMonthName = "December";
	}

	// return

	return (
		<>
			<div className="calanderContainer">
				<div className="calanderHeader">Calander</div>
				<div className="displayHeader">
					<div className="previousButton" onClick={prevMonth}>
						&lt;
					</div>
					{displayMonthName} {displayYear}
					<div className="nextButton" onClick={nextMonth}>
						>
					</div>
				</div>
				<div className="dateFrame">
					{dateArray.map((date) => (
						<div
							className={` ${displayDate == date ? "display" : ""}  ${
								!isNaN(Number(date)) && date != null
									? "dateBox"
									: "dateBoxEmpty"
							} ${isNaN(Number(date)) ? "dateBoxHeader" : ""}
							`}
							onClick={() => {
								if (!isNaN(Number(date)) && date != null) {
									setDisplayDate(date);
								}
							}}
						>
							<div
								className={`${
									displayMonth == nowMonth &&
									displayYear == nowYear &&
									date == nowDate
										? "today"
										: ""
								}`}
							>
								{date}
							</div>
						</div>
					))}
				</div>
			</div>
			<CalanderHabit
				displayDate={displayDate}
				displayMonth={displayMonth}
				displayYear={displayYear}
			/>
		</>
	);
}

export { Calander };

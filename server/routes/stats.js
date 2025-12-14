import express from "express";
const statsRouter = express.Router();
import { pool } from "../db/pool.js";

statsRouter.post("/", async (req, res) => {
	const content = req.body;

	const result = await pool.query(
		"SELECT * FROM history WHERE month=$1 AND year = $2",
		[content.month, content.year]
	);

	let numberOfDays = new Date(content.year, content.month, 0).getDate();

	let totalPoints = new Array(numberOfDays);
	let goodHabits = new Array(numberOfDays);
	let badHabits = new Array(numberOfDays);

	let current = 0;

	for (let i = 0; i < numberOfDays; i++) {
		if (result.rows[current] == undefined) {
			totalPoints[i] = 0;
			goodHabits[i] = 0;
			badHabits[i] = 0;
		} else if (i + 1 == result.rows[current].date) {
			totalPoints[i] = result.rows[current].total_points;
			goodHabits[i] = result.rows[current].good_habits;
			badHabits[i] = result.rows[current].bad_habits;
			current = current + 1;
		} else {
			totalPoints[i] = 0;
			goodHabits[i] = 0;
			badHabits[i] = 0;
		}
	}

	const date = Array.from({ length: numberOfDays }, (bla, i) => i + 1);

	const result2 = await pool.query(
		"SELECT month, SUM(total_points) AS month_total_points,SUM(good_habits) AS month_good_habits, SUM(bad_habits) AS month_bad_habits FROM history WHERE year = $1 GROUP BY month ",
		[content.year]
	);

	let monthTotalPoints = new Array(12);
	let monthGoodHabits = new Array(12);
	let monthBadHabits = new Array(12);

	let currentMonth = 0;

	for (let i = 0; i < 12; i++) {
		if (result2.rows[currentMonth] == undefined) {
			monthTotalPoints[i] = 0;
			monthGoodHabits[i] = 0;
			monthBadHabits[i] = 0;
		} else if (result2.rows[currentMonth].month == i + 1) {
			monthTotalPoints[i] = result2.rows[currentMonth].month_total_points;
			monthGoodHabits[i] = result2.rows[currentMonth].month_good_habits;
			monthBadHabits[i] = result2.rows[currentMonth].month_bad_habits;
			currentMonth = currentMonth + 1;
		} else {
			monthTotalPoints[i] = 0;
			monthGoodHabits[i] = 0;
			monthBadHabits[i] = 0;
		}
	}

	const month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	res.json({
		date,
		totalPoints,
		goodHabits,
		badHabits,
		month,
		monthTotalPoints,
		monthGoodHabits,
		monthBadHabits,
	});
});

export { statsRouter };

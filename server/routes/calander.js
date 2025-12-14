import express from "express";
const calanderRouter = express.Router();
import { pool } from "../db/pool.js";

calanderRouter.post("/habit", async (req, res) => {
	const when = req.body;

	const result = await pool.query(
		"SELECT * FROM history WHERE  date = $1 AND month = $2 AND year=$3",
		[when.date, when.month, when.year]
	);

	let completed;
	let reflection;
	let totalPoints;
	let goodHabits;
	let badHabits;

	if (result.rows.length == 0) {
		completed = [];
		reflection = "";
		totalPoints = 0;
		goodHabits = 0;
		badHabits = 0;
	} else {
		completed = JSON.parse(result.rows[0].completed);
		reflection = result.rows[0].reflection;
		totalPoints = result.rows[0].total_points;
		goodHabits = result.rows[0].good_habits;
		badHabits = result.rows[0].bad_habits;
	}

	const result2 = await pool.query("SELECT * FROM habits");
	const newHabits = result2.rows;

	res.json({
		completed,
		newHabits,
		reflection,
		totalPoints,
		goodHabits,
		badHabits,
	});
});

calanderRouter.post("/habit/done", async (req, res) => {
	const content = req.body;

	let good;

	if (content.points > 0) {
		good = true;
	} else {
		good = false;
	}

	const result = await pool.query(
		"SELECT completed,total_points,good_habits,bad_habits FROM history WHERE  date = $1 AND month = $2 AND year=$3",
		[content.date, content.month, content.year]
	);

	if (result.rows.length == 0) {
		let completedString = `[${content.id}]`;

		if (good) {
			await pool.query(
				"INSERT INTO history (date,month,year,completed,reflection,total_points,good_habits,bad_habits) VALUES ($1,$2,$3,$4,'',$5,1,0)",
				[
					content.date,
					content.month,
					content.year,
					completedString,
					content.points,
				]
			);
		} else {
			await pool.query(
				"INSERT INTO history (date,month,year,completed,reflection,total_points,good_habits,bad_habits) VALUES ($1,$2,$3,$4,'',$5,0,1)",
				[
					content.date,
					content.month,
					content.year,
					completedString,
					content.points,
				]
			);
		}
	} else {
		let completed = JSON.parse(result.rows[0].completed);
		let totalPoints = JSON.parse(result.rows[0].total_points);
		let goodHabits = JSON.parse(result.rows[0].good_habits);
		let badHabits = JSON.parse(result.rows[0].bad_habits);

		if (content.done) {
			completed.push(content.id);
		} else {
			completed = completed.filter((x) => x != content.id);
		}

		completed = JSON.stringify(completed);

		if (content.done) {
			if (good) {
				await pool.query(
					"UPDATE history SET completed = $1,total_points=$2,good_habits=$3 WHERE date = $4 AND month = $5 AND year=$6",
					[
						completed,
						totalPoints + content.points,
						goodHabits + 1,
						content.date,
						content.month,
						content.year,
					]
				);
			} else {
				await pool.query(
					"UPDATE history SET completed = $1,total_points=$2,bad_habits=$3 WHERE date = $4 AND month = $5 AND year=$6",
					[
						completed,
						totalPoints + content.points,
						badHabits + 1,
						content.date,
						content.month,
						content.year,
					]
				);
			}
		} else {
			if (good) {
				await pool.query(
					"UPDATE history SET completed = $1,total_points=$2,good_habits=$3 WHERE date = $4 AND month = $5 AND year=$6",
					[
						completed,
						totalPoints - content.points,
						goodHabits - 1,
						content.date,
						content.month,
						content.year,
					]
				);
			} else {
				await pool.query(
					"UPDATE history SET completed = $1,total_points=$2,bad_habits=$3 WHERE date = $4 AND month = $5 AND year=$6",
					[
						completed,
						totalPoints - content.points,
						badHabits - 1,
						content.date,
						content.month,
						content.year,
					]
				);
			}
		}
	}

	res.json("bla");
});

calanderRouter.post("/habit/reflection", async (req, res) => {
	const content = req.body;

	const result = await pool.query(
		"SELECT completed FROM history WHERE  date = $1 AND month = $2 AND year=$3",
		[content.date, content.month, content.year]
	);

	if (result.rows.length == 0) {
		await pool.query(
			"INSERT INTO history (date,month,year,completed,reflection) VALUES ($1,$2,$3,'[]',$4)",
			[content.date, content.month, content.year, content.reflection]
		);
	} else {
		await pool.query(
			"UPDATE history SET reflection = $1 WHERE date = $2 AND month = $3 AND year=$4",
			[content.reflection, content.date, content.month, content.year]
		);
	}

	res.json("gyat");
});

export { calanderRouter };

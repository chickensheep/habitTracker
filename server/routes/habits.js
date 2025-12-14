import express from "express";
const habitRouter = express.Router();
import { pool } from "../db/pool.js";

habitRouter.get("/", async (req, res) => {
	const result = await pool.query("SELECT * FROM habits");
	res.json(result.rows);
});

habitRouter.post("/edit", async (req, res) => {
	const editHabit = req.body;

	if (editHabit.points == editHabit.pointsOriginal) {
		await pool.query(
			"UPDATE habits SET habit = $1, category = $2, points = $3, frequency = $4 WHERE habitid= $5",
			[
				editHabit.habit,
				editHabit.category,
				editHabit.points,
				editHabit.frequency,
				editHabit.habitid,
			]
		);
	} else {
		await pool.query(
			"UPDATE habits SET habit = $1, category = $2, points = $3, frequency = $4 WHERE habitid= $5",
			[
				editHabit.habit,
				editHabit.category,
				editHabit.points,
				editHabit.frequency,
				editHabit.habitid,
			]
		);

		const bla = await pool.query(" SELECT historyid, completed FROM history");
		const lol = bla.rows;

		const involved = lol.filter((lol) =>
			JSON.parse(lol.completed).includes(editHabit.habitid)
		);

		const involvedId = involved.map((element) => element.historyid);

		await pool.query(
			"UPDATE history SET total_points=total_points+$1 WHERE historyid = ANY($2)",
			[editHabit.points - editHabit.pointsOriginal, involvedId]
		);
	}

	console.log("edit done");

	res.json("u see tis u gay :o");
});

habitRouter.post("/add", async (req, res) => {
	const addHabit = req.body;

	await pool.query(
		"INSERT INTO habits (habit,category,points,frequency) VALUES ($1,$2,$3,$4)",
		[addHabit.habit, addHabit.category, addHabit.points, addHabit.frequency]
	);

	res.json("67");
});

habitRouter.post("/delete", async (req, res) => {
	const deletehabitid = req.body.habitid;

	const points = req.body.points;

	await pool.query("DELETE FROM habits WHERE habitid= $1", [deletehabitid]);

	const bla = await pool.query("SELECT historyid, completed FROM history");
	const lol = bla.rows;

	const involved = lol.filter((lol) =>
		JSON.parse(lol.completed).includes(deletehabitid)
	);

	const involvedId = involved.map((element) => element.historyid);

	if (points > 0) {
		await pool.query(
			"UPDATE history SET total_points=total_points-$1, good_habits=good_habits-1 WHERE historyid = ANY($2)",
			[points, involvedId]
		);
	} else {
		await pool.query(
			"UPDATE history SET total_points=total_points-$1, bad_habits=bad_habits-1 WHERE historyid = ANY($2)",
			[points, involvedId]
		);
	}

	res.json("D:");
});

export { habitRouter };

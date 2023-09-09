const express = require('express')
const cors = require('cors')
const app = express()
const Pool = require('./db')

app.use(cors());
app.use(express.json());

app.post('/add-exercise', async(req,res) => {
    try {
        const { exercise } = req.body;
        const new_exercise = await Pool.query("INSERT INTO exercises (name) VALUES($1) RETURNING *", [exercise]);
        res.json(new_exercise.rows[0]);
        
    } catch (error) {
        console.error(error.message)
    }

})

app.get('/log-exercise', async(req,res) => {
    try {
        const exercises = await Pool.query("SELECT * FROM exercises")
        res.json(exercises.rows);
    } catch (error) {
        console.error(error.message)
    }
})

app.post('/log-exercise', async(req,res) => {
    try {
        const logData = req.body;
        const exercise_id = logData.exercise_id;
        const muscle = logData.muscle;
        const difficulty = logData.difficulty;
        const repetitions = logData.repetitions;
        const sets = logData.sets;
        const notes = logData.notes;
        await Pool.query(
            "INSERT INTO logs (exercise_id, muscle, difficulty, repetitions, sets, notes) VALUES ($1, $2, $3, $4, $5, $6)",
            [exercise_id, muscle, difficulty, repetitions, sets, notes]
        );

    } catch (error) {
        console.error(error.message);
    }
})

app.get('/', async(req,res) => {
    try {
        const query = `
          SELECT
            exercises.name AS exercise_name,
            logs.log_id,
            logs.muscle,
            logs.difficulty,
            logs.repetitions,
            logs.sets,
            logs.notes,
            logs.created_at
          FROM
            exercises
          INNER JOIN
            logs
          ON
            exercises.exercise_id = logs.exercise_id
        `;
    
        const result = await Pool.query(query);
    
        res.json(result.rows);
      }
      catch(error){
        console.error(error.message);
      }
})

app.put('/:log_id', async(req,res) => {

    try {
        const { log_id } = req.params;
        const { muscle, difficulty, repetitions, sets, notes } = req.body;

        await Pool.query(
            `
            UPDATE logs
            SET muscle = $1, difficulty = $2, repetitions = $3, sets = $4, notes = $5
            WHERE log_id = $6
            `,
            [muscle, difficulty, repetitions, sets, notes, log_id]
        );
        res.send("yes")
    } catch (error) {
        console.error(error.message);
    }

})

app.delete('/:log_id', async(req,res) => {
    try {
        const { log_id } = req.params;
        await Pool.query("DELETE FROM logs WHERE log_id = $1",
        [log_id]
        );
        res.json("log was deleted") // important to send response for row to be deleted immediately
    } catch (error) {
        console.error(error.message);
    }
})


app.all('*', (req,res) => {
    res.status(404).send('resources not found')
})

app.listen(5000, () => {
    console.log(("Server is running on port 5000"))
})
import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!body.daily_exercises || body.target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExercises = body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = body.target;

  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some(h => typeof h !== 'number') ||
    typeof target !== 'number'
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(dailyExercises, target);
  return res.json(result);

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
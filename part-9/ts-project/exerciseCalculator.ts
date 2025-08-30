type Result = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target:number): Result => {
    let periodLength = dailyHours.length;
    let trainingDays = dailyHours.filter(h => h>0).length;
    //success
    let average = dailyHours.reduce((acc, curVal) => acc + curVal, 0)/periodLength;
    const success = (average >= target)

    //rating
    let rating = 1
    let ratingDescription = `you need to improve`;

    if(average>=target){
        rating = 3;
        ratingDescription = `great job, target meet`
    }else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
try {
  const [, , targetArg, ...hoursArgs] = process.argv;
  if (!targetArg || hoursArgs.length === 0) {
    throw new Error("Please provide target and daily exercise hours");
  }

  const target = Number(targetArg);
  const dailyHours = hoursArgs.map(h => Number(h));

  if (isNaN(target) || dailyHours.some(h => isNaN(h))) {
    throw new Error("All arguments must be numbers");
  }

  console.log(calculateExercises(dailyHours, target));
} catch (e: unknown) {
  let msg = "Something went wrong.";
  if (e instanceof Error) msg += " Error: " + e.message;
  console.log(msg);
}
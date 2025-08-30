
export const calculateBmi = (height:number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight range";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight range";
  } else {
    return "Obese range";
  }
};



// console.log(calculateBmi(180, 74))

try {
  const [,, hArg, wArg] = process.argv;
  if (!hArg || !wArg) {
    throw new Error("Please provide height and weight as arguments");
  }
  const height = Number(hArg);
  const weight = Number(wArg);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Arguments must be numbers");
  }

  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let msg = "Something went wrong.";
  if (e instanceof Error) msg += " Error: " + e.message;
  console.log(msg);
}
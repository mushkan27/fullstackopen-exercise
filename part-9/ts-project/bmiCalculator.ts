
const calculateBmi = (height:number, weight: number): string => {
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



console.log(calculateBmi(180, 74))
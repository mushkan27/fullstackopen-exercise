import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";


const App = () => {
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)

const handleGoodClick = () => {
  setGood(good + 1)
}
const handleNeutralClick = () => {
  setNeutral(neutral + 1)
}
const handleBadClick = () => {
  setBad(bad + 1)
}

const all = good + bad + neutral;
const average = all > 0 ? (good - bad) / all : 0;
const positive = all > 0 ? (good/all)*100 : 0;



  return <div>
<h1>give feedback</h1>
  <Button text = 'good' handleClick = {handleGoodClick}/>
  <Button text = 'neutral' handleClick = {handleNeutralClick}/>
  <Button text = 'bad' handleClick = {handleBadClick}/>

  <Statistics
   good={good} neutral = {neutral} bad={bad}
   all={all} average={average} positive={positive}
   />
  
  </div>;
};

export default App;

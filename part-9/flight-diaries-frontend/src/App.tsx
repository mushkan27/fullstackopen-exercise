import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diaryServices";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.map(diary => (
        <div key={diary.id} style={{ border: "1px solid gray", margin: "8px", padding: "8px" }}>
          <p><strong>{diary.date}</strong></p>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          {diary.comment && <p>Comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;

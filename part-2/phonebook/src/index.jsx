import ReactDOM from "react-dom/client";
import App from "./App";

let phoneBook = [
    {name: 'Arto Hellas'}
]

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App phoneBook={phoneBook} />);

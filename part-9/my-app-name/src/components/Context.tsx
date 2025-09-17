import type { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps {
    parts: CoursePart[]
}

const Context = ({parts}: ContentProps) => {
    return (
        <div>
            {parts.map((part, index) => (
                <Part key={index} part={part}/>
            ))}
        </div>
    )
}

export default Context
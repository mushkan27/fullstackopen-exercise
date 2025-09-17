interface CoursePart {
    name: string;
    exerciseCount: number
}

interface ContentProps {
    parts: CoursePart[]
}

const Context = ({parts}: ContentProps) => {
    return (
        <div>
            {parts.map((part, index) => (
                <p key={index}>{part.name}{part.exerciseCount}</p>
            ))}
        </div>
    )
}

export default Context
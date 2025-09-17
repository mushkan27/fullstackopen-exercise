import type { CoursePart } from "../types";

interface PartProps {
    part: CoursePart
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: PartProps) => {
    switch(part.kind){
        case 'basic':
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong>{part.exerciseCount}
                    </p>
                    <p><em>{part.description}</em></p>
                </div>
            )

            case 'group' :
                return (
                    <div>
                        <p>
                            <strong>{part.name}</strong>{part.exerciseCount}
                        </p>
                        <p>Project exercises: {part.groupProjectCount}</p>
                    </div>
                )
            case 'background' :
                return (
                    <div>
                        <p>
                            <strong>{part.name}</strong>{part.exerciseCount}
                        </p>
                        <p><em>{part.description}</em></p>
                        <p>Submit to: {part.backgroundMaterial}</p>
                    </div>
                )

               default:
                return assertNever(part)
                
    }
}

export default Part
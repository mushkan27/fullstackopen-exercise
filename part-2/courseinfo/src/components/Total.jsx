

const Total = ({total}) => {
    const totalExercises = total.reduce((accum, curEle)=>{
        return accum + curEle.exercises
    }, 0)
    return <p><b>total of {totalExercises} exercises</b></p>
}

export default Total;
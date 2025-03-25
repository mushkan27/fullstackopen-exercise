import Part from "./Part";

const Content = ({parts}) => {
    return (
    <div>
       {parts.map((curEle)=>{
        return <Part key={curEle.id} name={curEle.name} exercises={curEle.exercises} />
       })}
    </div>
    )
}

export default Content;
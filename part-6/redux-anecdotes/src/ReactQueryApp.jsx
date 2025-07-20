import { useQuery } from "@tanstack/react-query"
import { getAll } from "./services/anecdotes"

const ReactQueryApp = () => {
const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
})
if(isLoading){
    return <div>Loading anecdotes...</div>
}
if(isError){
    return <div style={{color: 'red'}}>Anecdote service not available due to problems in server</div>
}

return (
    <div>
        <h1>Anecdotes</h1>
        {data.map(anecdote => (
        <div key={anecdote.id}>
          {anecdote.content} <strong>votes:</strong> {anecdote.votes}
        </div>
      ))}
    </div>
)

}

export default ReactQueryApp
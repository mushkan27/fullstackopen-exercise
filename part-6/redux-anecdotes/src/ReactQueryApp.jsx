import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAll, createNew, updateAnecdote } from "./services/anecdotes"
import { useDispatch } from "react-redux"
import { showNotification } from "./reducers/notificationReducer"
import Notification from "./components/Notification"

const ReactQueryApp = () => {
const queryClient = useQueryClient()
const dispatch = useDispatch()

const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
})

const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch(showNotification(`Anecdote added: "${newAnecdote.content}"`, 5))
    },
    onError: () => {
        dispatch(showNotification('Anecdote must be at least 5 characters long', 5))
    }
})

const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], 
        anecdotes.map(a =>
          a.id === updatedAnecdote.id ? updatedAnecdote : a
        )
      )
        dispatch(showNotification(`You voted: "${updatedAnecdote.content}"`, 5))
    }
})


const handleSubmit =(e) => {
    e.preventDefault()
    const content = e.target.anecdote.value;
    if(content.length < 5){
        alert('Anecdote must be at least 5 characters long')
        return 
    }
    newAnecdoteMutation.mutate(content)
    e.target.anecdote.value = ''
}

const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
}

if(isLoading){
    return <div>Loading anecdotes...</div>
}
if(isError){
    return <div style={{color: 'red'}}>Anecdote service not available due to problems in server</div>
}

return (
    <div>
        <h1>Anecdotes</h1> 

        <Notification /> <br />

    <form onSubmit={handleSubmit}>
        <input name="anecdote" placeholder="Write your anecdote"/>
        <button type="submit">Add Anecdote</button>
    </form>
    <br />

        {data.map(anecdote => (
        <div key={anecdote.id}>
          {anecdote.content} 

          <div>
            has <strong>{anecdote.votes}</strong> 
            <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            
        </div>
      ))}
    </div>
)

}

export default ReactQueryApp
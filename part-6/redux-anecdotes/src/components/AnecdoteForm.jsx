import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
    
      }    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>

    )
}

export default AnecdoteForm
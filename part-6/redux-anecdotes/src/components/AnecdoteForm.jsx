import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(showNotification(`You created '${content}'`, 5))
    
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
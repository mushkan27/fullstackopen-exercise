import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createNew } from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

       const newAnecdote = await createNew(content)
       dispatch(addAnecdote(newAnecdote))
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
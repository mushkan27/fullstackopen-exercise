import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateAnecdote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const updated = action.payload
      return state.map(anecdote =>
        anecdote.id === updated.id ? updated : anecdote
      )
    },    
    addAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await updateAnecdote(anecdote)
    dispatch(vote(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer
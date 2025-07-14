import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action){
      const id = action.payload
      return state.map(anecdote => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
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


export default anecdoteSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Welcome to the anecdote app!',
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        clearNotification(state, action){
            return ''
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, timeInSeconds = 5) => {
    return async dispatch => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, timeInSeconds * 1000)
    }
  }

export default notificationSlice.reducer
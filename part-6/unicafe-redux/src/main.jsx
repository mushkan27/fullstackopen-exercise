import React from 'react'
import { createRoot } from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  console.log(store.getState())

  const bad = () => {
    store.dispatch({
      type:'BAD'
    })
  }

  const ok = () => {
    store.dispatch({
      type:'OK'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)


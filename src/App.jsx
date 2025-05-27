import './App.css'
import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

      </div>
      <p className="read-the-docs">
        Just a test
      </p>
    </>
  )
}

export default App

// TODO Learning:
// Next step
// - Add AudioRecorder component to App.jsx to record audio and send to server.
// 0. Add Lovable mic streaming, audio output support.
//   Code hint: https://github.com/nashfn/talk-to-the-scribe/tree/main/src/components
// 1. Add OAI real time support. 
// 
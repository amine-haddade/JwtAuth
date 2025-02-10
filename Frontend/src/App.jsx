import { useState } from 'react'

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RouterComponents from './Routes/RouterComponents'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <RouterComponents/>
      </BrowserRouter>
    </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { StoreJwt } from './Components/Store/Store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={StoreJwt}>
    <App/>
    </Provider>
  </StrictMode>
)

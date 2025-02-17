import React from 'react'
import {Provider, useSelector} from "react-redux"
import { StoreAuth2 } from './store/Store'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Auth/Login'
import ListUsers from './ListUsers'
import Navbare from './Layout/Navbare'
import Home from './Home'
function App() {
  const user=useSelector(state=>state.user)
  return (
    <div>
      
        <BrowserRouter>
        <Routes>
            <Route  path='/'  element={<Navbare/>} >
            <Route  index  element={user ? <Home/> : <Login/> }/>
            <Route  path='/login'  element={<Login/>}/>
            <Route  path='/allusers'  element={user ? <ListUsers/> : <Login/> }/>

            </Route>
        </Routes>
        
        
        
        </BrowserRouter>
        
        
      
    </div>
  )
}

export default App

import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../Components/Auth/Login'
import Register from '../Components/Auth/Register'
import Dashboard from '../Components/Dashboard'
import Home from '../Components/Home'
import Navbare from '../Components/Layout/Navbare'

function RouterComponents() {
  return (
    <div>
      <Routes>
         <Route path="/" element={<Navbare />}>
          <Route  index  element={<Dashboard/>}/>
          <Route  path='login'  element={<Login/>}/>
          <Route  path='register'  element={<Register/>}/>
          <Route  path='home'  element={<Home/>}/>
          </Route>
      </Routes>
    </div>
  )
}

export default RouterComponents

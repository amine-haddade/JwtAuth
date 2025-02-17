import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../Components/Auth/Login'
import Register from '../Components/Auth/Register'
import Dashboard from '../Components/Dashboard'
import Home from '../Components/Home'
import Navbare from '../Components/Layout/Navbare'
import UserList from '../Components/UserList'
import Update from '../Components/Update'
import GroupsList from '../Components/Groups/GroupsList'
import AddGroups from '../Components/Groups/AddGroups'
import UpdateGroup from '../Components/Groups/UpdateGroup'

function RouterComponents() {
  return (
    <div>
      <Routes>
         <Route path="/" element={<Navbare />}>
          <Route  index  element={<Dashboard/>}/>
          <Route  path='login'  element={<Login/>}/>
          <Route  path='register'  element={<Register/>}/>
          <Route  path='update/:id'  element={<Update/>}/>
          <Route  path='home'  element={<Home/>}/>
          <Route  path='listUsers'  element={<UserList/>}/>
          <Route  path='listGroups'  element={<GroupsList/>}/>
          <Route  path='addGroup'  element={<AddGroups/>}/>
          <Route  path='updateGroup/:id'  element={<UpdateGroup/>}/>
          </Route>
      </Routes>
    </div>
  )
}

export default RouterComponents

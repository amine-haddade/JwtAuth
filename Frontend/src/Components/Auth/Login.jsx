import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate}  from 'react-router-dom'
import {login}  from '../Store/Actions/Action'

function Login(){
  const [formData,setFormData]=useState({email:"",password:""})
  const [succes,setSucces]=useState("")
  const [errors,setErrors]=useState({})
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  // function de rigester user to data base 
  const handelSubmit= async(e)=>{
    e.preventDefault()
    setLoading(true)
    setErrors("")
    // console.log("register form",formData)
    try{
      await dispatch(login(formData))
      navigate('/')
    }
    catch(err){
      if(err.response.data.errors){
        setErrors(err.response.data.errors)
      }
    }finally{
      setLoading(false)
    }
  }
  return (
    <div  className='h-dvh flex flex-col gap-7 items-center justify-center '>
      
      
      <h2  className='text-3xl '>login user</h2>
      <form onSubmit={handelSubmit}  className=' border border-gray-700 rounded-md flex flex-col gap-4 py-3 px-5 bg-white  w-96 items-center'>

        <div  className='flex flex-col gap-1   items-start w-full'>
          <label className='text-xl capitalize'>email</label>
          <input className=' border rounded-sm border-gray-300  py-1 px-1.5 outline-none w-full' type="email"  value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}   />
          {errors.email &&
                (
                    <div><span className='text-base text-red-500'>{errors.email}</span></div>
                )
          }
        </div>

        <div  className='flex flex-col gap-1   items-start w-full'>
          <label className='text-xl  capitalize'>password</label>
          <input className=' border rounded-sm border-gray-300  py-1 px-1.5 outline-none w-full'  type="password" value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}  />
          {errors.password && 
                (
                    <div><span className='text-base text-red-500'>{errors.password }</span></div>
                )
          }
        </div>
        <button className='rounded-md bg-blue-500 p-2 text-white border-none text-xl cursor-pointer duration-300  transition-all hover:bg-blue-300'>{loading ?"loading...":"login" }
        </button>
      </form>
      
    </div>
  )
}

export default Login

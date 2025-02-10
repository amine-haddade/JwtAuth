import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Register() {
  const [formData,setFormData]=useState({name:"",email:"",password:""})
  const [succes,setSucces]=useState("")
  const [errors,setErrors]=useState({})
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function de rigester user to data base 
  const handelSubmit= async(e)=>{
    e.preventDefault()
    setLoading(true)
    setErrors("")
    setSucces("")
    // console.log("register form",formData)
    try{
      const response=await  axios.post("http://127.0.0.1:8000/api/user/register",formData)
      console.log("Response ",response.data)
      if (response.data.token && response.data.user) {
        dispatch({
          type: 'login',
          payload: {
            token: response.data.token,
            user: response.data.user,
          },
        });
      }
      setLoading(false);
      navigate('/');
    }
    catch(err){
      setLoading(false)
      if(err.response){
        console.error("error de response ",err.response)
      }
      if(err.response.data.errors){
        setErrors(err.response.data.errors)
      }
      
    }
  }
  return (
    <div  className='h-dvh flex flex-col gap-7 items-center justify-center '>
      {succes &&
         (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Success alert!</span>{succes}
          </div>
         )
      
      }
      <h2  className='text-3xl '>create new user</h2>
      <form onSubmit={handelSubmit}  className=' border border-gray-700 rounded-md flex flex-col gap-4 py-3 px-5 bg-white  w-96 items-center'>
        <div  className='flex flex-col gap-1   items-start w-full'>
          <label className='text-xl  capitalize'>full name</label>
          <input     className=' border rounded-sm border-gray-300  py-1 px-1.5 outline-none w-full' type="text" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} />
          {errors.name &&
                (
                    <div><span className='text-base text-red-500'>{errors.name}</span></div>
                )
          }
        </div>

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
        <button className='rounded-md bg-blue-500 p-2 text-white border-none text-xl cursor-pointer duration-300  transition-all hover:bg-blue-300'>{loading ?"loading...":"register" }
        </button>
      </form>
      
    </div>
  )
}

export default Register

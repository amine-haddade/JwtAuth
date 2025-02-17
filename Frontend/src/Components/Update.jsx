import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, UpdateUser } from './Store/Actions/Action'


function Update() {
    const userUpdated=useSelector((state)=>state.userState.userUpdated)
    const token=useSelector((state)=>state.userState.token)
  const [formData,setFormData]=useState(userUpdated ? userUpdated : {})
  const [errors,setErrors]=useState({})
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id}=useParams()

  // function de rigester user to data base 
  const handelSubmit= async(e)=>{
    e.preventDefault()
    setLoading(true)
    setErrors("")
    try{
      await dispatch(UpdateUser({id:userUpdated.id,token:token,formData:formData}))
      navigate('/listUsers');
    }
    catch(err){   
      if(err.response.data.errors){
        setErrors(err.response.data.errors)
      }  
    }finally{
      setLoading(false)
    }
  }
  //pour ècupèer leuser clicker
  useEffect(()=>{
    dispatch(fetchUsers());  // 🔥 Recharge la liste des utilisateurs
    dispatch({ type: "FindUser", payload: parseInt(id) }); // 🔥 Récupère l'utilisateur sélectionné
  },[])
  if(!userUpdated){
    return (
        <h1>le user not provided</h1>
    )
  }
  return (
    <div  className='h-dvh flex flex-col gap-7 items-center justify-center '>
     
      <h2  className='text-3xl '>update user</h2>
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
        <button className='rounded-md bg-blue-500 p-2 text-white border-none text-xl cursor-pointer duration-300  transition-all hover:bg-blue-300'>{loading ?"loading...":"update" }
        </button>
      </form>
      
    </div>
  )
}

export default Update

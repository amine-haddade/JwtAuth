import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateGroup } from '../Store/Actions/GroupActions'

function UpdateGroup() {
  const {id}=useParams()
  const GroupUpdated=useSelector(state=>state.groupState.groupUpdate)
   const [formData,setFormData]=useState(GroupUpdated || { nom: "", nombre: "", filiere: "" })

   const [loading,setLoading]=useState(false)
   const token=useSelector(state=>state.userState.token)
   const [errors,setErrors]=useState({})
   const dispatch = useDispatch();
      const navigate = useNavigate();
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit =async(e)=>{
        e.preventDefault()
        setLoading(true)
        setErrors({})
        try{
          await dispatch(updateGroup(token,formData,id))
          navigate("/listGroups")
        }catch(err){
          if(err.response.data.errors){
            setErrors(err.response.data.errors)
          }
        }finally{
          setLoading(false)
        }
    }
   

  return (
    <div className='w-full mx-auto flex justify-center items-center min-h-dvh'>
      <form onSubmit={handleSubmit}  className=' border border-gray-700 rounded-md flex flex-col gap-4 py-3 px-5 bg-white  w-96 items-center'>
        <div  className='flex flex-col gap-1   items-start w-full'>
          <label className='text-xl  capitalize'>nom</label>
          <input name='nom'    className=' border rounded-sm border-gray-300  py-1 px-1.5 outline-none w-full' type="text" value={formData.nom} onChange={handleChange}  />
          {errors.nom &&
                (
                    <div><span className='text-base text-red-500'>{errors.nom}</span></div>
                )
          }
        </div>

        <div  className='flex flex-col gap-1   items-start w-full'>
          <label className='text-xl capitalize'>nombre</label>
          <input className=' border rounded-sm border-gray-300  py-1 px-1.5 outline-none w-full' type="number" name='nombre'  value={formData.nombre} onChange={handleChange}    />
          {errors.nombre &&
                (
                    <div><span className='text-base text-red-500'>{errors.nombre}</span></div>
                )
          }
        </div>

        <div  className='flex flex-col gap-1   items-start w-full'>
          <label className='text-xl  capitalize'>filiere</label>
          <input className=' border rounded-sm border-gray-300  py-1 px-1.5 outline-none w-full'  type="text"  name='filiere' value={formData.filiere} onChange={handleChange}  />
          {errors.filiere && 
                (
                    <div><span className='text-base text-red-500'>{errors.filiere }</span></div>
                )
          }
        </div>
        <button className='rounded-md bg-blue-500 p-2 text-white border-none text-xl cursor-pointer duration-300  transition-all hover:bg-blue-300'>{loading ?"loading...":"create" }
        </button>
      </form>
    </div>
  )
}

export default UpdateGroup

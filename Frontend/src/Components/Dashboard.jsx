import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  useEffect(()=>{
    const dataUser=localStorage.getItem("user") 
    const token=localStorage.getItem("token_jwt")
    if(dataUser  && token){
      try{
        const parsedUser=JSON.parse(dataUser)
        setUser(parsedUser)
        axios
        .get('http://127.0.0.1:8000/api/dashboard',{
          headers:{Authorization:`Bearer ${token}`}
        })
        .then((response)=>{
          console.log(response.data)
        })
      }catch(err){
        console.log("faild to parse user ",err);
        localStorage.removeItem("user")
        navigate("/login")
      }
      finally{
        setLoading(false)
      }
    }else{
      navigate("/login")

    }

  },[navigate])


  // log out function
  const handleLogout = async()=>{
    try{
      const token=localStorage.getItem("token_jwt")
      
      await axios
      .get("http://127.0.0.1:8000/api/user/logout",{
        headers:{Authorization:`Bearer ${token}`}
      })
      //vidè le localsotorage
      localStorage.removeItem("token_jwt")
      localStorage.removeItem("user")
      navigate("/login")
    }catch(err){
      console.error(err)
    }

  }
  if (loading) return <p className="text-center text-blue-600 text-4xl">Loading...</p>;
  return (
    <div>
      <div  className='flex flex-col gap-2 p-5 bg-blue-300 rounded-md justify-center items-center '>
        <h1>hello {user.name}</h1>
        <h1>your email  {user.email}</h1>
        <button  className='text-lg text-white  rounded-md border-none bg-red-600 py-1 px-3 ' onClick={handleLogout} >logout</button>
      </div>
      
    </div>
  )
}

export default Dashboard

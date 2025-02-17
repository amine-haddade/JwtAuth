import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from'axios'

function Navbare() {
  const user=useSelector(state=>state.user)
  const token=useSelector(state=>state.token)
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const logout=async()=>{
    try{
      await axios.get("http://127.0.0.1:8000/api/user/logout",{
        headers:{Authorization:`Bearer ${token}`}
      })
      dispatch({type:"logout"})
      navigate("/login")
      
    }catch(err){
      console.log(err)
    }

  }
  return (
    <div>
            <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        MyLogo
                    </Link>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-500">
                        Accueil
                        </Link>
                       
                        <Link to="/allusers" className="text-gray-700 hover:text-blue-500">
                        List Users
                        </Link>
                        {user ?(
                        <span>{user.name}<button    onClick={logout}  className='text-lg text-white  rounded-md border-none bg-red-600 py-1 px-3 '  >logout</button></span>

                        ):(

                        <Link to="/login" className="text-gray-700 hover:text-blue-500">
                          login
                        </Link>
                        ) }
                        
                        
                        
                        
                    </div>
                    </div>
                    
                    </div>
            </nav>
            <main>
              <Outlet/>
            </main>
    </div>
  )
}

export default Navbare

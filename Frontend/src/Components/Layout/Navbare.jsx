import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icônes pour le menu mobile
import { Outlet } from 'react-router-dom'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function Navbare() {
  // state de store 
    const user=useSelector(state=>state.user)
    const token=useSelector(state=>state.token)
    const dispatch=useDispatch()


    const [isOpen, setIsOpen] = useState(false); // État pour afficher/cacher le menu mobile
    const navigate=useNavigate()
    
   // logout function user
    const handleLogout = async()=>{
      try{
        await axios
        .get("http://127.0.0.1:8000/api/user/logout",{
          headers:{Authorization:`Bearer ${token}`}
        })
        //vidè le localsotorage
        dispatch({type:"logout"})
        navigate("/login")
      }catch(err){
        console.error(err)
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
            <Link to="/home" className="text-gray-700 hover:text-blue-500">
              Accueil
            </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-500">
              Dashboard
            </Link>
            {user ? (
              <span>{user.name} <button  className='text-lg text-white  rounded-md border-none bg-red-600 py-1 px-3 ' onClick={handleLogout} >logout</button></span>

            ) : 
            (
                <>
                <Link to="/login" className="text-gray-700 hover:text-blue-500">
                    Connexion
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-500">
                    Inscription
                </Link>
            </>
            )
            
            }
            
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-2 py-4 px-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Inscription
            </Link>
          </div>
        </div>
      )}
    </nav>
        <main>
            <Outlet/>
        </main>
      
    </div>
  )
}

export default Navbare

import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div  className='min-h-dvh flex justify-center items-center gap-3 '>
      <h1 className='text-4xl text-black '>larvel 11 auth witch jwt</h1>
      <div className='flex gap-2 items-center '>
        <Link to='/login'   className='bg-blue-500 rounded-md py-1.5 px-2 border-none text-lg text-white'>login</Link  >
        <Link  to='/register'  className='bg-blue-500  rounded-md py-1.5 px-2 border-none text-lg text-white'>register</Link  >
        </div>
    </div>
  )
}

export default Home

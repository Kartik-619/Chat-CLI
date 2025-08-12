import { useState } from 'react'
import { Routes,BrowserRouter } from 'react-router-dom'
import Login from './components/Login'


function App() {

  return (

    <div className='h-screen w-screen bg-stone-500'>
      <Login/>
    </div>

  )
}

export default App

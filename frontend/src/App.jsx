import { useState } from 'react'
import { Routes,BrowserRouter ,Route} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/signup'
import UserProfile from './pages/user_profile'


function App() {

  return (
<BrowserRouter>
    <div className='h-screen w-screen bg-stone-500'>
      
      <Routes >
      <Route path="/" element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<SignUp/>} />
        <Route path='/userprofile' element={<UserProfile/>} />
      </Routes>
     
      
    </div>
    </BrowserRouter>
  )
}

export default App

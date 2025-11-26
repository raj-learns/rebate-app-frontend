import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login'
import './App.css'
import CreateProfile from './pages/CreateProfile';
import { HomePage } from './pages/home';
import ApplyRebate from './pages/ApplyRebate';
import { UserProfile } from './pages/UserProfile';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <a href="http://localhost:3000/auth/google">
    <button>Sign in with Google</button>
</a>*/}

      <BrowserRouter>
        <Routes>

          { /*<Route path='/' element={<HomePage></HomePage>}></Route>*/}
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/create-profile' element={<CreateProfile />}></Route>
          <Route path='/rebate-application' element={<ApplyRebate />}></Route>
          <Route path='/profile' element={<UserProfile/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
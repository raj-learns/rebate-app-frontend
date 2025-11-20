import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { LoginPage } from './pages/login'
import './App.css'
import CreateProfile from './pages/CreateProfile';
import { HomePage } from './pages/home';
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
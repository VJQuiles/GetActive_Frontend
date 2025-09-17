import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import User from './pages/User'
import Workout from './pages/Workout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user' element={
          <User />
        } />
        <Route path='/workout' element={<Workout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App

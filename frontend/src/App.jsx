
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <Navbar/>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element ={<Login/>}/>
    </Routes>
      
    </>
  )
}

export default App

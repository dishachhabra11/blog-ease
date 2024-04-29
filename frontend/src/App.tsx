import { useState } from 'react'
import Blog from './pages/blog'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import './App.css'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      <Route path='/' element={<Blogs/>}/>
      <Route path='/publish' element={<Publish/>}/>


     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

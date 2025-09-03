import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Blog from './components/Blog'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<Signup />} />
        <Route path = '/' element = {<Login />} />
        <Route path = '/blogs' element = {<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

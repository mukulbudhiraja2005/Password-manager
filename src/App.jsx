
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import { Navbar } from './components/navbar'
import { Manager } from './components/Manager'
import { Footer } from './components/Footer'
import { Signup } from './components/signup';
import { Login } from './components/Login';
import { Layout } from './Layout';




function App() {
  
  

  return (
   
    <>
    <BrowserRouter>
  <Routes>
     <Route path="/" element={<Signup />} />    {/* redirect root to signup */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
   
    <Route path="/manager" element={
       <Layout>
        <Manager />
       </Layout>
      
    } />
  </Routes>
</BrowserRouter>
   
   
  
    </>
  )
}

export default App

import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; // toastify 是一个弹出框库
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
    <ToastContainer />
      
    </>
    
  )
}

export default App

// using <Outlet /> is for dynamic rendering of nested routes
// <HomeScreen /> is a child component of <App />
import { useState } from 'react'
import "./app.scss"
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Index from './Page/Index/Index'

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='content'>
        <div className='ads'>
          광고
        </div>
        <main>
          <Routes>
            <Route path='/' element={<Index />} />
          </Routes>
        </main>
        <div className='ads'>
          광고
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App

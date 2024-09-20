import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
       <Header/>
         <main className='bg-slate-600 p-6'>
            <Outlet/>
         </main>
        <Footer/>
    </div>
  )
}

export default Layout

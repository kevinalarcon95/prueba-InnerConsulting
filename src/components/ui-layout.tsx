import React from 'react'

import Header from './header'
import Footer from './footer'

const UILayout = ( { children } : { children: React.ReactNode } ) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <main className="flex-grow lg:mb-10">
        { children }
      </main>
      <Footer/>
    </div>    
  )
}

export default UILayout
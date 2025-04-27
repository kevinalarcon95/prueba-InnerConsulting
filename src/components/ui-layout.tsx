import React from 'react'
import Header from './header'

const UILayout = ( { children } : { children: React.ReactNode } ) => {
  return (
    <>
    <div className='bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400/80 min-h-[20vh] flex justify-center items-center'>
      <Header/>
    </div>
    { children }
    </>    
  )
}

export default UILayout
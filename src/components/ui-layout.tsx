import React from 'react'
import Header from './header'

const UILayout = ( { children } : { children: React.ReactNode } ) => {
  return (
    <>
    <Header/>
    { children }
    </>    
  )
}

export default UILayout
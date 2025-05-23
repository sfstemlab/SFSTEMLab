import React from 'react'

const Circle = (color:string, title:string) => {
  return (
    <div className={`rouneded-full p-3 bg-${color}`}>
        <h1 className='text-center font-bold text-white'>{title}</h1>
    </div>
  )
}

export default Circle
import React from 'react'

interface TagProps {
  value: string;
}

const Tag = ({ value }: TagProps) => {
  return (
    <div className='bg-brand/50 text-redBrand font-bold rounded-lg px-2 py-1 '>
      {value}
    </div>
  )
}

export default Tag

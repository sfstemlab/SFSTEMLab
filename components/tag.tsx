import React from 'react'

interface TagProps {
  value: string;
}

const Tag = ({ value }: TagProps) => {
  return (
    <h1 className='bg-brand/50 text-redBrand text-lg font-bold rounded-lg px-2 py-1 cursor-default'>
      {value}
    </h1>
  )
}

export default Tag

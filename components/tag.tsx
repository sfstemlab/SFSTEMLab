import React from 'react'

interface TagProps {
  value: string;
}

const Tag = ({ value }: TagProps) => {
  return (
    <div className='bg-[#b1d5e6]/50 text-[#cc1616] font-bold rounded-lg px-2 py-1 '>
      {value}
    </div>
  )
}

export default Tag

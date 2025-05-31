import React from 'react'
import Tag from '../components/tag'
import Link from 'next/link';
interface EventProps {
    title:string;
    day:number;
    month:string;
    desc:string;
    tags?:string[];
}

const Event = (event:EventProps) => {
  return (
    <Link className='text-white rounded-md py-2 px-1 items-center border-2 border-brand bg-brand/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out' href={`/${event.title}`}>
        <div className='flex'>
            <div className='w-3/4 px-2'>
                <h1 className='font-bold underline text-xl text-redBrand text-left flex'>
                    {event.title}
                </h1>
                <p className='text-left'>
                    {event.desc}
                </p>
                <div className='p-2 flex space-x-2'>
                    {event.tags && event.tags.length > 0 && event.tags.map((tag, index) => (
                        <Tag key={index} value={tag} />
                    ))}
                </div>
            </div>
            <div className='mx-1 rounded-sm bg-brand/60  text-redBrand py-1 pb-2 px-3 items-center text-center h-5/6'>
                <h2 className='font-black text-lg'>
                    {event.month}
                </h2>
                <h3 className='font-black text-5xl'>
                    {event.day}
                </h3>
            </div>
        </div>
    </Link>
  )
}

export default Event
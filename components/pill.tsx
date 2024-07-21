
interface PillProps {
  key:number;
  value: string;
}

const Pill = ({value}:PillProps) => {
  return (
    <p className='rounded-full text-sm items-center text-center bg-gradient-to-r from-gray-950 to-gray-800/40 px-5 py-2 border-2 border-emerald-500 '>
        {value}
    </p>
  )
}

export default Pill
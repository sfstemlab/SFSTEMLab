import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-center justify-center'>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
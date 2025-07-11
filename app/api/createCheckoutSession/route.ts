import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET () {
    
    console.log("GET Request triggered...")
    return NextResponse.json({
        message: "GET Request triggered..."
    })
}

export async function POST (req: Request) {
    console.log('POST request triggered...')
    let body:any = {}
    try {
        body = await req.json()
        console.log('POST body: '+body)
    } catch (e) {
        console.log(e)
    }

    // TODO: test using `curl` and test in UI

    try {
        //TODO: stripe logic would go here 
        return NextResponse.json(
            {
                message: 'hello',
                received: body
            },
            { status: 200 }
        )
    } catch (e: any) {
        console.error("err in post handler") 
        return NextResponse.json(
            {error: e.message || "Unknown error in post"}, 
            {status: 500}
        )
    }
}


// ---- HOW TO TEST ENDPOINTS IN DEVTOOLS - paste in console ----  
// // GET
// fetch("/api/createCheckoutSession")
//     .then(r => r.json())
//     .then(console.log); 

// // POST
// fetch('/api/createCheckoutSession', {
//     method: 'POST',
//     headers: {
//         "Content-Type" : "application/json"
//     }, 
//     body: JSON.stringify({ test: 'POST request test' })
// })
// .then(r => {
//     if (!r.ok) throw new Error(r.statusText); 
//     return r.json(); 
// })
// .then(data => console.log("got json data: " , data))
// .catch(err => console.error("fetch failed: ", err));  
    
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Define response data type
type Data = { message?: string; error?: string };

// Email validation schema
const EmailSchema = z.string().email({ message: 'Please enter a valid email address' });

export async function POST(req: NextRequest) {
    let body: any;
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({error: 'Invalid JSON'}, {status: 400})
    }

    const emailParse = EmailSchema.safeParse(body.email)
    if (!emailParse.success) {
        return NextResponse.json({ error: emailParse.error.issues[0].message }, {status: 400});
    }

    const email = emailParse.data

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const API_SERVER = process.env.MAILCHIMP_API_SERVER;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    
    if (!API_KEY || !API_SERVER || !AUDIENCE_ID) {
        return NextResponse.json({error: 'Missing Mailchimp key'}, {status: 500})
    }

    const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const payload = {
        email_address: email,
        status: 'subscribed',
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `api_key ${API_KEY}`,
        },
    };

    try {
        const res = await axios.post(url, payload, config)
        // mailchimp returns a 200 for existing
        if (res.status === 200 || res.status === 201) {
            return NextResponse.json({message: 'You have successfully subscribed!'}, {status: 201})
        }

        // fallback for other 2xx status
        return NextResponse.json({message: 'Subscription OK'}, {status: res.status})
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) { 
            const {status, data} = err.response
            console.log(status, data.title, data.detail)
            if (data.title === 'Member Exists') {
                return NextResponse.json(
                    { error: "Uh oh, it looks like this email is already subscribed!" },
                    { status: 400 }
                );
            }
            // any other mailchimp errors
            return NextResponse.json({error: data.detail || data.title || 'Mailchimp error'}, {status: status})
        }
        return NextResponse.json({error: 'Oops! we had an error! Contact us at august@team5700.org for help'}, {status: 500})
    }
}
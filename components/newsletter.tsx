import { FormEvent, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'idle'>('idle');
    const [responseMsg, setResponseMsg] = useState<string>('');
    const [statusCode, setStatusCode] = useState<number>();
    const [statusMessageOpen, setStatusMessageOpen] = useState<boolean>(false);

    async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await axios.post('/api/subscribe', { email });

            setStatus('success');
            setStatusCode(response.status);
            setEmail('');
            setResponseMsg(response.data.message);
            setStatusMessageOpen(true)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setStatus('error');
                setStatusCode(err.response?.status);
                setResponseMsg(err.response?.data.error);
                setStatusMessageOpen(true)
            }
        }
    }

    return (
        <>
            <form
                className="bg-cardColor text-white font-bold px-6 py-4 rounded-lg items-center mt-4 space-x-2 border-2 border-brand max-w-md"
                onSubmit={handleSubscribe}
            >
                <h1 className="text-xl mb-4">
                    Subscribe to our weekly newsletter!
                </h1>
                <div className="flex">
                    <input
                        className={`font-normal text-darkBlue grow items-center h-14 pr-0.5 rounded-l px-4 border-y-2 border-l-2 ${statusCode == 400 ? 'border-redBrand' : 'border-darkBlue'} `}
                        type="email"
                        placeholder="Enter your email address here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="bg-redBrand hover:scale-110 hover:rounded-l-sm text-white font-bold py-2 px-4 rounded-r-sm transition duration-300"
                        type="submit"
                    >
                        Subscribe
                    </button>
                </div>
                {statusMessageOpen &&  
                    <div
                        className='server-message rounded-sm bg-white/90 mt-4 p-3 text-left flex items-center justify-center'
                    >
                        {status === 'success' ? (
                            <p className="text-darkBlue font-bold">{responseMsg}</p>
                        ) : null}
                        {status === 'error' ? (
                            <p className="text-redBrand font-bold">{responseMsg}</p>
                        ) : null}
                        <button 
                            className='h-10 w-10 p-1 items-center justify-center rounded-sm bg-redBrand'
                            onClick={() => {setStatusMessageOpen(false)}}
                        >
                            <X />
                        </button>
                    </div>
                }
            </form>
        </>
    );
};

export default Newsletter;

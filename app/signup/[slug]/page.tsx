'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

interface Info {
    event:string;
    firstName?: string;
    lastName?: string;
    pronouns?: string;
    accessSource?: string;
    reasonForAttending?: string;
    school?: string;
    grade?: string;
}

const SignupPage = () => {
    const { slug } = useParams();
    // console.log(slug)
    const event = (slug as string).split('%20').join(' ').slice(0, -1);

    const [selectedPronoun, setSelectedPronoun] = useState('');
    const [info, setInfo] = useState<Info>({
        event: event
    })

    const changeInfo = (thing: keyof Info, value: string) => {
        setInfo((prev) => ({
            ...prev, 
            [thing]: value
        }))
        // console.log(info)
    }

    return (
        <div className="main-section">
            <div className="flex space-x-3 justify-center">
                {/* Row 1 */}
                <div className="flex space-x-3">
                    <div className="flex flex-col">
                        <h1>First Name</h1>
                        <input
                            type="text"
                            className="w-full text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                            placeholder="Type here.."
                            onChange={(e) => changeInfo('firstName', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1>Last Name</h1>
                        <input
                            type="text"
                            className="text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                            placeholder="Type here.."
                            onChange={(e) => changeInfo('lastName', e.target.value)}

                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1>Pronouns</h1>
                    <div>
                        <select
                            name="pronouns"
                            className="text-white h-9 px-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out"
                            value={info.pronouns || 'default'}
                            onChange={(e) => changeInfo('pronouns', e.target.value)}
                        >
                            <option value="default" disabled>
                                Select your pronouns
                            </option>
                            <option value="she/her">She/Her</option>
                            <option value="he/him">He/Him</option>
                            <option value="they/them">They/Them</option>
                            <option value="she/they">She/They</option>
                            <option value="he/they">He/They</option>
                            <option value="they/she">They/She</option>
                            <option value="they/he">They/He</option>
                            <option value="no-answer">Prefer not to answer</option>
                            <option value="other">Other (please specify)</option>
                        </select>
                        {selectedPronoun === 'other' && (
                            <input
                                type="text"
                                placeholder="Enter custom pronouns.."
                                className="text-white px-1 h-9 ml-2 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                                onChange={(e) => changeInfo('pronouns', e.target.value)}

                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex space-x-3 justify-center">
                {/* Row 2 */}
                <div className="flex flex-col w-1/2">
                    <h1>How did you hear about us?</h1>
                    <textarea
                        className="h-32 text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                        placeholder="Type here.."
                        onChange={(e) => changeInfo('accessSource', e.target.value)}

                    ></textarea>
                </div>
                <div className="flex flex-col w-1/2">
                    <h1>Why did you decide to attend this event?</h1>
                    <textarea
                        className="h-32 text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                        placeholder="Type here.."
                        onChange={(e) => changeInfo('reasonForAttending', e.target.value)}

                    ></textarea>
                </div>
            </div>
            <div className="flex space-x-3 justify-center">
                {/* Row 3 */}
                <div className="flex flex-col w-3/4">
                    <h1>What school do you go to?</h1>
                    <input
                        type="text"
                        className="text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                        placeholder="Enter your school here.."
                        onChange={(e) => changeInfo('school', e.target.value)}

                    />
                </div>
                <div className="flex flex-col w-1/4">
                    <h1>What grade are you in?</h1>
                    <input
                        type="number"
                        className="text-white p-1 bg-cardColor rounded-md border-2 border-brand hover:bg-cardColor-light transition duration-700 ease-in-out placeholder-brand-dark"
                        placeholder="Enter our grade here.."
                        onChange={(e) => changeInfo('grade', e.target.value)}

                    />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

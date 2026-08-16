"use client"

import { EventProps } from '@/types/types';
import axios from 'axios';
import { Calendar, Loader2, TriangleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Tag from './tag';

interface EventSignup {
  id: number;
  email: string;
  event: string;
  firstName: string;
  lastName: string;
  pronouns?: string;
  accessSource?: string;
  reasonForAttending?: string;
  school?: string;
  grade?: number;
  createdAt: string;
}

const MyEvents = () => {
    const [signedUpEvents, setSignedUpEvents] = useState<EventSignup[]>([])
    const [events, setEvents] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        async function fetchSignedUpEvents() {
            try {
                const res = await axios.get('/api/fetchEvents')
                setSignedUpEvents(res.data.events ?? [])
            } catch (e) {
                setError(`Failed to load events. error: ${e}`)
            } finally {
                setLoading(false)
            }
        }

        async function fetchEvents () {

        }

        fetchSignedUpEvents();
    }, [])


    // --- Loading State ---
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <Loader2 className="text-brand animate-spin mr-3" size={24} />
                <span className="text-white/70">Loading events and timeslots...</span>
            </div>
        )
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <TriangleAlert className="text-redBrand fill-redBrand/40 animate-bounce mr-3" size={24} />
                <span className="text-white/70">{error}</span>
            </div>
        )
    }

    // --- Empty State ---
    if (events?.length === 0) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <Calendar className="text-brand animate-bounce mr-3" size={24} />
                <span className="text-white/70">You haven't signed up for any events yet *sad face* </span>
            </div>
        )
    }

    // --- Events List ---
    return (
        <div className="p-6 text-white">
            <h2 className="text-xl font-bold mb-4 text-darkBlue">My Event Signup</h2>
            <ul className="space-y-3">
                {events.map((e:EventProps, key:any) => (
                    <div
                    // layoutId={`card-${event.title}-${id}`}
                        key={e.title}
                        className="text-white w-[330px] rounded-md py-2 px-1 items-center border-2 border-brand bg-brand/50 hover:bg-[#8db5e3]/90 transition duration-700 ease-in-out cursor-pointer"
                    >
                        <div className="flex w-full">
                            <div className="flex justify-center items-center flex-col">
                                <h3
                                    // layoutId={`title-${e.title}-${id}`}
                                    className="font-bold underline text-xl text-redBrand text-left flex"
                                >
                                    {e.title}
                                </h3>
                                <p
                                    // layoutId={`description-${e.desc}-${id}`}
                                    className="text-white text-center md:text-left text-base px-2"
                                >
                                    {e.desc}
                                </p>
                                <div className="p-2 flex space-x-2">
                                    {e.tags &&
                                    e.tags.length > 0 &&
                                    e.tags.map((tag, index) => (
                                        <Tag key={index} value={tag} />
                                    ))}
                                </div>
                            </div>
                            <div className="mx-1 rounded-sm bg-brand/60  text-redBrand py-1 pb-2 px-3 items-center text-center h-5/6">
                                <h2 className="font-black text-lg">{e.month}</h2>
                                <h3 className="font-black text-5xl">{e.day}</h3>
                            </div>
                        </div>
                    </div>

                ))}
            </ul>
        </div>
    )
}

export default MyEvents
'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Form from '@/components/form';
import { EventProps } from '@/types/types';
import { Loader2 } from 'lucide-react';

const SignupPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState<EventProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvent() {
            try {
                const res = await fetch(`/api/events/${eventId}`);
                if (!res.ok) throw new Error('Failed to fetch event');
                const data = await res.json();
                setEvent(data.event ?? null);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [eventId]);

    if (loading) {
        return (
            <div className="main-section flex justify-center items-center h-[200px]">
                <Loader2 className="text-brand animate-spin mr-3" size={24} />
                <span className="text-white/70">Loading...</span>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="main-section flex justify-center items-center h-[200px]">
                <span className="text-white/70">Event not found.</span>
            </div>
        );
    }

    return (
        <div className="main-section">
            <Form eventId={event.id} title={event.title} />
        </div>
    );
};

export default SignupPage;

'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Form from '@/components/form';



const SignupPage = () => {
    const { slug } = useParams();
    // console.log(slug)
    const event = (slug as string).split('%20').join(' ').slice(0, -1);



    return (
        <div className="main-section">
            <Form event={event} />
        </div>
    );
};

export default SignupPage;

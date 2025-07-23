import { usePathname } from 'next/navigation';
import React from 'react'

interface HeaderProps {

    title:string;
    subtitle?: string;
    imgSrc: string;
    imgAlt: string;
}

const PageTitle = () => {

    const pathname = usePathname()
    // -- data -- 
    const titleInfo: Record<string, HeaderProps> = {
        '/': {
            title: 'Welcome to the SF STEM Lab!',
            subtitle: '',
            imgSrc: '/images/HomePage_HeroSection.png',
            imgAlt: 'Home Page Hero Image'
        },
        '/about': {
            title: 'About Us',
            subtitle: 'Who is the SF STEM Lab?',
            imgSrc: '@/../images/aboutPage_HeroSection.png',
            imgAlt: 'About Page Hero Image'
        },
        '/events': {
            title: 'Events',
            subtitle: 'Find all of our upcoming events here',
            imgSrc: '@/../images/eventsPage_HeroSection.png',
            imgAlt: 'Events Page Hero Image'
        },
        '/signup/STEM%20Workshop%20': {
            title: 'Thank you for signing up for this event!',
            subtitle: "Just a few quick questions, then you'll be good to go!",
            imgSrc: '/images/controllers.png',
            imgAlt: 'Signup Page Hero Image'
        },
        '/donate':{
            title: 'Fuel the Future of STEM',
            subtitle: 'We thank you for any and all donations, not matter how small!',
            imgSrc: '/images/alliancePic.png',
            imgAlt: 'Donate Page Hero Image'
        }
    }
    // --------------------------------
    const { title, subtitle, imgSrc, imgAlt} = titleInfo[pathname] ?? 
            {
                title: 'Page Not Found',
                subtitle: "Check the URL for typos. If you still can't find the page you're looking for, contact us at august@team5700.org",
                imgSrc: '/images/theThinker.png',
                imgAlt: 'No Page Found Image'
            }
    

    return (
        <div className="relative w-full mt-16">
            <img
                src={imgSrc}
                alt={imgAlt}
                className='w-full h-auto object-cover'
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <div className="inline-block page-title">
                    <h1 className="text-white font-extrabold text-4xl md:text-5xl">
                        {title}
                    </h1>
                    <p className='text-white/70 tracking-wider italic text-md'>
                        {subtitle}
                    </p>
                </div>
               
            </div>
        </div>
    );
}

export default PageTitle
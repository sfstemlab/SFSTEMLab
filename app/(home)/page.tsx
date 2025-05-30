"use client";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { Variants, Transition } from "framer-motion";
import Navbar from '@/components/navbar'
import Link from "next/link";
import Circle from "@/components/circle";

type BackgroundVariants = Variants & {
  hidden: { backgroundPosition: string };
  visible: {
    backgroundPosition: string;
    transition: Transition & {
      repeat?: number;
      repeatType?: "loop" | "reverse" | "mirror";
    };
  };
};


export default function Home() {

    const containerVariants = {
        hidden: { opacity: 0},
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // each child will start animating 0.3s after the prev.
        },
        y: -10
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 20,
        },
        },
        hover: {
        scale: 1.1,
        transition: {
            duration: 1,
        },
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        },
    };
    const backgroundVariants: BackgroundVariants = {
        hidden: { backgroundPosition: "0% 50%" },
        visible: {
        backgroundPosition: "100% 50%",
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror", 
        },
        },
    };

    const desc1 = `SF STEM Lab offers hands-on workshops designed for elementary and middle\n 
        schoolstudents, welcoming all skill levels — even beginners with little to\n
        no prior STEM experience. The workshops are structured to help students dive\n
        into a variety of engaging activities, from building robots to mastering \n
        coding, 3D printing, and CAD design. Through these interactive sessions,\n
        students gainpractical experience and a deeper understanding of how the\n
        technology works, encouraging curiosity and creativity.`.split('\n');

    const desc2 = `At SF STEM Lab, our focus is on mentorship and collaborativelearning.\n
        Experienced student mentors and professionals from the community\n
        play a key role in teaching the workshops, sharing their expertise and\n
        guiding students through the process of building and creating. This\n
        environment provides students with valuable skills and teaches the\n
        importance of teamwork, problem-solving, and working wtih others\n
        toward a common goal.`.split('\n');

    const desc3 = `SF STEM Lab's workshops are entirely free and open to all. We \n
    are commited to ensuring that students from all backgrounds have \n
    the opportunity to explore and create with STEM. SF STEM Lab aims \n
    to make high-quality STEM education available to a wider audience, \n
    helping to inspire the next generation of innovators, thinkers, \n
    and problem-solvers.`.split('\n');
    
    function useScreenWidth() {
        const [width, setWidth] = useState(1024);

        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return width;
    }
    const screenWidth = useScreenWidth()

    return (
        <motion.div
            className="w-full bg-white min-h-screen justify-center text-black relative"
            variants={backgroundVariants}
            initial="visible"
            animate="visible"
        >
            <Navbar />
            <img
                src="@/../images/HomePage_HeroSection.png"
                alt="Home Page Hero Section"
                width={1190}
                className="w-screen h-full z-0 sticky top-0"
            />
            <motion.div
                variants={sectionVariants}
                className="z-40 absolute top-[305px] md:top-[675px] bottom-0 bg-[#1e439d] text-white px-12 py-10 items-center justify-center grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
                <div className="items-center justify-center">
                    <p className="text-4xl font-extrabold text-center text-white mb-3">
                        Explore Hands-on STEM Workshops
                    </p>
                    <p className="text-xl text-center">{desc1}</p>
                    <Link href={'/events'} className="z-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            Sign Up Now
                            <MoveRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>

                <div className="items-center justify-center">
                    <p className="text-4xl font-extrabold text-center text-white mb-3">
                        Mentorship and Collaborative Learning
                    </p>

                    <p className="text-xl text-center">{desc2}</p>
                    <Link href={'/about'} className="items-center justify-center">
                        <button className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center">
                            Learn More
                            <MoveRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>

                <div className="items-center justify-center mt-44">
                    <p className="text-4xl font-extrabold text-center text-white mb-3">
                        Free and Accesible for All
                    </p>

                    <p className="text-xl text-center">{desc3}</p>
                    <Link href={'/events'}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#1e439d] px-6 py-2 rounded-lg flex items-center gap-2"
                        >
                            Donate
                            <MoveRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>

                {/* <Circle
                    color={'red-500'}
                    color2={'green-500'}
                    title={'Heya!'}
                    content={'Did you know that we have these cool circles with fun facts in them?'}
                    y={400}
                    screenWidth={screenWidth}
                    cutoff={'l'}
                />
                <Circle
                    color={'red-500'}
                    color2={'green-500'}
                    title={'Hi Again!'}
                    content={'Whaddya think? Pretty cool right?'}
                    y={590}
                    screenWidth={screenWidth}
                    cutoff={'r'}
                /> */}
            </motion.div>
        </motion.div>
    );
}

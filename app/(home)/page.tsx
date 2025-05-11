"use client";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { Variants, Transition } from "framer-motion";
import Navbar from '@/components/navbar'
import Section2 from "@/components/section2";
import Section1 from "@/components/section1";

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
    const info = [
        [
            "Explore Hands-on STEM Workshops",
            `SF STEM Lab offers hands-on workshops designed for elementary and middle\n 
            schoolstudents, welcoming all skill levels — even beginners with little to\n
            no prior STEM experience. The workshops are structured to help students dive\n
            into a variety of engaging activities, from building robots to mastering \n
            coding, 3D printing, and CAD design. Through these interactive sessions,\n
            students gainpractical experience and a deeper understanding of how the\n
            technology works, encouraging curiosity and creativity.`,
            "Sign Up Now",
            "/events",
            "/logo.svg",
            false,
        ],
        [
        "Benefit from Mentorship and Collborative Learning",
        "At SF STEM Lab, our focus is on mentorship and collaborative learning. Experienced student mentors and professionals from the community play a key role in teaching the workshops, sharing their expertise and guiding students through the process of building and creating. This environment provides students with valuable skills and teaches the importance of teamwork, problem-solving, and working wtih others toward a common goal.",
        "Learn More",
        "/about",
        "/logo.svg",
        true,
        ],
        [
        "Free and Accessible to All",
        "SF STEM Lab's workshops are entirely free and open to all. We are commited to ensuring that students from all backgrounds have the opportunity to explore and create with STEM. SF STEM Lab aims to make high-quality STEM education available to a wider audience, helping to inspire the next generation of innovators, thinkers, and problem-solvers.",
        "Donate",
        "/donate",
        "/logo.svg",
        false,
        ],
    ];

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
    const [svgWidth, setSvgWidth] = useState(0);
    // const ORIGINAL_SIZE = [svgWidth, window.innerHeight]; 
    const [originalSize, setOriginalSize] = useState<[number, number]>([0,0]); 
    // console.log(ORIGINAL_SIZE);
    const svgHeight = 1100
    const heroImageHeight = 1000
    const imageTop = `top-[${svgHeight - 200 + heroImageHeight}px]`;


  
    
    // useEffect(() => {
    //     const handleResize = () => {
    //         setSvgWidth(window.innerWidth);
    //         setOriginalSize([window.innerWidth, window.innerHeight])
    //         // console.log('window: '+window.innerWidth)
    //     };

    //     // Set initial size
    //     handleResize();
    //     // Update size on window resize
    //     window.addEventListener("resize", handleResize);

    //     // Cleanup on unmount
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);
    
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //     ([entry]) => {
    //         if (entry.isIntersecting) {
    //         setIsInView(true);
    //         }
    //     },
    //     { threshold: 0.5 }
    //     );

    //     if (ref.current) {
    //     observer.observe(ref.current);
    //     }

    //     return () => {
    //     if (ref.current) {
    //         observer.unobserve(ref.current);
    //     }
    //     };
    // }, []);

    return (
        <motion.div
            className="w-full bg-white min-h-screen justify-center text-black relative"
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
            >
                <Navbar />
                <img 
                    src='@/../images/HomePage_HeroSection.png' 
                    alt='Home Page Hero Section'  
                    width={1190} 
                    className={`w-screen h-screen z-0`} 
                />
                
                { info &&
                    <motion.div variants={sectionVariants} className='z-40 bg-red-500'>
                        <Section1 width={svgWidth} height={svgHeight} />
                    </motion.div>
                }
                <div>
                    <img 
                        src="/images/homePage_Image2.png"
                        // x={0}
                        width={svgWidth*2/3}
                        height={svgWidth*2/3}
                        // preserveAspectRatio="xMidYMid slice"
                        className={`z-10 absolute top-[1675px]`}
                    />
                    <img 
                        src="/images/homePage_Image1.png"
                        // x={600-150}
                        // y={1100}
                        width={svgWidth*2/3}
                        height={svgWidth*2/3}
                        // height="150"
                        // preserveAspectRatio="xMidYMid slice"
                        className={`z-10 absolute top-[1542px] right-0`}
                    />
                </div>
                { info && 
                    <motion.div variants={sectionVariants} className='z-50 bg-red-500'>
                        <Section2 width={svgWidth} height={svgHeight} />
                    </motion.div>
                }
        </motion.div>
    );
}

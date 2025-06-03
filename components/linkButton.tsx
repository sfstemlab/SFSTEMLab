import React from 'react'
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Link from 'next/link'
interface LinkButtonProps {
    href: string;
    title: string;
}
const LinkButton = ({href, title}: LinkButtonProps) => {
    return (
        <Link href={href} className="z-10">
            <motion.button
                whileHover={{ scale: 1.075 }}
                whileTap={{ scale: 0.925 }}
                className="bg-cardColor text-white font-bold px-6 py-2 rounded-lg flex items-center mt-4 space-x-2 border-2 border-brand"
            >
                <h1>{title}</h1>
                <MoveRight className="w-5 h-5" />
            </motion.button>
        </Link>
    );
}

export default LinkButton
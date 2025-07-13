import { motion } from 'framer-motion' 
import { Star } from 'lucide-react'; 


export interface DifficultyProps {
    level: number;
}

export default function DifficultyIndicator({ level} : DifficultyProps) {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1)


    return (
        <div className="mx-1 my-2 flex flex-row rounded-sm bg-brand/60 justify-center text-redBrand py-1 pb-2 px-3 items-center text-center h-1/6">
            {stars.map((star) => {
                const isActive = star <= level;

                return (
                    <motion.div
                        key={star}
                        initial={{ scale: 0}}
                        animate={{ scale: isActive ? 1 : 0.8 , rotate: isActive ? [0, 10, -10, 0] : 0}}
                        transition={{
                            type: 'spring',
                            stiffness: isActive ? 300 : 100, 
                            damping: 20, 
                            delay: star * 0.03
                        }}
                        whileHover={isActive ? { scale: 1.2, rotate: 0} : { scale: 1}}
                    >
                        <Star
                            size={20}
                            className={`text-transparent ${isActive ? 'fill-redBrand' : 'fill-gray-500'}`}
                            // fill={isActive ? 'yellow' : 'gray'}
                        />
                    </motion.div>
                )
            })}
        </div>

    )
}
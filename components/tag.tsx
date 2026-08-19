import { cn } from '@/lib/utils';
import React from 'react'

interface TagProps {
    value: string;
    variant?: 'normal' | 'frc' | 'subtle';
    className?: string;
}

const Tag = ({ value, variant = "normal", className }: TagProps) => {

  const baseStyles = "bg-redBrand text-white text-sm rounded-full px-3 py-1 flex text-center items-center justify-center whitespace-nowrap";
  const variants = {
    normal: "bg-redBrand text-white", 
    frc: "bg-brand text-white",
    subtle: "bg-white/10 text-white hover:bg-white/20"
  }


  return (
    <h1 className={cn(baseStyles, variants[variant], className)}>
      {value}
    </h1>
  )
}

export default Tag

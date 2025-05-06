"use client"
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DropdownMenuCheckboxes } from "./ui/dropdown-menu-checkboxes";

interface PitScoutingQuestionProps {
  content: string;
  inputType: 'number' | 'select' | 'multi-select';
  options?: string[]; // Options for multi-select
  onChange: any;
}

const PitScoutingQuestion = ({
    content, 
    inputType, 
    options = [], 
    onChange}: PitScoutingQuestionProps) => {
    if (inputType === 'select') {
        console.log(options)
    }
    return (
        <div className="rounded-md bg-[#b1d5e6]/65 px-2 pt-3 pb-2 hover:bg-[#b1d5e6]/70 transition duration-500 ease-in-out items-center justify-center ">
            <h3 className='text-white font-semibold text-center items-center justify-center'>{content}</h3>
            {inputType === 'number' && 
                <input 
                    className="p-1 text-center bg-[#b1d5e6]/75 rounded-md w-full hover:bg-[#b1d5e6]/90 transition duration-500 ease-in-out placeholder-gray-500"
                    type="number"
                    onChange={onChange}
                    placeholder='0000'
                    />
            }            
            {inputType === 'select' && 
                <select  
                    className='p-1 text-center bg-[#b1d5e6]/75 rounded-md w-full h-auto hover:bg-[#b1d5e6]/90 transition duration-500 ease-in-out placeholder-gray-500'
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            }
            {inputType === 'multi-select' && 
                <DropdownMenuCheckboxes content={content} possibilities={options} onChange={onChange} />
            }
        </div>
    );
};

export default PitScoutingQuestion;

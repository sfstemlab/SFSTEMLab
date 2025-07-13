// CollaboratorsAccordion.tsx
import { Person } from '@/types/types';
import React, { useState, useRef, FC } from 'react';

// Define the props for the component
interface CollaboratorsAccordionProps {
  collaborators: Person[];
}

// Utility function for conditional classNames
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const CollaboratorsAccordion: FC<CollaboratorsAccordionProps> = ({ collaborators }) => {
    const [expandedProfile, setExpandedProfile] = useState<Person | null>(null);
    const collaboratorsContainerRef = useRef<HTMLDivElement | null>(null);

    const toggleExpandedProfile = (profile: Person) => {
        setExpandedProfile(expandedProfile && expandedProfile?.name === profile.name ? null : profile);
    };

    return (
        <div className="flex flex-col w-full md:w-1/3">
            {/* Section title */}
            <h2 className="text-center items-center w-full font-extrabold text-4xl mb-4">
                Our Collaborators
            </h2>
            {/* Accordion container */}
            <div
                className=" mx-4 rounded-md flex flex-col overflow-x-scroll no-scrollbar"
                ref={collaboratorsContainerRef}
            >
                {/* Map over collaborators to create accordion items */}
                {collaborators.length > 0 &&
                collaborators.map((collaborator, index) => (
                    <div key={index} className="mb-2">
                    {/* Accordion header button */}
                    <button
                        className={cn(
                        'w-full h-24 items-center py-2 pl-2 pr-1 rounded-md flex border-2 border-brand-dark transition duration-700 ease-in-out focus:outline-none',
                        expandedProfile === collaborator
                            ? 'bg-brand/90 hover:bg-brand-light/80 text-darkBlue'
                            : 'bg-cardColor hover:bg-cardColor-light text-white'
                        )}
                        onClick={() => toggleExpandedProfile(collaborator)}
                        aria-expanded={expandedProfile === collaborator}
                        aria-controls={`collaborator-panel-${index}`}
                        type="button"
                    >
                        {/* Collaborator image */}
                        <img
                        width={80}
                        src={collaborator.picture}
                        alt={collaborator.name}
                        />
                        {/* Collaborator name */}
                        <h3 className="ml-4 font-bold text-lg text-left">
                        {collaborator.name}
                        </h3>
                    </button>
                    {/* Accordion panel: only show if this item is expanded */}
                    {expandedProfile === collaborator && (
                        <div className="text-center mb-9 items-center w-full flex flex-col p-4 md:p-0">
                            <p className="text-lg text-center">{expandedProfile.bio}</p>
                        </div>
                    )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollaboratorsAccordion;

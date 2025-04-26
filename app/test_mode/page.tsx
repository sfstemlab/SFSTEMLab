"use client";

import React, { useEffect, useState } from "react";

export default function TestPage() {
    const [cards, setCards] = useState([]); // Store fetched cards
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const [activeUsers, setActiveUsers] = useState(100); 

    useEffect(() => {
      console.log(`Active users: ${activeUsers}`);
      async function fetchCards() {
            try {
                const response = await fetch("/api/cards"); // Fetch data from the API
                if (!response.ok) {
                    throw new Error(`Failed to fetch cards: ${response.statusText}`);
                }
                const data = await response.json();
                setCards(data); // Set fetched data to state
            } catch (err: any) {
                console.error(err.message);
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // End loading state
            }
        }

        fetchCards(); 
    }, [activeUsers]); // Empty dependency array ensures this runs only once on mount

    // Show loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render fetched cards
    return (
        <div>
            <p>active: {activeUsers}</p>
            <ul>
                {cards.map((card: any) => (
                    <li key={card.id}>
                        ID: {card.id}, Rarity: {card.rarity}, CMC: {card.cmc}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => setActiveUsers((prev) => prev + 1)}
                className='border'
                >
                  + users
                </button>
        </div>
    );
}

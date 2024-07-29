'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
}

const PerformancePage = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

    useEffect(() => {
        const measurePerformance = () => {
            const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            const paintEntries = performance.getEntriesByType('paint') as PerformanceEntry[];

            if (navigationEntries.length > 0) {
                const navEntry = navigationEntries[0];
                const loadTime = navEntry.loadEventEnd - navEntry.startTime;
                const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.startTime;

                const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0;
                const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;

                setMetrics({
                    loadTime,
                    domContentLoaded,
                    firstPaint,
                    firstContentfulPaint
                });

                console.log('Navigation Entries:', navigationEntries);
                console.log('Paint Entries:', paintEntries);
            }
        };

        window.addEventListener('load', measurePerformance);
        return () => window.removeEventListener('load', measurePerformance);
    }, []);

    return (
        <div className="min-h-screen flex flex-col w-full justify-center items-center bg-[#1a202c] p-6 text-white">

            <h1 className="text-3xl font-bold mb-6">Performance Metrics</h1>
            {metrics ? (
                <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
                    <p>Load Time: {metrics.loadTime.toFixed(2)} ms</p>
                    <p>DOM Content Loaded: {metrics.domContentLoaded.toFixed(2)} ms</p>
                    <p>First Paint: {metrics.firstPaint.toFixed(2)} ms</p>
                    <p>First Contentful Paint: {metrics.firstContentfulPaint.toFixed(2)} ms</p>
                </div>
            ) : (
                <p>Loading performance metrics...</p>
            )}
        </div>
    );
};

export default PerformancePage;

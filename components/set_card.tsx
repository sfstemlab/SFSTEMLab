import { BarChart3, Play } from "lucide-react";
import { useState } from "react"; 
import Link from "next/link";

interface CardProps {
    key: number;
    setName: string;
    setAbbr: string;
    setDesc?: string;
    setIcon: string;
    tags: string[];
    releaseDate: string;
    setType: string;
}

interface Stats {
    commons: any;
    uncommons: any;
    rares: any;
    mythics: any;
    total: any;
}

const Set_Card = ({ setName, setAbbr, setDesc, setIcon, tags, releaseDate, setType }: CardProps) => {
    const initialStats: Stats = {
        commons: '...',
        uncommons: '...',
        rares: '...',
        mythics: '...',
        total: '...',
    };

    const [stats, setStats] = useState<Stats>(initialStats);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [statsVisible, setStatsVisible] = useState(false);

    const fetchStats = async (rarity: string) => {
        const link = `https://api.scryfall.com/cards/search?q=s:${setAbbr.toLowerCase()}+r:${rarity}`;
        try {
            const res = await fetch(link);
            if (!res.ok) {
                throw new Error('Response failed');
            }
            const data = await res.json();
            return data.total_cards;
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            return '0';
        }
    };

    const fetchAllStats = async () => {
        if (statsVisible) {
            setStatsVisible(false);
            return;
        }
        setStatsVisible(true);
        const commons = await fetchStats('c');
        const uncommons = await fetchStats('u');
        const rares = await fetchStats('r');
        const mythics = await fetchStats('m');
        const total = await fetchStats('');
        setStats({ commons, uncommons, rares, mythics, total });
        setLoading(false);
    };

    return (
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg border border-gray-600 overflow-hidden max-w-full p-6 mb-4">
            <div className="flex items-center mb-4">
                <img src={setIcon} alt="set icon" className="w-16 h-16 p-2 mr-4 bg-gray-600 rounded-lg shadow-lg" />
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{setName}</h2>
                    <p className="text-gray-400">{setAbbr.toUpperCase()} • {setType}</p>
                    <p className="text-gray-400">Released: {releaseDate}</p>
                    {setDesc && <p className="text-gray-300 mt-2">{setDesc}</p>}
                </div>
                <div className="flex space-x-3">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <select className="py-2 px-3 text-xl bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md">
                    <optgroup label='Booster Products'>
                        <option value="collector-booster">Collector Booster</option>
                        <option value="collector-booster-box">Collector Booster Box</option>
                        <option value="draft-booster">Draft Booster</option>
                        <option value="draft-booster-box">Draft Booster Box</option>
                        <option value="play-booster">Play Booster</option>
                        <option value="play-booster-box">Play Booster Box</option>
                        <option value="set-booster">Set Booster</option>
                        <option value="set-booster-box">Set Booster Box</option>
                    </optgroup>
                </select>
                <div className="flex space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-800 transition duration-300 h-12 w-12 rounded-lg p-2" onClick={fetchAllStats}>
                        <BarChart3 className="h-full w-full text-emerald-500" />
                    </button>
                    <Link href={`/simulate/${setAbbr.toLowerCase()}`} className="bg-gray-700 hover:bg-gray-800 transition duration-300 h-12 w-12 rounded-lg p-2 flex items-center justify-center">
                        <Play className="h-full w-full text-emerald-500" />
                    </Link>
                </div>
            </div>
            {statsVisible && (
                <div className="mt-4 text-gray-200">
                    <h3 className="text-lg font-bold mb-2">Set Statistics</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Commons:</div><div>{stats.commons}</div>
                        <div>Uncommons:</div><div>{stats.uncommons}</div>
                        <div>Rares:</div><div>{stats.rares}</div>
                        <div>Mythics:</div><div>{stats.mythics}</div>
                        <div>Total:</div><div>{stats.total}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Set_Card;

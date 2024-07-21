import { BarChart3, Play } from "lucide-react"
import Pill from "./pill"
import { useState, useEffect } from "react"; 
import Card from '@/components/card'
import Image from "next/image";
import Link from "next/link";

interface CardProps {
    key:number;
    setName:string;
    setAbbr:string;
    setDesc?:string;
    setIcon:string;
    tags:string[];

}

interface Stats {
    commons:any;
    uncommons:any;
    rares:any;
    mythics:any;
    total:any;

}


const Set_Card = ({setName, setAbbr, setDesc, setIcon, tags}:CardProps) => {
   
    const initialStats: Stats = {
        commons: '...',
        uncommons: '...',
        rares: '...',
        mythics: '...',
        total: '...',
    };

    const [stats, setStats] = useState<Stats>(initialStats);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [statsVisible, setStatsVisible] = useState(false)

    const fetchStats = async (rarity:string)=>{
        const link = `https://api.scryfall.com/cards/search?q=s:${setAbbr.toLowerCase()}+r:${rarity}`
        try {
            const res = await fetch(link)
            if (!res.ok){
                throw new Error ('response failed')
            }
            const data = await res.json()
            
            return data.total_cards
        }

        catch(error:any) {
            setError(error)
            setLoading(false)
            return '0'
        }

    }

    const fetchAllStats = async (set:string)=>{
        if (statsVisible){
            setStatsVisible(false)
            return
        }
        setStatsVisible(true)
        const commons = await fetchStats('c')
        const uncommons = await fetchStats('u')
        const rares = await fetchStats('r')
        const mythics = await fetchStats('m')
        const total = await fetchStats('')
        setStats({commons, uncommons, rares, mythics, total})
        setLoading(false)
    }

  return (
    <div className={`bg-gradient-to-r from-gray-500/40 to-gray-700/30 rounded-lg border-[3px] border-gray-500/70 overflow-hidden max-w-full p-4 ${statsVisible ? 'h-80' : 'h-[5.5rem]'}`} id="card-parent">
            <div className="card-header flex space-x-3 mb-2 relative">
                <div className = 'flex-row text-truncate w-[300px]'>
                    <h2 className = 'underline underline-offset-2 '>{setName}</h2>
                    <h2 className = 'underline underline-offset-2 '>{setAbbr}</h2>
                </div>

                <div className="text-center h-full relative bg-gray-600 backdrop-blur-sm rounded-lg shadow-lg">
                    <img src={setIcon}
                        alt="set icon" 
                        className="w-12 h-12 p-1"  
                    />
                </div>


                <div className="flex place-self-center p-2 space-x-3">
                    {tags.map((tag, index) => (
                        <Pill key={index} value={tag} />
                    ))}
                </div>

                <select className="absolute p-1 ml-20 place-self-center text-xl bg-gray-700 rounded-md text-center right-32" id="pack-select">
                    <optgroup label='Booster Products'>
                        <option value="collector-booster">Collector Booster</option>
                        <option value="collector-booster-box">Collector Booster Box</option>
                        <option value="draft-booster">Draft Booster</option>
                        <option value="draft-booster-box">Draft Booster Box</option>
                        <option value="play-booster">Play Booster</option>
                        <option value="play-boooster-box">Play Booster Box</option>
                        <option value="set-booster">Set Booster</option>
                        <option value="set-booster-box">Set Booster Box</option>
                    </optgroup>
                </select>

                <button className="absolute bg-gray-700 hover:bg-gray-800 transition duration-300 h-12 w-12 rounded-lg right-16 top-0 p-2" onClick={() => fetchAllStats(setAbbr)}>
                    <BarChart3 className="absolute top-0 left-0 p-2 h-12 w-12 text-emerald-500 rounded-lg" /> 
                </button>
                <Link href="/simulate" className="absolute bg-gray-700 hover:bg-gray-800 transition duration-300 h-12 w-12 rounded-lg right-1 top-0 p-2">
                    <Play className="absolute top-0 left-0 p-2 h-12 w-12 text-emerald-500 rounded-lg" />
                </Link>

            </div>
            {statsVisible && (
            <div className="flex">
                <hr className="mt-6 mx-8 mb-3 text-white"></hr>
                <div className = "grid grid-cols-2 w-1/4">
                    <p>Commons: </p>
                    <p>{stats.commons}</p>
                    <p>Uncommons: </p>
                    <p>{stats.uncommons}</p>
                    <p>Rares: </p>
                    <p>{stats.rares}</p>
                    <p>Mythics: </p>
                    <p>{stats.mythics}</p>
                    <p>Total: </p>
                    <p>{stats.total}</p>
                </div>
                <div>
                <h2 className="text-center font-bold">Most Valueable Cards</h2>
                <div className="expensive_card_images w-full grid grid-cols-5 gap-6 mt-1">
                    {/* <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card /> */}
                    
                </div>
                </div>
            </div>
            )}
            

        </div>
  )
}

export default Set_Card
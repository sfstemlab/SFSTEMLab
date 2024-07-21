"use client"; 
import Set_Card from '@/components/set_card';
import Pill from '@/components/pill';
import { Play, BarChart3, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from "react"; 



interface Set {
    card_count: number,
    code: string, 
    icon_svg_uri: string,
    id: string, 
    name: string, 
    parent_set_cde:string,
    released_at: string,
    set_type: string, 
    tags: string[],
}

const SetsPage = () => {
 
    const [sets, setSets] = useState<Set[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    

    useEffect(()=>{
        const fetchSets = async ()=>{
            try {
                const res = await fetch('https://api.scryfall.com/sets')
                if (!res.ok){
                    throw new Error ('response failed')
                }
                const data = await res.json()
                const badSetTypes = ['commander','promo','token','memorabilia','alchemy','masterpiece','minigame','funny','box','arsenal','duel_deck','spellbook','planechase','from_the_vault','archenemy','starter','premium_deck']
                const date = new Date()
                console.log([data.data[0].set_type])
                const mappedSets: Set[] = data.data.filter(
                        (set: { set_type: string; digital: boolean; released_at:string; parent_set_code:string; code:string;}) => 
                        badSetTypes.includes(set.set_type) == false &&
                        set.digital == false &&
                        new Date(set.released_at) <= date)
                        .map((set: any) => ({
                            name: set.name,
                            code: set.code.toUpperCase(),
                            tags: [set.set_type.replaceAll('_',' ')],
                            icon_svg_uri: set.icon_svg_uri
                        }));
                console.log(mappedSets[0].tags)
                setSets(mappedSets);
                setLoading(false)
            }
            catch(error:any) {
                setError(error)
                setLoading(false)
            }
        }
        fetchSets()
    }, [])
    
    function filterSets(sets:Array<any>){
        const badSetTypes = ['commander','promo','token','memorabilia','alchemy','masterpiece','minigame','funny','box','arsenal','duel_deck','spellbook','planechase','from_the_vault','archenemy','starter','premium_deck']
        const date = new Date()
        // let day = date.getDate()
        // let month = date.getMonth() + 1
        // let year = date.getFullYear()
        // let currentDate = `${day}-${month}-${year}`


        sets.filter(
            (set: { set_type: string; digital: boolean; released_at:string;}) => 
            badSetTypes.includes(set.set_type) == false && 
            set.digital == false &&
            new Date(set.released_at) <= date
        )
        return sets
    }
   
    if(loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
                <div className="loader mb-4"></div>
                <p className="text-2xl font-bold">Fetching sets...</p>
            </div>
        )
   }

   if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-pink-900 text-white">
                <AlertTriangle className="h-20 w-20 text-yellow-500 mb-4 animate-bounce" />
                <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
                <p className="text-lg mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-600 transition-colors"
                    >
                    Retry
                </button>
            </div>
        )
   }

   console.log('set data', sets[0])
  return (
    <div className="pt-16 px-24 min-h-screen justify-items-center bg-gray-950">
        <h1 className="text-2xl font-bold mb-8 text-center">
            Welcome to my MTG pack simulator! 
        </h1>
        {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 */}

        <div className='space-y-3 items-center'>
            {
            sets.map((set, index)=>(
                <Set_Card 
                    key={index}
                    setName={set.name}
                    setAbbr={set.code}
                    // setDesc={set.setDesc}
                    setIcon={set.icon_svg_uri}
                    tags={set.tags}
                />
                ))}
        </div>
    </div>
   

  )
}

export default SetsPage
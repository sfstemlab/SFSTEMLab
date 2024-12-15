"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ArrowBigLeftDash, EllipsisVertical } from "lucide-react";

import Card from "@/components/card";
import useFetchCardData from "@/hooks/useFetchCardData";
import { CardData } from "@/types/types";
// import SelectDropdown from "@/components/SelectDropdown";
import CustomSelect from "@/components/CustomSelect";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// TODO: Make sideways/double-sided/flip cards work
// TODO:Finish collector booster construction
// TODO:Make function for sorting
// TODO:Add function for menu btn to open options popup with options zoom, show chances (of getting this combination of rarity or a certain card), search for card, buy product, quick switch set
// TODO:

// Define interfaces for Outcome and Booster types
interface SetChance {
	set: string;
	chance: number;
}

interface Outcome {
	commons?: number;
	uncommons?: number;
	rares?: number;
	mythics?: number;
	chance: number;
}

interface BoosterType {
	slot: number;
	set: SetChance[];
	chances: Outcome[];
}

interface Outcomes {
	setbooster: BoosterType[];
	playbooster: BoosterType[];
	collectorbooster: BoosterType[];
}

// Sample data for outcomes
const outcomes: Outcomes = {
  setbooster: [
    {
		slot: 1,
		set: [{ set: "main", chance: 100 }],
		chances: [
			{ commons: 5, uncommons: 1, chance: 35 },
			{ commons: 4, uncommons: 2, chance: 40 },
			{ commons: 3, uncommons: 3, chance: 12.5 },
			{ commons: 2, uncommons: 4, chance: 7 },
			{ commons: 1, uncommons: 5, chance: 3.5 },
			{ commons: 0, uncommons: 6, chance: 2 },
		]
    },
    {
		slot: 2,
		set: [{ set: "main", chance: 100 }],
		chances: [
			{ commons: 1, chance: 50 },
			{ uncommons: 1, chance: 50 },
		]
    },
    {
		slot: 3,
		set: [{ set: "main", chance: 100 }],
		chances: [
			{ commons: 2, chance: 49 },
			{ commons: 1, uncommons: 1, chance: 24.5 },
			{ commons: 1, rares: 1, chance: 8.75 },
			{ commons: 1, mythics: 1, chance: 8.75 },
			{ uncommons: 2, chance: 3.1 },
			{ uncommons: 1, rares: 1, chance: 2.15 },
			{ uncommons: 1, mythics: 1, chance: 2.15 },
			{ rares: 2, chance: 0.8 },
			{ mythics: 2, chance: 0.8 },
		]
    },
    {
      slot: 4,
      set: [{ set: "main", chance: 100 }],
      chances: [
        { rares: 1, chance: 86.5 },
        { mythics: 1, chance: 13.5 },
      ]
    },
    {
      slot: 5,
      set: [{ set: "main", chance: 100 }],
      chances: [
        { commons: 1, chance: 25 },
        { uncommons: 1, chance: 25 },
        { rares: 1, chance: 25 },
        { mythics: 1, chance: 25 },
      ]
    },
  ],

  playbooster: [
    {
      slot: 1,
      set: [{ set: "main", chance: 100 }],
      chances: [{ commons: 6, chance: 100 }]
    },
    {
      slot: 2,
      set: [
        { set: "main", chance: 98.5 },
        { set: "spg", chance: 1.5 },
      ],
      chances: [{ commons: 1, chance: 100 }]
    },
	{
		slot: 3,
		set: [{ set: "main", chance: 100 }],
		chances: [{ uncommons: 3, chance: 100 }]
	},
	{
		slot: 4,
		set: [{ set: "main", chance: 100 }],
		chances: [
			{ commons: 1, chance: 25 },
			{ uncommons: 1, chance: 25 },
			{ rares: 1, chance: 25 },
			{ mythics: 1, chance: 25 },
		  ]
	},
	{
		slot: 5,
		set: [{ set: "main", chance: 100 }],
		chances: [
			{rares: 1, chance: 87.5},
			{mythics: 1, chance: 12.5}
		]
	},
	{
		slot: 6,
		set: [{ set: "main", chance: 100 }],
		chances: [
			{ commons: 1, chance: 25 },
			{ uncommons: 1, chance: 25 },
			{ rares: 1, chance: 25 },
			{ mythics: 1, chance: 25 },
		  ]
	},
  ],

  collectorbooster: [
	// {
	// 	slot: 1
	// 	set: [{}]
	// }
  ],
};

const Simulator = () => {
  const { slug } = useParams();
  const set = slug as string;
  const { data, loading, error } = useFetchCardData(set);

  const [booster, setBooster] = useState<keyof Outcomes>("playbooster");
  const [simulated, setSimulated] = useState(false);
  const [simulatedCards, setSimulatedCards] = useState<CardData[]>([]);
  const [selectedOutcomes, setSelectedOutcomes] = useState<Outcome[] | null>(
    null
  ); // Store all selected outcomes
  const [sortCriteria, setSortCriteria] = useState('price');
  const [sortDirection, setSortDirection] = useState('desc')

  const sortSimulatedCards = (cards: CardData[]) => {
	return cards.sort((a,b) => {
		let comparison = 0;

		// sort by price
		if(sortCriteria === 'price') {
			const priceA = parseFloat(a.prices?.usd || "0")
			const priceB = parseFloat(b.prices?.usd || "0")
			comparison = priceA - priceB;
		}

		// sort by name
		if(sortCriteria === 'name') {
			comparison = a.name.localeCompare(b.name);
		}

		//handle ascending/descending order 
		return sortDirection === 'asc' ? comparison : -comparison
	})


  }

  // Get the selected outcomes for all slots based on booster type
  const getSelectedOutcome = (boosterType: keyof Outcomes): Outcome[] => {
    const boosterSlots = outcomes[boosterType];
    let selectedOutcomes: Outcome[] = [];

    boosterSlots.forEach((slot) => {
      const boosterChances = slot.chances;
      const totalChance = boosterChances.reduce(
        (total, chance) => total + chance.chance,
        0
      );
      const randomChoice = Math.random() * totalChance;

      let cumulativeChance = 0;
      for (let chance of boosterChances) {
        cumulativeChance += chance.chance;
        if (randomChoice <= cumulativeChance) {
          selectedOutcomes.push(chance); // Store the selected outcome for each slot
          break; // Break once we find the selected outcome for this slot
        }
      }
    });

    return selectedOutcomes;
  };

  // Get random cards from the fetched data
  const getRandomCards = (cards: CardData[], count: number): CardData[] => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Simulate the booster pack
  const simulate = () => {
    if (data) {
		setSimulated(true);
		const outcomesForAllSlots = getSelectedOutcome(booster);
		setSelectedOutcomes(outcomesForAllSlots);
		const sortedCards = sortSimulatedCards([...simulatedCards])
		setSimulatedCards(sortedCards)

		// Fetch cards based on the selected outcomes
		const commons = data.filter((card) => card.rarity === "common");
		const uncommons = data.filter((card) => card.rarity === "uncommon");
		const rares = data.filter((card) => card.rarity === "rare");
		const mythics = data.filter((card) => card.rarity === "mythic");

		// Randomly select cards for each slot
		let boosterCards: CardData[] = [];
		outcomesForAllSlots.forEach((outcome) => {
		const boosterCommons = getRandomCards(commons, outcome?.commons || 0);
		const boosterUncommons = getRandomCards(
			uncommons,
			outcome?.uncommons || 0
		);
		const boosterRares = getRandomCards(rares, outcome?.rares || 0);
		const boosterMythics = getRandomCards(mythics, outcome?.mythics || 0);
		// Combine all selected cards for this slot
		boosterCards = [
			...boosterCards,
			...boosterCommons,
			...boosterUncommons,
			...boosterRares,
			...boosterMythics,
        ];
      });

      setSimulatedCards(boosterCards);
    } else {
		setSimulated(false);
    }
  };

  // Simulate on component mount and whenever the set changes
  useEffect(() => {
    simulate();
  }, [set]);

  // TODO: add useEffect for when sorting priority changes

  const SelectDropdown = () => {

	return (
		<div>
			<select
				className="py-2 mb-2 text-xl bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md text-center"
				value={booster}
				onChange={(e) => setBooster(e.target.value as keyof Outcomes)}
			>
				<optgroup label='Booster Products'>
					<option value="playbooster">Play Booster</option>
					<option value="draftbooster">Draft Booster</option>
					<option value="collectorbooster">Collector Booster</option>
					<option value="collectorbooster-box">Collector Booster Box</option>
					<option value="draftbooster-box">Draft Booster Box</option>
					<option value="playbooster-box">Play Booster Box</option>
					<option value="setbooster">Set Booster</option>
					<option value="setbooster-box">Set Booster Box</option>
				</optgroup>
			</select>
		</div> 
		);
};

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-black to-gray-800 p-6">
      	<div className="w-full max-w-5xl bg-gradient-to-r from-gray-800 via-gray-900 to-white/5 border border-gray-700 shadow-lg rounded-lg p-6">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-4 text-gray-200">
					Welcome to the Simulator!
				</h1>
				<div className="flex space-x-3 justify-center">
					<Link
					href="/sets"
					className="flex h-10 items-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-4 rounded-md transition duration-300"
					>
						<ArrowBigLeftDash />
					</Link>
					<SelectDropdown />
					<button 
					className = "flex h-10 items-center bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-1 px-4 rounded-md transition duration-300"
					>
						<EllipsisVertical />
					</button>
				</div>
				<button
					className="w-full bg-indigo-600 hover:bg-indigo-500 text-gray-200 font-bold py-3 px-6 rounded-md transition duration-300 mb-4"
					onClick={simulate}
				>
					Simulate
				</button>
				<p className='mb-3 text-white/75 text-[18px] text-balance'><strong>Note: </strong>The simulator does not show basic land slots, tokens, ad cards, play aides, or art cards, although it can randomly generate lands. (including basics)</p>
				{loading && <div className="text-lg text-gray-200">Loading...</div>}
				{error && <div className="text-lg text-red-500">{error}</div>}
				{selectedOutcomes && (
					<div className="text-gray-200 text-xl mb-4 items-center gap-8 justify-center ">
						<p className="">
							<strong>Stats:</strong>
						</p>
						{(() => {
							const totalC = selectedOutcomes.reduce((acc, outcome) => acc + (outcome.commons || 0),0);
							const totalU = selectedOutcomes.reduce((acc, outcome) => acc + (outcome.uncommons || 0),0);
							const totalR = selectedOutcomes.reduce((acc, outcome) => acc + (outcome.rares || 0),0);
							const totalM = selectedOutcomes.reduce((acc, outcome) => acc + (outcome.mythics || 0),0);

							return (
								<div className="md:flex md:justify-center gap-8">
									<div className="flex justify-center gap-8">
										<p>Commons: {totalC}</p>
										<p>Uncommons: {totalU}</p>
									</div>
									<div className="flex justify-center gap-8">
										<p>Rares: {totalR}</p>
										<p>Mythics: {totalM}</p>
									</div>
								</div>
							);
						})()}
						<div className = 'flex justify-center gap-4'>
							<select
							onChange = {(event) => setSortCriteria(event.target.value)}
							className = 'bg-gray-700/60 rounded-lg backdrop-blur-lg shadow-md py-2 pl-2'>
								<optgroup label='Sort By'>
									<option value='price'>Price</option>
									<option value='name'>Name</option>
									<option value='rarity'>Rarity</option>
									<option value='color'>Color</option>
									<option value='type'>Type</option>
								</optgroup>
							</select>
							<select 
							onChange = {(event) => setSortDirection(event.target.value)}
							className='bg-gray-700/60 rounded-lg backdrop-blur-lg shadow-md py-2 pl-2'>
								<optgroup label='Sort Order'>
									<option value='descending'>Desc.</option>
									<option value='ascending'>Asc.</option>
								</optgroup>
							</select>
						</div>
					</div>
				)}
			</div>
			<Tabs defaultValue="gallery" className="w-full">
				<TabsList className="flex items-center justify-center space-x-4 bg-gray-700/30 p-2 rounded-lg backdrop-blur-lg shadow-md">
					<TabsTrigger
						value="gallery"
						className="text-white text-lg hover:text-gray-300 transition-all"
						>
						Gallery
					</TabsTrigger>
					<TabsTrigger
						value="table"
						className="text-white text-lg hover:text-gray-300 transition-all"
						>
						Table
					</TabsTrigger>
					<TabsTrigger
						value="stacks"
						className="text-white text-lg hover:text-gray-300 transition-all"
						>
						Stacks
					</TabsTrigger>
				</TabsList>

				<TabsContent value="gallery" className="mt-6">
					<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{simulatedCards.map((card, index) => (
						<Card
						key={index}
						name={card.name}
						cardImage={card.cardImage}
						prices={card.prices}
						set={card.set}
						related_uris={card.related_uris}
                        rarity={card.rarity}
                        colors={card.colors}
                        typeline={card.typeline}
						/>
					))}
					</div>
				</TabsContent>

				<TabsContent value="table" className="mt-6">
					<Table className="w-full text-white">
						<TableCaption className="text-gray-400">
							A list of simulated cards.
						</TableCaption>
						<TableHeader>
							<TableRow className="border-b border-gray-600">
								<TableHead>Price</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Rarity</TableHead>
								<TableHead>Color</TableHead>
								<TableHead>Type</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{simulatedCards.map((card, index) => (
								<TableRow
									key={index}
									className="border-b border-gray-700 hover:bg-gray-800/50 transition-all"
								>
									<TableCell className="text-gray-400">
										{card.prices?.usd ? `$${card.prices.usd}` : "N/A"}
									</TableCell>
									<TableCell className="font-medium text-gray-300">
										{card.name}
									</TableCell>
									<TableCell className="text-gray-400">
										{card.rarity}
									</TableCell>
									<TableCell className="text-gray-400">
										{card.colors || "C"}
									</TableCell>
									<TableCell className="text-gray-400">
										{card.typeline || "N/A"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TabsContent>



				<TabsContent value="stacks" className="text-white mt-6 text-center">
					Stacks view coming soon...
				</TabsContent>
			</Tabs>
      	</div>
    </div>
  );
};

export default Simulator;

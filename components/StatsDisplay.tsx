import { CardData, CardProps, Stats, StatsDisplayProps } from "@/types/types";
import Card from "./card";
import { fetchCardData } from "@/utils/api";



const StatsDisplay = ({ set, stats, loading, error }: StatsDisplayProps) => {
	const valuableCards = fetchCardData(set)
	console.log(valuableCards)
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<div>
			<div className="w-1/2 grid grid-cols-2 gap-2 text-sm">
				<div>Commons:</div><div>{stats.commons}</div>
				<div>Uncommons:</div><div>{stats.uncommons}</div>
				<div>Rares:</div><div>{stats.rares}</div>
				<div>Mythics:</div><div>{stats.mythics}</div>
				<div>Total:</div><div>{stats.total}</div>
			</div>
			<div>
				<p className='font-bold text-xl'>Most Valuable Cards</p>
				<div className='grid grid-cols-5 gap-2'>
					{/* <Card cardName={valuableCards[0].name} cardImage={valuableCards[0].image} prices={valuableCards[0].prices} edhrec_link={valuableCards[0].echrec_link} //TODO: Make this work */}
				</div>
			</div>
		</div>
		);
	};

export default StatsDisplay;

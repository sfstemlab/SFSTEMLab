import { useState } from "react";



interface Booster {
	slots: number; 
	available_sets: string[];
	stats: object;
}

interface BoosterData {
	[key: string]: Booster
}

interface Rarity {
	number: number;
	chances: number[];
}

interface Slot {
	// represents chance from each set
	set: {
		main: number;
		spg?: number;
		list?: number;
	};
	rarities: {
		[key: string]: Rarity
	};
}

const boosterData: BoosterData = {
	playbooster: {
		slots: 13, // excluding ad cards and basics
		available_sets: ['blb', 'acr', 'mh3'],
		stats: {
			'1 - 6' : {
				'set':[['main', 100]],// confirm that the cards are from the main set (the one being simulaed, and not from spg or the list)
				'rarities':[// percent chance of getting certain rarities in this slot (pos 0 = common chance, pos 1 = uncommon, and so on)
					100,
					0,
					0,
					0
				]
			},
			'7' : {
				'set':[['main',98.5], ['spg',1.5]],// 98.5% chance of getting a card from the main set, 1.5 % chance of getting a special guest card
				'rarities':[// rarities only apply if the card is from the main set, if not, it's totally random
					100,
					0,
					0,
					0
				]
			},
			'8 - 10' : {
				'set':[['main', 100]],
				'rarities':[
					0,
					100,
					0,
					0
				]
			},
			'11' : {
				'set':[['main', 100]],
				'rarities': [
					0, 
					0, 
					87.5,
					12.5
				]
			},
			'12-13':{ // slot 12 is non-foil and 13 is foil, but we arent dealing with that yet
				'set':[['main', 100]],
				'rarities': [
					25, 
					25, 
					25,
					25
				]
			}
			
		}
			
		
	}, 
	setbooster: {
		slots: 11,
		available_sets: ['ktk','one'],
		stats: {

		}
	}
}





const SelectDropdown = () => {
	const [booster, setBooster] = useState('playbooster');

	return (
		<div>
			<select
				className="py-2 mb-2 text-xl bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md text-center"
				value={booster}
				onChange={(e) => setBooster(e.target.value)}
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

export default SelectDropdown;

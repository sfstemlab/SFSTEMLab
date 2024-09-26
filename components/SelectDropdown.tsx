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









// export default SelectDropdown;

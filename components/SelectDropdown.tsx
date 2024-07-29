import { useState } from "react";

const SelectDropdown = () => {
	const [booster, setBooster] = useState('draft-booster');

	return (
		<select
			className="py-1 mb-2 text-xl bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md"
			value={booster}
			onChange={(e) => setBooster(e.target.value)}
		>
			<optgroup label='Booster Products'>
				<option value="draft-booster">Draft Booster</option>
				<option value="play-booster">Play Booster</option>
				<option value="collector-booster">Collector Booster</option>
				<option value="collector-booster-box">Collector Booster Box</option>
				<option value="draft-booster-box">Draft Booster Box</option>
				<option value="play-booster-box">Play Booster Box</option>
				<option value="set-booster">Set Booster</option>
				<option value="set-booster-box">Set Booster Box</option>
			</optgroup>
		</select>

	);
};

export default SelectDropdown;

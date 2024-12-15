import { Set } from "@/types/types";
import Tag from "./tag";


const SetCardHeader = ({ name, abbreviation, releaseDate, icon, type }: Set) => {
	const isNew = (() => {
		const releaseDateObj = new Date(releaseDate);
		const currentDate = new Date();
		const timeDiff = currentDate.getTime() - releaseDateObj.getTime();
		const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // convert milliseconds to days
		return daysDiff <= 30;
	})();

	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-3">
			<div className="flex items-center gap-4">
				<img
					src={icon}
					alt="set icon"
					className="w-12 h-12 sm:w-16 sm:h-16 p-2 bg-gray-600 rounded-lg shadow-inner"
				/>
				<div>
					<h2 className="text-base sm:text-lg font-bold text-white leading-tight">{name}</h2>
					<p className="text-sm sm:text-base text-gray-400">
						{abbreviation} • Released: {releaseDate}
					</p>
				</div>
			</div>
			<div className="flex items-center flex-wrap">

				{isNew && <Tag value="New" />}
                {name.includes('Jumpstart') && <Tag value='Jumpstart' />}
                {name.includes('Modern Horizons') && <Tag value="Modern Horizons" />}
				<Tag value={type} />
			</div>
		</div>
	);
};

export default SetCardHeader;

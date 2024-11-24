import { SetCardHeaderProps } from "@/types/types";
import Tag from "./tag";


const SetCardHeader = ({ name, abbreviation, releaseDate, icon, type }: SetCardHeaderProps) => {
	const isNew = (() => {
		const releaseDateObj = new Date(releaseDate);
		const currentDate = new Date();
		const timeDiff = currentDate.getTime() - releaseDateObj.getTime();
		const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // convert milliseconds to days
		return daysDiff <= 30;
	})();
	return (
		<div className="flex items-center h-full">
			<img src={icon} alt="set icon" className="w-16 h-16 mr-4 p-2 bg-gray-600 rounded-lg shadow-lg" />
			<div className="flex-1 items-center mr-3">
				<h2 className="text-[16px] md:text-xl w-full font-bold text-white">{name}</h2>
				<p className="text-gray-400">{abbreviation} • Released: {releaseDate}</p>
			</div>
			{isNew && <Tag value="New" />}
			<Tag value={type} />
		</div>
	);
};

export default SetCardHeader;

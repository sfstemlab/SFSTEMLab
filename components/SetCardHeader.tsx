import { SetCardHeaderProps } from "@/types/types";


const SetCardHeader = ({ name, abbreviation, type, releaseDate, description, icon, tags }: SetCardHeaderProps) => {
	return (
		<div className="flex items-center h-full">
			<img src={icon} alt="set icon" className="w-16 h-16 mr-4 p-2 bg-gray-600 rounded-lg shadow-lg" />
			<div className="flex-1 items-center">
				<h2 className="text-xl w-full font-bold text-white">{name}</h2>
				<p className="text-gray-400">{abbreviation} • Released: {releaseDate}</p>
				{description && <p className="text-gray-300 mt-2">{description}</p>}
			</div>
			
		</div>
	);
};

export default SetCardHeader;

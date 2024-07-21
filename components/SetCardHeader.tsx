import { SetCardHeaderProps } from "@/types/types";


const SetCardHeader = ({ name, abbreviation, type, releaseDate, description, icon, tags }: SetCardHeaderProps) => {
  return (
    <div className="flex items-center mb-4">
      <img src={icon} alt="set icon" className="w-16 h-16 p-2 mr-4 bg-gray-600 rounded-lg shadow-lg" />
      <div className="flex-1">
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <p className="text-gray-400">{abbreviation.toUpperCase()} • {type}</p>
        <p className="text-gray-400">Released: {releaseDate}</p>
        {description && <p className="text-gray-300 mt-2">{description}</p>}
      </div>
      <div className="flex space-x-3">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SetCardHeader;

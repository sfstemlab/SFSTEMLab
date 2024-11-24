import { BarChart3, Play } from "lucide-react";
import Link from 'next/link';

interface ActionButtonsProps {
  abbreviation: string;
  onClick: () => void;
}

const ActionButtons = ({ abbreviation, onClick }: ActionButtonsProps) => {
	return (
		<div className="absolute top-6 right-6 flex space-x-2">
			<button className="bg-gray-700 hover:bg-gray-800 transition duration-300 h-12 w-12 rounded-lg p-2" onClick={onClick}>
				<BarChart3 className="h-full w-full text-emerald-500" />
			</button>
			<Link href={`/simulate/${abbreviation}`} className="bg-gray-700 hover:bg-gray-800 transition duration-300 h-12 w-12 rounded-lg p-2 flex items-center justify-center">
				<Play className="h-full w-full text-emerald-500" />
			</Link>
		</div>
	);
};

export default ActionButtons;

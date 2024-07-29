'use client';
import { Set } from "@/types/types";
import useFetchStats from '@/hooks/useFetchStats';
import StatsDisplay from './StatsDisplay';
import SetCardHeader from './SetCardHeader';
import SelectDropdown from './SelectDropdown';
import ActionButtons from './ActionButtons';

const SetCard = ({ abbreviation, description, icon, name, releaseDate, tags, type }: Set) => {
  const { stats, loading, error, statsVisible, handleFetchAllStats } = useFetchStats(abbreviation);
  // console.log('abbr: ', abbreviation); 

  return (
    <div className="grid grid-cols-8 relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-lg border border-gray-600 overflow-scroll max-w-full p-4 mb-4">
      <div className="col-span-6">
      <SetCardHeader
        abbreviation={abbreviation}
        description={description}
        icon={icon}
        name={name}
        releaseDate={releaseDate}
        tags={tags}
        type={type}
      />
      </div>
      <ActionButtons abbreviation={abbreviation} onClick={handleFetchAllStats} />
      {/* <SelectDropdown /> */}
      {statsVisible && (
        <div className="flex-grow mt-4 col-span-8 text-gray-200">
          <h3 className="text-lg font-bold mb-2">Set Statistics</h3>
          <StatsDisplay stats={stats} loading={loading} error={error} />
        </div>
      )}
    </div>
  );
};

export default SetCard;

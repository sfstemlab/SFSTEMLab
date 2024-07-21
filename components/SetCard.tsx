'use client';
import { Set } from "@/types/types";
import useFetchStats from '@/hooks/useFetchStats';
import StatsDisplay from './StatsDisplay';
import SetCardHeader from './SetCardHeader';
import SelectDropdown from './SelectDropdown';
import ActionButtons from './ActionButtons';

const SetCard = ({ abbreviation, description, icon, name, releaseDate, tags, type }: Set) => {
  const { stats, loading, error, statsVisible, handleFetchAllStats } = useFetchStats(abbreviation);

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg border border-gray-600 overflow-hidden max-w-full p-6 mb-4">
      <SetCardHeader
        abbreviation={abbreviation}
        description={description}
        icon={icon}
        name={name}
        releaseDate={releaseDate}
        tags={tags}
        type={type}
      />
      <div className="flex justify-between items-center">
        <SelectDropdown />
        <ActionButtons abbreviation={abbreviation} onClick={handleFetchAllStats} />
      </div>
      {statsVisible && (
        <div className="mt-4 text-gray-200">
          <h3 className="text-lg font-bold mb-2">Set Statistics</h3>
          <StatsDisplay stats={stats} loading={loading} error={error} />
        </div>
      )}
    </div>
  );
};

export default SetCard;

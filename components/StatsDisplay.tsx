import { Stats, StatsDisplayProps } from "@/types/types";



const StatsDisplay = ({ stats, loading, error }: StatsDisplayProps) => {

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>Commons:</div><div>{stats.commons}</div>
      <div>Uncommons:</div><div>{stats.uncommons}</div>
      <div>Rares:</div><div>{stats.rares}</div>
      <div>Mythics:</div><div>{stats.mythics}</div>
      <div>Total:</div><div>{stats.total}</div>
    </div>
  );
};

export default StatsDisplay;

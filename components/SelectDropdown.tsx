
const SelectDropdown = () => {
  return (
    <select className="absolute bottom-4 py-2 px-1 right-4 w-[35%] text-center text-xl bg-gray-700 text-gray-200 hover:bg-gray-600 rounded-md max-h-[50px]">
      <optgroup label='Booster Products'>
        <option value="collector-booster">Collector Booster</option>
        <option value="collector-booster-box">Collector Booster Box</option>
        <option value="draft-booster">Draft Booster</option>
        <option value="draft-booster-box">Draft Booster Box</option>
        <option value="play-booster">Play Booster</option>
        <option value="play-booster-box">Play Booster Box</option>
        <option value="set-booster">Set Booster</option>
        <option value="set-booster-box">Set Booster Box</option>
      </optgroup>
    </select>
  );
};

export default SelectDropdown;

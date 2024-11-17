interface TagProps {
  value: string;
  color: string;
}

const Tag = ({ value, color }: TagProps) => {
  return (
    <span className={`absolute top-[40%] left-[83%] bg-${color} animate-bounce shadow-md shadow-${color}/50 text-white text-xs font-bold px-2 py-1 rounded`}>
      	{value}
    </span>
  );
};

export default Tag;

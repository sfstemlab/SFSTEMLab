interface TagProps {
	value: string;
  }
  
  const Tag = ({ value }: TagProps) => {
	const typesToColors: { [key: string]: string } = {
	  'Draft Innovation': 'red',
      'Modern Horizons': 'amber',
      Jumpstart: 'cyan',
	  Core: 'blue',
	  Expansion: 'orange',
	  Masters: 'green',
	};
  
	// Default color for tags not in typesToColors
	const color = value === 'New' ? 'yellow' : typesToColors[value] || 'gray';
  
	return (
	  <span
		className={`m-1 md:m-2 bg-${color}-500/80 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md shadow-${color}-500/50`}
	  >
		{value}
	  </span>
	);
  };
  
  export default Tag;
  
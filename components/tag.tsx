interface TagProps {
  value: string;}

const Tag = ({ value }: TagProps) => {
	const typesToColors: { [key: string]: string } = {
		'Draft Innovation':'red',
		'Core':'blue',
		'Expansion':'orange',
		'Masters':'green',
	}
	let color : string = 'yellow'
	if (value !== 'New') {
		color = typesToColors[value]
	}
	return (
		<span className={`m-4 bg-${color}-500/80 animate-bounce shadow-md shadow-${color}-500/50 text-white text-xs font-bold px-2 py-1 rounded-md`}>
		  {value}
		</span>
	  );
	};
	
export default Tag;

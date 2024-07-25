interface CityFilterProps {
	cities: string[];
	value: string;
	onChange: (value: string) => void;
}

export default function CityFilter({
	cities,
	value,
	onChange,
}: CityFilterProps) {
	return (
		<select value={value} onChange={(e) => onChange(e.target.value)}>
			<option value="">Select city</option>
			{cities.map((city) => (
				<option key={city} value={city}>
					{city}
				</option>
			))}
		</select>
	);
}

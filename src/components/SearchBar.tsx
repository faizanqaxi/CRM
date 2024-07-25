import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

interface SearchBarProps {
	onSearchChange: (value: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000); // 1 second delay

	useEffect(() => {
		onSearchChange(debouncedSearchTerm);
	}, [debouncedSearchTerm, onSearchChange]);

	return (
		<input
			type="text"
			placeholder="Search by name..."
			className="search-bar"
			value={searchTerm}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setSearchTerm(e.target.value)
			}
		/>
	);
}

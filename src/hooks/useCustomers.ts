import { useState, useEffect, useMemo } from 'react';
import { fetchCustomers } from '../services/api';
import { User } from '../types';

interface UseCustomersReturn {
	customers: User[];
	loading: boolean;
	error: Error | null;
	cities: string[];
	oldestUsers: Record<string, User>;
}

const useCustomers = (
	nameFilter: string = '',
	cityFilter: string = ''
): UseCustomersReturn => {
	const [customers, setCustomers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const loadCustomers = async () => {
			try {
				const data = await fetchCustomers();
				setCustomers(data);
				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error('An error occurred')
				);
				setLoading(false);
			}
		};

		loadCustomers();
	}, []);

	const filteredCustomers = useMemo(() => {
		return customers.filter((customer) => {
			const fullName =
				`${customer.firstName} ${customer.lastName}`.toLowerCase();
			const nameMatch = fullName.includes(nameFilter.toLowerCase());
			const cityMatch =
				cityFilter === '' ||
				customer.address.city.toLowerCase() ===
					cityFilter.toLowerCase();
			return nameMatch && cityMatch;
		});
	}, [customers, nameFilter, cityFilter]);

	const cities = useMemo(() => {
		const citySet = new Set(
			customers.map((customer) => customer.address.city)
		);
		return Array.from(citySet).sort();
	}, [customers]);

	const oldestUsers = useMemo(() => {
		const cityOldest: Record<string, User> = {};
		filteredCustomers.forEach((customer) => {
			const city = customer.address.city;
			if (!cityOldest[city] || customer.age > cityOldest[city].age) {
				cityOldest[city] = customer;
			}
		});
		return cityOldest;
	}, [filteredCustomers]);

	return {
		customers: filteredCustomers,
		loading,
		error,
		cities,
		oldestUsers,
	};
};

export default useCustomers;

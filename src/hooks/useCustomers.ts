import { useState, useEffect, useMemo } from 'react';
import { fetchCustomers } from '../services/api';
import { User } from '../types';

const useCustomers = (nameFilter = '', cityFilter = '') => {
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

	return { customers: filteredCustomers, loading, error, cities };
};

export default useCustomers;

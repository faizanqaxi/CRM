import { useState, useEffect } from 'react';
import { fetchCustomers } from '../services/api';
import { User } from '../types';

const useCustomers = () => {
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

	return { customers, loading, error };
};

export default useCustomers;

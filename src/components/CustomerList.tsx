import { useState } from 'react';
import SearchBar from './SearchBar';
import CityFilter from './CityFilter';
import HighlightToggle from './HighlightToggle';
import useCustomers from '../hooks/useCustomers';

const CustomerList = () => {
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [isHighlighted, setIsHighlighted] = useState(false);

	const { customers, loading, error, cities, oldestUsers } = useCustomers(
		nameFilter,
		cityFilter
	);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="customer-list">
			<h1>Customer List</h1>
			<div className="filters">
				<SearchBar value={nameFilter} onChange={setNameFilter} />
				<CityFilter
					cities={cities}
					value={cityFilter}
					onChange={setCityFilter}
				/>
				<HighlightToggle
					isHighlighted={isHighlighted}
					onToggle={setIsHighlighted}
				/>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customer) => (
						<tr
							key={customer.id}
							className={
								isHighlighted &&
								oldestUsers[customer.address.city].id ===
									customer.id
									? 'highlighted'
									: ''
							}
						>
							<td>{`${customer.firstName} ${customer.lastName}`}</td>
							<td>{customer.address.city}</td>
							<td>{customer.birthDate}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CustomerList;

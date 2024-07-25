import { useState } from 'react';
import SearchBar from './SearchBar';
import CityFilter from './CityFilter';
import useCustomers from '../hooks/useCustomers';

const CustomerList = () => {
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const { customers, cities } = useCustomers(nameFilter, cityFilter);

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
						<tr key={customer.id}>
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

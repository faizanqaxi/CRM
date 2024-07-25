import SearchBar from './SearchBar';
import CityFilter from './CityFilter';

const CustomerList = () => {
	return (
		<div className="customer-list">
			<h1>Customer List</h1>
			<div className="filters">
				<SearchBar value="" onChange={() => {}} />
				<CityFilter
					cities={['City1', 'City2']}
					value="City1"
					onChange={() => {}}
				/>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>City</th>
						<th>Company</th>
					</tr>
				</thead>
				<tbody>{/* Customer to be populated here */}</tbody>
			</table>
		</div>
	);
};

export default CustomerList;

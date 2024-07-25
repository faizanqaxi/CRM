export interface User {
	id: number;
	firstName: string;
	lastName: string;
	birthDate: string;
	age: number;
	address: {
		city: string;
	};
}

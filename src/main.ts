import dayjs from "dayjs";
// type BirthdayDate = {
// 	data: string;
// };

type Ricetta = {
	id: number;
	name: string;
	ingredients: string[];
	instructions: string[];
	prepTimeMinutes: number;
	cookTimeMinutes: number;
	servings: number;
	difficulty: string;
	cuisine: string;
	caloriesPerServing: number;
	tags: string[];
	userId: number;
	image: string;
	rating: number;
	reviewCount: number;
	mealType: string[];
};

type Chef = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	gender: string;
	email: string;
	phone: string;
	birthDate: string;
	image: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: object;
	ip: string;
	address: object;
	macAddress: string;
	university: string;
	bank: object;
	company: object;
	ein: string;
	ssn: string;
	userAgent: string;
	crypto: object;
	role: string;
};

function isChef(chef: unknown): chef is Chef {
	return (
		typeof chef === "object" &&
		chef !== null &&
		"id" in chef &&
		typeof chef.id === "number" &&
		"firstName" in chef &&
		typeof chef.firstName === "string" &&
		"lastName" in chef &&
		typeof chef.lastName === "string" &&
		"age" in chef &&
		typeof chef.age === "number" &&
		"gender" in chef &&
		typeof chef.gender === "string" &&
		"email" in chef &&
		typeof chef.email === "string" &&
		"phone" in chef &&
		typeof chef.phone === "string" &&
		"birthDate" in chef &&
		typeof chef.birthDate === "string" &&
		"image" in chef &&
		typeof chef.image === "string" &&
		"height" in chef &&
		typeof chef.height === "number" &&
		"weight" in chef &&
		typeof chef.weight === "number" &&
		"eyeColor" in chef &&
		typeof chef.eyeColor === "string" &&
		"hair" in chef &&
		typeof chef.hair === "object" &&
		"ip" in chef &&
		typeof chef.ip === "string" &&
		"address" in chef &&
		typeof chef.address === "object" &&
		"macAddress" in chef &&
		typeof chef.macAddress === "string" &&
		"university" in chef &&
		typeof chef.university === "string" &&
		"bank" in chef &&
		typeof chef.bank === "object" &&
		"company" in chef &&
		typeof chef.company === "object" &&
		"ein" in chef &&
		typeof chef.ein === "string" &&
		"ssn" in chef &&
		typeof chef.ssn === "string" &&
		"userAgent" in chef &&
		typeof chef.userAgent === "string" &&
		"crypto" in chef &&
		typeof chef.crypto === "object" &&
		"role" in chef &&
		typeof chef.role === "string"
	);
}

async function getBirthdayChef(id: number): Promise<string | null> {
	let ricetta: Ricetta;
	try {
		const responseRicetta = await fetch(`https://dummyjson.com/recipes/${id}`);
		if (!responseRicetta.ok) {
			throw new Error(
				`Errore HTTP ${responseRicetta.status}: ${responseRicetta.statusText}`
			);
		}
		ricetta = await responseRicetta.json();
		console.log(ricetta);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero della ricetta: ", error.message);
		} else {
			console.error("Errore sconosciuto: ", error);
		}
		return null;
	}

	let birthDate: string;
	let dataFormattata: string;
	try {
		const userId: number = ricetta.userId;
		const responseChef = await fetch(`https://dummyjson.com/users/${userId}`);
		const chef: unknown = await responseChef.json();
		if (!isChef(chef)) {
			throw new Error("Formato dei dati dello chef non corretto");
		}
		birthDate = chef.birthDate;
		console.log(chef);

		dataFormattata = dayjs(birthDate).format("DD/MM/YYYY");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Errore nel recupero dati dello chef: ", error.message);
		} else {
			console.error("Errore sconosciuto: ", error);
		}
		return null;
	}
	return dataFormattata;
}

(async () => {
	const birthdayDate = await getBirthdayChef(2);
	console.log(`La data di nascita dello chef è ${birthdayDate}`);
})();

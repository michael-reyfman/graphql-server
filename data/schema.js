import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `
type Hospital {
	_id: String!,
	title: String!,
	address: String,
	doctors: [Doctor]
}
type Doctor {
	_id: String!,
	firstName: String!,
	lastName: String!,
	patronymic: String!,
	email: String!,
	password: String!,
	gender: String,
	phoneNumbers: [String],
	dateOfBirth: String,
	avatarUrl: String,
	patients: [Patient],
	events: [Event],
	messages: [Message],
	description: String
}
type Patient {
	_id: String!,
	firstName: String!,
	lastName: String!,
	patronymic: String!,
	email: String!,
	password: String!,
	gender: String,
	phoneNumbers: [String],
	dateOfBirth: String,
	avatarUrl: String,
	documents: [Document],
	recipes: [Recipe],
	events: [Event],
	messages: [Message],
	description: String
}
type Event {
	_id: String!,
	title: String!,
	dateStart: String!,
	dateEnd: String!,
	doctorId: String!,
	patientId: String!
}
type Document {
	_id: String!,
	title: String,
	url: String,
	content: String,
	doctorId: String!,
	patientId: String!
}
type Recipe {
	_id: String!,
	title: String!,
	description: String!,
	doctorId: String!,
	patientId: String!,
	price: String!,
	creationDate: String!,
	dueDate: String!
}
type Message {
	_id: String!,
	text: String,
	url: String,
	sender: String!,
	doctorId: String!,
	patientId: String!
}
type Query {
  doctor(id: String): Doctor,
  allDoctors: [Doctor],
  allPatients: [Patient],
  allHospitals: [Hospital],
  authenticateDoctor(email: String, password: String): Doctor
}
type Mutation {
	newDoctor(
		firstName: String!,
		lastName: String!,
		patronymic: String!,
		email: String!,
		password: String!,
		phone: String!,
		hospital: String!,
		gender: String,
		dateOfBirth: String,
		description: String
		): Doctor!
	newPatient(
		firstName: String!,
		lastName: String!,
		patronymic: String!,
		email: String!,
		password: String!,
		phone: String!,
		doctorId: String!,
		gender: String,
		dateOfBirth: String,
		description: String
	): Patient!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

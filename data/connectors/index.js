import casual from 'casual';
import _ from 'lodash';
import Mongoose from 'mongoose';

// somewhere in the middle:
Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost/doctor-patient-app', {
	useMongoClient: true
}, () => {
	// Mongoose.connection.db.dropDatabase();
});

const HospitalSchema = Mongoose.Schema({
	title: String,
	address: String,
	doctors: [{ type: String, ref: 'doctors' }]
});

const DoctorSchema = Mongoose.Schema({
	firstName: String,
	lastName: String,
	patronymic: String,
	email: String,
	password: String,
	gender: { type: String, enum: ['male', 'female', 'apache attack helicopter'] },
	phoneNumbers: [String],
	dateOfBirth: { type: Date, default: Date.now() },
	avatarUrl: String,
	patients: [{ type: String, ref: 'patients' }],
	events: [{type: String, ref: 'events'}],
	messages: [{type: String, ref: 'messages'}],
	documents: [{ type: String, ref: 'documents' }],
	description: String
});

const PatientSchema = Mongoose.Schema({
	firstName: String,
	lastName: String,
	patronymic: String,
	email: String,
	password: String,
	gender: { type: String, enum: ['male', 'female', 'apache attack helicopter'] },
	phoneNumbers: [String],
	dateOfBirth: { type: Date, default: Date.now() },
	avatarUrl: String,
	documents: [{ type: String, ref: 'documents' }],
	recipes: [{ type: String, ref: 'recipes' }],
	events: [{type: String, ref: 'events'}],
	messages: [{type: String, ref: 'messages'}],
	description: String
});

const EventSchema = Mongoose.Schema({
	title: String,
	dateStart: Date,
	dateEnd: Date,
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' }
});

const DocumentSchema = Mongoose.Schema({
	title: String,
	url: String,
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' }
});

const RecipeSchema = Mongoose.Schema({
	title: String,
	description: String,
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' },
	price: { type: String, enum: ['free', 'half', 'full']},
	creationDate: { type: Date, default: Date.now() },
	dueDate: Date
});

const MessageSchema = Mongoose.Schema({
	text: String,
	senderId: String,
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' },
	timestamp: { type: Date, default: Date.now() },
});

const Hospital = Mongoose.model('hospitals', HospitalSchema);
const Doctor = Mongoose.model('doctors', DoctorSchema);
const Patient = Mongoose.model('patients', PatientSchema);

const Event = Mongoose.model('events', EventSchema);
const Message = Mongoose.model('messages', MessageSchema);
const Document = Mongoose.model('documents', DocumentSchema);
const Recipe = Mongoose.model('recipes', RecipeSchema);

const addMockData = () => {
casual.seed(1488);
_.times(25, () => {
	const doctor = new Doctor({
		_id: JSON.stringify(Mongoose.Types.ObjectId),
		firstName: casual.first_name,
		lastName: casual.last_name,
		gender: 'male',
		patronymic: casual.first_name + 'ovich',
		email: casual.email,
		password: casual.password,
		phoneNumbers: [casual.phone],
		patients: [],
		description: casual.description,
		dateOfBirth: new Date(),
	});
	doctor.save((err, doc) => {
		if(err) {
			console.log(err);
			return err
		}
		// console.log(doctor);
		_.times(3, () => {
			const patient = new Patient({
				_id: JSON.stringify(Mongoose.Types.ObjectId),
				firstName: casual.first_name,
				lastName: casual.last_name,
				gender: 'female',
				patronymic: casual.first_name + 'ivna',
				email: casual.email,
				password: casual.password,
				phoneNumbers: [casual.phone],
				documents: [],
				recipes: [],
				description: casual.description,
				dateOfBirth: new Date(),
			});

				patient.save(_err => {
					// console.log(patient);
					if(_err) {
						console.log(_err);
						return _err
					}

					const hospital = new Hospital({
						_id: JSON.stringify(Mongoose.Types.ObjectId),
						title: casual.title,
						address: casual.address,
						doctors: [doctor._id]
					});

					hospital.save(err => {
						if(err) {
							return err;
						}
					})
				})
			})
		})
	});
};

// addMockData();

export { Hospital, Doctor, Patient, Event, Message, Recipe, Document };
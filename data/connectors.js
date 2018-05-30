// import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import Mongoose from 'mongoose';

// const db = new Sequelize('diploma_db', null, null, {
// 	dialect: 'sqlite',
// 	storage: './blog.sqlite',
// });
//
// const DoctorModel = db.define('doctor', {
// 	firstName: { type: Sequelize.STRING},
// 	lastName: { type: Sequelize.STRING},
// 	patronymic: { type: Sequelize.STRING},
// 	email: { type: Sequelize.STRING},
// 	phone: { type: Sequelize.STRING},
// 	dateOfBirth: { type: Sequelize.DATE},
// });
//
// const AuthorModel = db.define('author', {
// 	firstName: { type: Sequelize.STRING },
// 	lastName: { type: Sequelize.STRING },
// });
//
// const PostModel = db.define('post', {
// 	title: { type: Sequelize.STRING },
// 	text: { type: Sequelize.STRING },
// });
//
// AuthorModel.hasMany(PostModel);
// PostModel.belongsTo(AuthorModel);

// somewhere in the middle:
Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost/views', {
	useMongoClient: true
});

const HospitalSchema = Mongoose.Schema({
	_id: String,
	title: String,
	address: String,
	doctors: [{ type: String, ref: 'doctors' }]
});

const DoctorSchema = Mongoose.Schema({
	_id: String,
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
	description: String
});

const PatientSchema = Mongoose.Schema({
	_id: String,
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
	description: String
});

const EventSchema = Mongoose.Schema({
	_id: String,
	title: String,
	dateStart: Date,
	dateEnd: Date,
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' }
});

const DocumentSchema = Mongoose.Schema({
	_id: String,
	title: String,
	url: String,
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' }
});

const RecipeSchema = Mongoose.Schema({
	_id: String,
	title: String,
	description: String,
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' },
	price: { type: String, enum: ['free', 'half', 'full']},
	creationDate: { type: Date, default: Date.now() },
	dueDate: Date
});

const MessageSchema = Mongoose.Schema({
	_id: String,
	text: String,
	sender: { type: String, enum: ['doctor', 'patient']},
	doctorId: { type: String, ref: 'doctors' },
	patientId: { type: String, ref: 'patients' }
});

// const ViewSchema = Mongoose.Schema({
// 	postId: Number,
// 	views: Number,
// });

const Hospital = Mongoose.model('hospitals', HospitalSchema);
const Doctor = Mongoose.model('doctors', DoctorSchema);
const Patient = Mongoose.model('patients', PatientSchema);

const Event = Mongoose.model('events', EventSchema);
const Message = Mongoose.model('messages', MessageSchema);
const Document = Mongoose.model('documents', DocumentSchema);
const Recipe = Mongoose.model('recipes', RecipeSchema);

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
		dateOfBirth: casual.date,
	});
	console.log(doctor);
	doctor.save((err, doc) => {
		if(err) {
			return err
		}
		console.log(doc);
		_.times(3, () => {
			const patient = new Patient({
				_id: Mongoose.Types.ObjectId.toString(),
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
				dateOfBirth: casual.date,
			});

			patient.save(_err => {
				if(_err) {
					return _err
				}

				const hospital = new Hospital({
					_id: Mongoose.Types.ObjectId.toString(),
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

// const View = Mongoose.model('views', ViewSchema);

// modify the mock data creation to also create some views:
// casual.seed(123);
// db.sync({ force: true }).then(() => {
// 	_.times(10, () => {
// 		return AuthorModel.create({
// 			firstName: casual.first_name,
// 			lastName: casual.last_name,
// 		}).then((author) => {
// 			return author.createPost({
// 				title: `A post by ${author.firstName}`,
// 				text: casual.sentences(3),
// 			}).then((post) => { // <- the new part starts here
// 				// create some View mocks
// 				return View.update(
// 					{ postId: post.id },
// 					{ views: casual.integer(0, 100) },
// 					{ upsert: true });
// 			});
// 		});
// 	});
// });
//
// const Author = db.models.author;
// const Post = db.models.post;

export { Hospital, Doctor, Patient, Event, Message, Recipe, Document };
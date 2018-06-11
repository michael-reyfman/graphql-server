import { Hospital, Patient, Doctor, Document, Recipe, Message, Event } from './connectors/index';

const resolvers = {
	Query: {
		doctor: async(parent, {id}) => {
			const doctor = await Doctor.findOne({_id: id});
			if(doctor.patients.length > 0) {
				const pts = await Patient.find({
					_id: {$in: doctor.patients}
				});
				doctor.patients = pts;
			}
			const events = await Event.find({
				doctorId: doctor._id
			});
			doctor.events = events;
			return doctor;
		},
		allDoctors: async (parent, args) => await Doctor.find(),
		allPatients: async(parent, args) => await Patient.find(),
		allHospitals: async(parent, args) => await Hospital.find(),
		authenticateDoctor: async(_, {email, password}) => {
			const doctor = await Doctor.findOne({email, password});
			if(doctor.patients.length > 0) {
				const pts = await Patient.find({
					_id: {$in: doctor.patients}
				});
				doctor.patients = pts;
			}
			console.log(doctor);
			return doctor;
		}
	},
	Mutation: {
		newDoctor: async(parent, args) => {
			const doctor = new Doctor(args);
			doctor.phoneNumbers = [args.phone];
			const res = await doctor.save();
			console.log(res);
			return res;
		},
		newPatient: async(parent, args) => {
			const doctorId = args.doctorId;
			delete args.doctorId;
			const credentials = args;
			const patient = await new Patient(credentials);
			patient.phoneNumbers = [credentials.phone];
			const _p = patient.save();
			const doctor = await Doctor.findById(doctorId);
			doctor.patients = doctor.patients.concat([patient._id]);
			const res = await doctor.save();
			return res;
		},
		newMessage: async(parent, args) => await new Message(args).save(),
		// newEvent: async(parent, args) => await new Event(args).save(),
		// newDocument: async(parent, args) => await new Document(args).save(),
		// newRecipe: async(parent, args) => await new Recipe(args).save(),
	}
};

export default resolvers;
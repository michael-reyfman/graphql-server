import { Hospital, Patient, Doctor, Document, Recipe, Message, Event } from './connectors/index';

const resolvers = {
	Query: {
		doctor: async(parent, {id}) => {
			const a = await Doctor.findOne({_id: id});
			console.log(a);
			return a
		},
		allDoctors: async (parent, args) => await Doctor.find(),
		allPatients: async(parent, args) => await Patient.find(),
		allHospitals: async(parent, args) => await Hospital.find(),
		authenticateDoctor: async(_, {email, password}) => {
			const doctor = await Doctor.findOne({email, password});
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
		}
	}
};

export default resolvers;
import { Hospital, Patient, Doctor, Document, Recipe, Message, Event } from './connectors';

const resolvers = {
	Query: {
		// author(_, args) {
		// 	return Author.find({ where: args });
		// },
		doctor(_, args) {
			return Doctor.find({ id: args.id });
		},
		allDoctors(_, args) {
			return Doctor.find({});
		}
		// allAuthors(_, args) {
		// 	return Author.findAll();
		// }
	},
	// Author: {
	// 	posts(author) {
	// 		return author.getPosts();
	// 	}
	// },
	// Post: {
	// 	author(post) {
	// 		return post.getAuthor();
	// 	},
	// 	views(post) {
	// 		return View.findOne({ postId: post.id })
	// 			.then((view) => view.views);
	// 	},
	// },
};

export default resolvers;
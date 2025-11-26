//Book Model

//Imports
import mongoose from "mongoose";

export const BookSchema = new mongoose.Schema({
	id: {type: Number, required: [true, "Please enter personalized (non-Mongo) id"]},
	title: {type: String, required: [true, "Please enter title"]},
	author: {type: String, required: [true, "Please enter author"]},
	publisher: {type: String, required: [true, "Please enter publisher"]},
	isbn: {type: String, required: [true, "Please enter ISBN String"]},
	avail: {type: Boolean, required: true, default: true},
	who: {type: String, required: false},
	due: {type: String, required: false},
});

export const BookModel = mongoose.model('Book', BookSchema);
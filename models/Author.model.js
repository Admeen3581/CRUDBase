//Author Model

//Imports
import mongoose from "mongoose";

export const AuthorSchema = new mongoose.Schema({
	firstName: {type: String, required: [true, "Please enter first name"]},
	lastName: {type: String, required: [true, "Please enter last name"]},
	birthdate: {type: Date, required: false},
	booksWritten: {type: Array, required: [true, "An author isn't an author without any books"], default: []},
});

export const AuthorModel = mongoose.model('Author', AuthorSchema);

/*
* Author.findOne({lastName: "George"}).then((a) =>
* {
* 	if(!a)
* 	{
* 		console.log("No findy");
* 	}
* 	else
* 	{
* 		//Logic
* 	}
* }
* */
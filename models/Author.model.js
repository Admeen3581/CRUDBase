//Author Model

//Imports
import mongoose from 'mongoose';
import Schema from 'mongoose';
import model from 'mongoose.model';
//const {Schema, model} = mongoose;

export const AuthorSchema = new Schema({
		firstName: {type: String, required: [true, "Please enter first name"]},
		lastName: {type: String, required: [true, "Please enter last name"]},
		birthdate: {type: Date, required: false},
});

const AuthorModel = mongoose.model('Author', AuthorSchema);
module.exports = AuthorModel;

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
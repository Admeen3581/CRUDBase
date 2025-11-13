import express from 'express';
import mongoose from 'mongoose';

const app = express();
//.env init
const dbUser = process.env.MONGO_USER;
const dbPass = process.env.MONGO_PASS;
//server init
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@firstmongo.6qallgs.mongodb.net/?appName=FirstMongo`).then(() =>
{
	console.log('MongoDB Connected');
	
	//Server Init on Start after DB connected
	app.listen(3000, () =>
	{
		console.log('Server started on port 3000!');
	});
}).catch((err) => {
	console.log(err);
});

//API Methods
app.get("/", (req, res) =>
{
	res.send("We are cooking");
});

app.get("/books", (req, res) =>
{
	//return all books (title & id) -- additionally, prep for query input -> undef, true, & false
})

app.get("/books/:id", (req, res) =>
{
	//Return the specific book at 'id'. 404 if no ID exists.
})

app.post("/books", (req, res) =>
{
	//Add a new book as defined within the JSON file
})

app.put("/books/:id", (req, res) =>
{
	//For the respective book id, update its properties as put (hehe) in the JSON file. Checkin or out.
})

app.delete("/books/:id", (req, res) =>
{
	//Remove a book given its respective id.
})
//Imports
import express from 'express';
import mongoose from 'mongoose';
import BookRoute from './routes/Book.route.js';

//.env init
const dbUser = process.env.MONGO_USER;
const dbPass = process.env.MONGO_PASS;
const databaseName = process.env.MONGO_BASE;

//server init
const app = express();
app.use(express.json());//Use JSON for all API passage

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@firstmongo.6qallgs.mongodb.net/${databaseName}?appName=FirstMongo/`).then(() =>
{
	console.log('MongoDB Connected');
	
	//Server Init on Start after DB connected
	app.listen(3000, () =>
	{
		console.log('Server started on port 3000!');
	});
}).catch((err) =>
{
	console.log(err);
});

//API Methods
/**
 * CORS Handler
 */
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	
	if(req.method === 'OPTIONS')
	{
		res.status(200);
		res.send('OKAY :D');
	}
	else
	{
		next();
	}
});

/**
 * Resource retrieval
 */
app.get("/", async(req, res) =>
{
	res.status(418);
	res.send("We are cooking");
});

app.use("/books", BookRoute);
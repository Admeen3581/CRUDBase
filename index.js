import express from 'express';

const app = express();

//Server Init on Start
app.listen(3000, () =>
{
	console.log('Server started on port 3000!');
});

app.get("/", (req, res) => {
	res.send("We are cooking");
});

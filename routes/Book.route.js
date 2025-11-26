//Imports
import express from "express";
import {BookModel as Book} from "../models/Book.model.js";

const router = express.Router();

/**
 * Return all books (title & id) -- additionally, prep for query input -> undef, true, & false
 */
router.get("/", async(req, res) =>
{
	const availQuery = req.query.avail;
	
	try
	{
		let book;
		if(!availQuery)
		{
			book = await Book.find({});
		}
		else
		{
			book = await Book.find({avail : availQuery});
		}
		res.status(200);
		res.json(book);
	}
	catch(e)
	{
		res.status(404);
		res.send("Unable to get books (may not exist) -- " + e.message);
	}
})

/**
 * Return the specific book at 'id'. 404 if no ID exists.
 */
router.get("/:id", async(req, res) =>
{
	const id = req.params.id;
	
	try
	{
		const book = await Book.findOne({id: id});
		if(book)
		{
			res.status(200);
			res.json(book);
		}
		else
		{
			res.status(404);
			res.send(`Book with ID ${id} does not exist.`);
		}
	}
	catch(e)
	{
		res.status(500);
		res.send(`Unable to get book with ID ${id} -- ` + e.message);
	}
})

/**
 * Add a new book as defined within the JSON file
 */
router.post("/", async(req, res) =>
{
	const id = req.body.id;
	try
	{
		if(!await findBookWithID(id))
		{
			await Book.create(req.body);//no store
			res.status(201);
			res.send(`Book with ID ${id} created successfully.`);
		}
		else
		{
			res.status(403);
			res.send(`Book with ID ${id} already exists.`);
		}
	}
	catch(e)
	{
		res.status(500);
		res.send(`Unable to create book with ID ${id} -- ` + e.message);
	}
})

/**
 * For the respective book id, update its properties as put (hehe) in the JSON file. Checkin or out.
 */
router.put("/:id", async(req, res) =>
{
	const idQuery = req.params.id;
	
	try
	{
		if(!await findBookWithID(idQuery))
		{
			res.status(404);
			res.send(`Book with ID ${idQuery} does not exist.`)
		}
		else
		{
			const statusPayload = {
				$unset: {
					who: null,
					due: null,
				}
			}
			
			await Book.updateOne({id: idQuery}, req.body);
			await Book.updateOne({id: idQuery, avail: true}, statusPayload);
			res.status(204);
			res.send(`Book with ID ${idQuery} updated successfully.`);
		}
	}
	catch(e)
	{
		res.status(500);
		res.send(`Unable to update book with ID ${idQuery} -- ` + e.message);
	}
})

/**
 * Remove a book given its respective id.
 */
router.delete("/:id", async(req, res) =>
{
	const idQuery = req.params.id;
	
	try
	{
		if(!await findBookWithID(idQuery))
		{
			res.status(404);
			res.send(`Book with ID ${idQuery} does not exist.`)
		}
		else
		{
			await Book.deleteOne({id: idQuery});
			res.status(204);
			res.send(`Book with ID ${idQuery} deleted successfully.`);
		}
	}
	catch(e)
	{
		res.status(500);
		res.send(`Unable to delete book with ID ${idQuery} -- ` + e.message);
	}
})

async function findBookWithID(bookId)
{
	return Book.findOne({id: bookId});
}

export default router;
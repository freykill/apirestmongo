const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");


//middleware
const getBook = async (req,res, next) => {
    let book;
    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message:'el id del libro no es valido papu'
        })
    }

try {
    book = await Book.findById(id);
    if(!book){
        return res.status(404).json({
            message: 'el libro no fue encontrador'
        })
    }
} catch (error) {
    return res.status(500).json({
        message: error.message
    })
    
}

res.book = book;
next()


}



//obtener  todos los libros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    console.log("GEWT ALL", books);
    console.log(books.length)
    if (books.length === 0) {
       return res.status(204).json({message: 'si funca'});
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//agregar un nuevo libro [POST]
router.post("/", async (req, res) => {

    const { title, authot, genero, publication_date, original_languaje } =
      req?.body;
    if(!title || !authot || !genero || !publication_date || !original_languaje){
        return res.status(400).json({
            message: 'los campos son obligatorios'
        })
    }
    
    const books = new Book(
    {
        title, authot, genero, publication_date, original_languaje   
    })
    try {
        const newBook = await books.save()
        res.status(201).json(newBook)
  } catch (error) {
        res.status(400).json({
            message: error.message
        })
  }
});

//retornar un id 
router.get('/:id', getBook , async(req,res) =>{
    res.json(res.book);
});



router.put("/:id", getBook, async (req,res) => {
    try {
        const book = res.book
        book.title = req.body.title || book.title,
        book.authot = req.body.authot || book.authot,
        book.genero = req.body.genero || book.genero,
        book.publication_date = req.body.publication_date || book.publication_date,
        book.original_languaje = req.body.original_languaje || book.original_languaje

        const updateBook = await book.save()
        res.json(updateBook)



    } catch (error) {   
        res.status(400).json({message: error.message})
    }
});

router.patch("/:id", getBook, async (req,res) => {
    const { title, authot, genero, publication_date, original_languaje } =
    req?.body;
    if(!title && !authot && !genero && !publication_date && !original_languaje){
        res.status(400).json({
            message: 'al menos uno de estos campos debe ser enviaodr: titulo, auto, genero o fecha de publicacion'
        })
    }
    try {
        const book = res.book
        book.title = req.body.title || book.title,
        book.authot = req.body.authot || book.authot,
        book.genero = req.body.genero || book.genero,
        book.publication_date = req.body.publication_date || book.publication_date,
        book.original_languaje = req.body.original_languaje || book.original_languaje

        const updateBook = await book.save()
        res.json(updateBook)



    } catch (error) {   
        res.status(400).json({message: error.message})
    }
});


//retornar un id 
router.delete('/:id', getBook , async(req,res) =>{
    try {
        const book = res.book
        await book.deleteOne({
            _id: book._id
        });
        res.json({
            message: `el librio ${book.title} fue elimadop correctamente`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
});



module.exports = router
import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: 'success',
      data: {
        books: books.map((books) => ({
          id: books.id,
          name: books.name,
          publisher: books.publisher,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }
};

export const saveBook = async (req, res) => {
  const cekName = req.body.name;
  if (!cekName) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }
  if (req.body.readPage > req.body.pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }
  const finished = req.body.pageCount === req.body.readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  let book = new Book(req.body);
  book.finished = finished;
  book.insertedAt = insertedAt;
  book.updatedAt = updatedAt;

  try {
    const savedBook = await book.save();
    res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: savedBook.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
  }
};

export const updateBook = async (req, res) => {
  const cekName = req.body.name;
  if (!cekName) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }
  if (req.body.readPage > req.body.pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }
  const finished = req.body.pageCount === req.body.readPage;
  const updatedAt = new Date().toISOString();

  try {
    const updatedBook = await Book.updateOne({
      _id: req.params.id,
    }, {
      $set: {
        name: req.body.name,
        year: req.body.year,
        author: req.body.author,
        summary: req.body.summary,
        publisher: req.body.publisher,
        pageCount: req.body.pageCount,
        readPage: req.body.readPage,
        finished: finished,
        updatedAt: updatedAt,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
      // message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.deleteOne({
      _id: req.params.id,
    });
    if (book.deletedCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  } catch {
    res.status(500).json({ 
      status: 'fail', 
      message: 'Gagal menghapus buku' });
  }
};

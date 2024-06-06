const db = require('../db');

exports.borrowBook = (req, res) => {
    const { user_id, book_id } = req.body;
    const borrowDate = new Date().toISOString();

    db.get(`SELECT borrowed FROM books WHERE id = ?`, [book_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row && row.borrowed) {
            return res.status(400).json({ error: 'Book is already borrowed' });
        }

        db.run(`UPDATE books SET borrowed = 1 WHERE id = ?`, [book_id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            db.run(`INSERT INTO borrowed_books (user_id, book_id, borrow_date) VALUES (?, ?, ?)`, [user_id, book_id, borrowDate], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ id: this.lastID });
            });
        });
    });
};

exports.returnBook = (req, res) => {
    const { user_id, book_id } = req.body;
    const returnDate = new Date().toISOString();

    db.get(`SELECT borrowed FROM books WHERE id = ?`, [book_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row && !row.borrowed) {
            return res.status(400).json({ error: 'Book is not currently borrowed' });
        }

        db.run(`UPDATE books SET borrowed = 0 WHERE id = ?`, [book_id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            db.run(`UPDATE borrowed_books SET return_date = ? WHERE user_id = ? AND book_id = ? AND return_date IS NULL`, [returnDate, user_id, book_id], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ changes: this.changes });
            });
        });
    });
};

exports.viewBorrowedBooks = (req, res) => {
    const { user_id } = req.params;
    db.all(`SELECT b.id, b.title, b.author, b.genre, b.publication_year, bb.borrow_date 
            FROM books b 
            JOIN borrowed_books bb ON b.id = bb.book_id 
            WHERE bb.user_id = ? AND bb.return_date IS NULL`, [user_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

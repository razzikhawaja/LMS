const db = require('../db');

exports.addBook = (req, res) => {
    const { title, author, genre, publication_year } = req.body;
    db.run(`INSERT INTO books (title, author, genre, borrowed, publication_year) VALUES (?, ?, ?, 0, ?)`, [title, author, genre, publication_year], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
};

exports.updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publication_year } = req.body;
    db.run(`UPDATE books SET title = ?, author = ?, genre = ?, publication_year = ? WHERE id = ?`, [title, author, genre, publication_year, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
};

exports.deleteBook = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM books WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
};

exports.viewBooks = (req, res) => {
    const { title, author, genre } = req.query;
    let sql = `SELECT * FROM books WHERE 1=1`;
    let params = [];
    if (title) {
        sql += ` AND title LIKE ?`;
        params.push(`%${title}%`);
    }
    if (author) {
        sql += ` AND author LIKE ?`;
        params.push(`%${author}%`);
    }
    if (genre) {
        sql += ` AND genre LIKE ?`;
        params.push(`%${genre}%`);
    }
    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

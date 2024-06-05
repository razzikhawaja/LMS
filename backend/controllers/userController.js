const db = require('../db');

exports.registerUser = (req, res) => {
    const { name, email, contact_number } = req.body;
    db.run(`INSERT INTO users (name, email, contact_number) VALUES (?, ?, ?)`, [name, email, contact_number], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, contact_number } = req.body;
    db.run(`UPDATE users SET name = ?, email = ?, contact_number = ? WHERE id = ?`, [name, email, contact_number, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
};

exports.viewUsers = (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

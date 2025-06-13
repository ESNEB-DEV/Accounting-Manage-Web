const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bangkok',
    database: 'accountingsystem',
});

app.get('/bg_credit', (req, res) => {
    db.query('SELECT * FROM bg_credit ORDER BY id DESC', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.post('/bg_credit_create', (req, res) => {
    const { c_name, f_amount, d_doc_date } = req.body;
    db.query('INSERT INTO bg_credit (c_name, f_amount, d_doc_date) VALUES (?, ?, ?)',
        [c_name, f_amount, d_doc_date], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                // ส่งกลับ ID ที่ gen โดย MySQL
                res.json({ id: results.insertId });
            }
        });
});

app.delete('/bg_credit_delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM bg_credit WHERE id = ?', id, (err, results) => {
        if (err) {
            console.log(id);
        } else {
            res.send(results);
        }
    });
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
}); 
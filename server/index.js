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

// บันทึกการใช้บัตรเครดิต
app.get('/bg_credit', (req, res) => {
    db.query('SELECT * FROM bg_credit ORDER BY bg_credit_id DESC', (err, results) => {
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
                res.json({ bg_credit_id: results.insertId });
            }
        });
});

app.put('/bg_credit_update/:bg_credit_id', (req, res) => {
    const bg_credit_id = req.params.bg_credit_id;
    const { c_name, f_amount, d_doc_date } = req.body;
    db.query('UPDATE bg_credit SET c_name = ?, f_amount = ?, d_doc_date = ? WHERE bg_credit_id = ?',
        [c_name, f_amount, d_doc_date, bg_credit_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        });
});

app.delete('/bg_credit_delete/:bg_credit_id', (req, res) => {
    const bg_credit_id = req.params.bg_credit_id;
    db.query('DELETE FROM bg_credit WHERE bg_credit_id = ?', bg_credit_id, (err, results) => {
        if (err) {
            console.log(bg_credit_id);
        } else {
            res.send(results);
        }
    });
});
// End บันทึกการใช้บัตรเครดิต

app.listen(3001, () => {
    console.log('Server is running on port 3001');
}); 
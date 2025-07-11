const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const port = 3001;
const path = require('path');

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
    const { c_name, f_amount, d_doc_date, t_update_dt } = req.body;
    db.query('UPDATE bg_credit SET c_name = ?, f_amount = ?, d_doc_date = ? ,t_update_dt = ? WHERE bg_credit_id = ?',
        [c_name, f_amount, d_doc_date, t_update_dt, bg_credit_id], (err, results) => {
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

// บันทึกรายการรับ-จ่ายเงิน
app.get('/bg_daily', (req, res) => {
    db.query('SELECT * FROM bg_daily ORDER BY bg_daily_id DESC', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.post('/bg_daily_create', (req, res) => {
    const { c_name, f_amount, c_type } = req.body;
    db.query('INSERT INTO bg_daily (c_name, f_amount, c_type) VALUES (?, ?, ?)',
        [c_name, f_amount, c_type], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ bg_daily_id: results.insertId });
            }
        });
});

app.get('/bg_daily_recieve', (req, res) => {
    db.query('SELECT bg_daily_id ,f_amount FROM bg_daily WHERE c_type = 1', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_pay', (req, res) => {
    db.query('SELECT bg_daily_id ,f_amount FROM bg_daily WHERE c_type = 0', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_sum_recieve', (req, res) => {
    db.query('SELECT sum(f_amount) as SumRecieve FROM bg_daily WHERE c_type = 1', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_sum_pay', (req, res) => {
    db.query('SELECT sum(f_amount) as SumPay FROM bg_daily WHERE c_type = 0', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get('/bg_daily_sum_today', (req, res) => {
    db.query('SELECT SUM(f_amount) AS SumToday FROM bg_daily WHERE c_type = 0 AND DATE(t_create_dt) = CURDATE();', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.delete('/bg_daily_delete/:bg_daily_id', (req, res) => {
    const bg_daily_id = req.params.bg_daily_id;
    db.query('DELETE FROM bg_daily WHERE bg_daily_id = ?', bg_daily_id, (err, results) => {
        if (err) {
            console.log(bg_daily_id);
        } else {
            res.send(results);
        }
    });
});
// End บันทึกรายการรับ-จ่ายเงิน

//บันทึกรายการผ่อนชำระบัตรเคดิต
app.get('/bg_installment', (req, res) => {
    db.query('SELECT * FROM bg_installment ORDER BY bg_installment_id DESC', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.get('/bg_installment_sumItems', (req, res) => {
    db.query('SELECT count(bg_installment_id) as CountAct , SUM(f_amount / c_preriod) as sumPerMonth FROM bg_installment where i_active = 1', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});


app.post('/bg_installment_create', (req, res) => {
    const { c_name, f_amount, c_preriod, d_doc_date, i_active } = req.body;
    db.query('INSERT INTO bg_installment (c_name, f_amount, c_preriod , d_doc_date , i_active) VALUES (?, ?, ?, ? ,?)',
        [c_name, f_amount, c_preriod, d_doc_date, i_active], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ bg_installment_id: results.insertId });
            }
        });
});

app.put('/bg_installment_update/:bg_installment_id', (req, res) => {
    const bg_installment_id = req.params.bg_installment_id;
    const { i_active, t_update_dt } = req.body;
    db.query('UPDATE bg_installment SET i_active = ? , t_update_dt  = ? WHERE bg_installment_id = ?',
        [i_active, t_update_dt, bg_installment_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: true });
            }
        });
});

app.delete('/bg_installment_delete/:bg_installment_id', (req, res) => {
    const bg_installment_id = req.params.bg_installment_id;
    db.query('DELETE FROM bg_installment WHERE bg_installment_id = ?', bg_installment_id, (err, results) => {
        if (err) {
            console.log(bg_installment_id);
        } else {
            res.send(results);
        }
    });
});
// End บันทึกรายการผ่อนชำระบัตรเคดิต

//  บันทึกรายการประมาณการค่าใช้จ่าย
app.get('/bg_estimate', (req, res) => {
    db.query('SELECT * FROM bg_estimate', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.get('/bg_estimate_sum', (req, res) => {
    db.query('SELECT sum(f_amount) as SumAmount FROM bg_estimate', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.get('/bg_estimate_AmountEstimate', (req, res) => {
    db.query('SELECT f_amount as AmountEstimate FROM bg_estimate where bg_estimate_id = 3', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.post('/bg_estimate_create', (req, res) => {
    const { c_name, f_amount } = req.body;
    db.query('INSERT INTO bg_estimate (c_name, f_amount) VALUES (?, ?)',
        [c_name, f_amount], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ bg_estimate_id: results.insertId });
            }
        });
});

app.delete('/bg_estimate_delete/:bg_estimate_id', (req, res) => {
    const bg_estimate_id = req.params.bg_estimate_id;
    db.query('DELETE FROM bg_estimate WHERE bg_estimate_id = ?', bg_estimate_id, (err, results) => {
        if (err) {
            console.log(bg_estimate_id);
        } else {
            res.send(results);
        }
    });
});

app.put('/bg_estimate_update/:bg_estimate_id', (req, res) => {
    const bg_estimate_id = req.params.bg_estimate_id;
    const { c_name, f_amount, t_update_dt } = req.body;
    db.query('UPDATE bg_estimate SET c_name = ? , f_amount = ? , t_update_dt = ? WHERE bg_estimate_id = ?',
        [c_name, f_amount, t_update_dt, bg_estimate_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: true });
            }
        });
});
// End บันทึกรายการประมาณการค่าใช้จ่าย

// บันทึกค่าใช้จ่ายประจำเดือน
app.get('/bg_expense', (req, res) => {
    db.query('SELECT * FROM bg_expense ORDER BY bg_expense_id DESC', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

app.get('/bg_expense_sum', (req, res) => {
    db.query('SELECT sum(f_amount) as SumAmount FROM bg_expense', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});


app.post('/bg_expense_create', (req, res) => {
    const { c_name, f_amount } = req.body;
    db.query('INSERT INTO bg_expense (c_name, f_amount) VALUES (?, ?)',
        [c_name, f_amount], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ bg_expense_id: results.insertId });
            }
        });
});

app.delete('/bg_expense_delete/:bg_expense_id', (req, res) => {
    const bg_expense_id = req.params.bg_expense_id;
    db.query('DELETE FROM bg_expense WHERE bg_expense_id = ?', bg_expense_id, (err, results) => {
        if (err) {
            console.log(bg_expense_id);
        } else {
            res.send(results);
        }
    });
});

app.put('/bg_expense_update/:bg_expense_id', (req, res) => {
    const bg_expense_id = req.params.bg_expense_id;
    const { c_name, f_amount, t_update_dt } = req.body;
    db.query('UPDATE bg_expense SET c_name = ? , f_amount = ? , t_update_dt = ? WHERE bg_expense_id = ?',
        [c_name, f_amount, t_update_dt, bg_expense_id], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: true });
            }
        });
});
// End บันทึกค่าใช้จ่ายประจำเดือน

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'), function (err) {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
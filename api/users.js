// api/users.js
import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async function handler(req, res) {
    try {
        const result = await pool.query('SELECT * FROM users'); // ต้องมี table ชื่อ users
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

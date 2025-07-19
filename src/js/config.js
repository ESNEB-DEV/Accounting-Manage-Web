const API_URL = import.meta.env.VITE_API_URL;
const PGHOST = import.meta.env.PGHOST;
const PGUSER = import.meta.env.PGUSER;
const PGPASSWORD = import.meta.env.PGPASSWORD;
const PGDATABASE = import.meta.env.PGDATABASE;
const PGPORT = import.meta.env.PGPORT;
const PGSSLMODE = import.meta.env.PGSSLMODE;
const PGCHANNELBINDING = import.meta.env.PGCHANNELBINDING;

export default {
    API_URL,
    PGHOST,
    PGUSER,
    PGPASSWORD,
    PGDATABASE,
    PGPORT,
    PGSSLMODE,
    PGCHANNELBINDING,
};
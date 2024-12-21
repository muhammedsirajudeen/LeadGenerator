import pg from "pg"

const pool = new pg.Pool({
    user: 'sirajudeen',
    host: 'localhost',
    database: 'leads',
    password: 'sirajudeen',
    port: 5432,
});

export default pool
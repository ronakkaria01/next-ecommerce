import mysql from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

// Export a function to query the database using the pool
module.exports = async function queryDatabase(sql, values = []) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(sql, values);
        connection.release(); // Release the connection back to the pool
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

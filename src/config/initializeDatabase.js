require('dotenv').config();

const bcrypt = require('bcrypt');


const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const initializeDatabase = async () => {
    try {
        const connection = await pool.getConnection();

        const hashedPassword = await bcrypt.hash('alex', 10);
        await connection.query(
            `
            INSERT IGNORE INTO users (username, password, email, roles) 
            VALUES (?, ?, ?, ?);
            `,
            ['alex', hashedPassword, 'alex@gmail.com', JSON.stringify(['ROLE_USER'])]
        );

        console.log('Database, tables, and default user initialized successfully.');
        connection.release();
    } catch (err) {
        console.error('Error initializing the database:', err.message);
    }
};

initializeDatabase();

module.exports = pool;

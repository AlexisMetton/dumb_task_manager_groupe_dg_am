require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: process.env.HOST || 'localhost',
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        database: process.env.DATABASE || 'task_manager_demo',
    });

    try {
        console.log("Cleaning up test data...");

        await connection.query(`
            DELETE FROM tasks 
            WHERE description LIKE 'test_e2e_%';
        `);

        // Suppression des tâches liées aux utilisateurs de test
        await connection.query(`
            DELETE FROM tasks 
            WHERE user_id IN (SELECT id FROM users WHERE username LIKE 'test_%');
        `);

        // Suppression des utilisateurs de test
        await connection.query(`
            DELETE FROM users WHERE username LIKE 'test_%';
        `);

        console.log("Test data cleanup completed.");
    } catch (error) {
        console.error("Error during test data cleanup:", error.message);
    } finally {
        await connection.end();
    }
})();

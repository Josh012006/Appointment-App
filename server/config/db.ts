// lib/db.ts
import mysql from 'mysql2/promise';


// Créez une connexion à la base de données
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'appointment',
});

export default pool;
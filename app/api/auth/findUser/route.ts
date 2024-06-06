import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import pool from '@/server/config/db';



export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const {type, mail} = await req.json();

        const connection = await pool.getConnection();
        console.log("Connected to the database!");

        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE email = ? AND type = ?', [mail, type]);

        if(Array.isArray(rows)) {
            if(rows.length === 0) {
                res.status(404).json({})
            }
            else {
                res.status(200).json(rows[0]);
            }
        }
        else {
            throw Error('Une erreur interne est survenue avec le findUser!')
        }

    } catch(error) {
        res.status(500).json(error);
    }
}
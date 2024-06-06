import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import pool from '@/server/config/db';
import { OkPacket } from 'mysql';


export async function UPDATE(req: NextRequest, res: NextApiResponse) {
    try {
        const { id, password } = await req.json();

        const connection = await pool.getConnection();
        console.log("Connected to the database!");

        const [ result ] = await connection.execute('UPDATE users SET password = ? WHERE id = ?', [password, id]);

        if((result as OkPacket).affectedRows === 0 || (result as OkPacket).affectedRows === undefined) {
            res.status(500).json(result);
        }
        else {
            res.status(200).json(result);
        }

    } catch(error) {
        res.status(500).json(error);
    }
}
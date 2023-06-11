import express, {json} from "express";
import mysql, {Pool} from "promise-mysql";
import dotenv from "dotenv";

export const router = express.Router();

let pool:Pool;
dotenv.config();
initPool();

async function initPool() {
    pool = await mysql.createPool({
        host:process.env.host,
        port: +process.env.port!,
        database:process.env.database,
        user:process.env.username,
        password:process.env.password,
        connectionLimit:+process.env.connection_limit!
    });
}

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
type Task = {
    id:number,
    description:string,
    status: 'COMPLETED' | 'NOT_COMPLETED'| undefined
}


router.get("/",async (req,res) => {
    console.log("get")
    const tasks = await pool.query("SELECT * FROM task");
    console.log(tasks)
    res.json(tasks);
});


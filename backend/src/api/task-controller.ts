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

router.post("/",async (req,res) => {
    console.log("post")
    const task = req.body as Task;
    if (!task.description?.trim()) {
        res.sendStatus(400);
        return;
    }

    const result = await pool.query('INSERT INTO task (description, status) VALUES (?,DEFAULT)',
        [task.description]);
    task.id = result.insertId;
    task.status = "NOT_COMPLETED";

    res.status(201).json(task);
});

router.delete("/:taskId", async (req,res) => {
    const result = await pool.query("DELETE FROM task WHERE id=?",[req.params.taskId]);
    res.sendStatus(result.affectedRows ? 204 : 404);
});

router.patch("/:taskId",async (req,res) => {
    console.log("patch")
    const task = (req.body as Task);
    task.id = +req.params.taskId;
    if (!task.status){
        res.sendStatus(400);
        return;
    }
    const result = await pool.query("UPDATE task SET status=? WHERE id=?",[task.status,task.id]);
    res.sendStatus(result.affectedRows ? 204 : 404);
});

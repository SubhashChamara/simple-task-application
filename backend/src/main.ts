import express, {json} from 'express';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(json());
app.listen(8080,() => console.log("Server has been started at 8080"));
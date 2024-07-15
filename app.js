import express from "express";
import cors from "cors";
import blogRouter from "./routes/blogs.routes.js";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
import openai from "./routes/interview.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use('/api/v1/blogs',blogRouter );

app.use('/api/todo/v1/user', userRouter);
app.use('/api/todo/v1/todo', todoRouter);


export default app;
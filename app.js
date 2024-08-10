import express from "express";
import cors from "cors";
import blogRouter from "./routes/blogs.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use('/api/v1/blogs',blogRouter );

export default app;
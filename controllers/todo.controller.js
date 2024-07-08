import Todo from "../models/todo.model.js";

const createTodo = async (req, res) => {
    const { title, description, completed, userEmail } = req.body;
    if (!title || !userEmail || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const todo = await Todo.create({ title, description, completed, userEmail });
        res.status(201).json({ message: "Todo created successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error in todo creation" });
    }
}

const getTodos = async (req, res) => {
    const { userEmail } = req.body;
    if (!userEmail) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const todos = await Todo.find({ userEmail });
        res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error in todos fetching" });
    }
}

const updateTodo = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const todo = await Todo.findById(id);
        if(todo.completed===true) {
            const todo = await Todo.findByIdAndUpdate(id, {completed: false},{new: true});
            res.status(200).json({ message: "Todo updated successfully", todo });
        } else {
            const todo = await Todo.findByIdAndUpdate(id, {completed: true},{new: true});
            res.status(200).json({ message: "Todo updated successfully", todo });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error in todo update" });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const todo = await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully", todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error in todo deletion" });
    }
}

export { createTodo, getTodos, updateTodo, deleteTodo }
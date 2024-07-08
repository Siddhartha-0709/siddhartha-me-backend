import userModel from "../models/user.model.js";

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userModel.create({ name, email, password });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error in user creation" });
    }
}
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error in user login" });
    }
}
export { createUser, userLogin };

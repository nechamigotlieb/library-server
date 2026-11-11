import { users } from '../users.js';

export const getAllUsers = (req, res) => {
    res.json(users);
};

export const signUp = (req, res) => {
    const { username, email, password } = req.body;
    const newUser = {
        code: users.length ? users[users.length - 1].code + 1 : 1,
        username, email, password, borrowedBooks: []
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const signIn = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).send("אימייל או סיסמה שגויים");
    res.json({ message: "התחברות הצליחה", user });
};
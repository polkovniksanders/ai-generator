"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const generator_service_1 = require("../generator/generator.service");
const userService = new user_service_1.UserService();
class UserController {
    async createUser(req, res) {
        try {
            const { name, surname, age, profession } = req.body;
            if (!name || !surname || age === undefined || age === null) {
                res.status(400).json({ error: "name, surname и age обязательны" });
                return;
            }
            const user = await userService.createUser({
                name,
                surname,
                age,
                profession,
            });
            const description = await (0, generator_service_1.generatePersonDescription)(user);
            user.isKnown = Math.random() < 0.85;
            user.description = description;
            res.status(201).json({ user });
        }
        catch (error) {
            console.error("createUser error:", error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }
    async getUserByUuid(req, res) {
        try {
            const uuid = req.params.uuid;
            if (!uuid) {
                res.status(400).json({ error: "UUID обязателен" });
                return;
            }
            const user = await userService.getUser(uuid);
            if (!user) {
                res.status(404).json({ error: "Пользователь не найден" });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }
    async getUsers(req, res) {
        try {
            let users = await userService.getAllUsers();
            users = users.sort((a, b) => b.id - a.id);
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }
}
exports.UserController = UserController;

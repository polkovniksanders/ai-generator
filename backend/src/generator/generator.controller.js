"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorController = void 0;
const user_service_1 = require("../user/user.service");
const generator_service_1 = require("./generator.service");
const userService = new user_service_1.UserService();
class GeneratorController {
    async generateCharacter(req, res) {
        const uuid = req.params.uuid;
        try {
            const user = await userService.getUser(uuid);
            const description = user?.description ?? (await (0, generator_service_1.generatePersonDescription)(user));
            res.status(201).json({ description: description });
        }
        catch (error) {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }
    async generateCharacterImage(req, res) {
        const description = req.body.description;
        try {
            const image = await (0, generator_service_1.generatePersonImage)(description);
            res.status(201).json({ image: image });
        }
        catch (error) {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }
}
exports.GeneratorController = GeneratorController;

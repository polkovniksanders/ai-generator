"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_controller_1 = require("./user/user.controller");
const logger_1 = require("../utils/logger");
const client_1 = require("@prisma/client");
const generator_controller_1 = require("./generator/generator.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const userController = new user_controller_1.UserController();
const generateController = new generator_controller_1.GeneratorController();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/users", (req, res) => userController.createUser(req, res));
app.get("/api/users", (req, res) => userController.getUsers(req, res));
app.get("/api/users/:uuid", (req, res) => userController.getUserByUuid(req, res));
app.get("/api/generate/:uuid", (req, res) => generateController.generateCharacter(req, res));
app.post("/api/generate-image", (req, res) => generateController.generateCharacterImage(req, res));
const PORT = process.env.PORT;
async function main() {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}`);
        });
    }
    catch (e) {
        logger_1.logger.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();

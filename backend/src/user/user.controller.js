"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var user_service_1 = require("./user.service");
var generator_service_1 = require("../generator/generator.service");
function biasedRandomBoolean() {
    return Math.random() < 0.85;
}
var userService = new user_service_1.UserService();
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, surname, age, profession, user, isKnown, description, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, name_1 = _a.name, surname = _a.surname, age = _a.age, profession = _a.profession;
                        if (!name_1 || !surname || age === undefined || age === null) {
                            res.status(400).json({ error: "name, surname и age обязательны" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, userService.createUser({
                                name: name_1,
                                surname: surname,
                                age: age,
                                profession: profession,
                            })];
                    case 1:
                        user = _b.sent();
                        isKnown = biasedRandomBoolean();
                        return [4 /*yield*/, (0, generator_service_1.generatePersonDescription)(user)];
                    case 2:
                        description = _b.sent();
                        user.isKnown = isKnown;
                        user.description = description;
                        res.status(201).json({ user: user });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error("createUser error:", error_1);
                        res.status(500).json({ error: "Ошибка сервера" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserByUuid = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uuid, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uuid = req.params.uuid;
                        if (!uuid) {
                            res.status(400).json({ error: "UUID обязателен" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, userService.getUser(uuid)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(404).json({ error: "Пользователь не найден" });
                            return [2 /*return*/];
                        }
                        res.json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({ error: "Ошибка сервера" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        users = users.sort(function (a, b) { return b.id - a.id; });
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({ error: "Ошибка сервера" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;

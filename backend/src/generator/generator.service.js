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
exports.generatePersonDescription = generatePersonDescription;
exports.generatePersonImage = generatePersonImage;
function generatePersonDescription(user) {
    return __awaiter(this, void 0, void 0, function () {
        var name, surname, age, profession, prompt, retryCount, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = user.name, surname = user.surname, age = user.age, profession = user.profession;
                    prompt = "\n    \u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439 \u043A\u0440\u0430\u0442\u043A\u043E\u0435, \u043D\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445:\n    - \u0418\u043C\u044F: ".concat(name, "\n    - \u0424\u0430\u043C\u0438\u043B\u0438\u044F: ").concat(surname, "\n    - \u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(age || "не указан", "\n    - \u041F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u044F: ").concat(profession || "не указана", "\n    \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0432\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u0443\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F, \u0447\u0435\u0440\u0442\u044B \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0430 \u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F (\u0435\u0441\u043B\u0438 \u0435\u0441\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435). \u041C\u043E\u0436\u0435\u0448\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u044E\u043C\u043E\u0440 \u0432 \u043E\u0442\u0432\u0435\u0442\u0435\n  ");
                    retryCount = 0;
                    _a.label = 1;
                case 1:
                    if (!(retryCount < 3)) return [3 /*break*/, 6];
                    return [4 /*yield*/, fetch("https://text.pollinations.ai/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                messages: [{ role: "user", content: prompt }],
                                model: "openai",
                                private: true,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!(response.status === 429)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2500); })];
                case 3:
                    _a.sent();
                    retryCount++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, response.text()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: throw new Error("Too many requests. Please try again later.");
            }
        });
    });
}
function generatePersonImage(description) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, width, height, seed, model;
        return __generator(this, function (_a) {
            prompt = description;
            width = 400;
            height = 400;
            seed = 42;
            model = "flux";
            return [2 /*return*/, "https://pollinations.ai/p/".concat(encodeURIComponent(prompt), "?width=").concat(width, "&height=").concat(height, "&seed=").concat(seed, "&model=").concat(model)];
        });
    });
}

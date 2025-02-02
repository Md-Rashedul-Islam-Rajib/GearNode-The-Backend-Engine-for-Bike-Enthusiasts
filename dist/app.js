"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handlingErrors_1 = require("./errors/handlingErrors");
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'https://gear-node.vercel.app', credentials: true }));
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// home route
app.get('/', (_req, res) => {
    res.send('Welcome to 🏍🏍🏍 GearNode 🏍🏍🏍');
});
// App routes
app.use('/', routes_1.default);
// global error handler
app.use(handlingErrors_1.handleErrors);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = __importDefault(require("./routes/login"));
var express = require('express');
var app = express();
var port = 3000;
app.use(login_1.default);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});

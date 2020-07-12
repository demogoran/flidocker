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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = void 0;
const SphinxClient = require("sphinxapi");
exports.sync = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(123);
    const cl = new SphinxClient();
    cl.SetServer('localhost', 19312);
    cl.Query('test', function (err, result) {
        console.log(err, result);
    });
});

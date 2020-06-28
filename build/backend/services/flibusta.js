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
exports.getBookPDF = exports.getBook = exports.authorPage = void 0;
const cheerio = require("cheerio");
const toraxios = require("tor-axios");
const puppeteer = require("puppeteer");
const fs_1 = require("fs");
const tor = toraxios.torSetup({
    ip: 'localhost',
    port: 9050,
});
exports.authorPage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = (yield tor.get(`http://flibustahezeous3.onion/a/${id}`)).data;
    const $ = cheerio.load(response);
    const url = $('a[href*="/read"]+a:contains("epub")').get().map((x) => $(x).attr('href'));
    console.log(url);
    return url;
});
exports.getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    try {
        yield fs_1.promises.mkdir("./cached");
    }
    catch (ex) {
        console.error("Folder already exists");
    }
    console.log(1, Date.now() - start);
    const bookPath = `./cached/book.${id}.epub`;
    try {
        yield fs_1.promises.stat(bookPath);
        const fileCached = yield fs_1.promises.readFile(bookPath);
        console.log('created');
        return fileCached;
    }
    catch (ex) {
        console.error("File not cached");
    }
    console.log(2, Date.now() - start);
    const response = (yield tor.get(`http://flibustahezeous3.onion/b/${id}/epub`, {
        responseType: "arraybuffer"
    })).data;
    console.log(3, Date.now() - start);
    yield fs_1.promises.writeFile(bookPath, response, { encoding: null });
    return response;
});
exports.getBookPDF = (id, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(1);
    try {
        yield fs_1.promises.mkdir("./cached");
    }
    catch (ex) {
        console.error("Folder already exists");
    }
    const bookPath = `./cached/book.${id}.${width}.${height}.pdf`;
    console.log(2);
    try {
        const fileCached = yield fs_1.promises.readFile(bookPath);
        return fileCached;
    }
    catch (ex) {
        console.error("File not cached");
    }
    const response = (yield tor.get(`http://flibustahezeous3.onion/b/${id}/read`)).data;
    const $ = cheerio.load(response);
    const html = $('.book').get().map(x => $(x).html()).join('<br>');
    const browser = yield puppeteer.launch({ headless: true });
    const page = yield browser.newPage();
    yield page.setContent(html);
    const pdf = yield page.pdf({
        height: height / 0.75,
        width: width / 0.75,
        scale: 1 / 0.75,
        printBackground: true,
    });
    console.log(3);
    yield browser.close();
    yield fs_1.promises.writeFile(bookPath, pdf);
    console.log(4);
    return pdf;
});

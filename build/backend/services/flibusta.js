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
exports.getBook = exports.getSearchBooks = exports.getGenreList = exports.getGenreBooks = void 0;
const fs = require("fs");
const toraxios = require("tor-axios");
const axios_1 = require("axios");
const fs_1 = require("fs");
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const tor = toraxios.torSetup({
    ip: "localhost",
    port: 9050,
});
exports.getGenreBooks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield db_1.LibBook.findAll({
        include: [
            {
                model: db_1.LibGenreList,
                where: { GenreId: id },
            },
            db_1.LibAuthorName,
        ],
    });
    return genres;
});
exports.getGenreList = () => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield db_1.LibGenreList.findAll({});
    return genres;
});
exports.getSearchBooks = (type, str) => __awaiter(void 0, void 0, void 0, function* () {
    const searchParams = type === "book"
        ? {
            Title: {
                [sequelize_1.Op.like]: `%${str}%`,
            },
        }
        : {
            "$libavtorname_models.FirstName$": {
                [sequelize_1.Op.like]: `%${str}%`,
            },
            "$libavtorname_models.LastName$": {
                [sequelize_1.Op.like]: `%${str}%`,
            },
        };
    const books = yield db_1.LibBook.findAll({
        where: {
            [sequelize_1.Op.or]: searchParams,
        },
        include: [
            {
                model: db_1.LibAuthorName,
                attributes: ["FirstName", "LastName"],
            },
            {
                model: db_1.LibBAnnotation,
                attributes: ["Body"],
            },
        ],
        attributes: ["BookId", "Title", "Modified", "Deleted"],
    });
    return books.filter((x) => x.Deleted !== "1");
});
exports.getBook = (id, type = "epub") => __awaiter(void 0, void 0, void 0, function* () {
    const start = Date.now();
    try {
        yield fs_1.promises.mkdir("./cached");
    }
    catch (ex) {
        console.error("Folder already exists");
    }
    console.log(1, Date.now() - start);
    const bookPath = `./cached/book.${id}.${type}`;
    try {
        yield fs_1.promises.stat(bookPath);
        const fileCached = yield fs.createReadStream(bookPath);
        console.log("created");
        return fileCached;
    }
    catch (ex) {
        console.error("File not cached");
    }
    console.log(2, Date.now() - start);
    console.log(`http://flibustahezeous3.onion/b/${id}/${type}`);
    const flibustaUrl = `http://flibusta.is/b/${id}/${type}`;
    const headInfo = yield axios_1.default(flibustaUrl, { method: "HEAD" });
    const isFileAvailable = headInfo.status === 200 && headInfo.headers["content-length"] > 50000;
    console.log("Is download from tor:", !isFileAvailable);
    const axiosObj = !isFileAvailable ? tor : axios_1.default;
    const axiosURL = !isFileAvailable
        ? `http://flibustahezeous3.onion/b/${id}/${type}`
        : flibustaUrl;
    const responseStream = (yield axiosObj.get(axiosURL, {
        responseType: "stream",
        onDownloadProgress: (progress) => {
            console.log("Progress", progress);
        },
    })).data;
    responseStream.pipe(fs.createWriteStream(bookPath));
    return responseStream;
});

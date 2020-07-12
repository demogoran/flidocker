"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const fastify_decorators_1 = require("fastify-decorators");
const flibusta_1 = require("../services/flibusta");
let FlibustaController = class FlibustaController {
    genrelist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genres = yield flibusta_1.getGenreList();
                return genres;
            }
            catch (ex) {
                throw Error(ex.message);
            }
        });
    }
    genrebooks(Request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = Request.params;
                const genres = yield flibusta_1.getGenreBooks(id);
                return genres;
            }
            catch (ex) {
                throw Error(ex.message);
            }
        });
    }
    search(Request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { str } = Request.params;
                const genres = [
                    yield flibusta_1.getSearchBooks("book", str),
                    yield flibusta_1.getSearchBooks("author", str)
                ];
                return [...new Set(genres.flat())];
            }
            catch (ex) {
                throw Error(ex.message);
            }
        });
    }
    book(Request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = Request.params;
                return yield flibusta_1.getBook(id);
            }
            catch (ex) {
                console.error("Book error", ex);
                throw Error(ex.message);
            }
        });
    }
    download(Request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, type } = Request.params;
                return yield flibusta_1.getBook(id, type);
            }
            catch (ex) {
                console.error("Download error", ex);
                throw Error(ex.message);
            }
        });
    }
};
__decorate([
    fastify_decorators_1.GET('/genrelist')
], FlibustaController.prototype, "genrelist", null);
__decorate([
    fastify_decorators_1.GET('/genrebooks/:id')
], FlibustaController.prototype, "genrebooks", null);
__decorate([
    fastify_decorators_1.GET('/search/:type/:str')
], FlibustaController.prototype, "search", null);
__decorate([
    fastify_decorators_1.GET('/:id/book.epub')
], FlibustaController.prototype, "book", null);
__decorate([
    fastify_decorators_1.GET('/download/:id/:type')
], FlibustaController.prototype, "download", null);
FlibustaController = __decorate([
    fastify_decorators_1.Controller('/flibusta')
], FlibustaController);
exports.default = FlibustaController;

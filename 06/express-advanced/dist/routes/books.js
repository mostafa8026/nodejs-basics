"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const books = [
    {
        id: 1,
        name: "book 1",
    },
    {
        id: 2,
        name: "book 2",
    },
    {
        id: 3,
        name: "book 3",
    },
];
const router = express_1.default.Router();
exports.router = router;
router.get("/", (req, res) => {
    res.send(books);
});
router.get("/:id", (req, res) => {
    const book = books.find((x) => x.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send("book not found");
    }
    res.send(book);
});
router.post("", (req, res) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    });
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    const book = {
        id: books.length + 1,
        name: req.body.name,
    };
    books.push(book);
    res.send(book);
});
router.put("/:id", (req, res) => {
    const book = books.find((x) => x.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send("book not found");
    }
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
    });
    const result = schema.validate(req.body);
    console.log(result);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    book.name = req.body.name;
    res.send(book);
});
router.delete("/:id", (req, res) => {
    const book = books.find((x) => x.id === parseInt(req.params.id));
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});

import express from "express";

import Schemas from "./schemas";

import * as BookController from "../../controllers/book";

import validate from "../../middleware/validation";

const router = express.Router();

router.get("/", validate(Schemas.getBooks), BookController.find);
router.post("/", express.json(), validate(Schemas.createBook), BookController.create);

router.get("/:id", validate(Schemas.getBook), BookController.findById);
router.put("/:id", express.json(), validate(Schemas.updateBook), BookController.updateById);
router.delete("/:id", validate(Schemas.deleteBook), BookController.deleteById);

export default router;

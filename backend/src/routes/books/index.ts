import express from "express";

import Schemas from "./schemas";

import * as BookController from "../../controllers/book";

import validate from "../../middleware/validation";
import authMiddleware from "../../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, validate(Schemas.getBooks), BookController.find);
router.post(
  "/",
  authMiddleware,
  express.json(),
  validate(Schemas.createBook),
  BookController.create,
);

router.get("/:id", authMiddleware, validate(Schemas.getBook), BookController.findById);
router.put(
  "/:id",
  authMiddleware,
  express.json(),
  validate(Schemas.updateBook),
  BookController.updateById,
);
router.delete("/:id", authMiddleware, validate(Schemas.deleteBook), BookController.deleteById);

export default router;

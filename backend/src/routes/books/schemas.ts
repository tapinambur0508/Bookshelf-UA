import Joi from "joi";

import BookSchema from "../../schemas/book";

const getBook = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "MongoDB ObjectId"),
  }),
});

const getBooks = Joi.object().keys({
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(50),
  }),
});

const createBook = Joi.object().keys({
  body: BookSchema,
});

const updateBook = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "MongoDB ObjectId"),
  }),
  body: BookSchema,
});

const deleteBook = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "MongoDB ObjectId"),
  }),
});

export default {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};

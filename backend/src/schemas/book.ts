import Joi from "joi";

const BookSchema = Joi.object().keys({
  title: Joi.string().required(),
  author: Joi.string().required(),
});

export default BookSchema;

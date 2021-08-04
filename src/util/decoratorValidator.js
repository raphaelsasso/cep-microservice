/* eslint-disable */
const AppError = require("../errors/AppError");
const { ARG_TYPE } = require("./globalEnum");

const decoratorValidator = (fn, schema, argsType = ARG_TYPE.BODY) =>
  async function (event) {
    try {
      const item = event[argsType];

      const data = argsType === "body" ? JSON.parse(item) : item;

      const { error, value } = await schema.validate(data, {
        abortEarly: false,
      });

      if (error)
        throw new AppError({
          message: error.details.map(({ message }) => message).join(", "),
        });

      event[argsType] = value;

      return fn.apply(this, arguments);
    } catch (error) {
      console.error("Error**", error.message, error.stack);

      return {
        statusCode: error.code,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: error.message }),
      };
    }
  };

module.exports = decoratorValidator;

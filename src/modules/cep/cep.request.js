const Joi = require("@hapi/joi");

const AppError = require("../../errors/AppError");
const decoratorValidator = require("../../util/decoratorValidator");
const globalEnum = require("../../util/globalEnum");

class Handler {
  constructor({ apiSvc }) {
    this.apiSvc = apiSvc;
    this.apiRoute = "json";
  }
  handlerSuccess(data) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  }
  handlerError(data) {
    return {
      statusCode: data.statusCode || 501,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  }
  static validator() {
    return Joi.object({
      cep: Joi.string()
        .regex(/^[0-9]{8}$/)
        .messages({ "string.pattern.base": `O Cep deve conter 8 digitos` })
        .required(), //30575210
    });
  }
  async middleware(event) {
    const data = event.queryStringParameters;

    const response = await this.apiSvc.get(`${data.cep}/${this.apiRoute}`);

    return response;
  }
  async main(event) {
    try {
      const response = await this.middleware(event);

      if (response.data.erro === true)
        return this.handlerError({
          statusCode: 400,
          message: "Cep inexistente",
        });

      return this.handlerSuccess(response.data);
    } catch (error) {
      console.error("Error**", error.stack);
      return this.handlerError({ statusCode: 500 });
    }
  }
}

//factory
const api = require("../../services/api");

const handler = new Handler({
  apiSvc: api,
});

module.exports = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.QUERYSTRING
);

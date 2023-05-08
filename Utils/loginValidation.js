const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-formats")(ajv);

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 }
  },
  required: ["email", "password"],
  additionalProperties: false
};

module.exports = ajv.compile(loginSchema);
const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-formats")(ajv);

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: "^[a-zA-Z]+$" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8 },
    confirmPassword: { type: "string", minLength: 8 },
  },
  required: ["name", "email", "password", "confirmPassword"],
  additionalProperties: false,
  // dependencies: {
  //   confirmPassword: {
  //     properties: {
  //       password: {
  //         const: { $data: "1/password" },
  //       },
  //     },
  //   },
  // },
};
module.exports = ajv.compile(userSchema); //var validate =require("") ==> validate(data)

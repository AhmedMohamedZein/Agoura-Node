const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-formats")(ajv);

const addressSchema = {
    type: "object",
    properties: {
        country: { type: "string" },
        city: { type: "string" },
        street: { type: "string" },
        zipCode: { type: "string" }
    },
    required: ["country", "city", "street", "zipCode"],
    additionalProperties: false
};

const featuresSchema = {
    type: "object",
    properties: {
        bedRooms: { type: "string" },
        baths: { type: "string" },
        area: { type: "string" },
        kitchen: { type: "string" },
        guests: { type: "string" }
    },
    required: ["bedRooms", "baths", "area", "kitchen", "guests"],
    additionalProperties: false
}

const createPlace = {
  type: "object",
  properties: {
    title: { type: "string"},
    address: addressSchema,
    features : featuresSchema,
    aboutPlace : { type: "string"},
    startBid : { type: "string"},
    duration : { type: "string"},
    agreeToTerms : { type : "boolean" },
    images: { type: "array",
        items: {
          type: "string",
          format: "uri",
        },
        minItems: 1,
      },
    // If there a problem with Images, the system will throw an error and a resposne will be sent to the user, it will not pass to this step.
  },
  required: ["title", "address", "features","aboutPlace","startBid","duration","agreeToTerms", "images"],
  additionalProperties: false
};

module.exports = ajv.compile(createPlace);
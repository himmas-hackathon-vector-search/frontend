const serverlessExpress = require("@codegenie/serverless-express");
const app = require("./app");

exports.handler = serverlessExpress({ app });

// exports.handler = async (event) => {
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify("Hello from Lambda!"),
//   };
//   return response;
// };

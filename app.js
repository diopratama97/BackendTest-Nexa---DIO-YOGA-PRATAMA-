const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/index");
require("dotenv").config();

//app use cookie parser
app.use(cookieParser());

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// //swagger
// const apiDocs = require("./docs-api.json");
// app.use("/docs-api", swaggerUi.serve, swaggerUi.setup(apiDocs));

//routes
routes(app);

// //routes middleware
// app.use("/middleware", require("./middleware"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

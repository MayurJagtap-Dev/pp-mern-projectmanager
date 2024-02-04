require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./db/db");
const port = process.env.PORT || 5000;
const schema = require("./schema/schema");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); //Connect to DB

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

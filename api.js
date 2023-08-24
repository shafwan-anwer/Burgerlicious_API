const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");

const app = express();
app.use(cors()); // Enable CORS for all routes

const port = process.env.PORT || 3000;

const config = require("./dbconfig");
const userRoute = require("./users");
const ingredientsRoute = require("./ingredients");
const categoriesRoute = require("./categories");
const orderRoute = require("./orders");
const reviewRoute = require("./orderreviews");
const customizationRoute = require("./ordercustamization");
const authenticateRoute = require("./authenticate");

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(bodyParser.json());
app.use("/api", userRoute);
app.use("/api", ingredientsRoute);
app.use("/api", categoriesRoute);
app.use("/api", orderRoute);
app.use("/api", reviewRoute);
app.use("/api", customizationRoute);
app.use("/api", authenticateRoute);

// Start the server
app.listen(port, async () => {
  try {
    await sql.connect(config);
    console.log(`Connected to the database`);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
});


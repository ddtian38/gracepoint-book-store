const express = require("express");
const session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3001
const mongoose = require("mongoose")
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Creating Sessions
app.use(session({ secret: "execute-order-66", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use("/api", apiRoutes);


// Send every other request to the React app
// Define any API routes before this runs
// Send every other request to the React app
// Define any API routes before this runs
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gracepointBookStore");


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

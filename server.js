const express = require("express");
require("dotenv").config();
const app = express();
const colors = require("colors");
const morgan = require("morgan");
const port = process.env.PORT;
const dataInfo = require("./models/data");

//Middleware
app.use(express.urlencoded({ extended: true })); //reading req.body
app.use(morgan("dev")); //Developer logger....

//Routes...
//Index route
app.get("/resume", (req, res) => {
  res.render("index.ejs", {
    resumeData: dataInfo,
  });
});
//New route
app.get("/resume/new", (req, res) => {
  res.render("new.ejs");
});
//Post route..
app.post("/resume", (req, res) => {
  const { title, company, startDate, endDate, workSkills, location, fullTime } =
    req.body;
  if (req.body.fullTime == "on") {
    req.body.fullTime = true;
  } else {
    req.body.fullTime = false;
  }
  dataInfo.push(req.body);
  res.redirect("/resume");
});
//Show route..
app.get("/resume/:id", (req, res) => {
  res.render("show.ejs", {
    entity: dataInfo[req.params.id],
  });
});

//Port listener....
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}....`.inverse.bold.green);
});

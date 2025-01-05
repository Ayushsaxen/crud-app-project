const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const Employee = require("./models/Employee");
const app = express();
require("./dbconnect");
const encoder = bodyParser.urlencoded();
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.get("/", async (req, res) => {
  try {
    var data = await Employee.find();
    res.render("index", { data: data });
  } catch (error) {
    res.statusCode(500).send("Something Went Wrong");
  }
});
app.get("/add", (req, res) => {
  res.render("add", { show: false });
});
app.post("/add", encoder, async (req, res) => {
  try {
    const data = new Employee(req.body);
    await data.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("add", { show: true });
  }
});
app.get("/delete/:_id", async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params._id });
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
});
app.get("/update", async (req, res) => {
  try {
    var data = await Employee.findOne({ _id: req.query._id });
    res.render("update", { data: data });
  } catch (error) {
    res.redirect("/");
  }
});
app.post("/update/:_id", encoder, async (req, res) => {
  try {
    const data = await Employee.findOne({ _id: req.params._id });
    data.name = req.body.name ?? data.name;
    data.dsg = req.body.dsg ?? data.dsg;
    data.salary = req.body.salary ?? data.salary;
    data.email = req.body.email ?? data.email;
    data.phone = req.body.phone ?? data.phone;
    data.city = req.body.city ?? data.city;
    data.state = req.body.state ?? data.state;
    await data.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("add", { show: true });
  }
});
app.get("/search", async (req, res) => {
  try {
    var data = await Employee.find({
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { dsg: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { phone: { $regex: req.query.search, $options: "i" } },
        { city: { $regex: req.query.search, $options: "i" } },
        { state: { $regex: req.query.search, $options: "i" } },
      ],
    });
    res.render("index", { data: data });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
app.listen(process.env.PORT || 5000, () =>
  console.log("Server is Running at PORT 5000")
);

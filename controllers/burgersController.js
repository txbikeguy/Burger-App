var express = require("express");

// var router = express.Router();

// Import the model (burger.js) to use its database function.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
module.exports = function (app) {
  app.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = { 
        burgers: data
      };
      // console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.post("/api/burgers", function(req, res) {
    burger.create([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
  });

  app.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    // console.log("req.body.devoured is:", req.body.devoured);
    // console.log("req.body is: ", req.body);
    // console.log("condition", condition);

    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

};
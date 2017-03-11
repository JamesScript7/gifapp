var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var databaseURL = 'sqlite://dev.sqlite3';
var sequelize = new Sequelize(databaseURL);

sequelize.sync();

var gifPost = sequelize.define('gifPost', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

router.post('/gif', function(req,res) {
	var file = req.body
	console.log(file);
})

module.exports = router;
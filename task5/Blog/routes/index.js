var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const users = require('../config/data.json').users;
const chapterList = require('../config/data.json').chapterList;

router.get('/', function(req, res, next){
    res.render('login');
});

router.post('/', function(req, res, next){
    var data = req.body;
    console.log(data);
    var user = data.user;
    var pwd = data.pwd;
    for (var i = 0; i < users.length;i ++){
        if (user == users[i].username && pwd == users[i].password){
            res.render('list',{chapterList});
        }
        else{
            res.send("用户名密码错误");
        }
    }
});

module.exports = router;

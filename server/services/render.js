const { validationResult } = require("express-validator");

exports.homeRoute = (req, res) => {
    res.render('login');
}

exports.loginRoute = (req, res) =>{
    res.render('login');
}

exports.registerRoute = (req, res) =>{
    res.render('register');
}

exports.dashboardRoute = (req, res) =>{
    res.render('dashboard');
}



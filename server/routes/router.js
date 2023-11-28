const express = require('express');
const passport = require('passport');
const route = express.Router();
const { validationResult, check } = require('express-validator');
//import the service file
const services = require('../services/render');
//import controller 
const controller = require('../controller/controller');
//GET
route.get('/', services.homeRoute);
route.get('/login', services.loginRoute);
route.get('/register', services.registerRoute);
route.get('/dashboard', services.dashboardRoute)

//POST
route.post('/register',[
    check('reusername').notEmpty().withMessage('username is required'),
    check('repassword').notEmpty().withMessage('password is required'),
    check('email').isEmail().withMessage('email is required'),
    check('address').notEmpty().withMessage('address is required')
], async (req, res) =>{
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', { errors: errors.mapped() });
    }else{
        return res.redirect('login');
    }
});

//API
// route.get('/u',controller.find);
// route.post('/register', controller.loginCredentials);

route.post('/login', passport.authenticate("local", {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));


module.exports = route;
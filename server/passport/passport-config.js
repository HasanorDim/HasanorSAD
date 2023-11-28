
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')

// const userDb = require('../model/model');

const initialize = (passport, getUserByUsername, getUserById) =>{
    
    const authenticateUser = async (username, password, done) => {
        users = await getUserByUsername(username);
        
        if(!users){
            return done(null, false, {message: "No username found with that username!"})
        }
        try {
            if(password === users.password){
                return done(null, users)
            }else{
                return done(null, false, {message: "Password Incorrect!"});
            }
        } catch (err) {
            return err;
            }
    }    
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((users, done) => done(null, users.id));
    passport.deserializeUser((id, done) =>{
        return done(null , getUserById(id));
    });
}


module.exports = initialize
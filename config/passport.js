const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/user') 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        if(currentUser){
            console.log('user is:', currentUser);
            done(null, currentUser);
        } else {
            new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('new user create' + newUser);
                done(null, newUser);
            });
        }
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    })
})
const passport = require('passport');
const dotenv=require('dotenv').config();
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null,id);
    /*User.findById(id,function(err,user){
        done(err,user);
    });*/
});

passport.use(new GoogleStrategy({
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/auth",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //TODO: Add to db
    return done(null,profile);  
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
  }
));


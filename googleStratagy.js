
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()


function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
    }
    return {
    displayName: profile.displayName,
    image: imageUrl,
    mailId:profile.emails[0].value,
    };
    }

passport.use(new GoogleStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: 'http://localhost:8081/login/callback',
    accessType: 'offline',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (accessToken, refreshToken, profile, cb) => {
           cb(null, extractProfile(profile));
    }));
    
passport.serializeUser((user, cb) => {
              cb(null, user);
    });
passport.deserializeUser((obj, cb) => {
              cb(null, obj);
    });



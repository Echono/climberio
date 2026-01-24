import { Application } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

export function googleSetStrategy(app: Application) {
    // Set Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    function(accessToken, refreshToken, profile, done) {
        // Here you would typically search for or create a user in your database
        return done(null, profile);
    }))

    // Google OAuth2 routes
    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/climberioui/index-cdn.html#/dashboard',
        failureRedirect: '/failure'
    }));

    // Serialize and deserialize user (for session support)
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj as Express.User);
    });
}
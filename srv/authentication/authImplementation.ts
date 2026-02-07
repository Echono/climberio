import { Application } from "express";
import session from "express-session";
import passport from "passport";
import { googleSetStrategy } from "./federation/googleHandler";

export default function authImplementation(app: Application) {

    app.use(passport.initialize());
    app.use(session({secret: process.env.SESSION_SECRET!}));
    app.use(passport.session());

    googleSetStrategy(app);

    app.get('/auth/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) { 
                return next(err);
            }
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                }
                res.clearCookie('connect.sid');
                res.redirect('/climberioui/index-cdn.html');
            });
        });
    });

}
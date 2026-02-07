import { Application } from "express";
import session from "express-session";
import passport from "passport";
import { googleSetStrategy } from "./federation/googleHandler";

export default function authImplementation(app: Application) {

    app.use(passport.initialize());
    app.use(session({secret: process.env.SESSION_SECRET!}));
    app.use(passport.session());

    googleSetStrategy(app);

    app.get('auth/logout', (req, res) => {
        req.logout(() => {});
        req.session.destroy(() => {});
        res.redirect('/climberioui/index-cdn.html');
    });
}
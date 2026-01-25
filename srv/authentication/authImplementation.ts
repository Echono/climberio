import { Application } from "express";
import session from "express-session";
import passport from "passport";
import { googleSetStrategy } from "./federation/googleHandler";

export default function authImplementation(app: Application) {

    app.use(passport.initialize());
    app.use(session({secret: 'keyboard cat'}));
    app.use(passport.session());

    googleSetStrategy(app);

}
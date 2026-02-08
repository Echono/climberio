import { isAuthenticated, UserSet } from "#cds-models/AuthenticationService";
import { AuthenticationStatus } from "#cds-models/Status";
import cds, { ApplicationService, User } from "@sap/cds";

export default class AuthenticationService extends ApplicationService {
    async init() {

        this.on(isAuthenticated, async (req) => {
            let user;
            if(!cds.env.env) {
                // Run this if in development with basic authentication
                user = await SELECT.one.from(UserSet).where({ username: req.user.id }).bind(this);
            } else {
                // Run this if in production with OAuth
                const serverUser = req.user as User & { email: string, displayName: string};
                user = await SELECT.one.from(UserSet).where({ email: serverUser.email }).bind(this);
            }
            return req.reply({
                code : user ? AuthenticationStatus.code.SUCCESS : AuthenticationStatus.code.UNAUTHORIZED,
                message : user ? AuthenticationStatus.message.SUCCESS : AuthenticationStatus.message.UNAUTHORIZED,
                user
            } satisfies AuthenticationStatus);
        })

        return super.init();

    }
}
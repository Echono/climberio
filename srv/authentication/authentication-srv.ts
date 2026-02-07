import { isAuthenticated, UserSet } from "#cds-models/AuthenticationService";
import { AuthenticationStatus } from "#cds-models/Status";
import { ApplicationService, User } from "@sap/cds";

export default class AuthenticationService extends ApplicationService {
    async init() {

        this.on(isAuthenticated, async (req) => {
            const isAuthenticated = Object.keys(req.user).length > 0 ? true : false;
            const serverUser = req.user as User & { email: string, displayName: string};
            const user = await SELECT.one.from(UserSet).where({ email: serverUser.email, username: serverUser.displayName }).bind(this);
            return {
                code : isAuthenticated ? AuthenticationStatus.code.SUCCESS : AuthenticationStatus.code.UNAUTHORIZED,
                message : isAuthenticated ? AuthenticationStatus.message.SUCCESS : AuthenticationStatus.message.UNAUTHORIZED,
                user
            } satisfies AuthenticationStatus;
        })

        return super.init();

    }
}
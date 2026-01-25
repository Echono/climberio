import { isAuthenticated } from "#cds-models/AuthenticationService";
import { AuthenticationStatus } from "#cds-models/Status";
import { ApplicationService } from "@sap/cds";

export default class AuthenticationService extends ApplicationService {
    async init() {

        this.on(isAuthenticated, async (req) => {
            const isAuthenticated = Object.keys(req.user).length > 0 ? true : false;
            return {
                code : isAuthenticated ? AuthenticationStatus.code.SUCCESS : AuthenticationStatus.code.UNAUTHORIZED,
                message : isAuthenticated ? AuthenticationStatus.message.SUCCESS : AuthenticationStatus.message.UNAUTHORIZED
            } satisfies AuthenticationStatus;
        })

        return super.init();

    }
}
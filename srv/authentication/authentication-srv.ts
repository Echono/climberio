import { isAuthenticated } from "#cds-models/AuthenticationService";
import { AuthenticationStatus, StatusCodes, StatusMessages } from "#cds-models/Status";
import { ApplicationService } from "@sap/cds";

export default class AuthenticationService extends ApplicationService {
    async init() {

        this.on(isAuthenticated, async (req) => {
            const isAuthenticated = Object.keys(req.user).length > 0 ? true : false;
            return {
                code : isAuthenticated ? StatusCodes.SUCCESS : StatusCodes.UNAUTHORIZED,
                message : isAuthenticated ? StatusMessages.SUCCESS : StatusMessages.UNAUTHORIZED
            } satisfies AuthenticationStatus;
        })

        return super.init();

    }
}
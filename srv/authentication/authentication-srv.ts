import { isAuthenticated } from "#cds-models/AuthenticationService";
import { Authentication } from "#cds-models/Status";
import { ApplicationService } from "@sap/cds";

export default class AuthenticationService extends ApplicationService {
    async init() {

        this.on(isAuthenticated, async (req) => {
            const isAuthenticated = Object.keys(req.user).length > 0 ? true : false;
            return {
                code : isAuthenticated ? Authentication.code.SUCCESS : Authentication.code.UNAUTHORIZED,
                message : isAuthenticated ? Authentication.message.SUCCESS : Authentication.message.UNAUTHORIZED
            } satisfies Authentication;
        })

        return super.init();

    }
}
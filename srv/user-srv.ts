import { getCurrentUser } from "#cds-models/UserService";
import { ApplicationService } from "@sap/cds";

export default class UserService extends ApplicationService {
    async init() {

        this.on(getCurrentUser, async (req) => req.user);

    }
}
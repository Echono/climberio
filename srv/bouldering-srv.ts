import { Registrations } from "#cds-models/BoulderingService";
import { ApplicationService } from "@sap/cds";
import { calculateAverageRating } from "./controllers/bouldering";

export default class BoulderingService extends ApplicationService {
    async init() {

        this.after(['POST', 'UPDATE', 'DELETE'], Registrations, calculateAverageRating);

        return super.init();
    }
}
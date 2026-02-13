import { getGrades, getWalls, Registrations } from "#cds-models/BoulderingService";
import { ApplicationService } from "@sap/cds";
import { calculateAverageRating, getGradesHandler, getWallsHandler } from "./controllers/bouldering";

export default class BoulderingService extends ApplicationService {
    async init() {

        this.after(['POST', 'UPDATE', 'DELETE'], Registrations, calculateAverageRating);

        this.on(getGrades, getGradesHandler);
        this.on(getWalls, getWallsHandler);

        return super.init();
    }
}
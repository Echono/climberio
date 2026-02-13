import { Registration, Registrations } from "#cds-models/BoulderingService";
import { connect, Request } from "@sap/cds";
import BoulderingService from "../bouldering-srv";

export const calculateAverageRating = async (subjects: any[], req: Request) => {
    // Turn subjects into a workable array
    let registrations: Registrations = [];
    if(Array.isArray(subjects)) {
        registrations = subjects as Registrations;
    } else {
        registrations = [subjects as Registration];
    }

    // Connect to service
    const service = await connect.to(BoulderingService);

    // loop through all registrations
    for(const registraion of registrations) {
        // get all ratings for the route
        const ratings = await SELECT.from(Registrations).columns("runnerGradeDifficulty").where({ route_ID: registraion.route_ID }).bind(service);
        
    }
    

}
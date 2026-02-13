import { Registration, Registrations, Routes } from "#cds-models/BoulderingService";
import cds, { connect, Request } from "@sap/cds";
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

    // Loop through all registrations
    for(const registration of registrations) {
        // Use cds.run to bypass authrization restrictions to get all ratings for current route
        const ratings: Registrations = await cds.run(SELECT.from(Registrations).columns("runnerGradeDifficulty").where({ route_ID: registration.route_ID }));
    
        // Calc average rating
        const averageRating = ratings.reduce((acc, curr) => acc + curr.runnerGradeDifficulty!, 0) / ratings.length;

        // Update route with new average rating
        await UPDATE(Routes).set({ averageRating: averageRating }).where({ ID: registration.route_ID }).bind(service);
    }
    
}
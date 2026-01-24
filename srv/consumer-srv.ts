import { BoulderingSet } from "#cds-models/ConsumerService";
import { ApplicationService, read } from "@sap/cds";

export default class ConsumerService extends ApplicationService {
    async init() {
        
        this.on("READ", BoulderingSet, async (req) => {
        })

    }
}
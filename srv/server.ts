import cds from "@sap/cds";
import authImplementation from "./authentication/authImplementation.js";

cds.on("bootstrap", async (app) => await authImplementation(app));

module.exports = cds.server;
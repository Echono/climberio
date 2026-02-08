import { Table$RowSelectionChangeEvent } from "sap/ui/table/Table";
import BaseController from "./BaseController";
import { Route } from "#cds-models/Bouldering";

/**
 * @namespace climberioui.controller
 */
export default class Routes extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("routes").attachPatternMatched(this.onRouteMatched, this);
    }

    public onRouteSelect(event: Table$RowSelectionChangeEvent) {
        const row = event.getParameter("rowContext");
        console.log(row.getObject());
    }

    private onRouteMatched(): void {
        this.setSideNavigationKey("routes");
    }

}

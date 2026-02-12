import { Table$RowSelectionChangeEvent } from "sap/ui/table/Table";
import BaseController from "./BaseController";
import { Route } from "#cds-models/Bouldering";

/**
 * @namespace climberioui.controller
 */
export default class Routes extends BaseController {

    private readonly routeName = "routes";

    public onInit(): void {
        this.getRouter().getRoute(this.routeName).attachPatternMatched(() => this.setSideNavigationKey(this.routeName), this);
    }

    public onRouteSelect(event: Table$RowSelectionChangeEvent) {
        const row = event.getParameter("rowContext");
        const data = row?.getObject() as Route;
        const encoded = encodeURIComponent(data.ID);
        this.getRouter().navTo("routeDetails", { routeID: encoded });
    }

}

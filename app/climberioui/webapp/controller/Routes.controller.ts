import { Table$RowSelectionChangeEvent } from "sap/ui/table/Table";
import BaseController from "./BaseController";
import { Route } from "#cds-models/Bouldering";
import Table from "sap/m/Table";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";

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

    public onDataReceived() {
        const routesTotal = this.byId("routesTotal");
        const routesAttempted = this.byId("routesAttempted");
        const table = this.byId("routesTable") as Table;
        const dataHeader = (table.getBinding("rows") as ODataListBinding).getHeaderContext();
        routesTotal.setBindingContext(dataHeader, "bouldering");
        routesAttempted.setBindingContext(dataHeader, "bouldering");
    }

}

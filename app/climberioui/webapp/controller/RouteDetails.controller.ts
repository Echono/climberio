import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import { User } from "#cds-models/Authentication";

/**
 * @namespace climberioui.controller
 */
export default class RouteDetails extends BaseController {

    private readonly navigationKey = "routes";
    private readonly routeName = "routeDetails";

    public onInit(): void {
        this.getRouter().getRoute(this.routeName).attachPatternMatched(() => this.setSideNavigationKey(this.navigationKey), this);
        this.getRouter().getRoute(this.routeName).attachPatternMatched(this.onPatternMatched, this);
    }

    private onPatternMatched(event: Route$PatternMatchedEvent): void {
        const params = event.getParameter("arguments") as { routeID: string };
        const decoded = decodeURIComponent(params.routeID);
        this.setupView(decoded);
    }

    private setupView(routeID: string): void {
        const view = this.getView();
        view.bindElement({
            path: `/RouteSet('${routeID}')`,
            model: "bouldering",
            parameters: {
                $expand: `tags($expand=tag)`
            }
        })
    }
}

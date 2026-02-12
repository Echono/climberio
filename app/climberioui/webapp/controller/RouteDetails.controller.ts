import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

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
        console.log(this.getRouter())
        const params = event.getParameter("arguments") as { routeID: string };
        const decoded = decodeURIComponent(params.routeID);
        this.setupView(decoded);
    }

    private setupView(routeID: string): void {

    }
}

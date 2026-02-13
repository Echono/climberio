import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import List from "sap/m/List";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

/**
 * @namespace climberioui.controller
 */
export default class RouteDetails extends BaseController {

    private readonly navigationKey = "routes";
    private readonly routeName = "routeDetails";

    public onInit(): void {
        this.getRouter().getRoute(this.routeName).attachPatternMatched(() => this.setSideNavigationKey(this.navigationKey), this);
    }
    
    public onAfterRendering(): void | undefined {
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
            path: `/Routes('${routeID}')`,
            model: "bouldering",
            parameters: {
                $expand: `tags($expand=tag)`
            }
        })
        const list = view.byId("routeDetailsMyRegistration") as List;
        const binding = list.getBinding("items") as ODataListBinding;
        binding.filter(new Filter("route_ID", FilterOperator.EQ, routeID));
        if(binding.isSuspended()) {
            binding.resume();  
        }

    }
}

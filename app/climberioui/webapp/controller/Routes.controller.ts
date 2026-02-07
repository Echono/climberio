import BaseController from "./BaseController";

/**
 * @namespace climberioui.controller
 */
export default class Routes extends BaseController {

    public onInit(): void {
        this.getRouter().getRoute("routes").attachPatternMatched(this.onRouteMatched, this);
    }

    private onRouteMatched(): void {
        this.setSideNavigationKey("routes");
    }

}
